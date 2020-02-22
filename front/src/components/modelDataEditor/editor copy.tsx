/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import Grid from 'components/spreadsheets/grid';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
    modelId: string;
    isEmpty: boolean;
    modelName: string;
    data: any[][];
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
    this.modelName = props.modelName;
  }

  onSaveModel(): void {
    const { data, modelId, onSaveModel } = this.props;
    onSaveModel(modelId, data);
  }

  render() {
    const {
      data, modelName, isEmpty, modelId, onDataLoad,
    } = this.props;

    let content = null;
    if (isEmpty) {
      content = (<div>loading...</div>);
      onDataLoad(modelId);
    } else {
      content = (
        <>
          <h2>{modelName}</h2>
          <label>Выберите регион</label>
          <br />
          <select id="dimension">
            <option value="">Россия</option>
            <option value="">Европа</option>
            <option value="">США</option>
          </select>
          <Grid data={data} width={1200} height={500} formulas contextMenu />
          <button onClick={() => this.onSaveModel()}>Сохранить данные</button>
        </>
      );
    }

    return (
      <>
        {content}
      </>
    );
  }
}

export {
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
