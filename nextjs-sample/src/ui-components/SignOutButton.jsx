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
import { PersonRegular } from "@fluentui/react-icons";
import { AccountPicker } from "./AccountPicker";

export const SignOutButton = () => {
    const { instance } = useMsal();
    const [accountSelectorOpen, setOpen] = useState(false);

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup().catch((e) => { console.error(`logoutPopup failed: ${e}`) });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect().catch((e) => { console.error(`logoutRedirect failed: ${e}`) });
        }
    }

    const handleAccountSelection = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Menu>
                <MenuTrigger>
                    <Button 
                        appearance="subtle" 
                        icon={<PersonRegular />}
                        style={{ color: 'white' }}
                    />
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        <MenuItem onClick={handleAccountSelection}>
                            Switch Account
                        </MenuItem>
                        <MenuItem onClick={() => handleLogout("popup")}>
                            Logout using Popup
                        </MenuItem>
                        <MenuItem onClick={() => handleLogout("redirect")}>
                            Logout using Redirect
                        </MenuItem>
                    </MenuList>
                </MenuPopover>
            </Menu>
            <AccountPicker open={accountSelectorOpen} onClose={handleClose} />
        </div>
    )
};