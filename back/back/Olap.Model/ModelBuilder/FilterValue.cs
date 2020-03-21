using System;

namespace Olap.Model.ModelBuilder
{

    public class FilterValue
    {
        public FilterValue()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
    }

    public class FilterValueDto
    {
        public string Name { get; set; }
        public int Order { get; set; }
    }
}