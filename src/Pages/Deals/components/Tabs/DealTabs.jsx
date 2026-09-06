
export const getDealTabs = (dealId) => [
  {
    label: "Activity",
    path: `/deals/${dealId}/activities`,
  },
  {
    label: "Notes",
    path: `/deals/${dealId}/note`,
  },
  {
    label: "Emails",
    path: `/deals/${dealId}/email`,
  },
  {
    label: "Calls",
    path: `/deals/${dealId}/calls`,
  },
  {
    label: "Tasks",
    path: `/deals/${dealId}/task`,
  },
  {
    label: "Meetings",
    path: `/deals/${dealId}/meeting`,
  },
];