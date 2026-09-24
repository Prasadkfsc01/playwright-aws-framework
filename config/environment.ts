function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Required environment variable "${name}" is not configured.`);
  }

  return value;
}

export const environment = {
  get uiBaseUrl(): string {
    return getRequiredEnvironmentVariable("UI_BASE_URL");
  },

  get apiUrl(): string {
    return getRequiredEnvironmentVariable("API_URL");
  },

  get awsRegion(): string {
    return getRequiredEnvironmentVariable("AWS_REGION");
  },

  get cognitoClientId(): string {
    return getRequiredEnvironmentVariable("COGNITO_CLIENT_ID");
  },

  get cognitoUsername(): string {
    return getRequiredEnvironmentVariable("COGNITO_USERNAME");
  },

  get cognitoPassword(): string {
    return getRequiredEnvironmentVariable("COGNITO_PASSWORD");
  },
};
