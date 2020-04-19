import { IModelState } from './model/types';
import { IFilterDescription } from './filter';
import { ICell } from './cell/types';

export default interface IState {
  readonly model: IModelState;
  readonly filters: IFilterDescription[];
  readonly cells: ICell[];
};
