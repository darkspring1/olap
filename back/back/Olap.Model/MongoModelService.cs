using AutoMapper;
using MongoDB.Driver;
using Olap.Model.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Olap.Model
{

    public class MongoModelService : BaseMongoService
    {
        private async Task<IEnumerable<View>> LoadViewAsync(Guid modelId)
        {
            var filter = Builders<View>.Filter.Eq(nameof(View.ModelId), modelId);
            var cursor = await ViewCollection.FindAsync(filter);
            return await cursor.ToListAsync();
        }

        public MongoModelService(IMapper mapper, MongoClient mongoClient) : base(mapper, mongoClient)
        {
        }

        public async Task<ModelDescriptionResponceDto> LoadModelDescriptionAsync(Guid modelId)
        {
            var mdTask = LoadModelDescriptionByIdAsync(modelId);
            var vTask = LoadViewAsync(modelId);

            await Task.WhenAll(mdTask, vTask);

            var dto = mapper.Map<ModelDescriptionResponceDto>(mdTask.Result);
            dto.Views = mapper.Map<IEnumerable<ViewDto>>(vTask.Result);

            return dto;
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
