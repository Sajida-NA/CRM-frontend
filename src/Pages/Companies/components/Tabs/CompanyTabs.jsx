
// export const companyTabs = [
//   { label: "Activity" },
//   { label: "Notes" },
//   { label: "Emails" },
//   { label: "Calls" },
//   { label: "Tasks" },
//   { label: "Meetings" },
// ];

export const getCompanyTabs = (companyId) => [
  {
    label: "Activity",
    path: `/companies/${companyId}/activity`,
  },
  {
    label: "Notes",
    path: `/companies/${companyId}/activity/notes`,
  },
  {
    label: "Emails",
    path: `/companies/${companyId}/activity/emails`,
  },
  {
    label: "Calls",
    path: `/companies/${companyId}/activity/calls`,
  },
  {
    label: "Tasks",
    path: `/companies/${companyId}/activity/tasks`,
  },
  {
    label: "Meetings",
    path: `/companies/${companyId}/activity/meetings`,
  },
];
