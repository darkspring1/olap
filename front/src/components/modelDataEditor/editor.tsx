/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import { ModelDescriptionConverter, ICellDescription } from '../../store/model';
import { Grid } from '../excel/grid';
import { IFilterDescription } from '../../store/filter';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
    readonly modelId: string;
    readonly rowFilters: IFilterDescription;
    readonly columnFilters: IFilterDescription;
    // cells with formulas and hardcoded values
    readonly cellsDescription: ICellDescription[];
}

interface IEditorDispatchProps {
  onDataLoad: (modelId: string) => void;
  onSaveModel: (modelId: string, data: any[][]) => void;
}

type IEditorProps = IEditorOwnProps & IEditorDispatchProps;

class Editor extends React.Component<IEditorProps, {}> {
  modelName: string

  constructor(props: IEditorOwnProps) {
    super(props);
    this.modelName = '';
  }

  render() {
    const {
      rowFilters,
      columnFilters,
    } = this.props;

    if (!rowFilters) {
      return <>loading...</>;
    }

    const data = ModelDescriptionConverter.CreateData(rowFilters, columnFilters);

    return (
      <>
        <Grid data={data} />
      </>
    );
  }
}

export {
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
