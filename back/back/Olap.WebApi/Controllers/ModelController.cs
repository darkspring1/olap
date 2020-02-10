using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Olap.Model;
using Olap.Model.ModelBuilder;
using Olap.WebApi.Models;

namespace Olap.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly MongoModelService _mongoModelService;
        private readonly ModelService _modelService;
        private readonly ILogger<ModelController> _logger;

        public ModelController(MongoModelService mongoModelService, ModelService modelService, ILogger<ModelController> logger)
        {
            _mongoModelService = mongoModelService;
            _modelService = modelService;
            _logger = logger;
        }

        [HttpGet("/model/description/{modelId}")]
        public Task<IModelDescription> Get(string modelId)
        {
            return _mongoModelService.LoadModelDescriptionAsync(modelId);
        }

        [HttpPost("/model/description")]
        public async Task<object> Post(ModelDescription modelDescription)
        {
#pragma warning disable CA2007 // Consider calling ConfigureAwait on the awaited task
            var modelTableName = await _mongoModelService.CreateModelAsync(modelDescription);
#pragma warning restore CA2007 // Consider calling ConfigureAwait on the awaited task
            return new { Id = modelTableName };
        }

    }
}
