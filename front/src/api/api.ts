import axios from 'axios';
import { IModelDescription } from 'store/model';
import ApiSettings from '../globals.ts';

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

export { saveModelDescription, ICreateModelResponse, loadModelDescription };
