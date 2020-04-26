import React from 'react';
import { IViewOwnProps, View } from '../components/modelDataEditor/view';
import { ICellFilterValue, ICell } from '../store/cell/types';

export interface IModelEditorDispatchProps {
  onCellsLoad: (viewId: string, filters: ICellFilterValue[]) => void;
  onSave: (data: ICell[]) => void;
}

export interface IViewInfo {
  readonly id: string;
  readonly props: IViewOwnProps;
}

export interface IModelEditorOwnProps {
  readonly modelName: string;
  readonly views: IViewInfo[];
}

type IModelEditorProps = IModelEditorOwnProps & IModelEditorDispatchProps;


const ModelEditor = function (props: IModelEditorProps): any {
  const {
    modelName, views,
    onCellsLoad,
    onSave,
  } = props;

  if (!modelName) {
    return <>loading...</>;
  }

  const renderView = (viewInfo: IViewInfo): any => {
    const {
      cells,
      rowFilters,
      columnFilters,
      cellsDescription,
      filters,
    } = viewInfo.props;

    return (
      <View
        key={viewInfo.id}
        rowFilters={rowFilters}
        cellsDescription={cellsDescription}
        columnFilters={columnFilters}
        cells={cells}
        filters={filters}
        onCellsLoad={(f) => onCellsLoad(viewInfo.id, f)}
        onSave={onSave}
      />
    );
  };

  return (
    <>
      { views.map(renderView) }
    </>
  );
};

export default ModelEditor;
