import React from "react";

import ProfileLayout from "../../../Components/Profile/ProfileLayout";
import ticketProfileData from "./ticketProfileData";

export default function TicketProfile() {
  return (
    <ProfileLayout
      title="Tickets"
      entityType="ticket"
      profileData={ticketProfileData}
    />
  );
}