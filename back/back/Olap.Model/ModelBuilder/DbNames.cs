namespace Olap.Model.ModelBuilder
{
    class DbNames
    {
        public const string Schema = "public";

        /// <summary>
        /// тип PK и FK
        /// </summary>
        public const string IdType = "uuid";

        /// <summary>
        /// Имя/постфикс для именования столбцов PK, FK
        /// </summary>
        public const string IdColumnName = "id";

        public class ModelDescriptionConst
        {
            public const string TableName = "model_descriptions";
            public const string TableNameColumn = "table_name";
            public const string ModelNameColumn = "model_name";
            public const string ColumnDescriptionsColumn = "column_descriptions";
            public const string RowDescriptionsColumn = "row_descriptions";
        }
    }

    

}
