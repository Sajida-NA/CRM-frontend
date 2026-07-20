import React from 'react'
import DealLeftPanel from '../../DealLeftPanel'
import NoteDetails from '../../../../Tickets/components/Tabs/Note/NoteDetails'
import { dealTabs } from '../DealTabs'

export default function DealNote() {
  return (
    <div>
        <DealLeftPanel/>
        <NoteDetails tabs={dealTabs}/>
      
    </div>
  )
}
