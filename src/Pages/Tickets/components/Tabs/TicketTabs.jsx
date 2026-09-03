export const getTicketTabs = (ticketId) => [
  {
    label: "Activity",
    path: `/tickets/${ticketId}/activities`,
  },
  {
    label: "Notes",
    path: `/tickets/${ticketId}/note`,
  },
  {
    label: "Emails",
    path: `/tickets/${ticketId}/email`,
  },
  {
    label: "Calls",
    path: `/tickets/${ticketId}/calls`,
  },
  {
    label: "Tasks",
    path: `/tickets/${ticketId}/task`,
  },
  {
    label: "Meetings",
    path: `/tickets/${ticketId}/meeting`,
  },
];

// Temporary compatibility export for existing Ticket components.
export const ticketTabs = [];