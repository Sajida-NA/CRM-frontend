import React from 'react'
import LeadsLeftPanel from '../../LeadsLeftPanel'
import MeetingDetails from '../../../../Tickets/components/Tabs/Meeting/MeetingDetails'
import { leadTabs } from '../LeadTabs'

export default function LeadMeeting() {
  return (
    <div>
      <LeadsLeftPanel/>
      <MeetingDetails tabs={leadTabs}/>    
    </div>
  )
}

