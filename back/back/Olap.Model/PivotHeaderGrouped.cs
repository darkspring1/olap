using Olap.Model.ModelBuilder;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olap.Model
{
    class PivotHeaderGrouped
    {
        public PivotHeaderGrouped(
          string filterSystemName,
          Guid filterValueId,
          IEnumerable<PivotHeaderGrouped> childs)
        {
            CellFilterValue = new CellFilterValue
            {
                FilterSystemName = filterSystemName,
                FilterValueId = filterValueId
            };
            Childs = childs;
        }

        public CellFilterValue CellFilterValue { get; }


        public IEnumerable<PivotHeaderGrouped> Childs { get; }


        public List<List<PivotHeaderGrouped>> ToGrid()
        {
            var result = new List<List<PivotHeaderGrouped>>();

            if (!Childs.Any())
            {
                var list = new List<PivotHeaderGrouped>() { this };
                return new List<List<PivotHeaderGrouped>>() { list };
            }

            foreach (var cg in Childs)
            {
                var cGrid = cg.ToGrid();
                result.AddRange(cGrid);
            }


            foreach (var row in result)
            {
                row.Add(this);
            }

            return result;
        }
    }
}
