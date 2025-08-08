import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Text } from "@fluentui/react-components";

const WelcomeName = () => {
    const { instance, inProgress } = useMsal();
    const [name, setName] = useState(null);

    const activeAccount = inProgress === InteractionStatus.None ? instance.getActiveAccount() : null;
    useEffect(() => {
        if (activeAccount && activeAccount.name) {
            setName(activeAccount.name.split(' ')[0]);
        } else {
            setName(null);
        }
    }, [activeAccount]);

    if (name) {
        return <Text size={400} weight="semibold">Welcome, {name}</Text>;
    } else {
        return null;
    }
};

export default WelcomeName;