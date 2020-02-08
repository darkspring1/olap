using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Npgsql;
using Olap.Model;
using Olap.WebApi.Models;

namespace Olap.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PivotController : ControllerBase
    {
        private const string SqlCmd = @"
select 
 dr.country,
 dr.city,
 dt.year as year, dt.month as month, dt.day as day,
 SUM(f.units_sold) units_sold
 FROM
  public.f_sales f
  
 join public.d_times dt
 on f.time_id = dt.id
 
 join public.d_regions dr
 on f.region_id = dr.id
 
 join public.d_products dp
 on f.product_id = dp.id
 
 
 group by
 dr.country, dr.city, year, month, day
 
 order by year, month, day";

        private async Task<IEnumerable<PivotModel>> GetDataAsync()
        {
            await _dbConnection.OpenAsync();
            using (var dbCommand = _dbConnection.CreateCommand())
            {
                dbCommand.CommandText = SqlCmd;
                using (var reader = await dbCommand.ExecuteReaderAsync())
                {
                    
                    var result = new List<PivotModel>();
                    int i = 1;
                    
                    while (await reader.ReadAsync())
                    {

                        var y = reader.GetFieldValue<int>("year");
                        var m = reader.GetFieldValue<int>("month");
                        var d = reader.GetFieldValue<int>("day");
                        var date = new DateTime(y, m, d).Date;
                        var model = new PivotModel
                        {
                            Id = i,
                            Country = reader.GetFieldValue<string>("country"),
                            City = reader.GetFieldValue<string>("city"),
                            Date = date,
                            Units_sold = reader.GetFieldValue<int>("units_sold")
                        };

                        result.Add(model);
                        i++;
                    }

                    return result;
                }
            }
        }

        private readonly DbConnection _dbConnection;
        private readonly ILogger<PivotController> _logger;

        public PivotController(DbConnection dbConnection, ILogger<PivotController> logger)
        {
            this._dbConnection = dbConnection;
            _logger = logger;
        }

        [HttpGet("/pivot")]
        public Task<IEnumerable<PivotModel>> GetPivot()
        {
            return GetDataAsync();
        }

        [HttpGet("/grid")]
        public async Task<object> GetGrid(int skip, int take, bool requireTotalCount)
        {
            var data = await GetDataAsync();

            return new { Data = data };
        }

        [HttpGet("/pivot_lot_of_data")]
#pragma warning disable CA1822 // Mark members as static
        public IEnumerable<PivotModel> GetBig()
#pragma warning restore CA1822 // Mark members as static
        {
            var rnd = new Random();
            const int monthCount = 60;
            const int maxFactValue = 10000;
            const int maxCountries = 5;
            const int maxCities = 5;

            var result = new PivotModel[2000000];
            var startDate = DateTime.Now.Date;

            var dates = new DateTime[monthCount];
            for (int i = 0; i < 60; i++)
            {
                dates[i] = startDate.AddMonths(i);
            }

            for (int i = 0; i < result.Length; i++)
            {
                result[i] = new PivotModel
                {
                    Id = i,
                    Country = $"Country{i % rnd.Next(1, maxCountries) + 1}",
                    City = $"City{i % maxCities + 1}",
                    Date = dates[i % monthCount],
                    Some_fact = i % maxFactValue + 30, //магические числа просто для теста
                    Units_sold = i % maxFactValue + 40
                };
            }


            return result;
        }
    }
}
