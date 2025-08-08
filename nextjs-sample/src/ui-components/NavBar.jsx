import React from "react";
import { Text } from "@fluentui/react-components";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import Link from "./Link";

const NavBar = () => {
    return (
        <div style={{ 
            backgroundColor: '#0078d4', 
            padding: '12px 20px', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                <Text size={500} weight="semibold" style={{ color: 'white' }}>
                    StruggleBus MVP
                </Text>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <WelcomeName />
                <SignInSignOutButton />
            </div>
        </div>
    );
};

export default NavBar;