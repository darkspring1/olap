using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Olap.Model.ModelBuilder
{
    public class ModelDescription : IModelDescription
    {
        [BsonRepresentation(BsonType.ObjectId)]
        internal string _id { get; set; }

        public string ModelName { get; set; }
        public IEnumerable<RowDescription> Rows { get; set; }
        public IEnumerable<ColumnDescription> Columns { get; set; }
        public string SystemName { get; set; }

        IEnumerable<IColumnDescription> IModelDescription.Columns => this.Columns;

        IEnumerable<IRowDescription> IModelDescription.Rows => this.Rows;
    }



}
