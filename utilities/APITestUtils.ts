import { test as base_test, expect, request as playwrightRequest, APIRequestContext } from "@playwright/test";

const API_BASE_URL = process.env.API_BASE_URL;

const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN; // Bearer token

const API_HTTP_USERNAME = process.env.API_HTTP_USERNAME; // Basic auth
const API_HTTP_PASSWORD = process.env.API_HTTP_PASSWORD; // Basic auth


export const test = base_test.extend<{ apiContext: APIRequestContext }>({

  apiContext: async ({}, use) => { // Create a new apiContext for each test
    const extraHTTPHeaders: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (API_AUTH_TOKEN) {
      extraHTTPHeaders['Authorization'] = `Bearer ${API_AUTH_TOKEN}`; // adds bearer token to the request headers if API_AUTH_TOKEN is set
    }

    const apiContext = await playwrightRequest.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders,
      httpCredentials: API_HTTP_USERNAME && API_HTTP_PASSWORD ? { // adds basic auth to the request headers if API_HTTP_USERNAME and API_HTTP_PASSWORD are set
        username: API_HTTP_USERNAME, password: API_HTTP_PASSWORD,} : undefined,
    });

    
    await use(apiContext); // Set the apiContext for global access

    await apiContext.dispose(); // Dispose the apiContext after the test
  }
});

export { expect };

