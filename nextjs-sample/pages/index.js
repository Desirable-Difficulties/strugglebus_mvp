import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Button } from "@fluentui/react-components";
import { Text } from "@fluentui/react-components";

export default function Home() {
  return (
      <>
          <AuthenticatedTemplate>
              <Button appearance="primary" as="a" href="/profile">
                Request Profile Information
              </Button>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Text align="center" size={500}>
              Please sign-in to see your profile information.
            </Text>
          </UnauthenticatedTemplate>
      </>
  );
}
