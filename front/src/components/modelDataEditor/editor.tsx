/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import { ICellDescription } from '../../store/model';
import { Grid } from '../excel/grid';
import { IFilterDescription } from '../../store/filter';
import { ICell } from '../../store/model/types';
import ICellModel from '../excel/cellModel';
import EditorHelper from './editorHelper';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
  readonly modelId: string;
  readonly rowFilters: IFilterDescription;
  readonly columnFilters: IFilterDescription;
  // cells with formulas and hardcoded values
  readonly cellsDescription: ICellDescription[];
  // data cells
  readonly cells: ICell[];
}

interface IEditorDispatchProps {
  onDataLoad: (modelId: string) => void;
  onSaveModel: (modelId: string, data: any[][]) => void;
}

type IEditorProps = IEditorOwnProps & IEditorDispatchProps;

class Editor extends React.Component<IEditorProps, {}> {
  modelName: string

  constructor(props: IEditorProps) {
    super(props);
    this.modelName = '';
  }

  CreateViewData(): ICellModel[][] {
    const {
      rowFilters,
      columnFilters,
      cellsDescription,
      cells,
    } = this.props;
    return EditorHelper.CreateEditorData(rowFilters, columnFilters, cellsDescription, cells);
  }

  render() {
    const {
      rowFilters,
      columnFilters,
    } = this.props;

    if (!rowFilters) {
      return <>loading...</>;
    }

    const rowHeaders = rowFilters.values.map((x) => x.name);
    const colHeaders = columnFilters.values.map((x) => x.name);

    const data = this.CreateViewData();

    return (
      <>
        <Grid data={data} rowHeaders={rowHeaders} columnHeaders={colHeaders} />
      </>
    );
  }
}

export {
  // eslint-disable-next-line no-undef
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
