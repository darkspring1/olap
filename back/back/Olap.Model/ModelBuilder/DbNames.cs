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

        public class Collections
        {
            public const string ModelDescriptions = "model_descriptions";
            public const string Views = "views";
            public const string Filters = "filters";
        }
    }

    

}
