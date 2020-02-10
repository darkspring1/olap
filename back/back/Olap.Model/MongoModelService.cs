using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Olap.Model.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Olap.Model
{
    public class MongoModelService
    {
        private readonly MongoClient _mongoClient;

        private IMongoCollection<T> GetCollection<T>(string name)
        {
            IMongoDatabase database = _mongoClient.GetDatabase("olap");
            return database.GetCollection<T>(DbNames.ModelDescriptionConst.TableName);
        }

        public MongoModelService(MongoClient mongoClient)
        {
            _mongoClient = mongoClient;
        }

        public async Task<IModelDescription> LoadModelDescriptionAsync(string modelId)
        {
            var collection = GetCollection<ModelDescription>(DbNames.ModelDescriptionConst.TableName);
            var filter = new BsonDocument(nameof(IModelDescription.SystemName), modelId);
            return await collection.Find(filter).FirstAsync();
        }

        public async Task<string> CreateModelAsync(IModelDescription modelDescription)
        {
            var collection = GetCollection<IModelDescription>(DbNames.ModelDescriptionConst.TableName);

            //var model = database.RunCommandAsync(cmd);

            modelDescription.SystemName = $"model_{Guid.NewGuid()}";
            await collection.InsertOneAsync(modelDescription);

            return modelDescription.SystemName;
        }
    }
}
