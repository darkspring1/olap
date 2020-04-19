using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Olap.Model.ModelBuilder
{
    public class Cell
    {
        [BsonId]
        public Guid Id { get; set; }

        public string Value { get; set; }

        public string Formula { get; set; }

        public CellFilterValue[] FilterValues { get; set; }

    }

    public class CellFilterValue
    {
        public string FilterSystemName { get; set; }
        public Guid FilterValueId { get; set; }
    }


    public class CellDto
    {
        public Guid Id { get; set; }

        public string Value { get; set; }

        public string Formula { get; set; }

        public CellFilterValueDto[] FilterValues { get; set; }

    }

    public class CellFilterValueDto
    {
        public string FilterSystemName { get; set; }
        public Guid FilterValueId { get; set; }
    }
}