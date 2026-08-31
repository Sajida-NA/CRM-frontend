// export const dealTabs = [
//   { label: "Activity", path: "/dealactivities" },
//   { label: "Notes", path: "/dealnote" },
//   { label: "Emails", path: "/dealemail" },
//   { label: "Calls", path: "/dealcalls" },
//   { label: "Tasks", path: "/dealtask" },
//   { label: "Meetings", path: "/dealmeeting" },
// ];
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