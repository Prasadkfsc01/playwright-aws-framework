import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

import { environment } from "../config/environment";

export class CognitoAuthClient {
  private readonly client: CognitoIdentityProviderClient;

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: environment.awsRegion,
    });
  }

  async getAccessToken(): Promise<string> {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",

      ClientId: environment.cognitoClientId,

      AuthParameters: {
        USERNAME: environment.cognitoUsername,
        PASSWORD: environment.cognitoPassword,
      },
    });

    const response = await this.client.send(command);

    const accessToken = response.AuthenticationResult?.AccessToken;

    if (!accessToken) {
      throw new Error("Cognito authentication succeeded but no access token was returned.");
    }

    return accessToken;
  }
}
