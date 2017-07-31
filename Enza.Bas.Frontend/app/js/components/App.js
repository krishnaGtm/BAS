import config from '../config';
import React from 'react';
import 'babel-polyfill';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import ReactDOM from 'react-dom';
import Pageheader from './Pageheader';
import Sidebar from './Sidebar';
import axios from 'axios';
import {browserHistory} from 'react-router'
import NotFound from './NotFound'
import '../vendor/Animate';
import '../vendor/Scroller';

class App extends React.Component {

    constructor(props) {
        super(props);
        //TODO: Should avoid hard coded data , may be in future it will be dynamically loaded from backend
        let etcList =
            [
                {
                    "EntityTypeCode": "BAT",
                    "EntityTypeName": "Batch",
                    "TableName": "Batch"
                },
                {
                    "EntityTypeCode": "LOT",
                    "EntityTypeName": "Lot",
                    "TableName": "Lot"
                },
                {
                    "EntityTypeCode": "PLA",
                    "EntityTypeName": "PlantOrPart",
                    "TableName": "PlantOrPart"
                },
                {
                    "EntityTypeCode": "TRI",
                    "EntityTypeName": "Trial",
                    "TableName": "Trail"
                },
                {
                    "EntityTypeCode": "CRO",
                    "EntityTypeName": "Crossing",
                    "TableName": "Crossing"
                }
            ]
        this.state = {
            noFSTableData: [],
            mainTableData: [],
            etcList: etcList,
            noFSfields: [],
            fieldsInfo: [],
            noFSFieldsInfo: [],
            fields: [],
            noFSFieldLabels: {"EZID": "EZID", "EntityTypeCode": "EntityTypeCode", "Name": "Name"},
            fieldLabels: {"EZID": "EZID", "EntityTypeCode": "EntityTypeCode", "Name": "Name"},
            traitFieldsetLabels: {},
            propertyFieldsetLabels: {},
            columnsList: [],
            modal: false,
            modalData: {
                title: '',
                body: '',
                callback: null,
                cancel: null,
                error: false
            },

            propertyFieldsetSelected: null,
            traitFieldsetSelected: null,


            tableWidth: 500,
            tableHeight: 500,
            tableWidthFull: 500,

            fieldsets: [],

            dataHistory: [],

            currentPage: 1,
            totalRecords: null,
            pageSize: 100,

            pathName: '',
            searchQuery: {},
            selectedRow: [],
            selection: [],
            mySelection: JSON.parse(localStorage.getItem("mySelection")) || [],
            selectionCount: 0,
            previousHotKey: null,
            highLightedCol: null,

            fullscreenMode: false,

            traitColSelected: [],                          // selected columns either individual or from fieldsets
            propertyColSelected: [],

            previousTraitColSelected: [],
            previousPropertyColSelected: [],

            traitfieldColsRemoved: [],
            otherTraitCols: [],
            propertyfieldColsRemoved: [],
            otherPropertyCols: [],

            navData: {
                cc: "TO",
                sc: "ezid",
                so: "ASC",
                ps: 100,
                pn: 1,
                etc: "BAT",
                level: -1,
                year: ''
            },
            filterApplied: {},
            filterQuery: {},
            columnSortData: {},

            trialbookRecords: [],
            trialbookRecordsCount: null,
            tbTableWidth: 300,
            tbTableHeight: 300,

            crossingRecords: [],
            crossingFields: ["EZID", "EntityTypeCode", "Name"],
            crossingRecordsCount: null,

            trialbook: false,
            trialbookFSData: [],
            trialbookFields: [],
            isHydratingData: false,

            colSortDirs: [],

            sortColumnList: {},

            firstColSortList: [],
            firstSortColumn: '',
            firstColSortOrder: "asc",

            secondColSortList: [],
            secondColSortOrder: "asc",
            secondSortColumn: '',

            thirdColSortList: [],
            thirdColSortOrder: "asc",
            thirdSortColumn: '',

            trialbookSelectedIndex: 0,

            newTrialData: [],
            newTrialFields: [],
            newTrialEntryDetail: {},

            crossingMale: {},
            crossingFemale: {},
            crossingSuccess: false,
            selectedCrossingList: [],

            disabledSidebar: false,

            treeRootId: null,
            treeHierarchyData: [{}],

            searchVisibility: false,
            lastSearchedIndex: -1,
            searchedText: '',

            yearList: [],

            createGroupModal: false,
            createTrialModal: false,
            newGroups: [],
            newTrials: [],

            groups: [],
            countries: [],

            token: localStorage.token ? localStorage.token : '',
            issuedOn: localStorage.issuedOn ? localStorage.issuedOn : '',
            expiresIn: localStorage.expiresIn ? localStorage.expiresIn : '',

            trials: [],
            selectedTrialIndex: -1, // for ready process in trial list page.
            trialLines: [],
            selectedTrialLineIndexes: [],
            trailLineNamingModal: false,
            trialProperties: [], // Trial properties Array

            trialPropertyCreationModal: false
        };

        /*explicitly binding this to the methods */
        this.initialFetch = this.initialFetch.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.disableSidebar = this.disableSidebar.bind(this);
        this.enableSidebar = this.enableSidebar.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.toggleYear = this.toggleYear.bind(this);
        this.applyYearFilter = this.applyYearFilter.bind(this);

        this.toggleSelectedYear = this.toggleSelectedYear.bind(this);
        this.toggleColSort = this.toggleColSort.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.toggleColumn = this.toggleColumn.bind(this);
        this.toggleTrait = this.toggleTrait.bind(this);
        this.onResize = this.onResize.bind(this);
        this.resizeTable = this.resizeTable.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.collapseRow = this.collapseRow.bind(this);
        this.getData = this.getData.bind(this);
        this.getAdminData = this.getAdminData.bind(this);
        this.getJSONData = this.getJSONData.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.onExpandRow = this.onExpandRow.bind(this);
        this.onFieldsetSelection = this.onFieldsetSelection.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.onPropertyColToggle = this.onPropertyColToggle.bind(this);
        this.onTraitColToggle = this.onTraitColToggle.bind(this);
        this.applyColSelection = this.applyColSelection.bind(this);
        this.cancelChooseColumn = this.cancelChooseColumn.bind(this);

        this.addToTrialbook = this.addToTrialbook.bind(this);
        this.addToCrossing = this.addToCrossing.bind(this);
        this.addToMySelection = this.addToMySelection.bind(this);
        this.fetchTrialbookFS = this.fetchTrialbookFS.bind(this);

        this.applySort = this.applySort.bind(this);
        this.clearSort = this.clearSort.bind(this);

        this.sortColumnSelection = this.sortColumnSelection.bind(this);
        this.singleSortColumnSelection = this.singleSortColumnSelection.bind(this);
        this.sortOrderChange = this.sortOrderChange.bind(this);

        this.submitFilter = this.submitFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);

        this.selectTrialbook = this.selectTrialbook.bind(this);
        this.addNewTrialbook = this.addNewTrialbook.bind(this);
        this.createNewTrialEntry = this.createNewTrialEntry.bind(this);


