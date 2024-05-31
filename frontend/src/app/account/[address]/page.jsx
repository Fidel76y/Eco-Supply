import React from "react";
import ParticipantInfo from "./component/ParticipantInfo";

const AccountProfile = ({params}) => {
    const participantAddr = params.address;
	return (
	<ParticipantInfo participantAddr={participantAddr}/>
	);
};

export default AccountProfile;
