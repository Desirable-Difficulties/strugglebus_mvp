import { Text } from "@fluentui/react-components";

export const ErrorComponent = ({error}) => {
    return <Text size={400}>An Error Occurred: {error.errorCode}</Text>;
}