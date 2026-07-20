import React from "react";

import ProfileLayout from "../../../Components/Profile/ProfileLayout";
import ticketProfileData from "./ticketProfileData";
import { ticketTabs } from "../components/Tabs/TicketTabs";

export default function TicketProfile() {
  return (
    <ProfileLayout
      title="Tickets"
      entityType="ticket"
      profileData={ticketProfileData}
      tabs={ticketTabs}
    />
  );
}