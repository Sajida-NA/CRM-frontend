import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ProfileLayout from "../../components/profile/ProfileLayout";

import CreateNoteModal from "./components/CreateNoteModal";
import LogCallModal from "./components/LogCallModal";
import EmailComposerModal from "./components/EmailComposerModal";
import TaskModal from "./components/TaskModal";
import MeetingModal from "./components/MeetingModal";
import MainLayout from "../../layout/MainLayout";

const LeadProfile = () => {
  // MODAL STATES
  const [openNote, setOpenNote] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);

  // LEFT PANEL — Lead Details
  const details = {
    Email: "janecooper@gmail.com",
    "First Name": "Jane",
    "Last Name": "Cooper",
    "Phone Number": "078 542 8505",
    "Lead Status": "New Lead",
    "Job Title": "Salesperson",
    "Created Date": "04/08/2025 2:31 PM GMT+5:30",
  };

  // CENTER PANEL — Activity Tabs
  const activities = {
    Activity: [
      {
        title: "Task assigned to Maria Johnson · Overdue",
        time: "June 24, 2025 at 5:30 PM",
        description: "Prepare quote for Jane Cooper",
      },
      {
        title: "Task assigned to Maria Johnson · Overdue",
        time: "June 24, 2025 at 5:30 PM",
        description:
          "She's interested in our new product line and wants our very best price.",
      },
      {
        title: "Call from Maria Johnson",
        time: "June 24, 2025 at 5:30 PM",
        description:
          "Walked Jane through our latest product line. She’s interested and will get back to me.",
      },
      {
        title: "Meeting between Maria Johnson and Jane Cooper",
        time: "June 24, 2025 at 5:30 PM",
        description: "Discuss new product line.",
      },
      {
        title: "Email Tracking",
        time: "June 24, 2025 at 5:30 PM",
        description:
          "Thank you for showing interest in CRM! We noticed you filled out our demo request form...",
      },
      {
        title: "Note by Maria Johnson",
        time: "June 24, 2025 at 5:30 PM",
        description: "Sample Note",
      },
    ],

    Notes: [
      {
        title: "Note by Maria Johnson",
        time: "June 24, 2025 at 5:30 PM",
        description: "Sample Note",
      },
    ],

    Emails: [
      {
        title: "Hello There",
        time: "June 24, 2025 at 5:30 PM",
        description:
          "Thank you for showing interest in CRM! We noticed you filled out our demo request form...",
      },
    ],

    Calls: [
      {
        title: "Call from Maria Johnson",
        time: "June 24, 2025 at 5:30 PM",
        description:
          "Walked Jane through our latest product line. She’s interested and will get back to me.",
      },
    ],

    Tasks: [
      {
        title: "Prepare quote for Jane Cooper",
        time: "June 24, 2025 at 5:30 PM",
        description: "Overdue task assigned to Maria Johnson.",
      },
    ],

    Meetings: [
      {
        title: "Meeting with Jane Cooper",
        time: "June 24, 2025 at 5:30 PM",
        description: "Discuss new product line.",
      },
    ],
  };

  // RIGHT PANEL — AI Summary + Attachments
  const aiSummary =
    "There are no activities associated with this lead and further details are needed to provide a comprehensive summary.";

  const attachments = [
    { name: "image.png", date: "June 25, 2025 at 5:30 PM" },
    { name: "image.png", date: "June 25, 2025 at 5:30 PM" },
  ];

  return (
    <>
    <MainLayout>
      {/* PAGE HEADER */}
      <PageHeader
        title="Lead"
        actions={[
          { label: "Create Note", onClick: () => setOpenNote(true) },
          { label: "Log Call", onClick: () => setOpenCall(true) },
          { label: "Send Email", onClick: () => setOpenEmail(true) },
          { label: "Create Task", onClick: () => setOpenTask(true) },
          { label: "Schedule Meeting", onClick: () => setOpenMeeting(true) },
        ]}
      />

      {/* MAIN LAYOUT */}
      <ProfileLayout
        details={details}
        activities={activities}
        aiSummary={aiSummary}
        attachments={attachments}
      />

      {/* MODALS */}
      <CreateNoteModal open={openNote} onClose={() => setOpenNote(false)} />
      <LogCallModal open={openCall} onClose={() => setOpenCall(false)} />
      <EmailComposerModal open={openEmail} onClose={() => setOpenEmail(false)} />
      <TaskModal open={openTask} onClose={() => setOpenTask(false)} />
      <MeetingModal open={openMeeting} onClose={() => setOpenMeeting(false)} />
      </MainLayout>
    </>
  );
};

export default LeadProfile;


