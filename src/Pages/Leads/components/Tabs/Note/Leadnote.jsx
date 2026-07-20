import React from 'react'
import LeadsLeftPanel from '../../LeadsLeftPanel'
import NoteDetails from '../../../../Tickets/components/Tabs/Note/NoteDetails'
import { leadTabs } from '../LeadTabs'

export default function Leadnote() {
  return (
    <div>
      <LeadsLeftPanel/>
      <NoteDetails tabs={leadTabs}/>     
    </div>
  )
}
