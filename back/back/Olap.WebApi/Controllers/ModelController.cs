using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Olap.Model;
using Olap.WebApi.Models;

namespace Olap.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly ModelService _modelService;
        private readonly ILogger<ModelController> _logger;

        public ModelController(ModelService modelService, ILogger<ModelController> logger)
        {
            _modelService = modelService;
            _logger = logger;
        }

        [HttpGet("/model/description")]
        public Task Get()
        {
            return null;
        }

        [HttpPost("/model/description")]
        public async Task<object> Post(ModelDescription modelDescription)
        {
#pragma warning disable CA2007 // Consider calling ConfigureAwait on the awaited task
            var modelTableName = await _modelService.CreateModelAsync(modelDescription);
#pragma warning restore CA2007 // Consider calling ConfigureAwait on the awaited task
            return new { Id = modelTableName };
        }

    }
}
