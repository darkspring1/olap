using System.Collections.Generic;

namespace Olap.Model.ModelBuilder
{
    public interface IModelDescription
    {
        IEnumerable<IColumnDescription> Columns { get; }
        IEnumerable<IRowDescription> Rows { get; }
        string ModelName { get; }
    }
}