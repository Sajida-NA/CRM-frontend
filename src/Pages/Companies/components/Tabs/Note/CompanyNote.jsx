import React from "react";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import NoteDetails from "../../../../Tickets/components/Tabs/Note/NoteDetails";
import { getCompanyTabs } from "../CompanyTabs";
import { useParams } from "react-router-dom";

export default function CompanyNote() {
  const { id } = useParams();
  return (
    <div>
      <CompanyLeftPanel>


        <NoteDetails tabs={getCompanyTabs(id)} 
         companyId={id}/>
      </CompanyLeftPanel>
    </div>
  );
}
