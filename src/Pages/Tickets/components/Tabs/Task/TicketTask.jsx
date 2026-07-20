import React from 'react'
import TicketLeftPanel from '../../TicketLeftPanel'
import TaskDetails from '../../../../Leads/components/Tabs/Task/TaskDetails'
import { ticketTabs } from '../TicketTabs'

export default function TicketTask() {
  return (
    <div>
      <TicketLeftPanel/>
      <TaskDetails tabs={ticketTabs}/>
    </div>
  )
}
