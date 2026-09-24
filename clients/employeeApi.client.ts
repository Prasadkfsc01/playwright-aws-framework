import { APIRequestContext, APIResponse } from "@playwright/test";

export class EmployeeApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async getEmployees(token?: string): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/employees`, {
      headers: this.getAuthorizationHeader(token),
    });
  }

  async getAdminStatus(token?: string): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/admin/status`, {
      headers: this.getAuthorizationHeader(token),
    });
  }

  private getAuthorizationHeader(token?: string): Record<string, string> | undefined {
    if (!token) {
      return undefined;
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
