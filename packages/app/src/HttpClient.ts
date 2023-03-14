class HttpClient {
  private apiUrl: process.env.NSH_API_URL | '';
  private headers: {
    'Content-Type': 'application/json';
    'Authorization': `Bearer ${process.env.NSH_API_KEY}`;
    'x-api-key': process.env.NSH_API_KEY | '';
    'x-source': process.env.NSH_API_SOURCE | '';
  }
}
