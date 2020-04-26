using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using Olap.Model.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Olap.Model
{

    public class MongoCellService : BaseMongoService
    {
        private readonly MongoModelService mongoModelService;

      

        public MongoCellService(MongoModelService mongoModelService, IMapper mapper, MongoClient mongoClient) : base(mapper, mongoClient)
        {
            this.mongoModelService = mongoModelService;
        }


        public async Task<IEnumerable<Cell>> GetCells(Guid viewId, CellFilterValueDto[] cellFilterDtos)
        {
            Func<CellFilterValue, BsonDocument> toBsonCellFilter = cfv => new BsonDocument(nameof(Cell.FilterValues), cfv.ToBsonDocument());

            var view = await LoadViewByIdAsync(viewId);

            var rFilterSystemName = view.RowFilters[0];
            var cFilterSystemName = view.ColumnFilters[0];

            var mdTask = LoadModelDescriptionByIdAsync(view.ModelId);

            var rValuesTask = GetFilterValuesAsync(rFilterSystemName);
            var cValuesTask = GetFilterValuesAsync(cFilterSystemName);

            var filters = mapper
                .Map<IEnumerable<CellFilterValue>>(cellFilterDtos)
                .Select(toBsonCellFilter);

            await Task.WhenAll(rValuesTask, cValuesTask);


            var filterList = new List<BsonDocument>();

            foreach (var rowFilterVal in rValuesTask.Result)
            {
                var rCellFilter = new CellFilterValue { FilterSystemName = rFilterSystemName, FilterValueId = rowFilterVal.Id };

                var rCellFilterBson = toBsonCellFilter(rCellFilter);
                foreach (var columnFilterVal in cValuesTask.Result)
                {
                    var cCellFilter = new CellFilterValue { FilterSystemName = cFilterSystemName, FilterValueId = columnFilterVal.Id };
                    var cCellFilterBson = toBsonCellFilter(cCellFilter);

                    var list = new List<BsonDocument> { rCellFilterBson, rCellFilterBson };
                    list.AddRange(filters);

                    var andFilter = new BsonDocument("$and", new BsonArray(list));

                    filterList.Add(andFilter);

                }
            }

            var orFilter = new BsonDocument("$or", new BsonArray(filterList));

            var modelDescription = await mdTask;

            var cellCollection = GetCollection<Cell>(modelDescription.CellCollection);


            var cells = await cellCollection.Find(orFilter).ToListAsync();


            return cells;
        }

        public async Task SaveCells(Guid modelId, CellDto[] dtos)
        {

            var modelDescription = await LoadModelDescriptionByIdAsync(modelId);

            var filter = Builders<Cell>.Filter.In(c => c.Id, dtos.Select(dto => dto.Id));
            var collection = GetCollection<Cell>(modelDescription.CellCollection);

            var cursor = await collection.FindAsync(filter);
            var existedCells = await cursor.ToListAsync();

            var cellsFromClient = mapper.Map<IEnumerable<Cell>>(dtos);

            var forDelete = cellsFromClient
                .Where(dto => string.IsNullOrEmpty(dto.Formula) && string.IsNullOrEmpty(dto.Value))
                .ToArray();

            Func<Cell, Cell, bool> cellComparer = (c1, c2) => c1.Id == c2.Id;

            var forUpsert = cellsFromClient.Except(forDelete, cellComparer).ToArray();


            var forInsert = forUpsert.Except(existedCells, cellComparer).ToArray();
            var forUpdate = forUpsert.Intersect(existedCells, cellComparer).ToArray();

            var writeOperations = new List<WriteModel<Cell>>();


            var deleteFilter = Builders<Cell>.Filter.In(c => c.Id, forDelete.Select(c => c.Id));
            writeOperations.Add(new DeleteManyModel<Cell>(deleteFilter));

            foreach (var up in forUpdate)
            {
                var update = Builders<Cell>
                    .Update
                    .Set(c => c.Formula, up.Formula)
                    .Set(c => c.Value, up.Value);

                var upFilter = Builders<Cell>.Filter.Eq(c => c.Id, up.Id);
                writeOperations.Add(new UpdateOneModel<Cell>(upFilter, update));
            }

            foreach (var ins in forInsert)
            {
                writeOperations.Add(new InsertOneModel<Cell>(ins));
            }

            await collection.BulkWriteAsync(writeOperations);
  
        }

    }
}
