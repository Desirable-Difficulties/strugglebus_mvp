import { Text } from "@fluentui/react-components";
import NavBar from "./NavBar";

export const PageLayout = (props) => {
    return (
        <>
            <NavBar />
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Text size={600} weight="semibold">
                    Welcome to StruggleBus MVP - Knowledge Graph Platform
                </Text>
            </div>
            <div style={{ padding: '0 20px' }}>
                {props.children}
            </div>
        </>
    );
};