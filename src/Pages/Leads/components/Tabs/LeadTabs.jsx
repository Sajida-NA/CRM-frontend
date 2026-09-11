
export const getLeadTabs = (leadId) => [ 
{ 
label: "Activity", 
path: `/leads/${leadId}/activity`, 
}, 
{ 
label: "Notes", 
path: `/leads/${leadId}/note`, 
}, 
{ 
label: "Emails", 
path: `/leads/${leadId}/email`, 
}, 
{ 
label: "Calls", 
path: `/leads/${leadId}/calls`, 
}, 
{ 
label: "Tasks", 
path: `/leads/${leadId}/task`, 
}, 
{ 
label: "Meetings", 
path: `/leads/${leadId}/meeting`, 
}, 
]; 