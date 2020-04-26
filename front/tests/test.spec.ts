/* eslint-disable no-undef */
import { expect } from 'chai';
import 'mocha';

import { IFilterDescription, IFilterValue } from '../src/store/filter';
import { ICellDescription } from '../src/store/model/types';
import uuid from '../src/common/uuid';
import ICellModel from '../src/components/excel/cellModel';
import EditorHelper from '../src/components/modelDataEditor/editorHelper';
import { ICellFilterValue, ICell } from '../src/store/cell/types';
import { IPivotHeaderGrouped } from '../src/components/excel/PivotHeaderGroup';

function createFilter(fName: string, valuesCount: number): IFilterDescription {
  const values: IFilterValue[] = [];

  for (let i = 0; i < valuesCount;) {
    const v: IFilterValue = { id: uuid(), value: `${fName}_${i}`, order: i };
    values.push(v);
    i += 1;
  }

  return { name: fName, systemName: fName, values };
}

function createCellFilter(filter: IFilterDescription, index: number): ICellFilterValue {
  return { filterSystemName: filter.systemName, filterValueId: filter.values[index].id };
}

function createData(): void {
  const expectedFormula1 = '=formula';
  const expectedFormula2 = '=abc';
  const rowFilter = createFilter('row_filter', 2);
  const colFilter = createFilter('col_filter', 2);

  const cell: ICell = {
    id: uuid(),
    value: null,
    formula: expectedFormula1,
    filterValues: [createCellFilter(rowFilter, 0), createCellFilter(colFilter, 1)],
  };

  const cellDescription: ICellDescription = {
    rowIndex: 1,
    columnIndex: 0,
    formula: expectedFormula2,
    value: null,
  };

  const rPivotHeaders = EditorHelper.GetGroupedHeaders([rowFilter]);
  const cPivotHeaders = EditorHelper.GetGroupedHeaders([colFilter]);

  const data: ICellModel<ICell>[][] = EditorHelper.CreateEditorData(
    rPivotHeaders,
    cPivotHeaders,
    [],
    [cellDescription],
    [cell],
  );

  expect(data.length).to.equal(2);
  expect(data[0][1].formula).to.equal(expectedFormula1);
  expect(data[1][0].formula).to.equal(expectedFormula2);
}


function groupTest(): void {
  const f1 = createFilter('row_filter', 2);
  const f2 = createFilter('col_filter', 2);

  const groups = EditorHelper.GetGroupedHeaders([f1, f2]);
  expect(groups.length).to.equal(2);

  function expectGroup(h: IPivotHeaderGrouped, i: number, f: IFilterDescription): void {
    expect(h.filterSystemName).to.eq(f.systemName);
    expect(h.filterValueId).to.eq(f.values[i].id);
    expect(h.filterValue).to.eq(f.values[i].value);
  }

  groups.forEach((g, i) => {
    expectGroup(g, i, f1);
    g.childs.forEach((cg, j) => expectGroup(cg, j, f2));
  });
}

function getPivotHeaders(): void {
  const f1 = createFilter('filter1', 2);
  const f2 = createFilter('filter2', 2);

  const groups = EditorHelper.GetGroupedHeaders([f1, f2]);
  const headers = EditorHelper.GetPivotHeades(groups);
  expect(headers.length).to.eq(4);
}

// eslint-disable-next-line no-undef
describe('model editor', () => {
  it('create data', createData);
  it('group pivot headers', groupTest);
  it('get pivot headers', getPivotHeaders);
});
