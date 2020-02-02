namespace Olap.Model.ModelBuilder
{
    public interface IColumnDescription
    {
        string Caption { get; }
        string SystemName { get; }
        string Type { get; }
    }
}