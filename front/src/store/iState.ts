import { IModelState } from './model/types';
import { IFilterDescription } from './filter';
import { ICellsState } from './cell/types';

export default interface IState {
  readonly model: IModelState;
  readonly filters: { [id: string]: IFilterDescription };
  readonly cells: { [id: string]: ICellsState };
};
