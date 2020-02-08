/* eslint-disable no-extra-semi */
import IColumnDescription from './columnDescription.ts';
import IRowDescription from './rowDescription.ts';

export default interface IModelDescription {
    readonly modelName: string;

    readonly rows: Array<IRowDescription>;

    readonly columns: Array<IColumnDescription>;
// eslint-disable-next-line semi
};
