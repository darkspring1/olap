using System.Data.Common;
using System.Threading.Tasks;

namespace Olap.Model.ModelBuilder
{

    public interface IDbObjectNameGenerator
    {
        Task<string> CreateModelTableNameAsync();
    }

    public class DbObjectNameGenerator : IDbObjectNameGenerator
    {
        private readonly string _countQuery = $"SELECT COUNT(*) FROM {DbNames.Schema}.{DbNames.ModelDescriptionConst.TableName}";
        private readonly DbConnection _dbConnection;

        public DbObjectNameGenerator(DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<string> CreateModelTableNameAsync()
        {
            await _dbConnection.OpenAsync();

            using (var dbCommand = _dbConnection.CreateCommand())
            {
                dbCommand.CommandText = _countQuery;
                var modelCount = (long) await dbCommand.ExecuteScalarAsync();
                return $"model_{modelCount + 1}";
            }
        }
    }
}
