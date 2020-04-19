import { expect } from 'chai';
import 'mocha';

import { IFilterDescription, IFilterValue } from '../src/store/filter';
import { ICellDescription } from '../src/store/model/types';
import uuid from '../src/common/uuid';
import ICellModel from '../src/components/excel/cellModel';
import EditorHelper from '../src/components/modelDataEditor/editorHelper';
import { ICellFilterValue, ICell } from '../src/store/cell/types';

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

  const data: ICellModel[][] = EditorHelper.CreateEditorData(
    rowFilter,
    colFilter,
    [cellDescription],
    [cell],
  );

  expect(data.length).to.equal(2);
  expect(data[0][1].formula).to.equal(expectedFormula1);
  expect(data[1][0].formula).to.equal(expectedFormula2);
}

// eslint-disable-next-line no-undef
describe('model editor', () => {
  it('create data', createData);
});
