using System;

namespace Olap.WebApi.Models
{
    public class PivotModel
    {
        public int Id { get; set; }

        public string Country { get; set; }
        public string City { get; set; }
        public int Units_sold { get; set; }
        public DateTime Date { get; set; }

        /// <summary>
        /// для теста
        /// </summary>
        public int Some_fact { get; set; } = 1234;
    }
}
