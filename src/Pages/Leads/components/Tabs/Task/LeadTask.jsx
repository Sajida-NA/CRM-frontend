import React from 'react'
import TaskDetails from './TaskDetails'
import LeadsLeftPanel from '../../LeadsLeftPanel'
import { leadTabs } from '../LeadTabs'

export default function LeadTask() {
  return (
    <div>
        <LeadsLeftPanel />
      <TaskDetails tabs={leadTabs}/>
    </div>
  )
}
