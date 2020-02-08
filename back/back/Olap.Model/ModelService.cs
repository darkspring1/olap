using Microsoft.Extensions.Logging;
using Olap.Model.ModelBuilder;
using System.Collections.Generic;
using System.Data.Common;
using System.Text.Json;
using System.Threading.Tasks;

namespace Olap.Model
{
    public class ModelService
    {
        private readonly DbConnection _dbConnection;
        private readonly IQueryBuilder _modelBuilder;
        private readonly ILogger<ModelService> _logger;

        public ModelService(DbConnection dbConnection, IQueryBuilder modelBuilder, ILogger<ModelService> logger)
        {
            _dbConnection = dbConnection;
            _modelBuilder = modelBuilder;
            _logger = logger;
        }

        public async Task<IModelDescription> LoadModelDescriptionAsync(string modelId)
        {
            var query = _modelBuilder.CreateLoadModelDescriptionQuery(modelId);
            await _dbConnection.OpenAsync();
            using (var dbCommand = _dbConnection.CreateCommand())
            {
                dbCommand.CommandText = query;
                using (var reader = await dbCommand.ExecuteReaderAsync())
                {
                    await reader.ReadAsync();

                    return new ModelDescription
                    {
                        ModelName = reader.GetFieldValue<string>(DbNames.ModelDescriptionConst.ModelNameColumn),
                        Columns = JsonSerializer.Deserialize<IEnumerable<ColumnDescription>>(reader.GetFieldValue<string>(DbNames.ModelDescriptionConst.ColumnDescriptionsColumn)),
                        Rows = JsonSerializer.Deserialize<IEnumerable<RowDescription>>(reader.GetFieldValue<string>(DbNames.ModelDescriptionConst.RowDescriptionsColumn))
                    };
                }
            }
        }


        public async Task<string> CreateModelAsync(IModelDescription modelDescription)
        {
            var createModelQueryResult = await _modelBuilder.CreateModelQueryAsync(modelDescription);
            await _dbConnection.OpenAsync();
            using (var dbCommand = _dbConnection.CreateCommand())
            {
                dbCommand.CommandText = createModelQueryResult.Query;
                await dbCommand.ExecuteNonQueryAsync();
            }
            return createModelQueryResult.ModelTableName;
        }
    }
}
