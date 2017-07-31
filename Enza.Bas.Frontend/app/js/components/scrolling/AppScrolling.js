import React from 'react';
import 'babel-polyfill';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import ReactDOM from 'react-dom';
import Pageheader from './Pageheader';
import Sidebar from './Sidebar';
import axios from 'axios';
import config from '../../config';
import ScrollTabledata from "./Scrolltabledata";

class AppScrolling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noFSTableData: [],
            mainTableData: [],
            noFSfields: [],
            fields: [],
            noFSFieldLabels: {"EZID": "EZID", "EntityTypeCode": "EntityTypeCode"},
            fieldLabels: {"EZID": "EZID", "EntityTypeCode": "EntityTypeCode"},
            traitFieldsetLabels: {},
            propertyFieldsetLabels: {},
            columnsList: [],

            propertyFieldsetSelected: null,
            traitFieldsetSelected: null,

            propertyFieldsetValue: null,
            traitFieldsetValue: null,

            tableWidth: 500,
            tableHeight: 500,

            sidebar: true,
            yearList: false,
            fieldsets: [],
            propertyFieldset: false,
            traitFieldset: false,
            columnList: false,

            dataHistory: [],

            currentPage: 1,
            totalRecords: null,
            pageSize: 25,

            serverUrl: config.url,
            pathName: '',
            searchQuery: {},
            filterQuery: [],
            selectedRow: [],
            highLightedCol: null,

            showLoading: false,
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
                cc:"TO",
                cgid:1,
                sc:"ezid",
                so:"ASC",
                ps:25,
                pn:1,
                etc:"BAT",
                level:-1
            },
            filterData:{

            },

            trialbookRecords: [],
            tbTableWidth: 300,
            tbTableHeight: 300
            // selected columns either individual or from fieldsets
        };

        this.initialFetch= this.initialFetch.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.toggleYear = this.toggleYear.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.toggleColumn = this.toggleColumn.bind(this);
        this.toggleTrait = this.toggleTrait.bind(this);
        this.onResize = this.onResize.bind(this);
        this.resizeTable = this.resizeTable.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.collapseRow = this.collapseRow.bind(this);
        this.parseUrl = this.parseUrl.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.getScrollData = this.getScrollData.bind(this);
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


    }

    /*
     * Function to extract necessary info from url provided
     * currently only pathname(with hostname) and search queries are extracted and save,
     * further extraction may be possible in future if required.
     * Accepts url string
     * */
    parseUrl(serverUrl) {
        if (serverUrl.indexOf("?") >= 0) {
            //has query or filter params
            var sUrl = serverUrl.split("?");
            var qryParams = {};
            (sUrl[1].split("&")).forEach(function (q) {
                var qArr = q.split("=");
                qryParams[qArr[0]] = qArr[1];
            });

            this.setState({
                pathName: sUrl[0],
                searchQuery: qryParams
            })
        }
    }

    /*
     * A utility function to get new url with updated search query value
     * Accepts search query field and corresponding value
     * Returns reconstructed url.
     * */
    getUrl(params, pathname) {
        //queryParam,value
        var qryParams = this.state.searchQuery;
        for (let key in params)
            qryParams[key] = params[key];
        var searchQryReconstructed = [];

        /*var filterParams = '';
         this.state.filterQuery.forEach(function (f, index) {
         filterParams += "&f[" + index + "].fn=" + f.columnKey;
         filterParams += "&f[" + index + "].ft=" + f.dataType;
         filterParams += "&f[" + index + "].fv=" + f.filterValue;
         filterParams += "&f[" + index + "].ex=" + f.expression;
         filterParams += "&f[" + index + "].op=" + f.operator;
         })*/

        for (let key in qryParams) {
            searchQryReconstructed.push(key + "=" + qryParams[key]);
        }
        let pathName = (pathname != undefined) ? pathname : this.state.pathName;
        let url = pathName + "?" + searchQryReconstructed.join("&");// + filterParams;
        return url;

    }

    initialFetch(){
        this.fetchData({type:"INITIAL_FETCH"})
    }

    getScrollData(args){
        let newNavData = Object.assign({},this.state.navData,args);
        this.setState({navData: newNavData});
        let qry = [];
        for (let key in newNavData) {
            qry.push(key + "=" + newNavData[key]);
        }
        return qry.join("&");

    }

    toggleSidebar(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.state.yearList)
            this.toggleYear();
        if (this.state.propertyFieldset)
            this.toggleProperty();
        if (this.state.traitFieldset)
            this.toggleTrait();
        if (this.state.columnList)
            this.toggleColumn();
        this.setState({sidebar: !this.state.sidebar}, function () {

            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("resize", false, true);
            setTimeout(window.dispatchEvent(evt), 0);
        })

    }

    toggleYear(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.state.propertyFieldset)
            this.toggleProperty();
        if (this.state.traitFieldset)
            this.toggleTrait();
        if (this.state.columnList)
            this.toggleColumn();
        this.setState({yearList: !this.state.yearList})
    }

    toggleProperty(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.state.yearList)
            this.toggleYear();
        if (this.state.traitFieldset)
            this.toggleTrait();
        if (this.state.columnList)
            this.toggleColumn();
        this.setState({propertyFieldset: !this.state.propertyFieldset})
    }

    toggleTrait(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.state.yearList)
            this.toggleYear();
        if (this.state.propertyFieldset)
            this.toggleProperty();
        if (this.state.columnList)
            this.toggleColumn();

        this.setState({traitFieldset: !this.state.traitFieldset}, function () {
            //false means showing it up now...
            // tirgger scrollintoviewifneeded here
            //Todo: need to check if Scrollintoviewifneeded best be here or somewhere else
            if (this.state.traitFieldset) {
                let selectedRow = ReactDOM.findDOMNode(this).querySelector(".traitFieldset .selected")
                if (selectedRow !== null) {
                    scrollIntoViewIfNeeded(selectedRow, false, {duration: 500, easing: "easeIn"})
                }
            }
        }.bind(this))
    }

    toggleColumn(e) {
        //if a link is pressed
        if (e != undefined) e.preventDefault();
        if (this.state.yearList)
            this.toggleYear();
        if (this.state.propertyFieldset)
            this.toggleProperty();
        if (this.state.traitFieldset)
            this.toggleTrait();
        this.setState({columnList: !this.state.columnList})
    }

    onPagination(pageNo) {
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
                "tfsid": ''
            }

        this.fetchData({type: "HIERARCHY_FETCH", args: args, data: {rowIndex: index}})
    }

    onCellClick(args) {

        let ezid = this.state.mainTableData[args.index].EZID,
            selectedRow = this.state.selectedRow.valueOf();

        if (args.ctrlKey) {

            if (selectedRow.indexOf(ezid) == -1) {
                this.setState({selectedRow: selectedRow.concat(ezid)});
            }
            else {
                this.setState({
                    selectedRow: selectedRow.filter((r)=> {
                        return r != ezid
                    }), highLightedCol: null
                });
            }
            this.setState({hotKeyShift: null})

        }
        else if (args.shiftKey) {


            let lastEzid = (this.state.hotKeyShift != null ) ? this.state.hotKeyShift : selectedRow.pop(),
                indexTo = args.index,
                selectedEzid = [],
                indexFrom = this.state.mainTableData.findIndex((d)=> {
                    return d.EZID == lastEzid
                });

            if (indexTo > indexFrom) {
                selectedEzid = this.state.mainTableData.slice(indexFrom, indexTo + 1).map((d)=> {
                    return d.EZID
                });
                this.setState({selectedRow: this.state.selectedRow.concat(selectedEzid)})

            }
            else {
                selectedEzid = this.state.mainTableData.slice(indexTo, indexFrom + 1).map((d)=> {
                    return d.EZID
                })
                this.setState({selectedRow: this.state.selectedRow.concat(selectedEzid)})
            }
            this.setState({selectedRow: selectedEzid})


            this.setState({hotKeyShift: lastEzid});


        }
        else {
            if (selectedRow.indexOf(ezid) > -1) {
                if (selectedRow.length > 1) {
                    this.setState({selectedRow: [].concat(ezid), highLightedCol: args.col});
                }
                else
                    this.setState({selectedRow: [], highLightedCol: null})
            }
            else {
                this.setState({selectedRow: [].concat(ezid), highLightedCol: args.col});
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

        let newTableData = this.state.mainTableData.filter((row)=> {
            return ezidToRemove.indexOf(row.EZID) == -1
        });

        // change state to collapsed ie -
        newTableData[index].expanded = false;

        //updated expanded state to noFSTableData as well
        let noFSTableData = this.state.noFSTableData.filter((row)=> {
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
            let historyData = self.state.dataHistory.filter((data)=> {
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
                this.propertyColSelecte = this.tempPropertyColSelected.concat(colVal);
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
        let tCSelected = this.state.traitColSelected;
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

    addToTrialbook() {

        let newRecords = this.state.selectedRow.filter((r)=> {
            return this.state.trialbookRecords.indexOf(r) == -1
        })
        this.setState({
            trialbookRecords: this.state.trialbookRecords.concat(newRecords),
            selectedRow: []
        })

    }
    render() {
        return (
            <div>
                <Pageheader
                    toggleFullScreen={this.toggleFullScreen}
                    fullscreenMode={this.state.fullscreenMode}
                    addToTrialbook={this.addToTrialbook}
                    trialbookRecords={this.state.trialbookRecords}
                />
                    <div className="dataContainer"
                         data-yearlist={this.state.yearList ? "shown": "hidden"}
                         data-sidebar={this.state.sidebar? "shown": "hidden"}
                         data-propertyfieldset={this.state.propertyFieldset? "shown": "hidden"}
                         data-traitfieldset={this.state.traitFieldset? "shown": "hidden"}
                         data-columnlist={this.state.columnList? "shown": "hidden"}
                    >
                        <Sidebar
                            sidebar={this.state.sidebar}
                            toggleSidebar={this.toggleSidebar}
                            yearList={this.state.yearList}
                            toggleYear={this.toggleYear}
                            toggleProperty={this.toggleProperty}
                            toggleColumn={this.toggleColumn}
                            toggleTrait={this.toggleTrait}

                            onFieldsetSelection={this.onFieldsetSelection}
                            fieldsets={this.state.fieldsets}
                            propertyFieldsetSelected={this.state.propertyFieldsetSelected}
                            traitFieldsetSelected={this.state.traitFieldsetSelected}
                            traitFieldsetLabels={this.state.traitFieldsetLabels}
                            propertyFieldsetLabels={this.state.propertyFieldsetLabels}
                            columnsList={this.state.columnsList}
                            traitColSelected={this.state.traitColSelected}
                            propertyColSelected={this.state.propertyColSelected}
                            onTraitColToggle={this.onTraitColToggle}
                            onPropertyColToggle={this.onPropertyColToggle}
                            applyColSelection={this.applyColSelection}
                            cancelChooseColumn={this.cancelChooseColumn}

                            traitfieldColsRemoved={this.state.traitfieldColsRemoved}
                            otherTraitCols={this.state.otherTraitCols}
                            otherPropertyCols={this.state.otherPropertyCols}
                            propertyfieldColsRemoved={this.state.propertyfieldColsRemoved}


                        />
                      
                    <main className="contentWrapper" style={{width:this.state.mainWrapperWidth}}>
                    <ScrollTabledata
                            initialFetch={this.initialFetch}
                            mainData={this.state.mainTableData}
                            fields={this.state.fields}
                            tableWidth={this.state.tableWidth}
                            tableHeight={this.state.tableHeight}
                            fetchData={ this.fetchData}
                            dataHistory={this.state.dataHistory}
                            collapseRow={this.collapseRow}
                            currentPage={this.state.currentPage}
                            totalRecords={this.state.totalRecords}
                            selectedRow={this.state.selectedRow}
                            highLightedCol={this.state.highLightedCol}
                            pageSize={this.state.pageSize}
                            onCellClick={this.onCellClick}
                            onPageSizeChange={this.onPageSizeChange}
                            onPagination={this.onPagination}
                            onExpandRow={this.onExpandRow}
                            fieldLabels={this.state.fieldLabels}
                            traitFieldsetLabels={this.state.traitFieldsetLabels}
                            propertyFieldsetLabels={this.state.propertyFieldsetLabels}
                        />
                        </main>


                    </div>
                <div className="loading" style={(this.state.showLoading?{display:"flex"}: { display:"none"})}><span><i
                    className="icon-spin4 animate-spin"></i></span></div>
            </div>
        )
    }

    showLoading() {
        this.setState({showLoading: true})
    }

    hideLoading() {
        this.setState({showLoading: false})

    }

    onResize() {
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(this.resizeTable, 16);
    }

    resizeTable() {
        //TODO: improve the sidebar offset width and overall resize Table logic
        var offset = this.state.sidebar ? 340 : 90;

        var tableHeight = window.innerHeight - document.querySelector("header").clientHeight - 120;

        this.setState({
            tableWidth: document.body.clientWidth - offset,
            tableHeight: tableHeight,
            mainWrapperWidth:  document.body.clientWidth - offset + 40
        });
    }

    componentDidMount() {

        this.resizeTable();
        window.addEventListener('resize', this.onResize, false);

        //a Promise polyfill for IE coz IE sucks
        require('es6-promise').polyfill();

        //show /hide indicator at begining of request and end of request respectively
        this.requestInterceptor=axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            this.showLoading();
            return config;
        }.bind(this), function (error) {
            this.hideLoading();
            // Do something with request error
            return Promise.reject(error);
        }.bind(this));

        // Add a response interceptor
       this.responseInterceptor =  axios.interceptors.response.use(function (response) {
            // Do something with response data
            this.hideLoading();
            return response;
        }.bind(this), function (error) {
            this.hideLoading();
            // Do something with response error
            return Promise.reject(error);
        }.bind(this));

        //fetch data here
       // this.fetchData({type: "INITIAL_FETCH", args: {}});

    }
    /*
     * Cearling asynchronus actions while unmounting,
     * Needed for avoiding warning message in console as setstate, setTimeout, and axios interceptor
     * are asynchronus action.     *
     *
     */

    componentWillUnmount() {

        /*
         * Needed for avoiding warning message in console as setstate, setTimeout, and axios interceptor are asynchronus action.
         * */
        clearTimeout(this._updateTimer);
        window.removeEventListener('resize', this.onResize, false);

        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }


    /*
     *   get data from server
     */
    fetchData(action) {
        switch (action.type) {
            case "INITIAL_FETCH":
            {
                axios.post(config.scrollingUrl,  this.getScrollData({}), { withCredentials:true})
                    .then(function (response) {
                        let rData = response.data,
                            fields = [],
                            fieldLabels = {},
                            noFSFieldsInfo = {};



                        rData.InitialFields.forEach((f)=> {
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
                            fieldLabels: fieldLabels
                        })
                    }.bind(this))
                    .catch(function (response) {
                        console.log("Error getting initial data: ", response);
                    });

               //fetching fieldset data
                axios.get(config.fieldsetUrl, {withCredentials: true})
                    .then(function (response) {
                        this.setState({fieldsets: response.data})
                    }.bind(this))
                    .catch(function (response) {
                        console.log("Error getting fieldset data:", response);
                    });


                //fetching column data
                axios.get(config.columnsUrl, {withCredentials: true})
                    .then(function (response) {
                        this.setState({columnsList: response.data})
                    }.bind(this))
                    .catch(function (response) {
                        console.log("Error getting column list data:", response);
                    });
            }
                break;
            case "HIERARCHY_FETCH":
            {
                //fetch hierary Data
                axios.post(config.url, this.getScrollData(action.args), {withCredentials: true})
                    .then(function (response) {

                        let rData = response.data.Data,
                            dataHistory = this.state.dataHistory,
                            rowIds = [],
                            mainData = this.state.mainTableData.concat([]),
                            mergedObj = rData.InitialData,
                            noFSTableData = this.state.noFSTableData.concat([]);


                        if (mergedObj) {
                            rowIds = mergedObj.map((row)=> {
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
                                    if (tObj.EZID == obj.EZID) {
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


                        rData.InitialData.forEach(function (row) {
                            noFSTableData.splice(action.data.rowIndex + 1, 0, row);
                        });
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
                    .catch(function (response) {
                        console.log("Error : ", response);
                    })

            }
                break;
            case "PAGINATION_FETCH":
            {
                let args = {
                    "pn": action.args.pn,
                    "level": "-1",
                    "ezid": '',
                    "etc": "BAT",
                    "ps": this.state.pageSize,
                    'tcols': this.state.traitColSelected.concat(this.state.otherTraitCols),
                    'pcols': this.state.propertyColSelected.concat(this.state.otherPropertyCols),
                    'ezids': '',
                    'etcs' : '',
                    'pfsid':'',
                    'tfsid':''
                };

                let navData = this.getScrollData(args);

                axios.post(config.scrollingUrl,navData, {withCredentials: true})
                    .then(function (response) {

                        let rData = response.data.Data;

                        let mergedObj = this.state.mainTableData.valueOf();
                        let startData =  rData.InitialData ;

                        //if no colums is selected in both property and trait
                        if (rData.ObservationData == undefined && rData.PropertyData == undefined) {
                            if(rData.InitialData != undefined && rData.InitialData.length>0)
                                mergedObj= mergedObj.concat(rData.InitialData);

                            this.setState({
                                noFSTableData: this.state.noFSTableData.concat(rData.InitialData),
                                mainTableData: mergedObj,
                                currentPage: action.args.pn,
                            });
                        }
                        else {

                            if (rData.ObservationData != undefined) {
                                for (let obj of startData) {
                                    for (let newObj of rData.ObservationData) {
                                        if (obj.EZID == newObj.EZID) {
                                            Object.assign(obj, newObj);
                                            break;
                                        }
                                    }
                                }
                            }

                            if (rData.PropertyData != undefined) {
                                    for (let obj of startData) {
                                        for (let newObj of rData.PropertyData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj);
                                                break;
                                            }
                                        }
                                    }
                            }

                            //update mainTableData from merged Obj
                            this.setState({
                                noFSTableData: this.state.noFSTableData.concat(rData.InitialData),
                                mainTableData: mergedObj.concat(startData),
                                currentPage: action.args.pn,
                            })

                        }


                    }.bind(this))
                    .catch(function (response) {
                        console.log("Error:", response);
                    });
            }
                break;
            case "FIELDSET_FETCH":
            {
                if (this.state.propertyFieldset)
                    this.toggleProperty();
                if (this.state.traitFieldset)
                    this.toggleTrait();

                //fetch fiedlsetData only
                let etc = [], ezidz = [];
                this.state.mainTableData.forEach((row)=> {
                    if (etc.indexOf(row.EntityTypeCode) < 0)
                        etc.push(row.EntityTypeCode);
                });
                if (etc.length >= 1) {
                    for (let i = 0; i < etc.length; i++) {
                        let ezidtemp = [];
                        this.state.mainTableData.forEach((row)=> {
                            if (row.EntityTypeCode == etc[i])
                                ezidtemp.push(row.EZID)
                        })
                        ezidz.push(ezidtemp.join(","));
                    }
                }


                let fieldSetId = action.data.value, tCols = [], pCols = [], type;
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
                    "level": -1
                };

                args[type + "fsid"] = fieldSetId;

                axios.post(config.fieldsetDataUrl, this.getScrollData(args), {withCredentials: true})
                    .then(function (response) {

                        let rData = response.data.Data;
                        var mergedObj = this.state.noFSTableData.concat([]),
                            currentFields = this.state.noFSfields;

                        //no col response
                        if (rData.Fields.length == 0) {
                            //reset all data
                            this.setState({
                                mainTableData: this.state.noFSTableData.concat([]),
                                fields: this.state.noFSfields,
                                propertyFieldsetValue: null,
                                traitFieldsetValue: null,
                                traitFieldsetLabels: {},
                                propertyFieldsetLabels: {},
                                traitColSelected: [],
                                propertyColSelected: []
                            })
                        }
                        else {


                            //extracting property fields and preserving in state
                            let propertyFields = [],
                                pNewFieldLabels = [],
                                traitFields = [],
                                tNewFieldLabels = [];

                            rData.Fields.forEach((f)=> {
                                if (f.Property) {
                                    if (this.state.otherPropertyCols.indexOf(f.TraitID) < 0)
                                        propertyFields.push(f.TraitID);
                                    pNewFieldLabels[f.TraitID] = f.ColumnLabel;
                                } else {
                                    if (this.state.otherTraitCols.indexOf(f.TraitID) < 0)
                                        traitFields.push(f.TraitID)
                                    tNewFieldLabels[f.TraitID] = f.ColumnLabel
                                }
                            })
                            this.setState({
                                propertyFieldsetLabels: pNewFieldLabels,
                                propertyColSelected: propertyFields,
                                propertyfieldColsRemoved: [],
                                traitFieldsetLabels: tNewFieldLabels,
                                traitColSelected: traitFields,
                                traitfieldColsRemoved: []
                            })

                            if (action.data.isProperty) {
                                this.setState({
                                    propertyFieldsetValue: action.data.value,
                                });
                            }
                            else {
                                this.setState({
                                    traitFieldsetValue: action.data.value,
                                })

                            }


                            if (rData.ObservationData == undefined && !action.data.isProperty) {
                                this.setState({
                                    traitFieldsetValue: action.data.value,
                                    traitfieldColsRemoved: []
                                })
                            }

                            if (rData.PropertyData == undefined && action.data.isProperty) {
                                this.setState({

                                    propertyFieldsetValue: action.data.value,
                                    propertyfieldColsRemoved: []
                                })
                            }


                            //trait fieldset data
                            if (rData.ObservationData != undefined) {

                                ////not using the default initial Data from response as the
                                // expanded property of a row/record is only preserved in frontend

                                for (let obj of mergedObj) {
                                    for (let newObj of rData.ObservationData) {
                                        if (obj.EZID == newObj.EZID) {
                                            Object.assign( obj, newObj);
                                            break;
                                        }
                                    }
                                }


                            }


                            //property fieldset data
                            if (rData.PropertyData != undefined) {

                                //not using the default initial Data as the
                                // expanded property of a row/record is only preserved in frontend

                                if(rData.ObservationData != undefined) {

                                    //property columns being added hereafter
                                    for (let obj of mergedObj) {
                                        for (let newObj of rData.PropertyData) {
                                            if (obj.EZID == newObj.EZID) {
                                                Object.assign(obj, newObj)
                                                break;
                                            }
                                        }
                                    }
                                }
                                else {

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

                            currentFields = this.state.noFSfields.concat([]);
                            rData.Fields.forEach((f)=> {
                                currentFields = currentFields.concat(f.TraitID)
                            })


                            //final mergedobj ,and fields state update
                            this.setState({
                                mainTableData: mergedObj,
                                fields: currentFields
                            })

                        }
                    }.bind(this))
                    .catch(function (response) {
                        console.log("Error getting fieldset Data:", response);
                    })
            }
                break;
            case "COLUMN_SELECTION":
            {

                this.toggleColumn();

                let etc = [], ezidz = [];
                this.state.mainTableData.forEach((row)=> {
                    if (etc.indexOf(row.EntityTypeCode) < 0)
                        etc.push(row.EntityTypeCode);
                });

                if (etc.length >= 1) {
                    for (let i = 0; i < etc.length; i++) {
                        let ezidtemp = [];
                        this.state.mainTableData.forEach((row)=> {
                            if (row.EntityTypeCode == etc[i])
                                ezidtemp.push(row.EZID)
                        })
                        ezidz.push(ezidtemp.join(","));
                    }
                }

                let tCols = [], pCols = [];
                let updatedTraitColSelected = this.state.traitColSelected.filter((t)=> {
                        return action.args.traitfieldColsRemoved.indexOf(t) == -1
                    }),
                    updatedPropertyColSelected = this.state.propertyColSelected.filter((t)=> {
                        return action.args.propertyfieldColsRemoved.indexOf(t) == -1
                    });

                this.setState({
                    traitColSelected: updatedTraitColSelected,
                    propertyColSelecte: updatedPropertyColSelected
                })

                tCols = updatedTraitColSelected.concat(action.args.otherTColsToAdd);
                pCols = updatedPropertyColSelected.concat(action.args.otherPColsToAdd);


                let args = {
                    "etcs": encodeURIComponent(etc.join("|")),
                    "ezids": encodeURIComponent(ezidz.join("|")),
                    "tcols": tCols.join(","),
                    "pcols": pCols.join(","),
                    "ezid": '',
                    "level": -1,
                    "etc": "BAT",
                    'tfsid': '',
                    'pfsid': ''
                }

                axios.post(config.url, this.getScrollData(args), {withCredentials: true})
                    .then(function (response) {

                        let rData = response.data.Data,
                            mergedObj = this.state.noFSTableData.concat([]),
                            currentFields = this.state.noFSfields;

                        //no col response
                        if (rData.Fields.length == 0) {
                            //reset all data
                            this.setState({
                                mainTableData: this.state.noFSTableData.concat([]),
                                fields: this.state.noFSfields,
                                propertyFieldsetValue: null,
                                traitFieldsetValue: null,
                                traitFieldsetLabels: {},
                                propertyFieldsetLabels: {},
                                traitColSelected: [],
                                propertyColSelected: []
                            })
                        }
                        else {

                            //extracting property  fields and trait fields and preserving them state
                            let traitFields = [],
                                tNewFieldLabels = [],
                                propertyFields = [],
                                pNewFieldLabels = [];

                            rData.Fields.forEach((f)=> {
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
                                propertyfieldColsRemoved: []
                            })


                            //check if trait fieldset data is present, if yes merge it with NO Fieldset Table Data
                            if (rData.ObservationData != undefined) {
                                //Trait columns being added hereafter
                                for (let obj of mergedObj) {
                                    for (let newObj of rData.ObservationData) {
                                        if (obj.EZID == newObj.EZID) {
                                            Object.assign( obj, newObj);
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

                            //final mergedobj ,and fields state update
                            this.setState({
                                mainTableData: mergedObj,
                                fields: currentFields
                            })

                        }

                    }.bind(this))
                    .catch(function (response) {
                        console.log("Error getting fieldset Data:", response);
                    })
            }
                break;
            default:
            //do nothing for now

        }

    }

    /*
     *   Toggle Full Screen via HTML5 Full Screen API
     *
     */
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
        this.setState({fullscreenMode: !this.state.fullscreenMode})

    }

}

export default AppScrolling;

