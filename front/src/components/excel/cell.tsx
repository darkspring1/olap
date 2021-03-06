/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import CellViewModel from './cellViewModel';

interface ICellOwnProps<TAttached> {
  cellViewModel: CellViewModel<TAttached>;
  debug: boolean;
}

enum CellMode {
  View = 1,
  Edit = 2,
  Active = 3
}

interface ICellState {
  mode: CellMode;
  editValue: string;
}

export default class Cell<TAttached> extends React.Component<ICellOwnProps<TAttached>, ICellState> {
  constructor(props: ICellOwnProps<TAttached>) {
    super(props);

    this.state = { mode: CellMode.View, editValue: props.cellViewModel.editValue };

    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick(): void {
    console.log('click');
    const { mode } = this.state;
    if (mode === CellMode.View) {
      this.setState({ mode: CellMode.Active });
    }
  }

  onChange(event: any) {
    this.setState({ editValue: event.target.value });
  }

  onDoubleClick(): void {
    console.log('dblClick');
    this.setState({ mode: CellMode.Edit });
  }

  onBlur(): void {
    const { editValue } = this.state;
    const { cellViewModel } = this.props;
    cellViewModel.editValue = editValue;

    if (editValue[0] === '=') {
      // cellViewModel.cell.value = null;
      cellViewModel.cell.value = editValue;
      cellViewModel.cell.formula = editValue;
    } else {
      cellViewModel.cell.value = editValue;
      cellViewModel.cell.formula = null;
    }
    this.setState({ mode: CellMode.View });
  }

  render() {
    const { cellViewModel, debug } = this.props;
    const { mode, editValue } = this.state;
    let markup;

    function renderDebugInfo(): any {
      if (debug) {
        return (
          <>
            <div>cell_id</div>
            <div>{cellViewModel.cell.id}</div>
          </>
        );
      }
      return null;
    }

    if (mode === CellMode.View || mode === CellMode.Active) {
      markup = (
        <td
          tabIndex={0}
          role="button"
          onClick={() => this.onClick()}
          onDoubleClick={() => this.onDoubleClick()}
        >
          {renderDebugInfo()}
          {cellViewModel.cell.value}
        </td>
      );
    } else if (mode === CellMode.Edit) {
      markup = (
        <td>
          {renderDebugInfo()}
          <input onBlur={this.onBlur} autoFocus type="text" value={editValue} onChange={this.onChange} />
        </td>
      );
    }

    return (markup);
  }
}
