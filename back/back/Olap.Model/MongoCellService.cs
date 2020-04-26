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

        private PivotHeaderGrouped[] BuildGrouped(int i, int j, FilterValuesCollection[] filters)
        {
            if (i >= filters.Length)
            {
                return Array.Empty<PivotHeaderGrouped>();
            }
            var f = filters[i];
            return f.Values.Select(fv =>
            {
                var childs = BuildGrouped(j, j + 1, filters);
                return new PivotHeaderGrouped(f.SystemName, fv.Id, childs);
            }).ToArray();
        }

        private List<List<PivotHeaderGrouped>> GetPivotHeades(FilterValuesCollection[] filters)
        {
            var groupedHeaders = BuildGrouped(0, 1, filters);

            var result = new List<List<PivotHeaderGrouped>>();

            foreach (var g in groupedHeaders)
            {
                result.AddRange(g.ToGrid());
            }

            return result;
        }

        private async Task<List<List<PivotHeaderGrouped>>> LoadFilters(string[] filterSystemNames)
        {
            var filters = await Task.WhenAll(filterSystemNames.Select(async sn =>
            {
                var filterValues = await GetFilterValuesAsync(sn);
                return new FilterValuesCollection(sn, filterValues);
            }));


            return GetPivotHeades(filters);
        }

        private BsonDocument ToBsonCellFilter(CellFilterValue cfv)
        {
            return new BsonDocument(nameof(Cell.FilterValues), cfv.ToBsonDocument());
        }

        private List<BsonDocument> ToBsonCellFilters(IEnumerable<PivotHeaderGrouped> headers)
        {
            return headers
                .Select(h => ToBsonCellFilter(h.CellFilterValue))
                .ToList();
        }

        public MongoCellService(IMapper mapper, MongoClient mongoClient) : base(mapper, mongoClient)
        {

        }

        public async Task<IEnumerable<Cell>> GetCells(Guid viewId, CellFilterValueDto[] cellFilterDtos)
        {
            
            var view = await LoadViewByIdAsync(viewId);

            var rFiltersTask = LoadFilters(view.RowFilters);
            var cFiltersTask = LoadFilters(view.ColumnFilters);

            var mdTask = LoadModelDescriptionByIdAsync(view.ModelId);

            var filters = mapper
                .Map<IEnumerable<CellFilterValue>>(cellFilterDtos)
                .Select(ToBsonCellFilter)
                .ToArray();

            await Task.WhenAll(rFiltersTask, cFiltersTask);

            var rFilterGrid = rFiltersTask.Result;
            var cFilterGrid = cFiltersTask.Result;
            var filterList = new List<BsonDocument>();

            foreach (var rowFilters in rFilterGrid)
            {
                var rCellFilters = ToBsonCellFilters(rowFilters); 
                foreach (var columnFilters in cFilterGrid)
                {
                    var cCellFilters = rCellFilters.ToList();
                    cCellFilters.AddRange(ToBsonCellFilters(columnFilters));
                    cCellFilters.AddRange(filters);

                    var andFilter = new BsonDocument("$and", new BsonArray(cCellFilters));

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
