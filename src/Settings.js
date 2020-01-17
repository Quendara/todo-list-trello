export const Settings = {
  storyAttributes: {
    // status: ["Open", "Progress", "Verification", "Done"],
    status: ["Open", "Planned",  "In Progress", "Corrected", "Closed", "Delegated", "Next Version" ], // jira
    epic: [], 
    prio: ["0", "2", "5", "10"],
    // start: [ "Jan", "Feb", "Mar", "April" ],    
    start: [],    
    team: ["BGL", "BCM", "URT" ],     
  }
};

export const SettingsSimulate = {
  storyAttributes: {
    status: ["Open", "In Progress", "Verification", "Corrected", "Closed"],
    epic: ["Roadmap", "UX", "Quality", "NSS", "STA", "Besson"],
    prio: ["0", "2", "5", "10"],
    effort: ["1", "2", "3", "5", "8", "13"],
    start: [ "Jan", "Feb", "Mar", "April" ]
  }
};