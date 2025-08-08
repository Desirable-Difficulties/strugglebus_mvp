import React from "react";
import { Text, Avatar } from "@fluentui/react-components";
import { 
    PersonRegular, 
    BriefcaseRegular, 
    MailRegular, 
    CallRegular, 
    LocationRegular 
} from "@fluentui/react-icons";

export const ProfileData = ({graphData}) => {
    return (
        <div style={{ padding: '20px' }}>
            <NameListItem name={graphData.displayName} />
            <JobTitleListItem jobTitle={graphData.jobTitle} />
            <MailListItem mail={graphData.mail} />
            <PhoneListItem phone={graphData.businessPhones[0]} />
            <LocationListItem location={graphData.officeLocation} />
        </div>
    );
};

const ListItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #e1e1e1'
};

const NameListItem = ({name}) => (
    <div style={ListItemStyle}>
        <Avatar
            color="colorful"
            icon={<PersonRegular />}
        />
        <div>
            <Text weight="semibold">Name</Text>
            <br />
            <Text>{name}</Text>
        </div>
    </div>
);

const JobTitleListItem = ({jobTitle}) => (
    <div style={ListItemStyle}>
        <Avatar
            color="colorful"
            icon={<BriefcaseRegular />}
        />
        <div>
            <Text weight="semibold">Title</Text>
            <br />
            <Text>{jobTitle}</Text>
        </div>
    </div>
);

const MailListItem = ({mail}) => (
    <div style={ListItemStyle}>
        <Avatar
            color="colorful"
            icon={<MailRegular />}
        />
        <div>
            <Text weight="semibold">Email</Text>
            <br />
            <Text>{mail}</Text>
        </div>
    </div>
);

const PhoneListItem = ({phone}) => (
    <div style={ListItemStyle}>
        <Avatar
            color="colorful"
            icon={<CallRegular />}
        />
        <div>
            <Text weight="semibold">Phone</Text>
            <br />
            <Text>{phone}</Text>
        </div>
    </div>
);

const LocationListItem = ({location}) => (
    <div style={ListItemStyle}>
        <Avatar
            color="colorful"
            icon={<LocationRegular />}
        />
        <div>
            <Text weight="semibold">Location</Text>
            <br />
            <Text>{location}</Text>
        </div>
    </div>
);
