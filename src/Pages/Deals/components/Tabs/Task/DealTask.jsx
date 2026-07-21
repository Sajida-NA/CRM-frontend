import React from 'react'
import DealLeftPanel from '../../DealLeftPanel'
import TaskDetails from '../../../../Leads/components/Tabs/Task/TaskDetails'
import { dealTabs } from '../DealTabs'

export default function DealTask() {
  return (
    <div>
        <DealLeftPanel><TaskDetails tabs={dealTabs}/></DealLeftPanel>
    </div>
  )
}
