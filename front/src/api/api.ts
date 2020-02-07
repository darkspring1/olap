import axios from 'axios';
import { ModelDescription } from 'common/modelDescription';
import ApiSettings from '../globals.ts';

// axios.defaults.baseURL = `${ApiSettings .Schema}://${ApiSettings.Host}:${ApiSettings.Port}`;

const apiClient = axios.create({
  baseURL: `${ApiSettings.Schema}://${ApiSettings.Host}:${ApiSettings.Port}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ICreateModelResponse
{
  id: string;
}

const updateModelDescription = async (modelDescription: ModelDescription): IModelId => {
  try {
    const response: AxiosResponse<ICreateModelResponse> = await apiClient.post<ModelDescription>('/model', modelDescription);
    return response.data;
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError<ServerError>;
      return axiosError.response.data;
    }

    throw err;
  }
};


// eslint-disable-next-line import/prefer-default-export
export { updateModelDescription, ICreateModelResponse };
