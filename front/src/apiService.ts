

export class ApiService {
    
    readonly BaseUrl: string;
    constructor(schema: string, host: string, port: number) {
        this.BaseUrl =`${schema}://${host}:${port}`;
    }
    
    SaveModel(s: string) {
        return "";
    }
}

const Api = new ApiService('http', 'localhost', 5000);

export default Api;