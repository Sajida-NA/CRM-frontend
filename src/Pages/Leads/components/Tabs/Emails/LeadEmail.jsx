import React from "react";
import LeadsLeftPanel from "../../LeadsLeftPanel";
import EmailDetails from "./EmailDetails";
import { leadTabs } from "../LeadTabs";

export default function LeadEmail() {
  return (
    <>
      <LeadsLeftPanel />
      <EmailDetails tabs={leadTabs}/>
    </>
  );
}