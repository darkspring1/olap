using System;
using System.Collections.Generic;
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
    public class CellController : ControllerBase
    {
        private readonly MongoCellService mongoCellService;

        public CellController(MongoCellService mongoCellService, IMapper mapper, MongoModelService mongoModelService, ILogger<ModelController> logger)
        {
            this.mongoCellService = mongoCellService;
        }

        //загружаем постом, так как в много данных в урле не передать
        [HttpPost("/cells/{viewId}")]
        public Task<IEnumerable<Cell>> GetCells(Guid viewId, CellFilterValueDto[] cellFilters)
        {
            return mongoCellService.GetCells(viewId, cellFilters);
        }

        [HttpPost("/cells")]
        public Task SaveCells(SaveCellsModel model)
        {
            return mongoCellService.SaveCells(model.ModelId, model.Cells);
        }

    }

    public class SaveCellsModel
    {
        public Guid ModelId { get; set; }
        public CellDto[] Cells { get; set; }
    }
}
