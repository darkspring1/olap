namespace Olap.Model.ModelBuilder
{
    class DbNames
    {
        public const string Schema = "public";
        public const string ModelDescriptionTable = "model_descriptions";

        /// <summary>
        /// тип PK и FK
        /// </summary>
        public const string IdType = "uuid";

        /// <summary>
        /// Имя/постфикс для именования столбцов PK, FK
        /// </summary>
        public const string IdColumnName = "id";
    }
}
