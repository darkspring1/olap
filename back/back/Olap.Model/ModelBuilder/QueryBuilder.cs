using System;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Olap.Model.ModelBuilder
{
    public class CreateModelQueryResult
    {
        public CreateModelQueryResult(string modelTableName, string query)
        {
            ModelTableName = modelTableName;
            Query = query;
        }

        public string ModelTableName { get; }
        public string Query { get; }
    }

    public interface IQueryBuilder
    {
        Task<CreateModelQueryResult> CreateModelQueryAsync(IModelDescription modelDescription);
    }

    public class QueryBuilder : IQueryBuilder
    {
        private readonly IDbObjectNameGenerator _dbObjectNameGenerator;

        public QueryBuilder(IDbObjectNameGenerator dbObjectNameGenerator)
        {
            _dbObjectNameGenerator = dbObjectNameGenerator;
        }

        private string CreatePk() => $"{DbNames.IdColumnName} {DbNames.IdType} primary key";


        private string ConvertType(string clientType)
        {
            if (clientType == "number")
            {
                return "decimal";
            }

            throw new ArgumentException($"Unknown type {clientType}", nameof(clientType));
        }

        private string CreateModelColumn(string systemName, string type)
        {
            return $@"""{systemName}"" {ConvertType(type)}";
        }

        private string CreateModelTable(string name)
        {
            return $@"CREATE TABLE {DbNames.Schema}.""{name}""";
        }

        private string CreateDimension(string modelName, string dimensionName)
        {
            var fkColumnName = $"{dimensionName}_{DbNames.IdColumnName}";
            var fkColumn = CreateModelColumn(fkColumnName, DbNames.IdType);
            var constraint = $@"CONSTRAINT {modelName}_{dimensionName}_fk foreign key (""{fkColumnName}"") references ""{dimensionName}""(""{DbNames.IdColumnName}"")";

            return $"{fkColumn},{Environment.NewLine}{constraint}";
        }

        private string CreateInsertDescription(string modelTableName, IModelDescription modelDescription)
        {
            var columnsJson = JsonSerializer.Serialize(modelDescription.Columns);
            var rowsJson = JsonSerializer.Serialize(modelDescription.Rows);
            return $"INSERT INTO {DbNames.Schema}.{DbNames.ModelDescriptionTable}(table_name, model_name, column_descriptions, row_descriptions) VALUES('{modelTableName}','{modelDescription.ModelName}', '{columnsJson}', '{rowsJson}')";
        }



        public async Task<CreateModelQueryResult> CreateModelQueryAsync(IModelDescription modelDescription)
        {
            var sb = new StringBuilder();

            var modelTableName = await _dbObjectNameGenerator.CreateModelTableNameAsync();

            sb.Append($"{CreateModelTable(modelTableName)}({Environment.NewLine}{CreatePk()}");


            foreach (var c in modelDescription.Columns)
            {
                sb.Append($",{Environment.NewLine}{CreateModelColumn(c.SystemName, c.Type)}");
            }

            /*
            foreach (var d in modelDescr.Dimensions)
            {
                sb.Append($",{Environment.NewLine}{CreateDimension(modelDescr.Name, d)}");
            }
            */

            sb.Append(");");

            sb.Append($"{Environment.NewLine}{CreateInsertDescription(modelTableName, modelDescription)};");

            return new CreateModelQueryResult(modelTableName, sb.ToString());
        }
    }
}
