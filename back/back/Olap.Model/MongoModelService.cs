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

        public MongoModelService(IMapper mapper, MongoClient mongoClient)
        {
            this.mapper = mapper;
            _mongoClient = mongoClient;
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

        public async Task<Filter> LoadFilterAsync(string systemName)
        {
            var values = await GetCollection<FilterValue>(systemName)
                .Find(new BsonDocument())
                .SortBy(x => x.Order)
                .ToListAsync();

            return new Filter(systemName, values);
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

        public async Task CreateModelAsync(ModelDescriptionDto dto)
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
            

            var modelDescriptionCollection = GetCollection<ModelDescription>(DbNames.Collections.ModelDescriptions);
            var viewsCollection = GetCollection<View>(DbNames.Collections.Views);

            await Task.WhenAll(
                modelDescriptionCollection.InsertOneAsync(modelDescription),
                viewsCollection.InsertOneAsync(view));
        }
    }
}
