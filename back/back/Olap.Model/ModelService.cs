using Microsoft.Extensions.Logging;
using Olap.Model.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;
using System.Threading.Tasks;

namespace Olap.Model
{
    public class ModelService
    {
        private readonly DbConnection _dbConnection;
        private readonly IModelBuilder _modelBuilder;
        private readonly ILogger<ModelService> _logger;

        public ModelService(DbConnection dbConnection, IModelBuilder modelBuilder, ILogger<ModelService> logger)
        {
            _dbConnection = dbConnection;
            _modelBuilder = modelBuilder;
            _logger = logger;
        }


        public async Task CreateModelAsync(IModelDescription modelDescription)
        {
            var createModelQuery = await _modelBuilder.CreateModelAsync(modelDescription);
            await _dbConnection.OpenAsync();
            using (var dbCommand = _dbConnection.CreateCommand())
            {
                dbCommand.CommandText = createModelQuery;
                await dbCommand.ExecuteNonQueryAsync();
            }
        }
    }
}
