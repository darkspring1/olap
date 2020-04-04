/* eslint-disable no-debugger */
import { expect } from 'chai';
import 'mocha';

import { ModelDescriptionConverter } from '../src/store/model';
import { IFilterDescription, IFilterValue } from '../src/store/filter';
import { ICell, ICellDescription } from '../src/store/model/types';
import uuid from '../src/common/uuid';

// sourceMapSupport.install();
// Mocha.describe
function createFilter(fName: string, valuesCount: number): IFilterDescription {
  const values: IFilterValue[] = [];

  for (let i = 0; i < valuesCount;) {
    const v: IFilterValue = { id: uuid(), name: `${fName}_${i}`, order: i };
    values.push(v);
    i += 1;
  }

  return { name: fName, systemName: fName, values };
}

function createData(): void {
  const rowFilter = createFilter('row_filter', 2);
  const colFilter = createFilter('col_filter', 2);
  const cell: ICell = {
    id: uuid(),
    value: null,
    formula: '=formula',
    filterValues: [rowFilter.values[0], colFilter.values[1]],
  };

  const cellDescription: ICellDescription = {
    rowIndex: 0,
    columnIndex: 2,
    formula: '=abc',
    value: null,
  };
  // eslint-disable-next-line no-debugger
  debugger;
  const data: ICell[][] = ModelDescriptionConverter.CreateEditorData(
    rowFilter,
    colFilter,
    [cellDescription],
    [cell],
  );
  debugger;
  expect(data.length).to.equal(5);
}

// createData();

describe('model editor', () => {
  it('create data', createData);
});
