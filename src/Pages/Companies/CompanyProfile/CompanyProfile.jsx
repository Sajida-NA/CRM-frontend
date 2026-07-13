import React from "react";

import ProfileLayout from "../../../Components/Profile/ProfileLayout";
import companyProfileData from "./companyProfileData";

export default function CompanyProfile() {
  return (
    <ProfileLayout
      title="Companies"
      entityType="company"
      profileData={companyProfileData}
    />
  );
}