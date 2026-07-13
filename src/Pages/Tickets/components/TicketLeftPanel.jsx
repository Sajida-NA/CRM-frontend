import React, { useState } from 'react'
import CommonEntityHeader from '../../../Components/common/CommonEntityHeader'


export default function TicketLeftPanel() {

    
     const ticketDetails = [
    {
      label:"Ticket Description",
      value:"Description goes here",
    },
    {
      label:"Ticket Owner",
      value:"Jane Cooper",
    },
    {
      label:"Priority",
      value:"High",
    },
    {
      label:"Created Date",
      value:"04/08/2025 2:31 PM GMT+5:30",
    },
  ];


    const leftPanelData = {

    // actions,

    profile:{
      name:"Payment Failure Issue",
      subTitle:"Status : New",
      email:"",
    },

    sectionTitle:"About this Ticket",

    leadDetails:ticketDetails,

    summaryTitle:"AI Ticket Summary",

    summaryText:
    'The ticket titled "Payment Failure Issue" currently has no associated conversation, call, or note transcripts.',
  };

  return (
    <div>
    

        <CommonEntityHeader
          title="Tickets"
          leftPanelData={leftPanelData}
        />   
      
    </div>
  )
}
