import React from "react";

import ProfileLayout from "../../../Components/Profile/ProfileLayout";
import leadProfileData from "./leadProfileData";
import { leadTabs } from "../components/Tabs/LeadTabs";

export default function LeadProfile() {
  return (
    <ProfileLayout
      title="Leads"
      profileData={leadProfileData}
      entityType="lead"
      tabs={leadTabs}
    />
  );
}