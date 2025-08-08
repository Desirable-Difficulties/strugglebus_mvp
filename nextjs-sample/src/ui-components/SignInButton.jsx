import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { 
    Button, 
    Menu, 
    MenuTrigger, 
    MenuPopover, 
    MenuList, 
    MenuItem 
} from "@fluentui/react-components";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch((e) =>{ console.error(`loginPopup failed: ${e}`) });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch((e) => { console.error(`loginRedirect failed: ${e}`) })
        };
    }

    return (
        <Menu>
            <MenuTrigger>
                <Button appearance="primary">
                    Login
                </Button>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    <MenuItem onClick={() => handleLogin("popup")}>
                        Sign in using Popup
                    </MenuItem>
                    <MenuItem onClick={() => handleLogin("redirect")}>
                        Sign in using Redirect
                    </MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    )
};