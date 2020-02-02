import axios from 'axios'
import { ApiSettings } from '../globals'
import { ModelDescription } from 'components/modelBuilder/modelDescription';

//axios.defaults.baseURL = `${ApiSettings .Schema}://${ApiSettings.Host}:${ApiSettings.Port}`;

const apiClient = axios.create({
    baseURL: `${ApiSettings .Schema}://${ApiSettings.Host}:${ApiSettings.Port}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });


const updateModelDescription = async (modelDescription : ModelDescription) =>
{
    try {
        const response = await apiClient.post<ModelDescription>('/model', modelDescription)
        //const response = await apiClient.post('/model', { test: 'hello' })
        const user = response.data
        return user;
      } catch (err) {
        
        if (err && err.response) {
          const axiosError = err as AxiosError<ServerError>
          return axiosError.response.data;
        }
        
        throw err;
      }
}


export { updateModelDescription }