/* eslint-disable semi */
import { IModelState } from './model/types';
import { IFilterDescription } from './filter';

export default interface IState {
    readonly model: IModelState;
    readonly filters: IFilterDescription[];
}
