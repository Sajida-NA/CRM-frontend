import React from "react";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { companyTabs } from "../CompanyTabs";

export default function CompanyNote() {
  return (
    <div>
      <CompanyLeftPanel>
        <NoteDetails  tabs={companyTabs}/>
        </CompanyLeftPanel>
    </div>
  );
}
