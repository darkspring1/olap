/* eslint-disable semi */
export default interface IAction<T> {
    type: string;
    payload: T;
}
