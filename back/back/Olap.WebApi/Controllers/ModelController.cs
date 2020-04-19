using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Olap.Model;
using Olap.Model.ModelBuilder;

namespace Olap.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly MongoModelService _mongoModelService;
        private readonly ILogger<ModelController> _logger;

        public ModelController(IMapper mapper, MongoModelService mongoModelService, ILogger<ModelController> logger)
        {
            _mapper = mapper;
            _mongoModelService = mongoModelService;
            _logger = logger;
        }

        [HttpGet("/model/description/{modelId}")]
        public Task<ModelDescriptionResponceDto> Get(Guid modelId)
        {
            return _mongoModelService.LoadModelDescriptionAsync(modelId);
        }


        [HttpPost("/model/description")]
        public Task<Guid> Post(ModelDescriptionDto modelDescription)
        {
            return _mongoModelService.CreateModelAsync(modelDescription);
        }

    }
}
