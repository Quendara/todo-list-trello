export const Settings = {
  storyAttributes: {
    // status: ["Open", "Progress", "Verification", "Done"],
    // status: ["Open", "Planned",  "In Progress", "Corrected", "Closed", "Delegated", "Next Version" ], // jira
    status: ["Open", "Planned",  "In Progress", "Corrected", "Closed", "Next Version" ], // jira
    epic: [], 
    prio: [ "1", "2", "3", "5", "10"],
    effort: ["1", "2", "3", "5", "8", "13"],

    start: [ "Sprint_01", "Sprint_02", "Sprint_03", "Sprint_04", "Sprint_05", "Sprint_06", "Sprint_07", "Sprint_08", "Sprint_09", "Sprint_10" ],    
    // start: [],    
    team: ["Kauf", "Standort", "Berater" ],     
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