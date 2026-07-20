import React from "react";

import ProfileLayout from "../../../Components/Profile/ProfileLayout";
import companyProfileData from "./companyProfileData";
import { Box } from "@mui/material";
import { companyTabs } from "../components/Tabs/CompanyTabs";

export default function CompanyProfile() {
  return (
    
    <ProfileLayout 
      title="Companies"
      entityType="company"
      profileData={companyProfileData}
       tabs={companyTabs}
      
    />
  );
}