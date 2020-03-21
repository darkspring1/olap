using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Olap.WebApi.Controllers
{
    public abstract class BaseApiController : ControllerBase
    {
        private readonly ILogger _logger;

        protected BaseApiController(ILogger logger)
        {
            _logger = logger;
        }

        protected BadRequestObjectResult Error(ApiError error)
        {
            return BadRequest(error);
        }
    }
}
