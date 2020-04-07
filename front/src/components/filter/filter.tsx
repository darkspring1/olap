import React from 'react';

export interface IFilterProps
{
  values: string[];
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Filter extends React.Component<IFilterProps> {
  render() {
    const { values } = this.props;

    return (
      <select>
        { values.map((v: string) => (<option>{v}</option>)) }

      </select>
    );
  }
}
