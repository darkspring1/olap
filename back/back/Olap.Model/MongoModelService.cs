using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Olap.Model.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Olap.Model
{
    public class MongoModelService
    {
        private readonly IMapper mapper;
        private readonly MongoClient _mongoClient;

        private IMongoCollection<T> GetCollection<T>(string name)
        {
            IMongoDatabase database = _mongoClient.GetDatabase("olap");
            return database.GetCollection<T>(name);
        }


        private IMongoCollection<FilterDescription> FilterDescriptionCollection => GetCollection<FilterDescription>(DbNames.Collections.Filters);

        private IMongoCollection<ModelDescription> ModelDescriptionCollection => GetCollection<ModelDescription>(DbNames.Collections.ModelDescriptions);

        private IMongoCollection<View> ViewCollection => GetCollection<View>(DbNames.Collections.Views);

        private async Task<ModelDescription> LoadModelDescriptionByIdAsync(string modelId)
        {
            var filter = Builders<ModelDescription>.Filter.Eq(nameof(ModelDescription.Id), modelId);
            var cursor = await ModelDescriptionCollection.FindAsync(filter);
            return await cursor.SingleAsync();
        }

        private async Task<View> LoadViewAsync(string modelId)
        {
            var filter = Builders<View>.Filter.Eq(nameof(View.ModelId), modelId);
            var cursor = await ViewCollection.FindAsync(filter);
            return await cursor.SingleAsync();
        }

        public MongoModelService(IMapper mapper, MongoClient mongoClient)
        {
            this.mapper = mapper;
            _mongoClient = mongoClient;
        }

        public async Task<ModelDescriptionResponceDto> LoadModelDescriptionAsync(string modelId)
        {
            var mdTask = LoadModelDescriptionByIdAsync(modelId);
            var vTask = LoadViewAsync(modelId);

            await Task.WhenAll(mdTask, vTask);

            var dto = mapper.Map<ModelDescriptionResponceDto>(mdTask.Result);
            dto.DefaultView = mapper.Map<ViewDto>(vTask.Result);

            return dto;
        }


        /// <summary>
        /// return filter system names that does't exist in db
        /// </summary>
        /// <param name="systemNames"></param>
        /// <returns></returns>
        public async Task<IEnumerable<string>> GetNonExistentFiltesr(IEnumerable<string> systemNames)
        {

            var filter = Builders<FilterDescription>.Filter.In(nameof(FilterDescription.CollectionName), systemNames);

            var cursor = await FilterDescriptionCollection.FindAsync(filter);
            var existedFilters = await cursor.ToListAsync();

            var nonExistenFilters = systemNames.Except(existedFilters.Select(f => f.CollectionName));

            return nonExistenFilters;
        }

        public async Task<FilterValuesDto> LoadFilterValuesAsync(string systemName)
        {
            var values = await GetCollection<FilterValue>(systemName)
                .Find(new BsonDocument())
                .SortBy(x => x.Order)
                .ToListAsync();

            return new FilterValuesDto(systemName, values);
        }

        public async Task<IEnumerable<string>> CreateFiltersAsync(FilterDescriptionDto[] dtos)
        {

            var filterDescriptions = new List<FilterDescription>(dtos.Length);
            var tasks = new List<Task>(dtos.Length + 1);

            foreach (var dto in dtos)
            {
                var filterDescription = new FilterDescription { Name = dto.Name };
                var fValues = mapper.Map<IEnumerable<FilterValue>>(dto.Values);
                filterDescriptions.Add(filterDescription);
                tasks.Add(GetCollection<FilterValue>(filterDescription.CollectionName).InsertManyAsync(fValues));
            }

            tasks.Add(FilterDescriptionCollection.InsertManyAsync(filterDescriptions));

            await Task.WhenAll(tasks);

            return filterDescriptions.Select(x => x.CollectionName);
        }

        public async Task<Guid> CreateModelAsync(ModelDescriptionDto dto)
        {
            var modelId = Guid.NewGuid();
            var modelDescription = new ModelDescription
            {
                Id = modelId,
                Name = dto.Name,
                CellCollection = $"cells_{modelId}"
            };

            var view = mapper.Map<View>(dto.DefaultView);
            view.Id = Guid.NewGuid();
            view.ModelId = modelId;
 
            await Task.WhenAll(
                ModelDescriptionCollection.InsertOneAsync(modelDescription),
                ViewCollection.InsertOneAsync(view));

            return modelId;
        }
    }
}
