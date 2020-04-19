using System.Collections.Generic;
using System.Linq;
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
    public class FilterController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly MongoFilterService _mongoFilterService;

        public FilterController(IMapper mapper, MongoFilterService mongoFilterService, ILogger<FilterController> logger) : base(logger)
        {
            _mapper = mapper;
            _mongoFilterService = mongoFilterService;
        }

        [HttpGet("/filter-values")]
        public async Task<IActionResult> Get([FromQuery]string[] systemNames)
        {
            if (systemNames?.Any() != true)
            {
                return Error(Errors.Required(nameof(systemNames)));
            }

            var nonExistenFilters = await _mongoFilterService.GetNonExistentFiltesr(systemNames);
            if (nonExistenFilters.Any())
            {
                return Error(Errors.FiltersAreNonExisten(nonExistenFilters));
            }

            var filters = await Task.WhenAll(systemNames.Select(sn => _mongoFilterService.LoadFilterValuesAsync(sn)));

            return Ok(filters);
       
        }

 

        [HttpPost("/filter")]
        public Task<IEnumerable<string>> PostFilter(FilterDescriptionDto[] filters)
        {
            return _mongoFilterService.CreateFiltersAsync(filters);
        }



    }
}
