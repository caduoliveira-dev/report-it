import Report from "@/interfaces/Report";
import Session from "@/interfaces/Session";

declare const window: any;

export interface SuccessfulResponse<Data extends Record<string, any>> {
  error: false,
  result: Data,
}

export interface ErrorResponse {
  error: {
    code: string,
    message: string,
  },
  result: null,
}

type RequestResponse<Data extends Record<string, any>> =
  | SuccessfulResponse<Data>
  | ErrorResponse;

export const request = async <Data extends Record<string, any>>(
  url: string, data?: object, options?: RequestInit,
): Promise<RequestResponse<Data>> => {
  const headers = options?.headers ? new Headers(options.headers) : new Headers();
  const token = window.localStorage.getItem('token');
  const serialized = data ? JSON.stringify({ ...data }) : null;
  const method = options?.method ?? (data ? 'POST' : 'GET');

  if (method === 'POST') {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('Authorization', `Bearer ${token}`);

  const { error, result } = await window.fetch(url, {
    ...options,
    method,
    body: method === 'PUT' ? data as FormData : serialized,
    headers,
  }).then((e: any) => e.json());

  if (error) {
    return <ErrorResponse>{ error: { code: error.code, message: error.message } };
  }

  return <SuccessfulResponse<Data>>{ result };
};

export default class Api {
  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  async login(email: string, password: string) {
    return request<{ jwt: string }>('/api/auth/login', { email, password });
  }

  async me() {
    return request<Session>('/api/me');
  }

  async createReport(name: string, date: Date, description: string, lat: number, lng: number) {
    return request('/api/reports', { name, date, description, lat, lng });
  }

  async deleteReport(report: Report) {
    return request(`/api/reports/delete`, report);
  }

  async getReports() {
    return request<Report[]>('/api/reports');
  }

  async relayReport(distance: number, report: Report) {
    return request('/api/relay/report', {
      distance,
      report,
    });
  }
}