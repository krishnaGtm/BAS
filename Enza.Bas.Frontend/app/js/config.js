var config = {
    // main data source for grid
    "url":                  services["Enza.Services.Gateway"] +  "api/observations",

    //url to fetch data associated with particular fieldset trial/properties
    fieldsetDataUrl:        services["Enza.Services.Gateway"] +  "api/observations",

    //url for scrolling navigation
    scrollingUrl:           services["Enza.Services.Gateway"] +  "api/observations",

    // search url
    "searchUrl":            services["Enza.Services.Gateway"] +  "api/getobservations",

    //url to fetch list of fieldset for both trial and properties  data
    fieldsetUrl:            services["Enza.Services.Masters"] +  "api/FieldSet?cc=TO",

    //url to fetch list of columns
    columnsUrl:             services["Enza.Services.Masters"] +  "api/Fieldset?cc=to&allcols=true",

    //url to get countries list
    countryListUrl:         services["Enza.Services.Masters"] + "api/countries",

    //url to fetch entity type code list from data base: currently it's hard coded to save time
    etcUrl:                 services["Enza.Services.Masters"] +  "api/EntityType?EntityTypeCode=",

    //list of tiral or corssing records added in action panel
    tempRecordListUrl:      services["Enza.Services.Generals"] +  "api/CreateTemp",

    //url to create crossing
    createCrossingUrl:      services["Enza.Services.Crossings"] +  "api/createcrossing",

    //url to fetch hierarchy data starting at particular node
    hierarchyDataUrl:       services["Enza.Services.Crossings"] +  "api/hierarchy",

    // url to fetch trial fieldset list in trial book create screen
    trialFieldsetListUrl:   services["Enza.Services.Trials"] +  "api/trials",

    // url to create trial
    createTrialUrl:         services["Enza.Services.Trials"] +  "api/createtrial",

    //url to create Trial entry
    createTrialEntryUrl:    services["Enza.Services.Trials"] +  "api/createtrialentry",

    //url to create batch
    createBatchUrl:         services["Enza.Services.Batches"] +  "api/createbatch",

    //url to create Group
    createGroupAndGroupLinesUrl:         services["Enza.Services.Groups"] + "api/creategroup",

    //url to creat group lines
    createGroupLinesUrl:    services["Enza.Services.Groups"] + "api/CreateGroupLines",

    //url to fetch group lines
    getGroupLinesUrl:       services["Enza.Services.Groups"] + "api/GroupLine",

    //url to get groups related to user .
    getGroupsUrl:           services["Enza.Services.Groups"] + "api/groups",

    //url to get toaken service of TO crop code, it will change in future to get token on the basis of user
    tokenServiceUrl:        services["Enza.TrialApp.UserService"] + "v1/users/to/token",

    //url to get trials
    trialPlanningUrl:       services["Enza.TrialApp.PlanningService"] + "v1/trials",

    //url to make trials ready for trial app to consume.
    trialReadyPlanningUrl:  services["Enza.TrialApp.PlanningService"] + "v1/trials/ready",

    //url to update naming of trial lines
    trialLineNamingPlanningUrl: services["Enza.TrialApp.PlanningService"] + "v1/trials/trialentries/naming",


    //url to update naming of trial lines
    trialLineNamingByTrialsPlanningUrl: services["Enza.TrialApp.PlanningService"] + "v1/trials/naming",

    //url to get new trial lines of specified trialID. The trialID string will be replaced dynamically in the program later
    getTrialLinesPlanningUrl: services["Enza.TrialApp.PlanningService"] + "v1/trials/trialID/triallines",

    //url to new tiral
    createTrialLinesPlanningUrl: services["Enza.TrialApp.PlanningService"] + "v1/trials/trialentries",

    //url to new tiral
    getTrialPropertiesPlanningUrl: services["Enza.TrialApp.PlanningService"] + "v1/trial/properties",

}

export default config

