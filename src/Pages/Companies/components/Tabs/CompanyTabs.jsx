
export const getCompanyTabs = (companyId) => [
{
label: "Activity",
path: `/company/${companyId}/activities`,
},
{
label: "Notes",
path: `/company/${companyId}/note`,
},
{
label: "Emails",
path: `/company/${companyId}/email`,
},
{
label: "Calls",
path: `/company/${companyId}/calls`,
},
{
label: "Tasks",
path: `/company/${companyId}/task`,
},
{
label: "Meetings",
path: `/company/${companyId}/meeting`,
},
];
