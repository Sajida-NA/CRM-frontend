import React from "react";

import ProfileLayout from "../../../Components/Profile/ProfileLayout";
import leadProfileData from "./leadProfileData";

export default function LeadProfile() {
  return (
    <ProfileLayout
      title="Leads"
      profileData={leadProfileData}
      entityType="lead"
    />
  );
}