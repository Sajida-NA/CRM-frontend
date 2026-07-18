const ticketProfileData = {
  profile: {
    name: "Payment Failure Issue",
    subtitle: "Status: New",
    email: "",
    avatar: false,
  },

  quickActions: ["Note", "Email", "Call", "Task", "Meeting"],

  about: {
    title: "About this Ticket",
    details: [
      {
        label: "Ticket Description",
        value: "Description goes here",
      },
      {
        label: "Ticket Owner",
        value: "Jane Cooper",
      },
      {
        label: "Priority",
        value: "High",
      },
      {
        label: "Created Date",
        value: "04/08/2025 2:31 PM GMT+5:30",
      },
    ],
  },

  activities: [
    {
      id: 1,
      type: "Ticket",
      title: "Ticket activity",
      date: "June 24, 2025 at 5:30 PM",
      description: "Maria Johnson moved ticket to new",
    },
    {
      id: 2,
      type: "Ticket",
      title: "",
      date: "June 24, 2025 at 5:30 PM",
      description: "This ticket was created by Maria Johnson",
    },
  ],

  aiSummary: {
    title: "AI Ticket Summary",
    description:
      "The ticket titled Payment Failure Issue currently has no associated conversation, call, or note transcripts. There are no additional details or properties available for this ticket at this time.",
  },

  attachments: [],
};

export default ticketProfileData;