        this.errorHandler = this.errorHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);

        this.hideModal = this.hideModal.bind(this);
        this.selectFemale = this.selectFemale.bind(this);
        this.selectMale = this.selectMale.bind(this);
        this.createCrossing = this.createCrossing.bind(this);
        this.selectCrossingList = this.selectCrossingList.bind(this);
        this.removeCrossingList = this.removeCrossingList.bind(this);

        this.createBatch = this.createBatch.bind(this);
        this.promptNoRecords = this.promptNoRecords.bind(this);
        this.goToTrialBook = this.goToTrialBook.bind(this);
        this.goToCrossing = this.goToCrossing.bind(this);
        this.fetchActionRecorddList = this.fetchActionRecorddList.bind(this);

        this.updateSortColumns = this.updateSortColumns.bind(this);
        this.updateFilterColumns = this.updateFilterColumns.bind(this);
        this.gotoHierarchyData = this.gotoHierarchyData.bind(this);
        this.fetchHierarchy = this.fetchHierarchy.bind(this);

        this.toggleSearchBox = this.toggleSearchBox.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
        this.search = this.search.bind(this);
        // this.clearSearch = this.clearSearch.bind(this);


        this.addGroup = this.addGroup.bind(this);
        this.cancelGroupCreation = this.cancelGroupCreation.bind(this);
        this.showGroupCreation = this.showGroupCreation.bind(this);
        this.toggleSelectionGroupLine = this.toggleSelectionGroupLine.bind(this);
        this.createGroupAndGroupLines = this.createGroupAndGroupLines.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);

        this.toggleGroupLines = this.toggleGroupLines.bind(this);

        this.cancelTrialCreation = this.cancelTrialCreation.bind(this);
        this.showTrialCreation = this.showTrialCreation.bind(this);
        this.creatTrial = this.creatTrial.bind(this);
        this.fetchTrials = this.fetchTrials.bind(this);
        this.fetchTrialLines = this.fetchTrialLines.bind(this);
        this.makeTrialsReady = this.makeTrialsReady.bind(this);
        this.toogleTrialReady = this.toogleTrialReady.bind(this);
        this.cancelTrialLineNaming = this.cancelTrialLineNaming.bind(this);
        this.showTrialNamingModal = this.showTrialNamingModal.bind(this);
        this.toggleTrialLinesCheck = this.toggleTrialLinesCheck.bind(this);
        this.createTrialLineNaming = this.createTrialLineNaming.bind(this);

        this.fetchTrialProperties = this.fetchTrialProperties.bind(this);

        this.fetchToken = this.fetchToken.bind(this);
        this.fetchCountries = this.fetchCountries.bind(this);

        this.isTokenValid = this.isTokenValid.bind(this);
        this.handleAction = this.handleAction.bind(this);

        this.showTrialPropertyCreationModal = this.showTrialPropertyCreationModal.bind(this)
        this.cancelTrialPropertyCreation = this.cancelTrialPropertyCreation.bind(this)
        this.createTrialProperty = this.createTrialProperty.bind(this)

        /*Flags for show hide of presentational elements like sidebar, yearlist, fieldsets etc.*/
        this.traitFieldset = false;
        this.sidebar = true;
        this.yearList = false;
        this.fieldsets = [];
        this.propertyFieldset = false;
        this.traitFieldset = false;
        this.columnList = false;

        this.searching = false;

        this.entityTypeCode = "BAT";

        this.modal = false;
    }

    hideModal() {
        this.setState({modal: false, modalTitle: '', modalBody: '', modalMessage: false})
    }

    getJSONData(args) {
        //fetch query parameters
        let qry = {},
            newNavData = Object.assign({}, this.state.navData, args.nav);

        this.setState({navData: newNavData});

        //fetch filter parameters
        if (args.filter) {
            if (args.filterData) {
                qry.push(args.filterData.join("&"));
                //incase of filter at least one sort order for a field is required
                //so in absence of sort order by user sending a ascending sort request of EZID along with any filter
                if (!args.sortData && Object.keys(this.state.columnSortData).length == 0) {
                    qry.push("s[0].sc=EZID&s[0].so=asc");
                }

            }
            else if (this.state.filterQuery.length) {
                qry.push(this.state.filterQuery.join("&"));
                //incase of filter at least one sort order for a field is required
                //so in absence of sort order by user sending a ascending sort request of EZID along with any filter
                if (!args.sortData && Object.keys(this.state.columnSortData).length == 0) {
                    qry.push("s[0].sc=EZID&s[0].so=asc");
                }
            }
        }

        //fetch sort parameters
        let newSortData;
        if (args.sort) {
            newSortData = Object.assign({}, (args.sortData) ? args.sortData : this.state.columnSortData);

            for (let key in newSortData) {
                qry.push(key + "=" + newSortData[key]);
            }
        }
        //return url format data
        return qry.join("&");
    }


    /*
     Gets data in key=value format for post request, all data will be passed via this method onwards:

     @param {Object} args contains properties and values as key value pair parameters.
     @retus {String} String in url key-value format for ajax request payload
     */
    getData(args) {

        //fetch query parameters
        let qry = [],
            newNavData = Object.assign({}, this.state.navData, args.nav);

        this.setState({navData: newNavData});
        for (let key in newNavData) {
            qry.push(key + "=" + newNavData[key]);
        }

        //fetch filter parameters
        if (args.filter) {
            if (args.filterData) {
                qry.push(args.filterData.join("&"));
                //incase of filter at least one sort order for a field is required
                //so in absence of sort order by user sending a ascending sort request of EZID along with any filter
                if (!args.sortData && Object.keys(this.state.columnSortData).length == 0) {
                    qry.push("s[0].sc=EZID&s[0].so=asc");
                }

            }
            else if (this.state.filterQuery.length) {
                qry.push(this.state.filterQuery.join("&"));
                //incase of filter at least one sort order for a field is required
                //so in absence of sort order by user sending a ascending sort request of EZID along with any filter
                if (!args.sortData && Object.keys(this.state.columnSortData).length == 0) {
                    qry.push("s[0].sc=EZID&s[0].so=asc");
                }
            }
        }

        //fetch sort parameters
        let newSortData;
        if (args.sort) {
            newSortData = Object.assign({}, (args.sortData) ? args.sortData : this.state.columnSortData);

            for (let key in newSortData) {
                qry.push(key + "=" + newSortData[key]);
            }
        }
        //return url format data
        return qry.join("&");
    }

    getAdminData(args) {
        let qry = [];

        for (let key in args) {
            qry.push(key + "=" + args[key])
        }
        return qry.join("&")

    }

    /*
     * Make Initial ajax request for landing page.
     */
    initialFetch() {
        this.fetchData({type: "INITIAL_TABLE_DATA_FETCH"})
    }

    /*
     * Toggles Sidebar and child interfaces like Year list or Property list etc.. if visible
     *
     * @param {Object} Optional Event object
     * */
    toggleSidebar(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.yearList)
            this.toggleYear();
        if (this.propertyFieldset)
            this.toggleProperty();
        if (this.traitFieldset)
            this.toggleTrait();
        if (this.columnList)
            this.toggleColumn();
        if (this.columnSort)
            this.toggleColSort();


        if (this.state.disabledSidebar) {
            return;
        }
        this.sidebar = !this.sidebar;
        this.refs.dataContainer.setAttribute("data-sidebar", (this.sidebar) ? "shown" : "hidden");
        this.resizeWindow();

    }

    /* Function to hide / disable sidebar in which screen it's not relevent like in crossing or trial entry.
     It will preserve the state if sidebar before the user interaction navigate to screen where it's not relevent
     and once user is back to the screen or place where it's relevent, the earlier state will be restored, ie if user has it shown, it will be sown and vice-versa.
     */
    disableSidebar() {

        if (this.yearList)
            this.toggleYear();
        if (this.propertyFieldset)
            this.toggleProperty();
        if (this.traitFieldset)
            this.toggleTrait();
        if (this.columnList)
            this.toggleColumn();
        if (this.columnSort)
            this.toggleColSort();

        if (!localStorage.sidebarState) {
            localStorage.sidebarState = this.sidebar;
        }
        this.sidebar = false;
        this.resizeWindow();

        this.setState({
            disabledSidebar: true,
            searchVisibility: false
        })
    }

    /*
     Function to show / enable sidebar in which screen it's relevent like in main screen.
     */
    enableSidebar() {
        this.resizeWindow()
        if (localStorage.sidebarState) {
            this.sidebar = JSON.parse(localStorage.sidebarState)
            localStorage.removeItem("sidebarState");
        }
        this.setState({disabledSidebar: false})
    }

    /*
     Function to call resize event on window resize
     */
    resizeWindow() {

        let evt;
        /* if (Event.prototype.initUIEvent) {
         evt = window.document.createEvent('UIEvents');
         evt.initUIEvent('resize', true, false, window, 0);
         }
         else {
         evt = new UIEvent('resize');
         }*/
        evt = document.createEvent("Event");
        evt.initEvent("resize", true, false);
        window.dispatchEvent(evt);
    }

    toggleYear(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.propertyFieldset)
            this.toggleProperty();
        if (this.traitFieldset)
            this.toggleTrait();
        if (this.columnList)
            this.toggleColumn();
        if (this.columnSort)
            this.toggleColSort();

        this.yearList = !this.yearList;
        this.refs.dataContainer.setAttribute("data-yearlist", (this.yearList) ? "shown" : "hidden");
    }

    toggleSelectedYear(year) {

        let yearList = this.state.yearList;

        if (yearList.indexOf(year) < 0) {
            yearList = yearList.concat(year);
        }
        else {
            yearList = yearList.filter((f) => f !== year)
        }

        //update list of year for filter;
        this.setState({yearList: yearList});

    }

    applyYearFilter() {

        let tCols = this.state.traitColSelected.concat(this.state.otherTraitCols),
            pCols = this.state.propertyColSelected.concat(this.state.otherPropertyCols);

        let args = {
            year: this.state.yearList.join(","),
            ezids: '',
            etcs: '',
            tfsid: '',
            pfsid: '',
            tcols: tCols.join(","),
            pcols: pCols.join(","),
            ezid: '',
            level: -1,
            pn: this.entityTypeCode == "TRI" ? 1 : this.state.currentPage,

        }

        this.fetchData({type: "FETCH_FILTERED_BY_YEAR", data: args})
    }

    toggleColSort(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.yearList)
            this.toggleYear();
        if (this.propertyFieldset)
            this.toggleProperty();
        if (this.traitFieldset)
            this.toggleTrait();
        if (this.columnList)
            this.toggleColumn();

        this.columnSort = !this.columnSort;
        this.refs.dataContainer.setAttribute("data-colsort", (this.columnSort) ? "shown" : "hidden");
    }

    toggleProperty(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.yearList)
            this.toggleYear();
        if (this.traitFieldset)
            this.toggleTrait();
        if (this.columnList)
            this.toggleColumn();
        if (this.columnSort)
            this.toggleColSort();

        this.propertyFieldset = !this.propertyFieldset;

        this.refs.dataContainer.setAttribute("data-propertyfieldset", (this.propertyFieldset) ? "shown" : "hidden");


        if (this.propertyFieldset) {
            //make ajax request to server for the list
            this.fetchData({type: "FIELDSET_LIST_FETCH"})
        }
    }

    toggleTrait(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.yearList)
            this.toggleYear();
        if (this.propertyFieldset)
            this.toggleProperty();
        if (this.columnList)
            this.toggleColumn();
        if (this.columnSort)
            this.toggleColSort();

        this.traitFieldset = !this.traitFieldset;
        this.refs.dataContainer.setAttribute("data-traitfieldset", (this.traitFieldset) ? "shown" : "hidden");

        if (this.traitFieldset) {

            //make ajax request to server for the list
            this.fetchData({type: "FIELDSET_LIST_FETCH"})

            let selectedRow = ReactDOM.findDOMNode(this).querySelector(".traitFieldset .selected")
            if (selectedRow !== null) {
                scrollIntoViewIfNeeded(selectedRow, false, {duration: 500, easing: "easeIn"})
            }
        }

    }

    toggleColumn(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.yearList)
            this.toggleYear();
        if (this.propertyFieldset)
            this.toggleProperty();
        if (this.traitFieldset)
            this.toggleTrait();
        if (this.columnSort)
            this.toggleColSort();

        this.columnList = !this.columnList;
        this.refs.dataContainer.setAttribute("data-columnlist", (this.columnList) ? "shown" : "hidden");
        //this.setState({columnList: !this.state.columnList})


        if (this.columnList) {
            //make ajax request to server for the list
            this.fetchData({type: "COLUMNS_LIST_FETCH"})
        }
    }

    onPagination(pageNo) {
        console.time("pagenation");
        this.fetchData({type: "PAGINATION_FETCH", args: {pn: pageNo}})

    }

    onPageSizeChange(newPageSize) {
        //resetting page no to 1 after new page size
        this.setState({pageSize: newPageSize}, function () {
            this.fetchData({type: "PAGINATION_FETCH", args: {ps: newPageSize, pn: 1}});
        });
    }

    onExpandRow(index) {
        let expandedRecord = this.state.mainTableData[index],
            args = {
                "ezid": expandedRecord.EZID,
                "etc": expandedRecord.EntityTypeCode,
                "level": expandedRecord.Level,
                "ps": this.state.pageSize,
                "tcols": this.state.traitColSelected.concat(this.state.otherTraitCols),
                "pcols": this.state.propertyColSelected.concat(this.state.otherPropertyCols),
                "etcs": "",
                "ezids": "",
                "pfsid": '',
                "tfsid": '',
            };

        if (Object.keys(this.state.columnSortData).length > 0) {
            args.pn = 1;
        }

        this.fetchData({type: "HIERARCHY_FETCH", args: args, data: {rowIndex: index}})
    }

    //function to make selection of records for different actions
    // allows Control (ctrl) and Shift(Shift) key combo selection for better user experience.
    onCellClick(args) {

        let ezid = this.state.mainTableData[args.index].EZID,
            selectedRow = this.state.selectedRow.concat([]),
            selection = this.state.selection.concat([]);

        let newSelection = {
            "EZID": this.state.mainTableData[args.index].EZID,
            "Name": this.state.mainTableData[args.index].Name,
            "EntityTypeCode": this.state.mainTableData[args.index].EntityTypeCode
        };

        //selection with control key combo, can select multiple records as user click on them
        if (args.ctrlKey) {

            if (selectedRow.indexOf(ezid) == -1) {
                this.setState({
                    selectedRow: selectedRow.concat(ezid),
                    selection: selection.concat(newSelection)
                })
            }
            else {
                this.setState({
                    selectedRow: selectedRow.filter((r) => {
                        return r != ezid
                    }),
                    highLightedCol: null,
                    selection: selection.filter(s => s.EZID !== ezid)
                });
            }
            this.setState({hotKeyShift: null})

        }
        //selection with shift key combo, can select multiple records
        else if (args.shiftKey) {

            let lastEzid = (this.state.hotKeyShift != null ) ? this.state.hotKeyShift : selectedRow.pop(),
                indexTo = args.index,
                selectedEzid = [],
                mySelection = [],
                indexFrom = this.state.mainTableData.findIndex((d) => {
                    return d.EZID == lastEzid
                });

            if (indexTo > indexFrom) {
                selectedEzid = this.state.mainTableData.slice(indexFrom, indexTo + 1).map((d) => {
                    return d.EZID
                });
                mySelection = this.state.mainTableData.slice(indexFrom, indexTo + 1).map((d) => {
                    return {"EZID": d.EZID, "Name": d.Name, "EntityTypeCode": d.EntityTypeCode}
                });

                this.setState({
                    selectedRow: this.state.selectedRow.concat(selectedEzid),
                    selection: mySelection
                })

            }
            else {
                selectedEzid = this.state.mainTableData.slice(indexTo, indexFrom + 1).map((d) => {
                    return d.EZID
                }).reverse();
                mySelection = this.state.mainTableData.slice(indexTo, indexFrom + 1).map((d) => {
                    return {"EZID": d.EZID, "Name": d.Name, "EntityTypeCode": d.EntityTypeCode}
                }).reverse();
                this.setState({
                    selectedRow: this.state.selectedRow.concat(selectedEzid),
                    selection: mySelection
                })
            }
            this.setState({selectedRow: selectedEzid});

            this.setState({hotKeyShift: lastEzid});

        }
        //normal single selections.
        else {
            let newSelection = {
                "EZID": this.state.mainTableData[args.index].EZID,
                "Name": this.state.mainTableData[args.index].Name,
                "EntityTypeCode": this.state.mainTableData[args.index].EntityTypeCode
            };
            if (selectedRow.indexOf(ezid) > -1) {
                if (selectedRow.length > 1) {
                    this.setState({
                        selectedRow: [].concat(ezid),
                        highLightedCol: args.col,
                        selection: [].concat(newSelection)
                    });
                }
                else
                    this.setState({
                        selectedRow: [],
                        highLightedCol: null,
                        selection: []
                    })
            }
            else {
                this.setState({
                    selectedRow: [].concat(ezid),
                    highLightedCol: args.col,
                    selection: [].concat(newSelection)
                });
            }
            this.setState({hotKeyShift: null})
        }
    }

    // Will find rowids of nested records of the current
    // record recursively and remove it from main data
    collapseRow(index) {
        let self = this,
            ezidToRemove = []

        //recursive function to find rowids associated with current row being collapsed.
        scanDataHistory(this.state.mainTableData[index]["EZID"]);

        let newTableData = this.state.mainTableData.filter((row) => {
            return ezidToRemove.indexOf(row.EZID) == -1
        });

        // change state to collapsed ie -
        newTableData[index].expanded = false;

        //updated expanded state to noFSTableData as well
        let noFSTableData = this.state.noFSTableData.filter((row) => {
            return ezidToRemove.indexOf(row.EZID) == -1
        });

        noFSTableData[index].expanded = false;

        // update main data
        this.setState({
            mainTableData: newTableData,
            noFSTableData: noFSTableData
        })

        //function to recursively find nested EZIDs associated with current rowid.
        function scanDataHistory(ezid) {
            let historyData = self.state.dataHistory.filter((data) => {
                return ezid == data.ezid
            });
            if (historyData.length) {
                let rowids = historyData[0].rowids;
                for (var i = 0; i < rowids.length; i++)
                    scanDataHistory(rowids[i]);
            }

            if (ezid != self.state.mainTableData[index]["EZID"])
                ezidToRemove.push(ezid);
        }
    }

    onFieldsetSelection(val, isProperty) {
        if (isProperty)
            this.setState({propertyFieldsetSelected: val})
        else
            this.setState({traitFieldsetSelected: val})

        this.fetchData({type: "FIELDSET_FETCH", args: {}, data: {value: val, isProperty: isProperty}})
    }

    onPropertyColToggle(colVal, checked) {

        let pCSelected = this.state.propertyColSelected;
        if (this.tempPropertyColSelected == undefined)
            this.tempPropertyColSelected = this.state.propertyColSelected;
        if (checked) {
            if (this.tempPropertyColSelected.indexOf(colVal) == -1) {
                this.tempPropertyColSelected = this.tempPropertyColSelected.concat(colVal);
            }
        }
        else {
            for (let i = 0; i < this.tempPropertyColSelected.length; i++) {
                if (this.tempPropertyColSelected[i] == colVal) {
                    this.tempPropertyColSelected.splice(i, 1);
                    break;
                }
            }
            this.setState({propertyColSelected: pCSelected})
        }
    }

    onTraitColToggle(colVal, checked) {
        if (this.tempTraitColSelected == undefined)
            this.tempTraitColSelected = this.state.traitColSelected;
        if (checked) {
            if (this.tempTraitColSelected.indexOf(colVal) == -1) {
                this.tempTraitColSelected = this.tempTraitColSelected.concat(colVal);
            }

        }
        else {

            for (let i = 0; i < this.tempTraitColSelected.length; i++) {
                if (this.tempTraitColSelected[i] == colVal) {
                    this.tempTraitColSelected.splice(i, 1);
                    break;
                }
            }
        }
    }

    /*
     * Makes ajax request to backend to show selected columns by user
     */
    applyColSelection(tfColsRemoved, otherTColsToAdd, pfColsRemoved, otherPcolsToAdd) {

        this.setState({
            otherTraitCols: otherTColsToAdd,
            traitfieldColsRemoved: tfColsRemoved,
            otherPropertyCols: otherPcolsToAdd,
            propertyfieldColsRemoved: pfColsRemoved
        });

        this.fetchData({
            type: "COLUMN_SELECTION",
            args: {
                otherTColsToAdd: otherTColsToAdd,
                traitfieldColsRemoved: tfColsRemoved,
                otherPColsToAdd: otherPcolsToAdd,
                propertyfieldColsRemoved: pfColsRemoved
            }
        });
    }

    cancelChooseColumn() {
        this.toggleColumn()
    }

    /*
     *
     * */
    fetchTrialbookFS() {
        if (!this.isHydratingData) {
            this.isHydratingData = true;
            this.fetchData({type: "FETCH_TRIALBOOK_FS", args: {}})
        }
    }

    //sorting setting set by filter "Column Sorting" options
    sortColumnSelection(name, val) {


        let colSortVal = val,
            sortColumnList = this.state.sortColumnList;
        switch (name) {
            case "column1": {

                if (colSortVal == "") {

                    let thirdColSortList = Object.assign({}, sortColumnList);
                    delete thirdColSortList[this.state.secondSortColumn];

                    this.setState({
                        firstSortColumn: '',
                        secondSortColumn: '',
                        thirdSortColumn: '',
                        secondColSortList: {},
                        thirdColSortList: {}
                    })
                }
                //if value selected is same as sencond sort column value, then reset second column value
                else if (colSortVal == this.state.secondSortColumn) {

                    let secondColSortList = Object.assign({}, sortColumnList);
                    delete secondColSortList[colSortVal];

                    this.setState({
                        firstSortColumn: colSortVal,
                        secondSortColumn: '',
                        thirdSortColumn: '',
                        secondColSortList: secondColSortList,
                        thirdColSortList: secondColSortList
                    })
                }
                //if value selected is same as third sort column value, then reset third column value
                else if (colSortVal == this.state.thirdSortColumn) {

                    let secondColSortList = Object.assign({}, sortColumnList);
                    delete secondColSortList[colSortVal];

                    let thirdColSortList = Object.assign({}, secondColSortList);
                    delete thirdColSortList[this.state.secondSortColumn];

                    this.setState({
                        firstSortColumn: colSortVal,
                        thirdSortColumn: '',
                        secondColSortList: secondColSortList,
                        thirdColSortList: thirdColSortList
                    })

                }
                else {

                    let secondColSortList = Object.assign({}, sortColumnList);
                    //delete selected first column for second column list
                    delete secondColSortList[colSortVal];


                    let thirdColSortList = Object.assign({}, secondColSortList);
                    delete thirdColSortList[this.state.secondSortColumn];


                    this.setState({
                        firstSortColumn: colSortVal,
                        secondColSortList: secondColSortList,
                        thirdColSortList: thirdColSortList
                    });
                }


            }
                break;

            case "column2": {

                if (colSortVal == '') {
                    let thirdColSortList = Object.assign({}, sortColumnList);
                    //delete selected first column and second oclumn for third column list
                    delete thirdColSortList[this.state.firstSortColumn];
                    delete thirdColSortList[colSortVal];

                    this.setState({
                        secondSortColumn: colSortVal,
                        thirdColSortList: thirdColSortList,
                        thirdSortColumn: ''

                    });
                }
                //if value selected is same as third sort column value, then reset third column value
                else if (colSortVal == this.state.thirdSortColumn) {
                    let thirdColSortList = Object.assign({}, sortColumnList);
                    //delete selected first column and second oclumn for third column list
                    delete thirdColSortList[this.state.firstSortColumn];
                    delete thirdColSortList[colSortVal];
                    this.setState({
                        secondSortColumn: colSortVal,
                        thirdColSortList: thirdColSortList,
                        thirdSortColumn: ''
                    });
                }
                else {
                    let thirdColSortList = Object.assign({}, sortColumnList);
                    //delete selected first column and second oclumn for third column list
                    delete thirdColSortList[this.state.firstSortColumn];
                    delete thirdColSortList[colSortVal];

                    this.setState({
                        secondSortColumn: colSortVal,
                        thirdColSortList: thirdColSortList
                    });
                }
            }
                break;

            case "column3" : {
                this.setState({
                    thirdSortColumn: colSortVal
                });
            }
                break;

        }


    }

    //sort Order Change
    sortOrderChange(name, val) {

        switch (name) {
            case "column1-sOrder":
                this.setState({
                    firstColSortOrder: val
                });

                break;
            case "column2-sOrder":
                this.setState({
                    secondColSortOrder: val
                });
                break;
            case "column3-sOrder":
                this.setState({
                    thirdColSortOrder: val
                });
                break;

        }

    }

    //sorting applied by clicking on column header
    singleSortColumnSelection(sortcol, sortOrder) {

        let sortColumnList = this.state.sortColumnList,
            secondColSortList = Object.assign({}, sortColumnList);
        //delete selected first column for second column list
        delete secondColSortList[sortcol];


        let args = {};
        args['s[0].sc'] = sortcol;
        args['s[0].so'] = sortOrder;

        this.setState({
            colSortDirs: [{'col': sortcol, 'ord': sortOrder}],
            columnSortData: args,
            firstSortColumn: sortcol,
            firstColSortOrder: sortOrder,
            secondColSortList: secondColSortList,
            thirdColSortList: secondColSortList,
            secondSortColumn: '',
            thirdSortColumn: ''
        });


        this.fetchData({type: "SORT_DATA_FETCH", args: args})
    }

    //function to apply sort as selected by user either by "Column Sorting" option in sidebar filter or by clicking on header of table
    applySort() {
        let sortArgs = [],
            {firstSortColumn, firstColSortOrder, secondSortColumn, secondColSortOrder, thirdSortColumn, thirdColSortOrder} = this.state;

        if (firstSortColumn != "") {
            sortArgs.push({'ord': firstColSortOrder, 'col': firstSortColumn});
        }
        if (secondSortColumn != "") {
            sortArgs.push({'ord': secondColSortOrder, 'col': secondSortColumn});
        }
        if (thirdSortColumn != "") {
            sortArgs.push({'ord': thirdColSortOrder, 'col': thirdSortColumn});
        }


        //prep arguments for sending to server
        let args = {};
        sortArgs.map((t, i) => {
            args['s[' + i + '].sc'] = t.col;
            args['s[' + i + '].so'] = t.ord;
        });

        this.setState({
            colSortDirs: sortArgs,
            columnSortData: args
        })

        this.fetchData({type: "SORT_DATA_FETCH", args: args})
    }

    //reset sort parameter to intial state i.e., no sort applied.
    clearSort() {
        this.setState({
            colSortDirs: [],
            firstSortColumn: '',
            secondSortColumn: '',
            thirdSortColumn: '',

            columnSortData: {}
        })
    }

    //Chances are that while switching fieldset and removing columns from  "Select Column(s)", columns used in filtering could have been removed
    // thus needed to validate columns in filter after fieldset change or column removal, to update filtering column in front end.
    //currentFields is the resulting columns,
    updateFilterColumns(currentFields) {

        //converting all coulumns in array to string. ie  [2244,2245] > ["2244", "2245"]
        currentFields = currentFields.toString().split(",");

        let filterColumns = Object.keys(this.state.filterApplied),
            newFilterApplied = this.state.filterApplied;

        // if no filter was applied, return;
        if (filterColumns.length == 0)
            return;

        //remove filter object form filterApplied, for which the column no longer exists
        filterColumns.forEach((col) => {
            if (currentFields.indexOf(col) == -1)
                delete newFilterApplied[col];
        })

        //reconstruct filterQuery
        let filterQuery = this.getFilterQueries(newFilterApplied, currentFields);

        this.setState({
            filterQuery: filterQuery,
            filterApplied: newFilterApplied
        });
    }

    //Chances are that while switching fieldset and removing columns from  "Select Column(s)", columns used in sorting could have been removed
    // thus needed to validate columns in sort after fieldset change or column removal to update sorting column order in front end.
    //currentFields is the resulting columns,
    //sortColumnList is key value pair object for resulting columns and it's label
    updateSortColumns(currentFields, sortColumnList) {

        //converting all coulumns in array to string. ie  [2244,2245] > ["2244", "2245"]
        currentFields = currentFields.toString().split(",");

        let firstColPersist = currentFields.indexOf(this.state.firstSortColumn.toString()) > -1,       // flag for first sort column is present in result set
            secondColPersist = currentFields.indexOf(this.state.secondSortColumn.toString()) > -1,     // flag for second sort column is present in result set
            thirdColPersist = currentFields.indexOf(this.state.thirdSortColumn.toString()) > -1,       // flag for third sort column is present in result set
            validFirstColumn = this.state.firstSortColumn !== '',                           // flag for if first sort column is present if not return
            validSecondColumn = this.state.secondSortColumn !== '',                         // flag for if second sort column is present if not return
            validThirdColumn = this.state.thirdSortColumn !== '';                           // flag for if third sort column is present if not return

        let FirstSortColumn = this.state.firstSortColumn,
            FirstColSortOrder = this.state.firstColSortOrder,
            //FirstColSortList = this.state.firstColSortList,

            SecondSortColumn = this.state.secondSortColumn,
            SecondColSortOrder = this.state.secondColSortOrder,
            //SecondColSortList = this.state.secondColSortList,

            ThirdSortColumn = this.state.thirdSortColumn,
            ThirdColSortOrder = this.state.thirdColSortOrder;
        //ThirdColSortList = this.state.thirdColSortList;

        let columnSortPrepare = [];
        if (firstColPersist) {
            columnSortPrepare.push({'col': FirstSortColumn, 'ord': FirstColSortOrder});
        }
        if (secondColPersist) {
            columnSortPrepare.push({'col': SecondSortColumn, 'ord': SecondColSortOrder});
        }
        if (thirdColPersist) {
            columnSortPrepare.push({'col': ThirdSortColumn, 'ord': ThirdColSortOrder});
        }

        let newFirstSortColumn = '',
            newFirstColSortOrder = 'asc',
            newFirstColSortList = Object.assign({}, sortColumnList),
            newSecondSortColumn = '',
            newSecondColSortOrder = 'asc',
            newSecondColSortList = {},
            newThirdSortColumn = '',
            newThirdColSortOrder = 'asc',
            newThirdColSortList = {};

        columnSortPrepare.map((t, i) => {
            switch (i) {
                case 0:
                    newFirstSortColumn = t.col;
                    newFirstColSortOrder = t.ord;
                    newSecondColSortList = Object.assign({}, newFirstColSortList);
                    delete newSecondColSortList[newFirstSortColumn];
                    break;
                case 1:
                    newSecondSortColumn = t.col;
                    newSecondColSortOrder = t.ord;

                    newThirdColSortList = Object.assign({}, newSecondColSortList);
                    delete newThirdColSortList[newSecondSortColumn];
                    break;
                case 2:
                    newThirdSortColumn = t.col;
                    newThirdColSortOrder = t.ord;

                    break;
            }
        });

        let newColSortDir = [], newColumnSortData = {};
        if (newFirstSortColumn !== "") {
            newColSortDir.push({'ord': newFirstColSortOrder, 'col': newFirstSortColumn});

            newColumnSortData['s[0].sc'] = newFirstSortColumn;
            newColumnSortData['s[0].so'] = newFirstColSortOrder;

            if (newSecondSortColumn !== "") {
                newColSortDir.push({'ord': newSecondColSortOrder, 'col': newSecondSortColumn});

                newColumnSortData['s[1].sc'] = newSecondSortColumn;
                newColumnSortData['s[1].so'] = newSecondColSortOrder;

                if (newThirdSortColumn !== "") {
                    newColSortDir.push({'ord': newThirdColSortOrder, 'col': newThirdSortColumn});

                    newColumnSortData['s[2].sc'] = newThirdSortColumn;
                    newColumnSortData['s[2].so'] = newThirdColSortOrder;
                }
            }
        }

        this.setState({
            firstSortColumn: newFirstSortColumn,
            firstColSortOrder: newFirstColSortOrder,
            firstColSortList: newFirstColSortList,
            secondSortColumn: newSecondSortColumn,
            secondColSortOrder: newSecondColSortOrder,
            secondColSortList: newSecondColSortList,
            thirdSortColumn: newThirdSortColumn,
            thirdColSortOrder: newThirdColSortOrder,
            thirdColSortList: newThirdColSortList,
            colSortDirs: newColSortDir,
            columnSortData: newColumnSortData,
            sortColumnList: sortColumnList
        });

        return newColumnSortData

    }

    getFilterQueries(filterApplied) {
        let fQuery = [], counter = 0;

        //check for if filter is applied or not, if not return empty array
        if (Object.keys(filterApplied).length == 0)
            return [];

        for (let key in filterApplied) {
            if (filterApplied[key].filterValue2 != "") {

                fQuery.push('f[' + counter + '].fn=' + filterApplied[key].columnKey);
                fQuery.push('f[' + counter + '].ft=' + filterApplied[key].dataType);
                fQuery.push('f[' + counter + '].fv=' + filterApplied[key].filterValue1);
                fQuery.push('f[' + counter + '].ex=' + filterApplied[key].operator1);
                fQuery.push('f[' + counter + '].op=' + filterApplied[key].logicalOperator);

                counter++;
                fQuery.push('f[' + counter + '].fn=' + filterApplied[key].columnKey);
                fQuery.push('f[' + counter + '].ft=' + filterApplied[key].dataType);
                fQuery.push('f[' + counter + '].fv=' + filterApplied[key].filterValue2);
                fQuery.push('f[' + counter + '].ex=' + filterApplied[key].operator2);
                fQuery.push('f[' + counter + '].op=' + filterApplied[key].logicalOperator);
                counter++
            }
            else {
                fQuery.push('f[' + counter + '].fn=' + filterApplied[key].columnKey);
                fQuery.push('f[' + counter + '].ft=' + filterApplied[key].dataType);
                fQuery.push('f[' + counter + '].fv=' + filterApplied[key].filterValue1);
                fQuery.push('f[' + counter + '].ex=' + filterApplied[key].operator1);
                fQuery.push('f[' + counter + '].op=' + filterApplied[key].logicalOperator);
                counter++;
            }
        }

        return fQuery;
    }

    //apply filter in particular column or list of columns as selected earlier as well
    submitFilter(args) {

        let filterApplied = this.state.filterApplied;
        if (args.columnKey !== "EntityTypeCode")
            filterApplied[args.columnKey] = args;
        else {
            this.entityTypeCode = args.filterValue1;
        }

        /*  if (filterColumnList.indexOf(args.columnKey) == -1) {
         filterColumnList.push(args.columnKey);
         }*/
        let fQuery = this.getFilterQueries(filterApplied);

        this.setState({filterQuery: fQuery, filterApplied: filterApplied});

        this.fetchData({type: "FILTER_DATA_FETCH", filter: fQuery, data: filterApplied})
    }

    //clear filter of particular column
    clearFilter(col) {

        let newFilterData = this.state.filterApplied;

        if (newFilterData[col] == undefined && col !== "EntityTypeCode")
            return;
        else
            delete newFilterData[col];

        //let newFilterColumnList = this.state.filterColumnList.filter((f)=>f != col)

        if (col == "EntityTypeCode") {
            this.entityTypeCode = "BAT";
        }

        let fQuery = this.getFilterQueries(newFilterData);

        this.setState({filterApplied: newFilterData, filterQuery: fQuery});

        this.fetchData({type: "FILTER_DATA_FETCH", filter: fQuery, data: newFilterData})
    }

    //make selection of trialfieldbook in the list, currently only one is allowed
    selectTrialbook(rIndex) {
        this.setState({trialbookSelectedIndex: rIndex})
    }

    // create new trial fieldbook
    addNewTrialbook(name) {
        this.fetchData({type: "ADD_NEW_TRIALBOOK", data: {name: name}})
    }

    //function to add selected records to trialbook process.
    addToTrialbook() {

        let selectedRow = this.state.selectedRow;
        //prompt user if no records are selected yet.
        if (selectedRow.length == 0) {
            this.promptNoRecords();
            return;
        }

        //extract only new records from selected records so that
        // merge can be done with old Trialbook records if any
        let newRecords = [];
        if (this.state.trialbookRecords.length)
            newRecords = this.state.selectedRow.filter((r) => {
                return this.state.trialbookRecords.indexOf(r) == -1
            });
        else
            newRecords = this.state.selectedRow;

        //updating Trialbook records for submision to server
        //and reset selectedRow
        let trialbookRecords = this.state.trialbookRecords.concat(newRecords);

        if (trialbookRecords.length == 0) {
            return;
        }
        this.setState({
            trialbookRecords: trialbookRecords,
            selectedRow: []
        })

        //need to send data to server in tabular format to cutoff processing in server
        let trialQuery = [], counter = 0;
        this.state.mainTableData.map((f) => {
            if (trialbookRecords.indexOf(f.EZID) > -1) {
                trialQuery.push('TempData[' + counter + '].ezid=' + f.EZID);
                trialQuery.push('TempData[' + counter + '].etc=' + f.EntityTypeCode);
                trialQuery.push('TempData[' + counter + '].name=' + f.Name);
                trialQuery.push('TempData[' + counter + '].delete=false');
                counter++;
            }
        });
        trialQuery.push('module=TRL');
        trialQuery.push('CC=TO');
        trialQuery.push('getCount=true');


        this.fetchData({type: "SEND_RECORDS_TO_ACTION", data: trialQuery, module: "TRL"})
    }

    //create new trial book
    createNewTrialEntry(rArgs) {
        let args = {};
        if (rArgs.ezid != null)
            args = rArgs;
        else
            args = {ezid: this.state.trialbookFSData[this.state.trialbookSelectedIndex].EZID};
        this.fetchData({type: "CREATE_NEW_TRAILENTRY", data: args});
    }

    //function to add selected records to Crossing
    addToCrossing() {

        let selectedRow = this.state.selectedRow;
        //prompt user if no records are selected yet.
        if (selectedRow.length == 0) {
            this.promptNoRecords();
            return;
        }

        //extract only new records from selected records so that
        // merge can be done with old Crossing records if any
        let newRecords = [];
        if (this.state.crossingRecords.length)
            newRecords = selectedRow.filter((r) => {
                return this.state.crossingRecords.indexOf(r) == -1
            });
        else
            newRecords = selectedRow;

        //updating Crossing records for submision to server
        //and reset selectedRow
        let crossingRecords = this.state.crossingRecords.concat(newRecords)


        if (selectedRow.length == 0 || crossingRecords.length == 0) {
            return;
        }
        this.setState({
            crossingRecords: crossingRecords,
            selectedRow: []
        })

        //need to send data to server in tabular format to cutoff processing in server
        let crossingQuery = [], counter = 0;
        this.state.mainTableData.map((f) => {
            if (crossingRecords.indexOf(f.EZID) > -1) {
                crossingQuery.push('TempData[' + counter + '].ezid=' + f.EZID);
                crossingQuery.push('TempData[' + counter + '].etc=' + f.EntityTypeCode);
                crossingQuery.push('TempData[' + counter + '].name=' + f.Name);
                crossingQuery.push('TempData[' + counter + '].delete=false');
                counter++;
            }
        });

        crossingQuery.push('module=CRO');
        crossingQuery.push('CC=TO');
        crossingQuery.push('getCount=false');
        this.fetchData({type: "SEND_RECORDS_TO_ACTION", data: crossingQuery, module: "CRO"})
    }

    //function to add selected records to My Selection and save to localStorage.
    addToMySelection() {

        let selectedRow = this.state.selectedRow;
        //prompt user if no records are selected yet.
        if (selectedRow.length == 0) {
            this.promptNoRecords();
            return;
        }

        //create mySelection localStorage variable with empty array, if not done already.
        if (!localStorage["mySelection"])
            localStorage.setItem("mySelection", "[]");

        let mySelection = JSON.parse(localStorage.getItem("mySelection"));
        let selectionCount;

        //if there are already some records in localStorage then push new ones
        if (mySelection.length > 0) {
            //check if new seleciton are not duplicate;
            let mySelectionEZIDs = mySelection.map(e => e.EZID);

            this.state.selection.forEach(s => {
                if (mySelectionEZIDs.indexOf(s.EZID) == -1)
                    mySelection.push(s);
            })
        }
        else {
            mySelection = this.state.selection.concat([])
        }


        localStorage["mySelection"] = JSON.stringify(mySelection);
        selectionCount = mySelection.length;

        //reset selection
        this.setState({
            selectedRow: [],
            selection: [],
            selectionCount: selectionCount,
            mySelection: mySelection
        })
    }

    //fetch groups from server
    fetchGroups() {
        this.fetchData({type: "FETCH_GROUPS"})
    }

    //addGroup
    addGroup(args) {

        let newGroup = {
            "GroupEZID": this.state.newGroups.length,
            "GroupName": args.name,
            "Remark": args.remark,
            "groupLines": this.state.mySelection.map(mS => Object.assign({}, mS, {checked: true}))
        };

        let newGroups = this.state.newGroups.concat(newGroup);
        this.setState({
            newGroups: newGroups,
            createGroupModal: false
        })
    }

    //show Group creation modal
    showGroupCreation() {
        this.setState({createGroupModal: true})
    }

    //cancel Group Creation and close modal
    cancelGroupCreation() {
        this.setState({createGroupModal: false})
    }

    //toggle selection lines while adding selection to group
    toggleSelectionGroupLine(args) {
        let currentGroup = this.state.newGroups.filter(g => g.GroupEZID === args.groupEZID * 1)[0],
            currentGroupLines = currentGroup.groupLines;

        //update checked status in selected group lines
        currentGroupLines = currentGroupLines.map(gl => {
            if (gl.EZID === args.groupLine * 1) {
                return Object.assign({}, gl, {checked: args.checked})
            }
            return gl
        })

        //update group with udpated gouplines status
        let newGroups = this.state.newGroups.map(g => {
            if (g.GroupEZID === args.groupEZID * 1) {
                return Object.assign({}, g, {groupLines: currentGroupLines});
            }
            return g;
        })

        this.setState({newGroups: newGroups});
    }

    //adds selection of records/ group-lines to groups
    createGroupAndGroupLines() {

        let data = [],
            newGroups = this.state.newGroups;
        newGroups.forEach(g => {

            let group = {
                GroupName: g.GroupName,
                Remark: g.Remark,
                groupLines: []
            };
            // data.GroupLineData.push({GroupName: g.GroupName, Remark: g.Remark})
            g.groupLines.forEach(gl => {
                if (gl.checked)
                    group.groupLines.push({
                        "EZID": gl.EZID,
                        "ETC": gl.EntityTypeCode,
                        "Name": gl.Name
                    })
            })

            data.push(group);
        })

        this.fetchData({type: "CREATE_GROUP_GROUPLINES", args: data})

    }

    //toggle Group line display in group list
    toggleGroupLines(args) {

        let groups = this.state.groups;

        if (args.isGroup) {
            if (args.expanded) {
                //collapse recrods, ie remove grouipLines from the groups object
                let groupLineCount = this.state.groups[args.index].ChildRows;
                //remove child rows
                groups.splice(args.index + 1, groupLineCount);
                //reset checkbox to unchecked state
                groups[args.index].expanded = false;

                //update state
                this.setState({groups: groups})

            }
            else {
                // show records , if for the first time then fetch recrods
                let selectedGroup = this.state.groups[args.index];
                //if grouplines are not fetched yet
                if (selectedGroup.groupLines === undefined) {
                    this.fetchData({type: "FETCH_GROUPLINES", args: {groupEZID: groups[args.index].EZID}})
                }
                else {
                    //add grouplines records from selected groups object to groups
                    groups.splice(args.index + 1, 0, ...selectedGroup.groupLines);
                    groups[args.index].expanded = true;
                    this.setState({groups: groups})
                }

            }
        }
        else {
            groups[args.index].expanded = !groups[args.index].expanded;
            this.setState({groups: groups})
        }
    }


    fetchTrials() {
        this.fetchData({type: "FETCH_TRIALS"})
    }

    fetchTrialLines(trialID) {
        this.fetchData({type: "FETCH_TRIALLINES", data: {trialID: trialID}})
    }

    //hide create new trial modal
    cancelTrialCreation() {
        this.setState({createTrialModal: false})
    }

    //show create new trial modal
    showTrialCreation() {
        this.setState({createTrialModal: true})
    }

    //add new trial
    creatTrial(args) {
        //TODO: remove hard coded values
        let data = {
            "countryCode": args.countryCode,
            "name": args.name,
            "trialTypeID": 1,
            "year": 2016,
            "trialRegionID": 1,
            "cropCode": "TO",
            "test": 42
        };
        this.fetchData({type: "CREATE_TRIAL", data: data})
    }

    //add trials to ready state
    makeTrialsReady() {
        let trials = this.state.trials,
            readyTrials = trials.filter(t => t.checked && !t.completed),
            readyTrialEZIDs = readyTrials.map(r => r.ezid);
            this.fetchData({type: "MAKE_TRIALS_READY", data: {ezids: readyTrialEZIDs.join(",")}})
    }

    //check/uncheck trails in trials page for ready process
    toogleTrialReady(index) {

        let trials = this.state.trials;
        trials[index].checked = !trials[index].checked;
        this.setState({trials: trials})
    }

    //tooggleTrialLine Selection
    toggleTrialLinesCheck(tLIndex) {
        let selectedTrialLineIndexes = this.state.selectedTrialLineIndexes;
        this.setState({selectedTrialLineIndexes: selectedTrialLineIndexes.indexOf(tLIndex) == -1 ? selectedTrialLineIndexes.concat(tLIndex) : selectedTrialLineIndexes.filter(i => i !== tLIndex)})
    }

    showTrialNamingModal() {
        debugger;
        this.setState({trailLineNamingModal: true})
    }

    cancelTrialLineNaming() {
        this.setState({trailLineNamingModal: false})
    }

    //Applying Naming Sequence either While readying trial in Trials page or from Trial Lines page.
    createTrialLineNaming(ndata) {
debugger;
        if(ndata.from === "Trials"){

            let trialsSelected  = this.state.trials.filter(t=>t.checked),
                trialsEZIDz = trialsSelected.map(t=>t.ezid);
            let data = Object.assign({}, ndata.data, {ezids: trialsEZIDz});
            this.fetchData({type: "TRIALLINE_NAMING_BYTRIALS", data: {payload: data}});

        }
        else if(ndata.from === "Trial Lines"){
            let ezids = [],
                tLIndexes = this.state.selectedTrialLineIndexes;
            for (let i = 0; i < tLIndexes.length; i++) {
                ezids.push(this.state.trialLines[tLIndexes[i]].ezid);
            }
            let data = Object.assign({}, ndata.data, {ezids: ezids})
            this.fetchData({type: "TRIALLINE_NAMING", data: {payload: data}})
        }





    }

    showTrialPropertyCreationModal() {
        this.setState({trialPropertyCreationModal: true})
    }

    cancelTrialPropertyCreation() {
        this.setState({trialPropertyCreationModal: false})
    }

    createTrialProperty(args) {
        this.fetchData({
            type: "CREATE_TRIAL_PROPERTIES", data: {
                name: args.name,
                columnLabel: args.columnLabel,
                dataType: args.dataType,
                editor: false,
                listOfValues: args.listOfValues,
                updatable:true,
                propertyValues:args.propertyValues
            }
        })
    }

    fetchTrialProperties() {
        this.fetchData({type: "FETCH_TRIAL_PROPERTIES"})

    }

    //fetch crossing or trial data when page is refreshed from trial or crossing screen.
    fetchActionRecorddList() {
        this.fetchData({type: "FETCH_ACTIONS_RECORD_LIST"})
    }

    goToTrialBook() {
        if (this.state.trialbookRecordsCount > 0) {
            this.setState({selectedRow: []})
            browserHistory.push('/main/trialbook')
        }
    }

    goToCrossing() {
        if (this.state.crossingRecordsCount > 0) {
            this.setState({selectedRow: []})
            browserHistory.push('/main/crossing')
        }
    }

    selectCrossingList(ezid, checked) {

        let selectedCrossingList = this.state.selectedCrossingList;
        if (checked) {
            selectedCrossingList.push(ezid);
        }
        else {
            selectedCrossingList = selectedCrossingList.filter((f) => f != ezid);
        }

        this.setState({selectedCrossingList: selectedCrossingList})

    }

    removeCrossingList() {
        let removeCrossingList = this.state.selectedCrossingList;
        //need to send data to server in tabular format to cutoff processing in server
        let crossingQuery = [], counter = 0;
        this.state.crossingRecords.map((f) => {
            if (removeCrossingList.indexOf(f.EZID) > -1) {
                crossingQuery.push('TempData[' + counter + '].ezid=' + f.EZID);
                crossingQuery.push('TempData[' + counter + '].etc=' + f.EntityTypeCode);
                crossingQuery.push('TempData[' + counter + '].name=' + f.Name);
                crossingQuery.push('TempData[' + counter + '].delete=true');
                counter++;
            }
        });

        crossingQuery.push('module=CRO');
        crossingQuery.push('CC=TO');
        crossingQuery.push('getCount=false');

        let msg = {
            title: "Confirm delete",
            body: "Selected records will be remove from the list.",
            callback: () => this.fetchData({type: "REMOVE_CROSSING_RECORDS", data: crossingQuery}),
            cancel: () => this.hideModal()
        }
        this.messageHandler(msg)

    }

    selectFemale(cIndex) {
        if (this.state.crossingMale.EZID == this.state.crossingRecords[cIndex].EZID) {
            this.setState({crossingMale: {}})
        }
        this.setState({crossingSuccess: false, crossingFemale: this.state.crossingRecords[cIndex]})
    }

    selectMale(cIndex) {
        if (this.state.crossingFemale.EZID == this.state.crossingRecords[cIndex].EZID) {
            this.setState({crossingFemale: {}})
        }
        this.setState({crossingSuccess: false, crossingMale: this.state.crossingRecords[cIndex]})
    }

    createCrossing() {

        let crossingQuery = [],
            male = this.state.crossingMale,
            female = this.state.crossingFemale;

        crossingQuery.push("TVPCrossing[0].ezid=" + male.EZID);
        crossingQuery.push("TVPCrossing[0].name=" + male.Name);
        crossingQuery.push("TVPCrossing[0].sex=M");
        crossingQuery.push("TVPCrossing[1].ezid=" + female.EZID);
        crossingQuery.push("TVPCrossing[1].name=" + female.Name);
        crossingQuery.push("TVPCrossing[1].sex=F");
        crossingQuery.push("CC=TO");
        crossingQuery.push("module=CRO");

        this.fetchData({type: "CREATE_CROSSING", data: crossingQuery})

    }

    promptNoRecords() {
        let msg = {
            title: "Ooops! no record selected  ",
            body: "You have not selected any records. Please select one or more records and try again.",
            callback: null,
            cancel: null
        }
        this.messageHandler(msg)
    }

    createBatch() {

        let selectedRow = this.state.selectedRow;
        //prompt user if no records are selected yet.
        if (selectedRow.length == 0) {
            this.promptNoRecords();
            return;
        }

        let lotRecords = this.state.mainTableData.filter((f) => selectedRow.indexOf(f.EZID) > -1 && f.EntityTypeCode.toLowerCase() === 'lot');
        if (lotRecords.length == 0) {

            let msg = {
                title: "Error ",
                body: "No LOT records are selected.",
                callback: null,
                cancel: null
            }
            this.messageHandler(msg);
            return;
        }
        else {

            let batchQuery = [], counter = 0;
            this.state.mainTableData.forEach((f) => {
                if (selectedRow.indexOf(f.EZID) > -1 && f.EntityTypeCode.toLowerCase() === "lot") {
                    batchQuery.push("TVPBatch[" + counter + "].ezid=" + f.EZID);
                    batchQuery.push("TVPBatch[" + counter + "].etc=" + f.EntityTypeCode);
                    counter++;
                }
            });
            batchQuery.push("cc=TO");

            //check if more than one entity type are selected along with LOT, eg .BAT, TRL
            if (lotRecords.length < selectedRow.length) {
                //show popup showing mixed entity type are selected
                let msg = {
                    title: "Confirm ",
                    body: "More than one Enity Type selected. Select 'Ok' to send 'LOT' only records for Batch creation and discard other selected records  or Select 'Cancel'/ 'Close' to edit your selection.",
                    callback: () => this.fetchData({type: "CREATE_BATCH", data: batchQuery}),
                    cancel: () => this.hideModal()
                }

                this.messageHandler(msg)

            }
            else

                this.fetchData({type: "CREATE_BATCH", data: batchQuery, lotsSelected: selectedRow})

        }


    }

    //show tree Hierarchy of selected lot
    gotoHierarchyData() {
        let selectedRow = this.state.selectedRow;
        //prompt user if no records are selected yet.
        if (selectedRow.length == 0) {
            this.promptNoRecords();
        }
        else if (selectedRow.length > 1) {
            let msg = {
                title: "Error ",
                body: "Multiple Record Selected. Please select one record only.",
                callback: null,
                cancel: null
            };
            this.messageHandler(msg);
        }
        else {
            this.fetchData({type: "FETCH_TREEHIERARCHY", data: {"treeRootId": selectedRow[0]}})
        }


    }

    //fetch data for tree structure from server for selected record
    fetchHierarchy(id) {
        this.fetchData({type: "FETCH_TREEHIERARCHY", data: {"treeRootId": id}});
    }

    //Toggles search section for analysis section ie. the main grid
    toggleSearchBox(flag) {

        if (flag != undefined) {
            this.setState({searchVisibility: flag});
            return;
        }
        this.setState({searchVisibility: !this.state.searchVisibility});
    }

    updateSearchText(searchedText) {
        this.setState({searchedText: searchedText})
    }

    //Search in analysis part ie the main grid
    search(query, action) {

        if (query == "") {
            return;
        }
        //return if another search is ongoing
        if (this.searching) {
            return;
        }
        //make searchin current screen data first
        // if not found any matching go for backend.

        let lastSearchedIndex = this.state.lastSearchedIndex,
            regEx = new RegExp(query, "gi"),
            fields = this.state.fields,
            selectedRow = [],
            localIndex;
        let direction = '';
        switch (action) {
            case "next": {
                localIndex = this.state.mainTableData.findIndex((row, index) => {
                    if (index > lastSearchedIndex)
                        for (let i = 0; i < fields.length; i++) {
                            if (row[fields[i]] && row[fields[i]].toString().match(regEx) != null) {
                                selectedRow.push(row.EZID);
                                return true;
                            }
                        }
                });
                direction = "N"
            }
                break;
            case "previous": {
                let reverserMainTableData = this.state.mainTableData.concat([]).reverse();
                let reverseLastSearchedIndex = reverserMainTableData.length - lastSearchedIndex;
                let reversedLocalIndex = reverserMainTableData.findIndex((row, index) => {
                    if (index >= reverseLastSearchedIndex)
                        for (let i = 0; i < fields.length; i++) {
                            if (row[fields[i]].toString().match(regEx) != null) {
                                selectedRow.push(row.EZID);
                                return true;
                            }
                        }
                });

                localIndex = reversedLocalIndex > -1 ? reverserMainTableData.length - reversedLocalIndex - 1 : -1;
                direction = "P"
            }
                break;
            case "search": {
                localIndex = this.state.mainTableData.findIndex((row, index) => {
                    for (let i = 0; i < fields.length; i++) {
                        if (row[fields[i]].toString().match(regEx) != null) {
                            selectedRow.push(row.EZID);
                            return true;
                        }
                    }
                });
            }

        }

        //if valid searched data is found.
        if (localIndex > -1) {
            this.setState({
                lastSearchedIndex: localIndex,
                selectedRow: selectedRow,
                searchedText: query
            });
        }
        else {


            this.searching = true;
            this.setState({
                searchedText: query
            });
            this.fetchData({type: "SEARCH_RECORD", data: {query: query, direction: direction}})
        }
    }

    //Show Activity Indicator when making ajax request
    showLoading() {
        this.refs.loading.setAttribute("data-hydrating", "shown");
    }

    //Hide Activity Indicator after finishing ajax request
    hideLoading() {
        this.refs.loading.setAttribute("data-hydrating", "hidden");

    }

    //call resize action for browser resize with throttle of 16 ms
    onResize() {
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(this.resizeTable, 16);
    }


    //resize grid structure with resize of browser.
    resizeTable() {

        let offset = this.sidebar ? 340 : 90;
        let tableHeight = window.innerHeight - document.querySelector("header").clientHeight - 120;
        this.setState({
            tableWidth: document.body.clientWidth - offset,
            tableHeight: tableHeight,
            tbTableWidth: (document.body.clientWidth ) * 0.6,
            tbTableHeight: tableHeight - 10,
            mainWrapperWidth: document.body.clientWidth,
            tableWidthFull: document.body.clientWidth - 40,
            tableHeightFull: tableHeight - 10
        });
    }

    //
    fetchToken() {
        this.fetchData({type: "FETCH_TOKEN"});
    }

    fetchCountries() {
        this.fetchData({type: "FETCH_COUNTRIES"})
    }

    /*
     *   get data from server
     */
    fetchData(action) {


        //check if token is available or not;
        if (this.isTokenValid()) {
            this.handleAction(action);
        }
        else {
            this.handleAction({
                type: "FETCH_TOKEN", callback: () => this.fetchData(action)
            });
        }
    }

    //check if token is valid or not, also check against expiry.
    isTokenValid() {
        let lToken = this.state.token ? this.state.token : localStorage.token,
            expiresIn = this.state.expiresIn ? this.state.expiresIn : localStorage.expiresIn;

        //try fetching it from localStorage if empty
        if (!!lToken) {
            //check for expiry
            this.setState({token: localStorage.token, expiresIn: localStorage.expiresIn})
            let timeNow = new Date();
            let lExpiresInDate = new Date(expiresIn);
            //<= 1 minute gap is to fetch new token.
            return lExpiresInDate - timeNow > 60000;
        }

        else {
            return false;
        }

    }

    //after token is handled, make ajax request
    handleAction(action) {

        switch (action.type) {
            case "INITIAL_TABLE_DATA_FETCH": {
                //Fetch Initial Data
                axios.post(config.url, this.getData({}), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data,
                            fields = [],
                            fieldLabels = {},
                            noFSFieldsInfo = {};

                        rData.InitialFields.forEach((f) => {
                            //forcefully setting TraitID and columnlabel same in case of initial data as
                            //initail data / fields don't have any triatid / dont' belong to trait table.
                            fieldLabels[f.ColumnLabel] = f.ColumnLabel;
                            noFSFieldsInfo[f.ColumnLabel] = f;
                            fields.push(f.ColumnLabel);
                        })

                        this.setState({
                            noFSTableData: rData.InitialData,
                            mainTableData: rData.InitialData,
                            totalRecords: rData.TotalRecords,
                            fields: fields,
                            noFSfields: fields,
                            noFSFieldsInfo: noFSFieldsInfo,
                            noFSFieldLabels: fieldLabels,
                            fieldLabels: fieldLabels,
                            sortColumnList: fieldLabels,
                            firstColSortList: fieldLabels,
                            secondColSortList: fieldLabels,
                            thirdColSortList: fieldLabels

                        });

                        /*
                         This seciton will be shifted to administration part
                         //fetch list of records added to different modules eg, Trialbook, Crossing etc.
                         axios.get(config.tempRecordListUrl + "?CC=TO&getCount=true", {withCredentials: true})
                         .then((response)=> {

                         let data = response.data.Data;
                         if (data.length) {
                         data.forEach((d)=> {
                         switch (d.Module) {
                         case "TRL": {
                         this.setState({trialbookRecordsCount: d.TotalCount})
                         }
                         break;
                         case "CRO": {
                         this.setState({crossingRecordsCount: d.TotalCount})
                         }
                         default:
                         break;

                         }
                         })
                         }
                         })
                         .catch((response)=> {
                         this.errorHandler(response);
                         })*/
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "FIELDSET_LIST_FETCH": {

                if (this.state.fieldsets.length == 0) {

                    axios.get(config.fieldsetUrl, {
                        "withCredentials": true,
                        headers: {
                            'enzauth': this.state.token
                        }
                    })
                        .then(function (response) {
                            this.setState({fieldsets: response.data})
                        }.bind(this))

                        .catch((response) => {
                            this.errorHandler(response);
                        })
                }
            }
                break;
            case "COLUMNS_LIST_FETCH": {

                if (this.state.columnsList.length == 0) {
                    //fetch columns data
                    axios.get(config.columnsUrl, {
                        "withCredentials": true,
                        headers: {
                            'enzauth': this.state.token
                        }
                    })
                        .then(function (response) {
                            this.setState({columnsList: response.data})
                        }.bind(this))
                        .catch((response) => {
                            this.errorHandler(response);
                        })
                }
            }
                break;
            case "HIERARCHY_FETCH": {
                //fetch hierary Data
                axios.post(config.url,
                    this.getData({
                        nav: action.args,
                        sort: false,
                        filter: false
                    }), {
                        "withCredentials": true,
                        headers: {
                            'enzauth': this.state.token
                        }
                    })
                    .then(function (response) {
                        let rData = response.data,
                            dataHistory = this.state.dataHistory,
                            rowIds = [],
                            mainData = this.state.mainTableData.concat([]),
                            noFSTableData = this.state.noFSTableData.concat([]),
                            mergedObj = (rData.FinalData != undefined) ? rData.FinalData : rData.InitialData;

                        if (mergedObj) {
                            rowIds = mergedObj.map((row) => {
                                return row.EZID
                            });
                            dataHistory.push({"ezid": action.args.ezid, "rowids": rowIds});
                        }

                        //need to combine initial data with observation and/or propertyata if present
                        if (rData.ObservationData != undefined && rData.ObservationData.length > 0) {

                            for (let obj of mergedObj)
                                for (let tObj of rData.ObservationData) {
                                    if (tObj.EZID == obj.EZID) {
                                        Object.assign(obj, tObj);
                                    }
                                }
                        }

                        if (rData.PropertyData != undefined && rData.PropertyData.length > 0) {
                            for (let obj of mergedObj)
                                for (let tObj of rData.PropertyData) {
                                    if (obj.EZID == tObj.EZID) {
                                        Object.assign(obj, tObj);
                                    }
                                }
                        }

                        //pushing in the hierarchy data just after the parent data/record/row
                        mergedObj.forEach(function (row) {
                            mainData.splice(action.data.rowIndex + 1, 0, row);
                        });

                        //set flag for expanded hierarchy
                        mainData[action.data.rowIndex].expanded = true;

                        if (rData.FinalData == undefined) {
                            rData.InitialData.forEach(function (row) {
                                noFSTableData.splice(action.data.rowIndex + 1, 0, row);
                            });
                        }
                        else {
                            mergedObj.forEach(function (row) {
                                noFSTableData.splice(action.data.rowIndex + 1, 0, row);
                            });
                        }
                        //pushed expanded flag state to noFSTableData as well
                        noFSTableData[action.data.rowIndex].expanded = true;

                        //save the data to App state
                        // both No Fieldset data columns with expanded flag where needed
                        // and the main table data
                        this.setState({
                            noFSTableData: noFSTableData,
                            mainTableData: mainData,
                            dataHistory: dataHistory
                        });


                    }.bind(this))
                    .catch((response) => {
                        this.errorHandler(response);
                    })

            }
                break;
            case "PAGINATION_FETCH": {

                //fetch pagination data ;
                let newPageNo;

                switch (action.args.pn) {
                    case "first":
                        newPageNo = 1;
                        break;
                    case "previous":
                        newPageNo = this.state.currentPage - 1;
                        break;
                    case "next":
                        newPageNo = this.state.currentPage + 1;
                        break;
                    case "last":
                        newPageNo = Math.ceil(this.state.totalRecords / this.state.pageSize);
                        break;
                    default:
                        newPageNo = action.args.pn;

                }

                let args = {
                    "pn": newPageNo,
                    "level": "-1",
                    "ezid": '',
                    "etc": this.entityTypeCode.toLowerCase() != "bat" ? this.entityTypeCode : "BAT",
                    "ps": this.state.pageSize,
                    'tcols': this.state.traitColSelected.concat(this.state.otherTraitCols),
                    'pcols': this.state.propertyColSelected.concat(this.state.otherPropertyCols),
                    'ezids': '',
                    'etcs': '',
                    'pfsid': '',
                    'tfsid': ''
                };

                axios.post(config.url, this.getData({nav: args, sort: true, filter: true}), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then(function (response) {

                        let rData = response.data;
                        //if sorting or filter is also applied
                        if (rData.FinalData) {

                            //extrating base columns set from new Response Data.
                            let noFSTableData = rData.FinalData.map((rd) => {
                                return {
                                    "EZID": rd.EZID,
                                    "EntityTypeCode": rd.EntityTypeCode,
                                    "Name": rd.Name,
                                    "ChildRows": rd.ChildRows || 0,
                                    "Level": rd.Level
                                }
                            });


                            this.setState({
                                noFSTableData: noFSTableData,
                                mainTableData: rData.FinalData,
                                currentPage: newPageNo,
                                highLightedCol: null,
                                selectedRow: []
                            }, function () {

                            })

                        }
                        else {
                            let startData = (rData.InitialData != undefined) ? rData.InitialData : this.state.noFSTableData.concat([]),
                                mergedObj = [];

                            //if no colums is selected in both property and trait
                            if (rData.ObservationData == undefined && rData.PropertyData == undefined) {
                                this.setState({
                                    noFSTableData: startData,
                                    mainTableData: startData,
                                    currentPage: newPageNo,
                                    highLightedCol: null,
                                    selectedRow: []
                                });
                            }
                            else {

                                if (rData.ObservationData != undefined) {
                                    for (let obj of startData) {
                                        for (let newObj of rData.ObservationData) {
                                            if (obj.EZID == newObj.EZID) {
                                                mergedObj.push(Object.assign({}, obj, newObj));
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (rData.PropertyData != undefined) {

                                    mergedObj = (rData.ObservationData != undefined) ? mergedObj : startData;

                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.PropertyData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (mergedObj.length == 0)
                                    mergedObj = this.state.noFSTableData.concat([]);

                                //update mainTableData from merged Obj
                                this.setState({
                                    noFSTableData: startData,
                                    mainTableData: mergedObj,
                                    currentPage: newPageNo,
                                    highLightedCol: null,
                                    selectedRow: []
                                })
                            }
                        }

                    }.bind(this))
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "FIELDSET_FETCH": {

                if (this.propertyFieldset)
                    this.toggleProperty();
                if (this.traitFieldset)
                    this.toggleTrait();

                //fetch fiedlsetData only
                let etc = [], ezidz = [];
                this.state.mainTableData.forEach((row) => {
                    if (etc.indexOf(row.EntityTypeCode) < 0)
                        etc.push(row.EntityTypeCode);
                });
                if (etc.length >= 1) {
                    for (let i = 0; i < etc.length; i++) {
                        let ezidtemp = [];
                        this.state.mainTableData.forEach((row) => {
                            if (row.EntityTypeCode == etc[i])
                                ezidtemp.push(row.EZID)
                        })
                        ezidz.push(ezidtemp.join(","));
                    }
                }

                let fieldSetId = action.data.value,
                    tCols = [],
                    pCols = [],
                    type;
                if (action.data.isProperty) {
                    tCols = this.state.traitColSelected.concat(this.state.otherTraitCols);
                    pCols = this.state.otherPropertyCols;
                    type = "p";
                }
                else {
                    pCols = this.state.propertyColSelected.concat(this.state.otherPropertyCols);
                    tCols = this.state.otherTraitCols;
                    type = "t"
                }

                let args = {
                    "etcs": encodeURIComponent(etc.join("|")),
                    "ezids": encodeURIComponent(ezidz.join("|")),
                    "tcols": tCols.join(","),
                    "pcols": pCols.join(","),
                    "pfsid": '',
                    "tfsid": '',
                    "ezid": '',
                    "level": -1,
                    "pn": this.state.currentPage
                };


                //added property or trait fieldsetID to data
                args[type + "fsid"] = fieldSetId;


                axios.post(config.fieldsetDataUrl, this.getData({
                    nav: args,
                    sort: true,
                    filter: true
                }), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data;


                        let mergedObj = this.state.noFSTableData.concat([]),
                            currentFields = this.state.noFSfields.concat([]),
                            sortColumnList;

                        //no col response
                        if (rData.Fields.length == 0) {
                            //reset all data
                            sortColumnList = Object.assign({}, this.state.noFSFieldLabels);
                            let currentFields = this.state.noFSfields;

                            //re-adjust column sort order if any columns are removed while fieldset are swtiched
                            this.updateSortColumns(currentFields, sortColumnList);


                            //removed filter applied if column no longer exists in result set from server.
                            this.updateFilterColumns(currentFields);

                            let noFSTableData = [];
                            if (rData.FinalData) {
                                //extrating base columns set from new Response Data.
                                noFSTableData = rData.FinalData.map((rd) => {
                                    return {
                                        "EZID": rd.EZID,
                                        "EntityTypeCode": rd.EntityTypeCode,
                                        "Name": rd.Name,
                                        "ChildRows": rd.ChildRows || 0,
                                        "Level": rd.Level
                                    }
                                });
                            } else
                                noFSTableData = this.state.noFSTableData;

                            this.setState({
                                mainTableData: rData.FinalData ? rData.FinalData : this.state.noFSTableData.concat([]),
                                noFSTableData: noFSTableData,
                                fields: this.state.noFSfields,
                                traitFieldsetLabels: {},
                                propertyFieldsetLabels: {},
                                traitColSelected: [],
                                propertyColSelected: [],
                                sortColumnList: this.state.noFSFieldLabels,
                                fisrtColSortList: this.state.noFSFieldLabels
                            })
                        }
                        else {

                            //extracting property fields and preserving in state
                            let propertyFields = [],
                                pNewFieldLabels = [],
                                traitFields = [],
                                tNewFieldLabels = [],
                                fieldsInfo = {};


                            rData.Fields.forEach((f) => {
                                if (f.Property) {
                                    if (this.state.otherPropertyCols.indexOf(f.TraitID) < 0)
                                        propertyFields.push(f.TraitID);
                                    pNewFieldLabels[f.TraitID] = f.ColumnLabel;
                                } else {
                                    if (this.state.otherTraitCols.indexOf(f.TraitID) < 0)
                                        traitFields.push(f.TraitID)
                                    tNewFieldLabels[f.TraitID] = f.ColumnLabel
                                }
                                //bulid current field list
                                currentFields.push(f.TraitID);
                                //build fields information
                                if (fieldsInfo[f.TraitID] == undefined)
                                    fieldsInfo[f.TraitID] = f;
                            });


                            let sortColumnList = Object.assign({}, this.state.noFSFieldLabels, pNewFieldLabels, tNewFieldLabels);

                            if (rData.ObservationData == undefined && !action.data.isProperty) {
                                this.setState({
                                    traitfieldColsRemoved: []
                                })
                            }

                            if (rData.PropertyData == undefined && action.data.isProperty) {
                                this.setState({
                                    propertyfieldColsRemoved: []
                                })
                            }


                            let noFSTableData = this.state.noFSTableData;
                            if (rData.FinalData) {
                                mergedObj = rData.FinalData;

                                //extrating base columns set from new Response Data.
                                noFSTableData = rData.FinalData.map((rd) => {
                                    return {
                                        "EZID": rd.EZID,
                                        "EntityTypeCode": rd.EntityTypeCode,
                                        "Name": rd.Name,
                                        "ChildRows": rd.ChildRows || 0,
                                        "Level": rd.Level
                                    }
                                });
                                this.setState({noFSTableData: noFSTableData})
                            }
                            else {
                                //trait fieldset data
                                if (rData.ObservationData != undefined) {
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.ObservationData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }

                                //property fieldset data
                                if (rData.PropertyData != undefined) {
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.PropertyData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }

                            //re-adjust column sort order if any columns are removed while fieldset are swtiched
                            this.updateSortColumns(currentFields, sortColumnList);

                            //removed filter applied if column no longer exists in result set from server.
                            this.updateFilterColumns(currentFields);

                            //final mergedobj ,and fields state update
                            this.setState({
                                propertyFieldsetLabels: pNewFieldLabels,
                                propertyColSelected: propertyFields,
                                propertyfieldColsRemoved: [],
                                traitFieldsetLabels: tNewFieldLabels,
                                traitColSelected: traitFields,
                                traitfieldColsRemoved: [],
                                sortColumnList: sortColumnList,

                                firstColSortList: sortColumnList,
                                /* secondColSortList: secondColSortList,
                                 thirdColSortList: thirdColSortList,*/
                                mainTableData: mergedObj,
                                fields: currentFields,
                                fieldsInfo: fieldsInfo,

                            });
                        }
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "COLUMN_SELECTION": {

                this.toggleColumn();

                let etc = [], ezidz = [];

                //extract unique Entity Type Code from available records in data grid.
                this.state.mainTableData.forEach((row) => {
                    if (etc.indexOf(row.EntityTypeCode) < 0)
                        etc.push(row.EntityTypeCode);
                });
                //group ezid of records according to their entity Type code like a,b,c| e,f,g|i,j,k
                if (etc.length >= 1) {
                    for (let i = 0; i < etc.length; i++) {
                        let ezidtemp = [];
                        this.state.mainTableData.forEach((row) => {
                            if (row.EntityTypeCode == etc[i])
                                ezidtemp.push(row.EZID)
                        })
                        ezidz.push(ezidtemp.join(","));
                    }
                }

                let tCols = [], pCols = [];

                let updatedTraitColSelected = this.state.traitColSelected.filter((t) => {
                        return action.args.traitfieldColsRemoved.indexOf(t) == -1
                    }),
                    updatedPropertyColSelected = this.state.propertyColSelected.filter((t) => {
                        return action.args.propertyfieldColsRemoved.indexOf(t) == -1
                    });

                //final Trait cols
                tCols = updatedTraitColSelected.concat(action.args.otherTColsToAdd);
                //final propertyCols
                pCols = updatedPropertyColSelected.concat(action.args.otherPColsToAdd);

                //total fields/columns before
                let totalCols = this.state.traitColSelected.concat(this.state.propertyColSelected, this.state.otherPropertyCols, this.state.otherTraitCols);
                //total fields/columns after
                let newTotalCols = tCols.concat(pCols);
                //columns being removed in this action
                let colsToRemove = totalCols.filter((f) => newTotalCols.indexOf(f) == -1);

                // check if columns to remove are included in sorting and set flag for sorting reset
                let fCol = this.state.firstSortColumn,
                    sCol = this.state.secondSortColumn,
                    tCol = this.state.thirdSortColumn,
                    sortColRemovalFlag = false,
                    columnSortData = this.state.columnSortData;


                //loop to find new Sorting column List
                let newSortColumnList = {};

                this.state.columnsList.forEach((f) => {
                    if (newTotalCols.indexOf(f.TraitID) > -1) {
                        newSortColumnList[f.TraitID] = f.ColumnLabel;
                    }
                })

                if (colsToRemove.indexOf(fCol) || colsToRemove.indexOf(sCol) || colsToRemove.indexOf(tCol)) {
                    //set flag to send sorting option.
                    sortColRemovalFlag = true;

                    let sortData = this.updateSortColumns(newTotalCols.concat(this.state.noFSfields), Object.assign({}, newSortColumnList, this.state.noFSFieldLabels));

                    //no sort columns assigned;
                    if (Object.keys(sortData).length == 0) {
                        columnSortData = {"s[0].sc": "EZID", "s[0].so": "asc"}
                    }
                    else {
                        columnSortData = sortData
                    }
                }

                // check if columns to remove has filter applied on them
                let filterColumnsToRemove = [], newFilterData = this.state.filterApplied, fQuery = [];
                colsToRemove.forEach((f) => {
                    if (newFilterData[f] != undefined) {
                        delete newFilterData[f]
                    }
                });

                fQuery = this.getFilterQueries(newFilterData);

                this.setState({
                    filterApplied: newFilterData,
                    filterQuery: fQuery
                })

                //parameter for navigation
                let args = {
                    "etcs": encodeURIComponent(etc.join("|")),
                    "ezids": newTotalCols.length > 0 ? encodeURIComponent(ezidz.join("|")) : '',
                    "tcols": tCols.join(","),
                    "pcols": pCols.join(","),
                    "ezid": '',
                    "level": -1,
                    "etc": this.entityTypeCode.toLowerCase() != "bat" ? this.entityTypeCode : "BAT",
                    'tfsid': '',
                    'pfsid': ''
                };

                let data = {
                    nav: args,
                    sort: true,
                    sortData: columnSortData,
                }
                if (fQuery.length > 0) {
                    data['filter'] = true
                    data['filterData'] = fQuery;
                }
                else {
                    data['filter'] = false
                }

                axios.post(config.url, this.getData(data), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data;
                        //without scroll or filter data
                        let mergedObj = this.state.noFSTableData.concat([]),
                            currentFields = this.state.noFSfields,
                            noFSTableData;

                        //no col response
                        if (rData.Fields.length == 0) {
                            //reset all data
                            let sortColumnList = Object.assign({}, this.state.noFSFieldLabels),
                                newMainTableData = this.state.noFSTableData;
                            noFSTableData = this.state.noFSTableData;

                            if (rData.FinalData) {
                                newMainTableData = rData.FinalData;
                                //extrating base columns set from new Response Data.
                                noFSTableData = rData.FinalData.map((rd) => {
                                    return {
                                        "EZID": rd.EZID,
                                        "EntityTypeCode": rd.EntityTypeCode,
                                        "Name": rd.Name,
                                        "ChildRows": rd.ChildRows || 0,
                                        "Level": rd.Level
                                    }
                                });
                                this.setState({noFSTableData: noFSTableData})
                            }

                            this.setState({
                                mainTableData: newMainTableData,
                                fields: this.state.noFSfields,
                                traitFieldsetValue: null,
                                traitFieldsetLabels: {},
                                propertyFieldsetLabels: {},
                                traitColSelected: [],
                                propertyColSelected: [],
                                sortColumnList: sortColumnList,
                                firstColSortList: sortColumnList,
                                secondColSortList: {},
                                thirdColSortList: {},
                                totalRecords: rData.TotalRecords
                            })
                        }
                        else {

                            //extracting property and trait fields and preserving them in state
                            let traitFields = [],
                                tNewFieldLabels = [],
                                propertyFields = [],
                                pNewFieldLabels = [],
                                fieldsInfo = {};

                            rData.Fields.forEach((f) => {
                                if (f.Property) {
                                    if (this.state.otherPropertyCols.indexOf(f.TraitID) < 0)
                                        propertyFields.push(f.TraitID);
                                    pNewFieldLabels[f.TraitID] = f.ColumnLabel;
                                }
                                else {
                                    if (this.state.otherTraitCols.indexOf(f.TraitID) < 0)
                                        traitFields.push(f.TraitID)
                                    tNewFieldLabels[f.TraitID] = f.ColumnLabel
                                }

                                fieldsInfo[f.TraitID] = f;

                                //get current fields
                                currentFields = currentFields.concat(f.TraitID)
                            });

                            this.setState({
                                traitFieldsetLabels: tNewFieldLabels,
                                traitColSelected: traitFields,
                                previousTraitColSelected: traitFields,
                                traitfieldColsRemoved: [],
                                propertyFieldsetLabels: pNewFieldLabels,
                                propertyColSelected: propertyFields,
                                propertyfieldColsRemoved: [],
                                fieldsInfo: fieldsInfo
                            });


                            //response of request with filter and/or sort data
                            if (rData.FinalData) {
                                mergedObj = rData.FinalData;


                                //extrating base columns set from new Response Data.
                                noFSTableData = rData.FinalData.map((rd) => {
                                    return {
                                        "EZID": rd.EZID,
                                        "EntityTypeCode": rd.EntityTypeCode,
                                        "Name": rd.Name,
                                        "ChildRows": rd.ChildRows || 0,
                                        "Level": rd.Level
                                    }
                                });
                                this.setState({noFSTableData: noFSTableData})


                            }
                            //response of normal request without filter and/or sort data
                            else {

                                //check if trait fieldset data is present, if yes merge it with NO Fieldset Table Data
                                if (rData.ObservationData != undefined) {
                                    //Trait columns being added hereafter
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.ObservationData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }

                                //check if property fieldset data is present, if yes merge it with NO Fieldset Table Data
                                if (rData.PropertyData != undefined) {
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.PropertyData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }

                            }
                            //final mergedobj ,and fields state update
                            this.setState({
                                mainTableData: mergedObj,
                                fields: currentFields,
                                totalRecords: rData.TotalRecords

                            });
                        }
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
                // }
                //}
            }
                break;
            case "SORT_DATA_FETCH": {

                if (this.columnSort)
                    this.toggleColSort();
                let tCols = this.state.traitColSelected.concat(this.state.otherTraitCols),
                    pCols = this.state.propertyColSelected.concat(this.state.otherPropertyCols);
                let args = {
                    etcs: '',
                    ezid: '',
                    ezids: '',
                    tfsid: '',
                    pfsid: '',
                    tcols: tCols.join(","),
                    pcols: pCols.join(","),
                    level: -1,
                    etc: this.entityTypeCode.toLowerCase() != "bat" ? this.entityTypeCode : "BAT"

                };

                axios.post(config.url, this.getData({
                    nav: args,
                    sort: true,
                    sortData: action.args,
                    filter: true
                }), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data, noFSTableData;

                        //extrating base columns set from new Response Data.
                        noFSTableData = rData.FinalData.map((rd) => {
                            return {
                                "EZID": rd.EZID,
                                "EntityTypeCode": rd.EntityTypeCode,
                                "Name": rd.Name,
                                "ChildRows": rd.ChildRows || 0,
                                "Level": rd.Level
                            }
                        });
                        this.setState({
                            noFSTableData: noFSTableData,
                            mainTableData: rData.FinalData,
                            totalRecords: rData.TotalRecords
                        })
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "FILTER_DATA_FETCH": {
                let tCols = this.state.traitColSelected.concat(this.state.otherTraitCols),
                    pCols = this.state.propertyColSelected.concat(this.state.otherPropertyCols);


                //set etc to supplied value if enitityTypeCode is also included as filter col
                if (action.data.EntityTypeCode)
                    this.entityTypeCode = action.data.EntityTypeCode.filterValue1;


                let args = {
                    etcs: '',
                    ezid: '',
                    ezids: '',
                    tfsid: '',
                    pfsid: '',
                    tcols: tCols.join(","),
                    pcols: pCols.join(","),
                    level: -1,
                    etc: this.entityTypeCode.toLowerCase() != "bat" ? this.entityTypeCode : "BAT",
                    pn: 1
                };

                axios.post(config.url, this.getData({
                    nav: args,
                    sort: true,
                    filter: true,
                    filterData: action.filter
                }), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data,
                            noFSTableData;

                        //extrating base columns set from new Response Data.
                        noFSTableData = rData.FinalData.map((rd) => {
                            return {
                                "EZID": rd.EZID,
                                "EntityTypeCode": rd.EntityTypeCode,
                                "Name": rd.Name,
                                "ChildRows": rd.ChildRows || 0,
                                "Level": rd.Level
                            }
                        })

                        this.setState({
                            noFSTableData: noFSTableData,
                            mainTableData: rData.FinalData,
                            totalRecords: rData.TotalRecords,
                            currentPage: 1,
                            selectedRow: []
                        })
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "FETCH_TRIALBOOK_FS": {

                axios.get(config.trialFieldsetListUrl + "?cc=TO&module=TRL", {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {
                        let rData = response.data;
                        this.setState({
                            trialbookFSData: rData.Data,
                            trialbookFields: rData.InitialFields.map((f) => f.ColumnLabel)
                        })
                        this.isHydratingData = false
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })

            }
                break;
            case "SEND_RECORDS_TO_ACTION": {
                //handler for both trial and crossing records sending
                //getCount true: will get count only, false  will get total record list
                let data = action.data.join("&"),
                    url = config.tempRecordListUrl;

                axios.post(url, data, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {


                        let data = response.data.Data;
                        if (data.length) {
                            switch (action.module) {
                                case "TRL": {
                                    this.setState({trialbookRecordsCount: data[0].TotalCount})
                                }
                                    break;
                                case "CRO": {
                                    this.setState({
                                        crossingRecords: data,
                                        crossingRecordsCount: data.length,
                                        crossingFields: ["EZID", "EntityTypeCode", "Name"]
                                    })
                                }
                                    break;
                                default:
                                    break;
                            }
                        }

                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            //add selected records to trial book
            case "ADD_NEW_TRIALBOOK": {

                let data = "cc=TO&TrialName=" + action.data.name;

                axios.post(config.createTrialUrl, data, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {
                        let newTrialbookFSData = this.state.trialbookFSData.concat(response.data.Data[0])
                        this.setState({
                                trialbookFSData: newTrialbookFSData
                            },
                            //needed to update the state of trialbook fieldset list and the selected index separately for the scroll to function properly to newly added selected index
                            () => {
                                this.setState({trialbookSelectedIndex: newTrialbookFSData.length - 1});
                            })
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })

            }
                break;
            case "CREATE_NEW_TRAILENTRY": {

                let module = "TRL",
                    ezid = action.data.ezid,
                    args = {
                        cc: "TO",
                        module: module,
                        ezid: ezid
                    }
                axios.post(config.createTrialEntryUrl, args, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data;
                        this.setState({
                            newTrialData: rData.Data,
                            newTrialFields: rData.InitialFields.map((f) => f.ColumnLabel),
                            newTrialEntryDetail: rData.TrialDetail,
                            trialbookRecords: [],
                            trialbookRecordsCount: null
                        });
                        browserHistory.push('/main/newTrialbook/' + ezid);

                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })


            }
                break;
            case "CREATE_CROSSING": {
                axios.post(config.createCrossingUrl, action.data.join("&"), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {


                        //After success ful crossing
                        let data = response.data.Data[0], msg, gender, body;

                        if (data.Error != "") {
                            gender = data.Error.split("x");
                            body =
                                <span>Crossing could not be created with <i className="icon-female"></i>{gender[0]} <i
                                    className="icon-cancel"></i> <i className="icon-male"></i>{gender[1]}</span>;
                            msg = {
                                title: "Error",
                                body: body,
                                error: true
                            }
                        }
                        else if (data.Success != "") {
                            gender = data.Success.split("x");
                            body = <span>Crossing created with <i className="icon-female"></i>{gender[0]} <i
                                className="icon-cancel"></i> <i className="icon-male"></i>{gender[1]}</span>;
                            msg = {
                                title: "Success",
                                body: body,
                                error: false
                            }
                        }

                        let male = this.state.crossingMale.EZID,
                            female = this.state.crossingFemale.EZID,
                            newCrossingRecords = this.state.crossingRecords.filter((f) => {
                                return f.EZID !== male && f.EZID !== female
                            })

                        this.setState({
                            crossingRecords: newCrossingRecords,
                            crossingRecordsCount: newCrossingRecords.length,
                            crossingMale: {},
                            crossingFemale: {}
                        });
                        this.messageHandler(msg);
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "CREATE_BATCH": {

                this.hideModal();

                axios.post(config.createBatchUrl, action.data.join("&"), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        if (response.data.toLowerCase() === "success") {
                            let mainTableData = [], noFSTableData = [];
                            mainTableData = this.state.mainTableData.filter((f) => {
                                if (action.lotsSelected.indexOf(f.EZID) > -1) {
                                    f["ChildRows"] = 1;
                                }

                                delete f.expanded;
                                return f.Level == 0;
                            });

                            noFSTableData = this.state.noFSTableData.filter((f) => {
                                delete f.expanded;
                                return f.Level == 0;
                            });
                            //reset expanded state and removing child rows/records.
                            this.setState({
                                mainTableData: mainTableData,
                                noFSTableData: noFSTableData,
                                dataHistory: []
                            });


                            //show success message for batch created.
                            let messageBody = this.state.selectedRow.length > 1 ? "The batch records are created. You can expand the selected records to check for new batch being created." : "The batch record is created. You can expand the selected record to check for new batch being created."
                            let msg = {
                                title: "Success ",
                                body: messageBody,
                                callback: null,
                                cancel: null,
                                error: false
                            }
                            this.messageHandler(msg)

                        }
                        //if somehow the batch creation fails
                        else if (response.data.toLowerCase() === "fail") {

                            //show failure message for batch creation.
                            let msg = {
                                title: "Error ",
                                body: "The batch records could not be created.",
                                callback: null,
                                cancel: null,
                                error: true
                            }
                            this.messageHandler(msg)

                        }
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "FETCH_ACTIONS_RECORD_LIST": {

                //fetch list of records added to different modules eg, Trialbook, Crossing etc.
                axios.get(config.tempRecordListUrl + "?CC=TO&getCount=false", {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data.Data,
                            crossingData = [],
                            trialData = [];

                        if (rData.length) {
                            rData.forEach((d) => {
                                switch (d.Module) {
                                    case "TRL": {
                                        trialData.push(d);
                                    }
                                        break;
                                    case "CRO": {
                                        crossingData.push(d);
                                    }
                                    default:
                                        break;

                                }
                            })

                            this.setState({
                                trialbookRecordsCount: trialData.length,
                                trialbookRecords: trialData,
                                crossingRecordsCount: crossingData.length,
                                crossingRecords: crossingData
                            })
                        }
                        else {
                            this.setState({
                                trialbookRecordsCount: null,
                                trialbookRecords: [],
                                crossingRecordsCount: null,
                                crossingRecords: []
                            })
                        }

                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "FETCH_TREEHIERARCHY": {
                //typically reqeust server for the hierarchial data of selected Lot number.
                let url = config.hierarchyDataUrl + "?EZID=" + action.data.treeRootId
                axios.get(url, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {
                        //make root node parent null
                        let rData = response.data;
                        if (rData.length == 0) {

                            let modalData = {
                                title: "Not Found",
                                body: "No record found for search item '" + action.data.treeRootId + "'.",
                                callback: null,
                                cancel: null,
                                error: false
                            }
                            this.setState({
                                modal: true,
                                modalData: modalData
                            })
                            // browserHistory.push('/main/hierarchy/' + this.state.treeRootId);
                        }
                        else {


                            this.setState({
                                treeRootId: action.data.treeRootId,
                                treeHierarchyData: rData
                            });
                            browserHistory.push('/main/hierarchy/' + action.data.treeRootId);
                        }
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })
            }
                break;
            case "SEARCH_RECORD": {

                let tCols = this.state.traitColSelected.concat(this.state.otherTraitCols),
                    pCols = this.state.propertyColSelected.concat(this.state.otherPropertyCols);
                let args = {
                    etcs: '',
                    ezid: '',
                    ezids: '',
                    tfsid: '',
                    pfsid: '',
                    tcols: tCols.join(","),
                    pcols: pCols.join(","),
                    level: -1,
                };
                let data = this.getData({nav: args, sort: true, filter: true})
                let lastRowId = this.state.pageSize * this.state.currentPage;

                if (action.data.direction == "P") {
                    lastRowId -= this.state.pageSize - 1;
                    // this.fetchData({type: "PAGINATION_FETCH", args: {pn: pageNo}})
                }

                //adding query , direction and current record number of result set.
                data += "&FTSValue=" + action.data.query + "&FindDir=" + action.data.direction + "&LastRowId=" + lastRowId;

                axios.post(config.searchUrl, data,
                    {
                        "withCredentials": true,
                        headers: {
                            'enzauth': this.state.token
                        }
                    })
                    .then((response) => {


                        if (response.data.Data == "") {
                            let body = '';
                            if (action.data.direction == "") {
                                body = "Sorry, no result found for '" + action.data.query + "'. Please try somthing else.";
                            }
                            else if (action.data.direction == "P") {
                                body = "Sorry, no previous result found for '" + action.data.query + "'.";
                            }
                            else if (action.data.direction == "N") {
                                body = "Sorry, no further result found for '" + action.data.query + "'. ";
                            }
                            let modalData = {
                                title: "Not Found",
                                body: body,
                                callback: null,
                                cancel: null,
                                error: false
                            }
                            this.setState({
                                modal: true,
                                modalData: modalData
                            })
                        }
                        else {
                            let lastSearchedIndex = this.state.lastSearchedIndex,
                                regEx = new RegExp(action.data.query, "gi"),
                                fields = this.state.fields,
                                selectedRow = [],
                                localIndex;

                            localIndex = response.data.Data.findIndex((row, index) => {
                                for (let i = 0; i < fields.length; i++) {
                                    if (row[fields[i]] && row[fields[i]].toString().match(regEx) != null) {
                                        selectedRow.push(row.EZID);
                                        return true;
                                    }
                                }
                            });

                            //extrating base columns set from new Response Data.
                            let noFSTableData = response.data.Data.map((rd) => {
                                return {
                                    "EZID": rd.EZID,
                                    "EntityTypeCode": rd.EntityTypeCode,
                                    "Name": rd.Name,
                                    "ChildRows": rd.ChildRows || 0,
                                    "Level": rd.Level
                                }
                            });

                            this.setState({
                                noFSTableData: noFSTableData,
                                lastSearchedIndex: localIndex,
                                selectedRow: selectedRow,
                                mainTableData: response.data.Data,
                                currentPage: response.data.PageNumber,
                            });

                        }
                        //allow next search
                        this.searching = false;
                    })
                    .catch((response) => {
                        this.searching = false;
                        this.errorHandler(response);
                    })
            }
                break;
            case "FETCH_FILTERED_BY_YEAR": {
                this.toggleYear();
                axios.post(config.url, this.getData({
                    nav: action.data,
                    filter: true,
                    sort: true
                }), {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data;
                        let mergedObj = rData.InitialData ? rData.InitialData : this.state.noFSTableData.concat([]),
                            currentFields = this.state.noFSfields.concat([]),
                            sortColumnList;

                        //no col response
                        if (rData.Fields.length == 0) {
                            //reset all data
                            sortColumnList = Object.assign({}, this.state.noFSFieldLabels);
                            let currentFields = this.state.noFSfields;

                            //re-adjust column sort order if any columns are removed while fieldset are swtiched
                            this.updateSortColumns(currentFields, sortColumnList);


                            //removed filter applied if column no longer exists in result set from server.
                            this.updateFilterColumns(currentFields);

                            let noFSTableData = rData.InitialData ? rData.InitialData : [];
                            if (rData.FinalData) {
                                //extrating base columns set from new Response Data.
                                noFSTableData = rData.FinalData.map((rd) => {
                                    return {
                                        "EZID": rd.EZID,
                                        "EntityTypeCode": rd.EntityTypeCode,
                                        "Name": rd.Name,
                                        "ChildRows": rd.ChildRows || 0,
                                        "Level": rd.Level
                                    }
                                });
                            }

                            this.setState({
                                mainTableData: rData.FinalData ? rData.FinalData : noFSTableData.concat([]),
                                noFSTableData: noFSTableData,
                                fields: this.state.noFSfields,
                                traitFieldsetLabels: {},
                                propertyFieldsetLabels: {},
                                traitColSelected: [],
                                propertyColSelected: [],
                                sortColumnList: this.state.noFSFieldLabels,
                                fisrtColSortList: this.state.noFSFieldLabels,
                                totalRecords: rData.TotalRecords,
                                currentPage: 1
                            })
                        }
                        else {
                            //extracting property fields and preserving in state
                            let propertyFields = [],
                                pNewFieldLabels = [],
                                traitFields = [],
                                tNewFieldLabels = [],
                                fieldsInfo = {};


                            rData.Fields.forEach((f) => {
                                if (f.Property) {
                                    if (this.state.otherPropertyCols.indexOf(f.TraitID) < 0)
                                        propertyFields.push(f.TraitID);
                                    pNewFieldLabels[f.TraitID] = f.ColumnLabel;
                                } else {
                                    if (this.state.otherTraitCols.indexOf(f.TraitID) < 0)
                                        traitFields.push(f.TraitID)
                                    tNewFieldLabels[f.TraitID] = f.ColumnLabel
                                }
                                //bulid current field list
                                currentFields.push(f.TraitID);
                                //build fields information
                                if (fieldsInfo[f.TraitID] == undefined)
                                    fieldsInfo[f.TraitID] = f;
                            });


                            let sortColumnList = Object.assign({}, this.state.noFSFieldLabels, pNewFieldLabels, tNewFieldLabels);
                            let noFSTableData;
                            if (rData.FinalData) {
                                mergedObj = rData.FinalData;

                                //extrating base columns set from new Response Data.
                                noFSTableData = rData.FinalData.map((rd) => {
                                    return {
                                        "EZID": rd.EZID,
                                        "EntityTypeCode": rd.EntityTypeCode,
                                        "Name": rd.Name,
                                        "ChildRows": rd.ChildRows || 0,
                                        "Level": rd.Level
                                    }
                                });
                                this.setState({noFSTableData: noFSTableData})
                            }
                            else {
                                noFSTableData = (rData.InitialData != undefined) ? rData.InitialData : this.state.noFSTableData.concat([]);
                                //trait fieldset data
                                if (rData.ObservationData != undefined) {
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.ObservationData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }

                                //property fieldset data
                                if (rData.PropertyData != undefined) {
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.PropertyData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }

                            //re-adjust column sort order if any columns are removed while fieldset are swtiched
                            this.updateSortColumns(currentFields, sortColumnList);

                            //removed filter applied if column no longer exists in result set from server.
                            this.updateFilterColumns(currentFields);

                            //final mergedobj ,and fields state update
                            this.setState({
                                propertyFieldsetLabels: pNewFieldLabels,
                                propertyColSelected: propertyFields,
                                propertyfieldColsRemoved: [],
                                traitFieldsetLabels: tNewFieldLabels,
                                traitColSelected: traitFields,
                                traitfieldColsRemoved: [],
                                sortColumnList: sortColumnList,

                                firstColSortList: sortColumnList,
                                /* secondColSortList: secondColSortList,
                                 thirdColSortList: thirdColSortList,*/
                                mainTableData: mergedObj,
                                fields: currentFields,
                                fieldsInfo: fieldsInfo,
                                totalRecords: rData.TotalRecords,
                                currentPage: 1,
                                noFSTableData: noFSTableData

                            });
                        }
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })


            }
                break;
            case "REMOVE_CROSSING_RECORDS": {
                this.hideModal();

                let data = action.data.join("&"),
                    url = config.tempRecordListUrl;

                axios.post(url, data, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let data = response.data.Data,
                            crossingMale = [],
                            crossingFemale = [];

                        //check for validity of selected male and female.
                        if (Object.keys(this.state.crossingMale).length) {
                            crossingMale = data.filter((f) => f.EZID === this.state.crossingMale.EZID)
                        }
                        if (this.state.crossingFemale.EZID) {
                            crossingFemale = data.filter((f) => f.EZID === this.state.crossingFemale.EZID)
                        }

                        this.setState({
                            crossingRecords: data,
                            crossingRecordsCount: data.length,
                            crossingFields: ["EZID", "EntityTypeCode", "Name"],
                            crossingMale: crossingMale.length ? crossingMale[0] : {},
                            crossingFemale: crossingFemale.length ? crossingFemale[0] : {},
                            selectedCrossingList: []
                        });
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });


            }
                break;
            case "CREATE_GROUP": {

                /*  let url = config.createGroupUrl,
                 data = this.getAdminData({"GroupName": action.args.name, "Remark": action.args.remark});
                 */


                /*
                 //this was old way of doing it with group first created in frist request.
                 axios.post(url, data, {withCredentials: true})
                 .then((response) => {

                 let rData = response.data;
                 let newGroupWithGroupLineMapping = Object.assign({}, rData[0], {
                 "groupLines": this.state.mySelection.map(mS => Object.assign({}, mS, {checked: true}))
                 });
                 let newGroups = this.state.newGroups.concat(newGroupWithGroupLineMapping);
                 this.setState({
                 newGroups: newGroups,
                 createGroupModal: false
                 })

                 })
                 .catch((response) => {
                 this.errorHandler(response);
                 });*/
            }
                break;
            case "CREATE_GROUP_GROUPLINES": {

                let url = config.createGroupAndGroupLinesUrl,
                    data = action.args;

                axios.post(url, data, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let msg = {
                            title: "Success",
                            body: "Group(s) are created with selected record(s).",
                            error: false
                        };

                        this.messageHandler(msg);
                        this.setState({newGroups: []})
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    })

            }
                break;
            case "FETCH_GROUPS": {
                let url = config.getGroupsUrl;

                axios.get(url, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data;
                        //injected expanded state to toggle grouplines.
                        this.setState({groups: rData.map(g => Object.assign(g, {expanded: false}))});

                        browserHistory.push('/main/groups/');
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;

            case "FETCH_TOKEN": {

                //if multiple requests are made in sequence and token fetch is
                if (this.isTokenValid()) {
                    !!action.callback && action.callback();
                }
                else {
                    //fetch user  token first
                    axios.get(config.tokenServiceUrl, {
                        "withCredentials": true
                    })
                        .then((response) => {
                            if (response.data.token) {

                                localStorage.token = response.data.token;
                                localStorage.expiresIn = response.data.expiresIn
                                this.setState({
                                    token: response.data.token,
                                    issuedOn: response.data.issuedOn,
                                    expiresIn: response.data.expiresIn
                                }, () => !!action.callback && action.callback())
                            }
                        })
                        .catch((response) => {
                            this.errorHandler(response);
                        });
                }
            }
                break;
            case "FETCH_COUNTRIES": {

                axios.get(config.countryListUrl, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {
                        this.setState({countries: response.data})
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;
            case "CREATE_TRIAL": {

                let url = config.trialPlanningUrl;
                axios.post(url, action.data, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data,
                            trialEZID = rData.ezid;

                        //filter grouplines selected
                        let selectedGroupLines = this.state.groups.filter(gL => (gL.EntityTypeCode !== "GRP" && gL.expanded));

                        //generate payload for trial entries
                        let payload = selectedGroupLines.map(l => {
                            return {
                                "name": l.Name,
                                "fileNumber": '',
                                "cropCode": "TO",
                                'trialEntryGuid': l.EZID,
                                'trialID': trialEZID
                            }
                        })

                        //hide create trial modal
                        this.setState({
                            createTrialModal: false
                        });

                        //Chained request for adding grouplines to newly craeted trial.
                        axios.post(config.createTrialLinesPlanningUrl, payload, {
                            "withCredentials": true,
                            headers: {
                                'enzauth': this.state.token
                            }
                        })
                            .then((response) => {
                                let msg = {
                                    title: "Success",
                                    body: "Selected grouplines are added to newly created Trial",
                                    error: false
                                };
                                this.messageHandler(msg);
                            })
                            .catch((response) => {
                                this.errorHandler(response);
                            });
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;
            case "FETCH_GROUPLINES": {

                let url = config.getGroupLinesUrl + "?ezid=" + action.args.groupEZID;
                axios.get(url, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let rData = response.data.map(d => Object.assign(d, {expanded: true}));

                        let groups = this.state.groups;
                        //push grouplines into respective groups object.
                        let newGroup = groups.map(g => (g.EZID == action.args.groupEZID) ? Object.assign(g, {
                                groupLines: rData,
                                expanded: true
                            }) : g);
                        let selectedGroupIndex = newGroup.findIndex(g => g.EZID == action.args.groupEZID);
                        newGroup.splice(selectedGroupIndex + 1, 0, ...rData);

                        this.setState({
                            groups: newGroup
                        })
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;

            case "FETCH_TRIALS": {

                let url = config.trialPlanningUrl;
                axios.get(url, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {
                        this.setState({
                            trials: response.data.map(t => Object.assign({}, t, {checked: false}))
                        })
                        browserHistory.push('/main/trials/');
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });

            }
                break;
            case "FETCH_TRIALLINES": {

                let url = config.getTrialLinesPlanningUrl.replace("trialID", action.data.trialID);
                axios.get(url, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {
                        this.setState({
                            trialLines: response.data.map(tL => Object.assign({}, tL, {checked: false})),
                            selectedTrialLineIndexes: []
                        })
                        browserHistory.push('/main/trials/' + action.data.trialID);
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });

            }
                break;
            case "MAKE_TRIALS_READY": {

                let url = config.trialReadyPlanningUrl;

                axios.put(url, {ezids: action.data.ezids}, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        let trials = this.state.trials;

                        let msg = {
                            title: "Success",
                            body: "Selected Trial(s) are set to ready state.",
                            error: false
                        };

                        this.messageHandler(msg);


                        trials.forEach(t => {
                            if (t.checked) {
                                t.completed = true;
                                t.checked = !t.checked;
                            }
                        });

                        this.setState({
                            trials: trials
                        })
                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });

            }
                break;
            case "TRIALLINE_NAMING": {
                //from trialLines

                let url = config.trialLineNamingPlanningUrl;
                axios.put(url, action.data.payload, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                        //makeing ezid : name mapping for checking.
                        let ezidNameMapped = {};
                        response.data.forEach(r => ezidNameMapped[r.ezid] = r.name);

                        let trialLines = this.state.trialLines.map(tL => {
                            if (ezidNameMapped[tL.ezid] !== undefined) {
                                return Object.assign({}, tL, {name: ezidNameMapped[tL.ezid]})
                            }
                            return tL
                        });


                        let msg = {
                            title: "Success",
                            body: "Trial lines names are updated.",
                            error: false
                        };
                        this.messageHandler(msg);

                        this.setState({
                            trialLines: trialLines,
                            trailLineNamingModal: false
                        });

                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;
            case "TRIALLINE_NAMING_BYTRIALS": {
                //from trials
                let url = config.trialLineNamingByTrialsPlanningUrl;
                    axios.put(url, action.data.payload, {
                        "withCredentials": true,
                        headers: {
                            'enzauth': this.state.token
                        }
                    })
                    .then((response) => {

                        let msg = {
                            title: "Success",
                            body: "Trial lines names are updated.",
                            error: false
                        };
                        this.messageHandler(msg);
                        this.setState({
                            trailLineNamingModal: false
                        })
                        this.makeTrialsReady();

                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;
            case "FETCH_TRIAL_PROPERTIES": {
                let url = config.getTrialPropertiesPlanningUrl;
                axios.get(url, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                         this.setState({
                         trialProperties: response.data,
                         })


                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;
            case "CREATE_TRIAL_PROPERTIES": {
                let url = config.getTrialPropertiesPlanningUrl;
                axios.post(url, action.data, {
                    "withCredentials": true,
                    headers: {
                        'enzauth': this.state.token
                    }
                })
                    .then((response) => {

                    let trialProperties = this.state.trialProperties;
                        trialProperties.push(response.data);

                        this.setState({
                            trialProperties: trialProperties,
                            trialPropertyCreationModal: false
                        })


                        let msg = {
                            title: "Success",
                            body: "New Trial Property \""+response.data.name +"\" is created.",
                            error: false
                        };

                        this.messageHandler(msg);


                    })
                    .catch((response) => {
                        this.errorHandler(response);
                    });
            }
                break;
            default:
            //do nothing for now
            //  console.log("Fetch data didn't match any case")
        }
    }

    //Toggle Full Screen via HTML5 Full Screen API
    toggleFullScreen(e) {
        e.preventDefault();
        let element = document.documentElement;
        //
        if (this.state.fullscreenMode) {
            //Exit Full Screen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        else {
            //Enter full scree mode
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        this.setState({fullscreenMode: !this.state.fullscreenMode});

    }

    //error handler
    errorHandler(res) {
        let response =res.response;
        let modalData = {
            title: (response.data.code !== "" ) ? "Error : "+ response.data.code :  ("Status " + response.status + " " + response.statusText),
            body: res.response.data.message,
            callback: null,
            cancel: null,
            error: true
        }

        this.setState({
            modal: true,
            modalData: modalData
        })
    }

    //message popup handler
    messageHandler(msg) {

        let modalData = {
            title: msg.title ? msg.title : '',
            body: msg.body,
            callback: msg.callback ? msg.callback : null,
            cancel: msg.cancel ? msg.cancel : null,
            error: msg.error || false
        }
        this.setState({
            modal: true,
            modalData: modalData
        })
    }

    // the render function to apply any changes applied to state as the interaction progresses
    render() {

        return (
            <div>
                <Pageheader
                    toggleFullScreen={this.toggleFullScreen}
                    fullscreenMode={this.state.fullscreenMode}
                    addToTrialbook={this.addToTrialbook}
                    addToCrossing={this.addToCrossing}
                    addToMySelection={this.addToMySelection}
                    selectionCount={this.state.selectionCount}
                    trialbookRecords={this.state.trialbookRecords}
                    trialbookRecordsCount={this.state.trialbookRecordsCount}
                    crossingRecordsCount={this.state.crossingRecordsCount}
                    createBatch={this.createBatch}
                    goToCrossing={this.goToCrossing}
                    goToTrialBook={this.goToTrialBook}
                    gotoHierarchyData={this.gotoHierarchyData}
                    searchVisibility={this.state.searchVisibility}
                    search={this.search}
                    fetchGroups={this.fetchGroups}
                    fetchTrials={this.fetchTrials}
                    //  clearSearch={this.clearSearch}
                    mySelection={this.state.mySelection}
                    toggleSearchBox={this.toggleSearchBox}
                />

                <div className="dataContainer"
                     data-yearlist={this.yearList ? "shown" : "hidden"}
                     data-colsort={this.columnSort ? "shown" : "hidden"}
                     data-sidebar={this.sidebar ? "shown" : "hidden"}
                     data-propertyfieldset={this.propertyFieldset ? "shown" : "hidden"}
                     data-traitfieldset={this.traitFieldset ? "shown" : "hidden"}
                     data-columnlist={this.columnList ? "shown" : "hidden"}
                     data-trialbook={this.trialbook ? "shown" : "hidden"}
                     ref="dataContainer"
                >

                    <main className="contentWrapper" style={{width: this.state.mainWrapperWidth}}>
                        {
                            (() => {
                                let pathName = this.props.routes[this.props.routes.length - 1].name;
                                switch (pathName) {
                                    case "trialbook":
                                        return React.cloneElement(this.props.children, {

                                            fetchTrialbookFS: this.fetchTrialbookFS,
                                            selectTrialbook: this.selectTrialbook,
                                            addNewTrialbook: this.addNewTrialbook,
                                            createNewTrialEntry: this.createNewTrialEntry,
                                            fetchActionRecorddList: this.fetchActionRecorddList,
                                            disableSidebar: this.disableSidebar,
                                            trialbookFSData: this.state.trialbookFSData,
                                            trialbookFields: this.state.trialbookFields,
                                            tbTableWidth: this.state.tbTableWidth,
                                            tbTableHeight: this.state.tbTableHeight,
                                            trialbookSelectedIndex: this.state.trialbookSelectedIndex,


                                        })
                                        break;
                                    case "newTrialbook":
                                        return React.cloneElement(this.props.children, {
                                            disableSidebar: this.disableSidebar,
                                            createNewTrialEntry: this.createNewTrialEntry,
                                            fetchActionRecorddList: this.fetchActionRecorddList,
                                            newTrialData: this.state.newTrialData,
                                            newTrialFields: this.state.newTrialFields,
                                            newTrialEntryDetail: this.state.newTrialEntryDetail,
                                            tableWidth: this.state.tableWidth,
                                            tableHeight: this.state.tableHeight
                                        })
                                        break;
                                    case "crossing":
                                        return React.cloneElement(this.props.children, {
                                            disableSidebar: this.disableSidebar,
                                            selectCrossingList: this.selectCrossingList,
                                            removeCrossingList: this.removeCrossingList,
                                            selectFemale: this.selectFemale,
                                            selectMale: this.selectMale,
                                            createCrossing: this.createCrossing,
                                            fetchActionRecorddList: this.fetchActionRecorddList,
                                            selectedMale: this.state.crossingMale,
                                            selectedFemale: this.state.crossingFemale,
                                            crossingRecords: this.state.crossingRecords,
                                            crossingFields: this.state.crossingFields,
                                            selectedCrossingList: this.state.selectedCrossingList,
                                            fetchCrossingRecordList: this.fetchCrossingRecordList,
                                            tableWidth: this.state.tableWidth,
                                            tableHeight: this.state.tableHeight,
                                            crossingSuccess: this.state.crossingSuccess
                                        })
                                        break;
                                    case "treeChart":
                                        return React.cloneElement(this.props.children, {
                                            disableSidebar: this.disableSidebar,
                                            fetchHierarchy: this.fetchHierarchy,
                                            treeRootId: this.state.treeRootId,
                                            treeHierarchyData: this.state.treeHierarchyData
                                        })
                                        break;
                                    case "tableData":
                                        return React.cloneElement(this.props.children, {
                                            enableSidebar: this.enableSidebar,
                                            initialFetch: this.initialFetch,
                                            fetchData: this.fetchData,
                                            collapseRow: this.collapseRow,
                                            onCellClick: this.onCellClick,
                                            onPageSizeChange: this.onPageSizeChange,
                                            onPagination: this.onPagination,
                                            onExpandRow: this.onExpandRow,
                                            singleSortColumnSelection: this.singleSortColumnSelection,
                                            submitFilter: this.submitFilter,
                                            clearFilter: this.clearFilter,
                                            toggleSearchBox: this.toggleSearchBox,
                                            mainData: this.state.mainTableData,
                                            etcList: this.state.etcList,
                                            entityTypeCode: this.entityTypeCode,
                                            fields: this.state.fields,
                                            fieldsInfo: Object.assign({}, this.state.noFSFieldsInfo, this.state.fieldsInfo),
                                            tableWidth: this.state.tableWidth,
                                            tableHeight: this.state.tableHeight,
                                            dataHistory: this.state.dataHistory,
                                            currentPage: this.state.currentPage,
                                            totalRecords: this.state.totalRecords,
                                            selectedRow: this.state.selectedRow,
                                            highLightedCol: this.state.highLightedCol,
                                            pageSize: this.state.pageSize,
                                            fieldLabels: this.state.fieldLabels,
                                            traitFieldsetLabels: this.state.traitFieldsetLabels,
                                            propertyFieldsetLabels: this.state.propertyFieldsetLabels,
                                            colSortDirs: this.state.colSortDirs,
                                            filterApplied: this.state.filterApplied,
                                            lastSearchedIndex: this.state.lastSearchedIndex,
                                            searchedText: this.state.searchedText,


                                            toggleSidebar: this.toggleSidebar,
                                            toggleYear: this.toggleYear,
                                            applyYearFilter: this.applyYearFilter,
                                            toggleSelectedYear: this.toggleSelectedYear,
                                            toggleColSort: this.toggleColSort,
                                            toggleProperty: this.toggleProperty,
                                            toggleColumn: this.toggleColumn,
                                            toggleTrait: this.toggleTrait,
                                            onFieldsetSelection: this.onFieldsetSelection,

                                            onTraitColToggle: this.onTraitColToggle,
                                            onPropertyColToggle: this.onPropertyColToggle,
                                            applyColSelection: this.applyColSelection,
                                            cancelChooseColumn: this.cancelChooseColumn,


                                            applySort: this.applySort,
                                            clearSort: this.clearSort,

                                            sortColumnSelection: this.sortColumnSelection,
                                            sortOrderChange: this.sortOrderChange,
                                            disabledSidebar: this.state.disabledSidebar,
                                            yearList: this.state.yearList,
                                            fieldsets: this.state.fieldsets,
                                            propertyFieldsetSelected: this.state.propertyFieldsetSelected,
                                            traitFieldsetSelected: this.state.traitFieldsetSelected,
                                            columnsList: this.state.columnsList,
                                            traitColSelected: this.state.traitColSelected,

                                            propertyColSelected: this.state.propertyColSelected,
                                            traitfieldColsRemoved: this.state.traitfieldColsRemoved,
                                            otherTraitCols: this.state.otherTraitCols,
                                            otherPropertyCols: this.state.otherPropertyCols,
                                            propertyfieldColsRemoved: this.state.propertyfieldColsRemoved,

                                            firstColSortList: this.state.firstColSortList,
                                            firstSortColumn: this.state.firstSortColumn,
                                            firstColSortOrder: this.state.firstColSortOrder,

                                            secondColSortList: this.state.secondColSortList,
                                            secondSortColumn: this.state.secondSortColumn,
                                            secondColSortOrder: this.state.secondColSortOrder,

                                            thirdColSortList: this.state.thirdColSortList,
                                            thirdSortColumn: this.state.thirdSortColumn,
                                            thirdColSortOrder: this.state.thirdColSortOrder,


                                        })
                                        break;

                                    case "myselection":
                                        return React.cloneElement(this.props.children, {
                                            addGroup: this.addGroup,
                                            cancelGroupCreation: this.cancelGroupCreation,
                                            showGroupCreation: this.showGroupCreation,
                                            toggleSelectionGroupLine: this.toggleSelectionGroupLine,
                                            createGroupAndGroupLines: this.createGroupAndGroupLines,
                                            mySelection: this.state.mySelection,
                                            tableWidthFull: this.state.tableWidthFull,
                                            tableHeightFull: this.state.tableHeightFull,
                                            createGroupModal: this.state.createGroupModal,
                                            createTrialModal: this.state.createTrialModal,
                                            newGroups: this.state.newGroups,
                                            newTrials: this.state.newTrials,
                                        })
                                        break;
                                    case "groups":
                                        return React.cloneElement(this.props.children, {
                                            fetchGroups: this.fetchGroups,
                                            toggleGroupLines: this.toggleGroupLines,
                                            createTrial: this.creatTrial,
                                            cancelTrialCreation: this.cancelTrialCreation,
                                            showTrialCreation: this.showTrialCreation,
                                            fetchCountries: this.fetchCountries,
                                            groups: this.state.groups,
                                            newTrials: this.state.newTrials,
                                            tableWidthFull: this.state.tableWidthFull,
                                            tableHeightFull: this.state.tableHeightFull,
                                            createTrialModal: this.state.createTrialModal,
                                            countries: this.state.countries
                                        })
                                        break;

                                    case "trials":
                                        return React.cloneElement(this.props.children, {
                                            fetchTrials: this.fetchTrials,
                                            makeTrialsReady: this.makeTrialsReady,
                                            toogleTrialReady: this.toogleTrialReady,
                                            cancelTrialLineNaming: this.cancelTrialLineNaming,
                                            showTrialNamingModal: this.showTrialNamingModal,
                                            createTrialLineNaming: this.createTrialLineNaming,
                                            tableWidthFull: this.state.tableWidthFull,
                                            tableHeightFull: this.state.tableHeightFull,
                                            selectedTrialIndex: this.state.selectedTrialIndex,
                                            trials: this.state.trials,
                                            trailLineNamingModal: this.state.trailLineNamingModal,
                                            selectedTrialLineIndexes: this.state.selectedTrialLineIndexes,



                                        })
                                        break;
                                    case "trialLines":
                                        return React.cloneElement(this.props.children, {
                                            fetchTrialLines: this.fetchTrialLines,
                                            cancelTrialLineNaming: this.cancelTrialLineNaming,
                                            showTrialNamingModal: this.showTrialNamingModal,
                                            toggleTrialLinesCheck: this.toggleTrialLinesCheck,
                                            createTrialLineNaming: this.createTrialLineNaming,
                                            selectedTrialLineIndexes: this.state.selectedTrialLineIndexes,
                                            tableWidthFull: this.state.tableWidthFull,
                                            tableHeightFull: this.state.tableHeightFull,
                                            trialLines: this.state.trialLines,
                                            trailLineNamingModal: this.state.trailLineNamingModal,

                                        })

                                        break;
                                    case "trialProperties":
                                        return React.cloneElement(this.props.children, {
                                            fetchTrialProperties: this.fetchTrialProperties,
                                            showTrialPropertyCreationModal: this.showTrialPropertyCreationModal,
                                            cancelTrialPropertyCreation: this.cancelTrialPropertyCreation,
                                            createTrialProperty: this.createTrialProperty,

                                            trialPropertyCreationModal: this.state.trialPropertyCreationModal,
                                            tableWidthFull: this.state.tableWidthFull,
                                            tableHeightFull: this.state.tableHeightFull,
                                            trialProperties: this.state.trialProperties

                                        })
                                        break;
                                    default:
                                        return <NotFound/>
                                        break;
                                }
                            })()
                        }

                    </main>
                </div>

                <div className="loading" ref='loading' data-hydrating="hidden"><span>
                    <i className="icon-spin4 animate-spin"></i></span></div>

                <div className="modalWrapper" style={{display: this.state.modal ? "block" : "none"}}>
                    <div className={this.state.modalData.error ? "modal error" : 'modal message'}>
                        <span className="close" title="Close" onClick={this.hideModal}><i
                            className="icon-cancel"></i></span>
                        <h4>{this.state.modalData.title}</h4>
                        <p className={this.state.modalData.error ? 'error' : ''}>{this.state.modalData.body}</p>
                        <div className="actionBtns">
                            <button
                                onClick={this.state.modalData.callback != null ? this.state.modalData.callback : this.hideModal }
                                title="Ok"> Ok
                            </button>
                            <button
                                style={{display: this.state.modalData.callback != null ? 'block' : 'none'}}
                                onClick={this.state.modalData.cancel != null ? this.state.modalData.cancel : this.hideModal }
                                title="Cancel"
                            > Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

        //fetchToken for the first time
        this.fetchData({type: "FETCH_TOKEN"});

        this.resizeTable();
        window.addEventListener('resize', this.onResize, false);

        //a Promise polyfill for IE coz IE sucks
        require('es6-promise').polyfill();

        //show /hide indicator at begining of request and end of request respectively
        this.requestInterceptor = axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            this.showLoading();
            return config;
        }.bind(this), function (error) {
            this.hideLoading();
            // Do something with request error
            return Promise.reject(error);
        }.bind(this));

        // Add a response interceptor
        this.responseInterceptor = axios.interceptors.response.use(function (response) {
            // Do something with response data
            this.hideLoading();
            return response;
        }.bind(this), function (error) {
            this.hideLoading();
            // Do something with response error
            return Promise.reject(error);
        }.bind(this));
    }

    /*
     * Clearing asynchronus actions while unmounting,
     * Needed for avoiding warning message in console as setstate, setTimeout, and axios interceptor
     * are asynchronus action.
     * */
    componentWillUnmount() {

        /*
         * Needed for avoiding warning message in console as setstate, setTimeout, and axios interceptor are asynchronus action.
         * */
        clearTimeout(this._updateTimer);
        window.removeEventListener('resize', this.onResize, false);

        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }


}

export default App;
