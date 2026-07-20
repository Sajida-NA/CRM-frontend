import React from 'react'
import TicketLeftPanel from '../../TicketLeftPanel'
import TaskDetails from '../../../../Leads/components/Tabs/Task/TaskDetails'

export default function TicketTask() {
  return (
    <div>
      <TicketLeftPanel>   <TaskDetails/></TicketLeftPanel>
    </div>
  )
}
