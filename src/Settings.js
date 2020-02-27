export const Settings = {
  storyAttributes: {
    // status: ["Open", "Progress", "Verification", "Done"],
    // status: ["Open", "Planned",  "In Progress", "Corrected", "Closed", "Delegated", "Next Version" ], // jira
    status: ["Open", "Planned",  "In Progress", "Corrected", "Closed", "Next Version" ], // jira
    epic: ["PR-1", "PR-2", "PR-3" ], 
    prio: ["0", "2", "5", "10"],
    effort: ["1", "2", "3", "5", "8", "13"],

    start: [ "Sprint_01", "Sprint_02", "Sprint_03", "Sprint_04", "Sprint_05" ],    
    // start: [],    
    team: ["BGL", "BCM", "URT" ],     
  }
};

export const SettingsSimulate = {
  storyAttributes: {
    status: ["Open", "In Progress", "Verification", "Corrected", "Closed"],
    epic: ["PR-1", "PR-2", "PR-3" ],
    prio: ["0", "2", "5", "10"],
    effort: ["1", "2", "3", "5", "8", "13"],
    start: [ "Sprint_01", "Sprint_02", "Sprint_03", "Sprint_04", "Sprint_05" ],    
    // start: [ "Jan", "Feb", "Mar", "Apr" ]
  }
};