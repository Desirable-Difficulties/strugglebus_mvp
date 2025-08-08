import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import { ProfileData } from "../src/ui-components/ProfileData";
import { callMsGraph } from "../src/utils/MsGraphApiCall";
import { Card, Text } from "@fluentui/react-components";

const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        if (!graphData && inProgress === InteractionStatus.None) {
            callMsGraph().then(response => setGraphData(response)).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        ...loginRequest,
                        account: instance.getActiveAccount()
                    });
                }
            });
        }
    }, [inProgress, graphData, instance]);
  
    return (
        <Card style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            { graphData ? <ProfileData graphData={graphData} /> : null }
        </Card>
    );
};

const ErrorComponent = ({error}) => {
    return <Text size={400}>An Error Occurred: {error.errorCode}</Text>;
}

const Loading = () => {
    return <Text size={400}>Authentication in progress...</Text>
}

export default function Profile() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
        >
            <ProfileContent />
        </MsalAuthenticationTemplate>
    )
};
