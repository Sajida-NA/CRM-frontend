const leadProfileData = {
  profile: {
    name: "Jane Cooper",
    subtitle: "Salesperson",
    email: "janecooper@gmail.com",
      avatar: " ",
  },

  quickActions: [
    "Note",
    "Email",
    "Call",
    "Task",
    "Meeting",
  ],

  about: {
    title: "About this Lead",
    details: [
      {
        label: "Email",
        value: "janecooper@gmail.com",
      },
      {
        label: "First Name",
        value: "Jane",
      },
      {
        label: "Last Name",
        value: "Cooper",
      },
      {
        label: "Phone Number",
        value: "078 5432 8505",
      },
      {
        label: "Lead Status",
        value: "New",
      },
      {
        label: "Job Title",
        value: "Salesperson",
      },
      {
        label: "Created Date",
        value: "04/08/2025 2:31 PM GMT+5:30",
      },
    ],
  },

  // Upcoming Tasks
  upcoming: [
    {
      id: 1,
      type: "Task",
      title: "Task assigned to Maria Johnson",
      description: "Prepare quote for Jane Cooper",
      status: "Overdue",
      date: "June 24, 2025 at 5:30 PM",
    },
    {
      id: 2,
      type: "Task",
      title: "Task assigned to Maria Johnson",
      description: "Prepare quote for Jane Cooper",
      status: "Overdue",
      date: "June 24, 2025 at 5:30 PM",
    },
  ],

  // June 2025 Activities
  activities: [
    {
      id: 1,
      type: "Call",
      title: "Call from Maria Johnson",
      date: "June 24, 2025 at 5:30 PM",
      description:
        "Brought Maria through our latest product line. She’s interested and is going to get back to me.",
    },
    {
      id: 2,
      type: "Meeting",
      title: "Meeting with Maria Johnson and Jane Cooper",
      date: "June 24, 2025 at 5:30 PM",
      description: "Let's discuss our new product line.",
    },
    {
      id: 3,
      type: "Email",
      title: "Email tracking",
      date: "June 24, 2025 at 5:30 PM",
      description: 'Jane Cooper opened "Hello There".',
    },
    {
      id: 4,
      type: "Note",
      title: "Note by Maria Johnson",
      date: "June 24, 2025 at 5:30 PM",
      description: "Sample Note",
    },
  ],

  aiSummary: {
    title: "AI Lead Summary",
    description:
      "There are no activities associated with this lead and further details are needed to provide a comprehensive summary.",
  },

  attachments: [],
};

export default leadProfileData;