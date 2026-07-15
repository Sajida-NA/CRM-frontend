import React from 'react'
import CommonEntityHeader from '../../../Components/common/CommonEntityHeader'

export default function LeadsLeftPanel() {

    const leadDetails = [
    {
      label: "Email",
      value: "janecooper@gmail.com",
    },
    {
      label: "First Name",
      value: "Jane",
    },
    {
      label: "Last Name",
      value: "Cooper",
    },
    {
      label: "Phone Number",
      value: "078 5432 8505",
    },
    {
      label: "Lead Status",
      value: "New",
    },
    {
      label: "Job Title",
      value: "Salesperson",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
  ];

 const leftPanelData = {

    // actions,

    profile:{
      name:"Jane Cooper",
      subTitle:"Salesperson",
      email:"",
    },

    sectionTitle:"About this lead",

    leadDetails:leadDetails,

    summaryTitle:"AI Lead Summary",

    summaryText:
    
    'There are no activities associated with this lead and further details are needed to provide a comprehensive summary.',
  };


  return (
    <div>

         <CommonEntityHeader
                  title="Leads"
                  leftPanelData={leftPanelData}
                />   
      
    </div>
  )
}
