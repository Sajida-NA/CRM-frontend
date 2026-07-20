import React from 'react'
import TaskDetails from './TaskDetails'
import LeadsLeftPanel from '../../LeadsLeftPanel'

export default function LeadTask() {
  return (
    <div>
      <LeadsLeftPanel> <TaskDetails/></LeadsLeftPanel>
    </div>
  )
}
