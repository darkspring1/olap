using Olap.Model.ModelBuilder;
using System.Collections.Generic;

namespace Olap.WebApi.Models
{
    public class ModelDescription : IModelDescription
    {
        public string ModelName { get; set; }
        public IEnumerable<RowDescription> Rows { get; set; }
        public IEnumerable<ColumnDescription> Columns { get; set; }

        IEnumerable<IColumnDescription> IModelDescription.Columns => this.Columns;

        IEnumerable<IRowDescription> IModelDescription.Rows => this.Rows;
    }



}
