/* eslint-disable semi */

export default interface IRowDescription {
  readonly caption: string;
}

export class RowDescription implements IRowDescription {
  constructor(caption: string) {
    this.caption = caption;
  }

      readonly caption: string;
}
