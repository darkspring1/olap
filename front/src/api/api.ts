import axios, { AxiosResponse, AxiosError } from 'axios';

import ApiSettings from '../globals.ts';
import { IModelDescription } from '../store/model';
import { IFilterDescription } from '../store/filter';
import { ICellFilterValue, ICell } from '../store/cell/types';

const apiClient = axios.create({
  baseURL: `${ApiSettings.Schema}://${ApiSettings.Host}:${ApiSettings.Port}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ServerError { test: string }

const saveModelDescription = async (modelDescription: IModelDescription): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await apiClient.post<string>('/model/description', modelDescription);
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      // return axiosError.response.data;
    }

    throw err;
  }
};

const loadCells = async (viewId: string, filterValues: ICellFilterValue[]): Promise<string> => {
  const response: AxiosResponse<string> = await apiClient.post<string>(`/cells/${viewId}`, filterValues);
  return response.data;
};

const saveCells = async (modelId: string, cells: ICell[]): Promise<string> => {
  const response: AxiosResponse<string> = await apiClient.post<string>('/cells', {
    modelId,
    cells,
  });
  return response.data;
};

const loadModelDescription = async (modelId: string): Promise<IModelDescription> => {
  try {
    const response: AxiosResponse<IModelDescription> = await apiClient.get(`/model/description/${modelId}`);
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      // return axiosError.response.data;
    }

    throw err;
  }
};

const loadFilterValues = async (filterSystemVames: string[]): Promise<IFilterDescription[]> => {
  try {
    const response: AxiosResponse<IFilterDescription[]> = await apiClient.get('/filter-values',
      {
        params: { systemNames: filterSystemVames },
        paramsSerializer: (params) => {
          let queryString = '';
          params.systemNames.forEach((sysName: string) => {
            queryString += `systemNames=${sysName}&`;
          });
          return queryString;
        },
      });
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      // return axiosError.response.data;
    }

    throw err;
  }
};

export {
  saveModelDescription,
  loadModelDescription,
  loadFilterValues,
  loadCells,
  saveCells,
};
