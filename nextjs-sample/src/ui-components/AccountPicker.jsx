import React from 'react';
import { useMsal } from "@azure/msal-react";
import { 
    Dialog, 
    DialogSurface, 
    DialogTitle, 
    DialogContent,
    Button,
    Text
} from "@fluentui/react-components";
import { PersonRegular, AddRegular } from "@fluentui/react-icons";
import { loginRequest } from "../authConfig";

export const AccountPicker = (props) => {
    const { instance, accounts } = useMsal();
    const { onClose, open } = props;

    const handleListItemClick = (account) => {
        instance.setActiveAccount(account);
        if (!account) {
            instance.loginRedirect({
                ...loginRequest,
                prompt: "login"
            })
        } else {
            // To ensure account related page attributes update after the account is changed
            window.location.reload();
        }

        onClose(account);
    };

    return (
        <Dialog open={open} onOpenChange={(event, data) => !data.open && onClose()}>
            <DialogSurface>
                <DialogTitle>Set active account</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {accounts.map((account) => (
                            <Button 
                                key={account.homeAccountId}
                                appearance="subtle"
                                onClick={() => handleListItemClick(account)}
                                style={{ 
                                    justifyContent: 'flex-start', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px'
                                }}
                            >
                                <PersonRegular />
                                <div style={{ textAlign: 'left' }}>
                                    <Text weight="semibold">{account.name}</Text>
                                    <br />
                                    <Text size={200}>{account.username}</Text>
                                </div>
                            </Button>
                        ))}
                
                        <Button 
                            appearance="subtle"
                            onClick={() => handleListItemClick(null)}
                            style={{ 
                                justifyContent: 'flex-start', 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px'
                            }}
                        >
                            <AddRegular />
                            <Text>Add account</Text>
                        </Button>
                    </div>
                </DialogContent>
            </DialogSurface>
        </Dialog>
    );
};