import axios from 'axios';

type HttpClientHeaders = {
  'Authorization': string;
}

export class HttpClient {
  constructor(url: string, headers: HttpClientHeaders) {
    this.apiUrl = url;
    this.headers = headers;
  }

  private apiUrl: string;
  private headers: HttpClientHeaders;

  public Post = async <T, P>(payload: P): Promise<T | null> => {
    try {
      const { data, status } = await axios.post<T>(this.apiUrl, payload, { headers: this.headers });
      
      if (status === 403) {
        console.error('Not authorized to generate command');
        return null;
      }

      if (status !== 200) {
        console.error('Failed to generate command');
        return null;
      }

      return data;
    } catch(error) {
      console.error('Something went wrong while generating command');
      return null;
    }
  }
}
