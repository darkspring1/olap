namespace Olap.Model.ModelBuilder
{
   
    public class CellDescription
    {
        public string Value { get; set; }

        public string Formula { get; set; }

        public string RowIndex { get; set; }

        public string ColumnIndex { get; set; }

        // filterValues: string[];
    }


    public class CellDescriptionDto
    {
        public string Value { get; set; }

        public string Formula { get; set; }

        public string RowIndex { get; set; }

        public string ColumnIndex { get; set; }

        // filterValues: string[];
    }
}