import React from 'react';
import { IViewProps, View } from '../components/modelDataEditor/view';


const EditorWrap = function (props: IViewProps): any {
  const {
    cells,
    onCellsLoad,
    onSave,
    rowFilters,
    columnFilters,
    cellsDescription,
    filters,
  } = props;

  if (!rowFilters) {
    return <>loading...</>;
  }

  return (
    <>
      <View
        rowFilters={rowFilters}
        cellsDescription={cellsDescription}
        columnFilters={columnFilters}
        cells={cells}
        filters={filters}
        onCellsLoad={onCellsLoad}
        onSave={onSave}
      />
    </>
  );
};

export default EditorWrap;
