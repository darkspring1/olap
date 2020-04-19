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

            var collection = GetCollection<Cell>(modelDescription.CellCollection);

            var cells = mapper.Map<IEnumerable<Cell>>(dtos);

            await collection.InsertManyAsync(cells);
  
        }

    }
}
