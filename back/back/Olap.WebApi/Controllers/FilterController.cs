using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Olap.Model;
using Olap.Model.ModelBuilder;
using Olap.WebApi.Models;

namespace Olap.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilterController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly MongoModelService _mongoModelService;
        private readonly ILogger<FilterController> _logger;

        public FilterController(IMapper mapper, MongoModelService mongoModelService, ILogger<FilterController> logger)
        {
            this._mapper = mapper;
            _mongoModelService = mongoModelService;
            _logger = logger;
        }

        [HttpGet("/filter")]
        public async Task<IActionResult> Get([FromQuery]string[] systemNames)
        {
            var nonExistenFilters = await _mongoModelService.GetNonExistentFiltesr(systemNames);
            if (nonExistenFilters.Any())
            {
                return BadRequest(Errors.FiltersAreNonExisten(nonExistenFilters));
            }

            var filters = await Task.WhenAll(systemNames.Select(sn => _mongoModelService.LoadFilterAsync(sn)));

            return Ok(filters);
       
        }

 

        [HttpPost("/filter")]
        public Task<IEnumerable<string>> PostFilter(FilterDescriptionDto[] filters)
        {
            return _mongoModelService.CreateFiltersAsync(filters);
        }



    }
}
