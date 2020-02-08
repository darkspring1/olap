using Olap.Model.ModelBuilder;

namespace Olap.Model.ModelBuilder
{
    public class ColumnDescription : IColumnDescription
    {
        public string Caption { get; set; }
        public string Type { get; set; }
        public string SystemName { get; set; }
    }
}
