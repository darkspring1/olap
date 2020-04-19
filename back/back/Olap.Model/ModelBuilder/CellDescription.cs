using System;

namespace Olap.Model.ModelBuilder
{

    public class CellDescription
    {
        public string Value { get; set; }

        public string Formula { get; set; }

        public int RowIndex { get; set; }

        public int ColumnIndex { get; set; }

        // filterValues: string[];
    }


    public class CellDescriptionDto
    {
        public string Value { get; set; }

        public string Formula { get; set; }

        public int RowIndex { get; set; }

        public int ColumnIndex { get; set; }

        // filterValues: string[];
    }

}