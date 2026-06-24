import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { Logger } from './LoggerUtil';

/**
 * API Utility class to wrap Playwright's APIRequestContext for simpler, 
 * cleaner, and auto-logged HTTP requests.
 */
export class ApiUtil {
  private requestContext: APIRequestContext | null = null;
  private baseURL: string = '';

  /**
   * Constructor that accepts an optional request context.
   * Useful when passing the { request } fixture from Playwright tests.
   */
  constructor(requestContext?: APIRequestContext, baseURL?: string) {
    if (requestContext) {
      this.requestContext = requestContext;
    }
    if (baseURL) {
      this.baseURL = baseURL;
    }
  }

  /**
   * Initializes a default context if none was provided.
   */
  private async getContext(): Promise<APIRequestContext> {
    if (!this.requestContext) {
      Logger.debug('Creating new standalone APIRequestContext...');
      this.requestContext = await request.newContext({
        baseURL: this.baseURL || undefined,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
    }
    return this.requestContext;
  }

  /**
   * Internal helper to log the API call details.
   */
  private async logResponse(method: string, url: string, response: APIResponse, payload?: any) {
    const status = response.status();
    const statusText = response.statusText();
    
    Logger.info(`API Request: [${method.toUpperCase()}] -> ${url}`);
    if (payload) {
      Logger.debug(`Request Payload: ${JSON.stringify(payload)}`);
    }
    
    Logger.info(`API Response: [${status} ${statusText}]`);
    try {
      const responseBody = await response.json();
      Logger.debug(`Response Body: ${JSON.stringify(responseBody)}`);
    } catch {
      // In case response is not JSON or empty
      try {
        const text = await response.text();
        Logger.debug(`Response Text: ${text}`);
      } catch (err: any) {
        Logger.debug(`Could not read response body: ${err.message}`);
      }
    }
  }

  /**
   * GET Request
   */
  public async get(endpoint: string, options: Parameters<APIRequestContext['get']>[1] = {}): Promise<APIResponse> {
    const context = await this.getContext();
    try {
      const response = await context.get(endpoint, options);
      await this.logResponse('GET', endpoint, response);
      return response;
    } catch (error: any) {
      Logger.error(`GET request failed for "${endpoint}": ${error.message}`);
      throw error;
    }
  }

  /**
   * POST Request
   */
  public async post(endpoint: string, data?: any, options: Parameters<APIRequestContext['post']>[1] = {}): Promise<APIResponse> {
    const context = await this.getContext();
    try {
      const postOptions = { ...options, data };
      const response = await context.post(endpoint, postOptions);
      await this.logResponse('POST', endpoint, response, data);
      return response;
    } catch (error: any) {
      Logger.error(`POST request failed for "${endpoint}": ${error.message}`);
      throw error;
    }
  }

  /**
   * PUT Request
   */
  public async put(endpoint: string, data?: any, options: Parameters<APIRequestContext['put']>[1] = {}): Promise<APIResponse> {
    const context = await this.getContext();
    try {
      const putOptions = { ...options, data };
      const response = await context.put(endpoint, putOptions);
      await this.logResponse('PUT', endpoint, response, data);
      return response;
    } catch (error: any) {
      Logger.error(`PUT request failed for "${endpoint}": ${error.message}`);
      throw error;
    }
  }

  /**
   * DELETE Request
   */
  public async delete(endpoint: string, options: Parameters<APIRequestContext['delete']>[1] = {}): Promise<APIResponse> {
    const context = await this.getContext();
    try {
      const response = await context.delete(endpoint, options);
      await this.logResponse('DELETE', endpoint, response);
      return response;
    } catch (error: any) {
      Logger.error(`DELETE request failed for "${endpoint}": ${error.message}`);
      throw error;
    }
  }

  /**
   * PATCH Request
   */
  public async patch(endpoint: string, data?: any, options: Parameters<APIRequestContext['patch']>[1] = {}): Promise<APIResponse> {
    const context = await this.getContext();
    try {
      const patchOptions = { ...options, data };
      const response = await context.patch(endpoint, patchOptions);
      await this.logResponse('PATCH', endpoint, response, data);
      return response;
    } catch (error: any) {
      Logger.error(`PATCH request failed for "${endpoint}": ${error.message}`);
      throw error;
    }
  }
}
