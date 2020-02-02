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

        [HttpGet]
        public Task Get()
        {
            return null;
        }

        [HttpPost]
        public Task Post(ModelDescription modelDescription)
        {
            return _modelService.CreateModelAsync(modelDescription);
        }

    }
}
