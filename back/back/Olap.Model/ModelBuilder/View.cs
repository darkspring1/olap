using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Olap.Model.ModelBuilder
{
   

    public class View
    {
        [BsonId]
        public Guid Id { get; set; }

        public Guid ModelId { get; set; }

        public string Name { get; set; }

        public string[] RowFilters { get; set; }

        public string[] ColumnFilters { get; set; }

        public IEnumerable<CellDescription> CellsDescription { get; set; }

        // IEnumerable<ICellInfo> IView.CellsInfo => this.CellsInfo;
    }


    public class ViewDto
    {
        public string Name { get; set; }

        public string[] RowFilters { get; set; }

        public string[] ColumnFilters { get; set; }

        public IEnumerable<CellDescriptionDto> CellsDescription { get; set; }

        // IEnumerable<ICellInfo> IView.CellsInfo => this.CellsInfo;
    }
}