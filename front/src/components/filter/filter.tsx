import React from 'react';

export interface IFilterOption<TSelected> {
  id: string;
  name: string;
}

export interface IFilterProps<TSelected>
{
  values: IFilterOption<TSelected>[];
  selected?: string;
  onchange?: (selectedId: string) => void;
}

interface IFilterState<TSelected> {
  selectedId: string;
}

export default class FilterSelect<TSelected> extends React.Component<IFilterProps<TSelected>, IFilterState<TSelected>> {
  constructor(props: IFilterProps<TSelected>) {
    super(props);
    this.change = this.change.bind(this);

    if (props.selected) {
      const selected = props.values.find((x) => x.id === props.selected);
      if (!selected) {
        throw new Error(`Invalid selected value. Can't find ${selected}`);
      }
      this.state = { selectedId: selected.id };
    } else {
      this.state = { selectedId: props.values[0].id };
    }
  }

  change(event: React.FormEvent<HTMLSelectElement>): void {
    const selectedId = event.currentTarget.value;
    this.setState((current) => ({ ...current, selectedId }));
    const { onchange } = this.props;
    if (onchange) {
      onchange(selectedId);
    }
  }

  render() {
    const { values } = this.props;
    const { selectedId } = this.state;

    return (
      <select onChange={this.change} value={selectedId}>
        { values.map((v: IFilterOption<TSelected>) => (<option key={v.id} value={v.id}>{v.name}</option>))}
      </select>
    );
  }
}
