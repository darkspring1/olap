using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using Olap.Model.ModelBuilder;

namespace Olap.Model
{
    public abstract class BaseMongoService
    {
        protected readonly IMapper mapper;
        protected readonly MongoClient _mongoClient;

        protected IMongoCollection<FilterDescription> FilterDescriptionCollection => GetCollection<FilterDescription>(DbNames.Collections.Filters);

        protected IMongoCollection<ModelDescription> ModelDescriptionCollection => GetCollection<ModelDescription>(DbNames.Collections.ModelDescriptions);

        protected IMongoCollection<View> ViewCollection => GetCollection<View>(DbNames.Collections.Views);

        protected async Task<ModelDescription> LoadModelDescriptionByIdAsync(Guid modelId)
        {
            var filter = Builders<ModelDescription>.Filter.Eq(nameof(ModelDescription.Id), modelId);
            var cursor = await ModelDescriptionCollection.FindAsync(filter);
            return await cursor.SingleAsync();
        }

        protected async Task<View> LoadViewByIdAsync(Guid viewId)
        {
            var filter = Builders<View>.Filter.Eq(nameof(View.Id), viewId);
            var cursor = await ViewCollection.FindAsync(filter);
            return await cursor.SingleAsync();
        }

        public BaseMongoService(IMapper mapper, MongoClient mongoClient) : base()
        {
            this.mapper = mapper;
            _mongoClient = mongoClient;
        }

        protected IMongoCollection<T> GetCollection<T>(string name)
        {
            IMongoDatabase database = _mongoClient.GetDatabase("olap");
            return database.GetCollection<T>(name);
        }


        protected async Task<IEnumerable<FilterValue>> GetFilterValuesAsync(string systemName)
        {
            return await GetCollection<FilterValue>(systemName)
                .Find(new BsonDocument())
                .SortBy(x => x.Order)
                .ToListAsync();
        }
    }
}
