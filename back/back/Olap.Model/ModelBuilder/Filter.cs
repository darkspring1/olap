using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Olap.Model.ModelBuilder
{
    public class FilterDescription
    {
        public FilterDescription()
        {
            Id = Guid.NewGuid();
            CollectionName = $"f_{Id}";
        }

        [BsonId(IdGenerator = typeof(GuidGenerator))]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CollectionName { get; set; }
    }

    public class FilterDescriptionDto
    {
        public string Name { get; set; }
        public FilterValueDto[] Values { get; set; }
    }


    public class FilterValuesCollection
    {
        public FilterValuesCollection(string filterSystemName, IEnumerable<FilterValue> filterValues)
        {
            SystemName = filterSystemName;
            Values = filterValues;
        }

        public string SystemName { get; }
        public IEnumerable<FilterValue> Values { get; }
    }

}