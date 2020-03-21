import axios, { AxiosResponse, AxiosError } from 'axios';

import ApiSettings from '../globals.ts';
import { IModelDescription } from '../store/model';
import { IFilterDescription } from '../store/filter';

const apiClient = axios.create({
  baseURL: `${ApiSettings.Schema}://${ApiSettings.Host}:${ApiSettings.Port}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ICreateModelResponse
{
  id: string;
}

const saveModelDescription = async (modelDescription: IModelDescription): IModelId => {
  try {
    const response: AxiosResponse<ICreateModelResponse> = await apiClient.post<IModelDescription>('/model/description', modelDescription);
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      return axiosError.response.data;
    }

    throw err;
  }
};

const saveFiltersDescription = async (modelDescription: IFilterDescription[]): Promise<string[]> => {
  try {
    const response: AxiosResponse<ICreateModelResponse> = await apiClient.post<IModelDescription>('/model/filters',
      modelDescription);
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      return axiosError.response.data;
    }

    throw err;
  }
};

const loadModelDescription = async (modelId: string): IModelDescription => {
  try {
    const response: AxiosResponse<IModelDescription> = await apiClient.get(`/model/description/${modelId}`);
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      return axiosError.response.data;
    }

    throw err;
  }
};

const loadFilters = async (filterSystemVames: string[]): Promise<IFilterDescription[]> => {
  try {
    const response: AxiosResponse<IFilterDescription[]> = await apiClient.get('/filter',
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
      return axiosError.response.data;
    }

    throw err;
  }
};

export {
  saveModelDescription,
  ICreateModelResponse,
  loadModelDescription,
  saveFiltersDescription,
  loadFilters,
};
