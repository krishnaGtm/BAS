import React from 'react';
import {Link} from 'react-router'

class FieldsetRow extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        if (!(this.props.value == this.props.traitFieldsetSelected || this.props.value == this.props.propertyFieldsetSelected))
            this.props.onClick(this.props.value, this.props.isProperty);
    }

    render() {
        let {value, traitFieldsetSelected, propertyFieldsetSelected, text, description}= this.props;
        return <tr data-value={value}
                   className={(value == traitFieldsetSelected || value == propertyFieldsetSelected) ? "selected" : ""}
                   onClick={this.onClick}
        >
            <td>{text}</td>
            <td>{description}</td>
        </tr>
    }

}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyFieldsets: [],
            traitFieldsets: [],

            searchedPropertyFieldsets: [],
            searchedTraitFieldsets: [],
            columnsList: [],

            selectedTraitCols: [],

            selectedPropertyCols: [],

            traitColumnList: [],
            propertyColumnList: [],

            searchedTraitColList: [],
            searchedPropertyColList: [],

            tempTraitColSelected: [],
            tempPropertyColSelected: [],

            traitfieldColsRemoved: [],
            otherTraitCols: [],

            propertyfieldColsRemoved: [],
            otherPropertyCols: [],

        };
        this.traitColSelected = [];
        this.propertyColSelected = [];

        this.selectFieldset = this.selectFieldset.bind(this);
        this.onPropertyChange = this.onPropertyChange.bind(this);
        this.onTraitChange = this.onTraitChange.bind(this);
        this.onTraitColSearchChange = this.onTraitColSearchChange.bind(this);
        this.onPropertyColSearchChange = this.onPropertyColSearchChange.bind(this);
        this.onTraitColToggle = this.onTraitColToggle.bind(this);
        this.onPropertyColToggle = this.onPropertyColToggle.bind(this);
        this.applySelection = this.applySelection.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.toggleTrait = this.toggleTrait.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.toggleColumn = this.toggleColumn.bind(this);
        this.sortColumnSelection = this.sortColumnSelection.bind(this);
        this.sortOrderChange = this.sortOrderChange.bind(this);
        this.yearToggle = this.yearToggle.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.refs.propertyField.value = '';

        //separating property and trial fieldsets
        let propertyFieldsets = [],
            traitFieldsets = [],
            fs = nextProps.fieldsets,
            fsLen = fs.length;
        for (let i = 0; i < fsLen; i++) {
            if (fs[i].Property)
                propertyFieldsets.push(fs[i]);
            else
                traitFieldsets.push(fs[i]);
        }
        //saving fiedlsets both Property and Trait
        this.setState({
            propertyFieldsets: propertyFieldsets,
            searchedPropertyFieldsets: propertyFieldsets,
            traitFieldsets: traitFieldsets,
            searchedTraitFieldsets: traitFieldsets
        });

        this.setState({tempTraitColSelected: nextProps.traitColSelected.concat(nextProps.otherTraitCols)});
        this.setState({tempPropertyColSelected: nextProps.propertyColSelected.concat(nextProps.otherPropertyCols)});

        this.setState({
            traitfieldColsRemoved: nextProps.traitfieldColsRemoved,
            otherTraitCols: nextProps.otherTraitCols,
            propertyfieldColsRemoved: nextProps.propertyfieldColsRemoved,
            otherPropertyCols: nextProps.otherPropertyCols
        });


        this.setState({columnsList: nextProps.columnsList});

        //filter trait and property columns list
        let traitColumnList = [], propertyColumnList = [];
        for (let col of nextProps.columnsList) {
            if (col.Property)
                propertyColumnList.push(col);
            else
                traitColumnList.push(col);
        }

        this.setState({
            propertyColumnList: propertyColumnList,
            traitColumnList: traitColumnList,
            searchedPropertyColList: propertyColumnList,
            searchedTraitColList: traitColumnList
        })

    }

    selectFieldset(val, isProperty) {
        this.props.onFieldsetSelection(val, isProperty);
    }

    onPropertyChange() {

        let str = this.refs.propertyField.value,
            selectedFieldsets = [],
            regex = new RegExp(str, "gi");

        for (let obj of this.state.propertyFieldsets) {
            if (obj.FieldSetCode.match(regex) || obj.FieldSetName.match(regex))
                selectedFieldsets.push(obj);
        }
        this.setState({searchedPropertyFieldsets: selectedFieldsets});
    }

    onTraitChange() {

        let str = this.refs.traitField.value,
            selectedFieldsets = [],
            regex = new RegExp(str, "gi");

        for (let obj of this.state.traitFieldsets) {
            if (obj.FieldSetCode.match(regex) || obj.FieldSetName.match(regex))
                selectedFieldsets.push(obj);
        }

        this.setState({searchedTraitFieldsets: selectedFieldsets});
    }

    onTraitColSearchChange() {

        let str = this.refs.traitColSearch.value;
        let searchedColumnList = [],
            regex = new RegExp(str, "gi");

        for (let obj of this.state.traitColumnList) {
            if (obj.ColumnLabel.match(regex))
                searchedColumnList.push(obj);
        }

        this.setState({searchedTraitColList: searchedColumnList})

    }

    onPropertyColSearchChange() {

        let str = this.refs.propertyColSearch.value;
        let searchedColumnList = [],
            regex = new RegExp(str, "gi");

        for (let obj of this.state.propertyColumnList) {
            if (obj.ColumnLabel.match(regex))
                searchedColumnList.push(obj);
        }

        this.setState({searchedPropertyColList: searchedColumnList})

    }

    onPropertyColToggle(e) {
        let pfColsRemoved = this.state.propertyfieldColsRemoved.concat([]);
        let colVal = parseInt(e.target.value);
        if (e.target.checked) {
            if (this.props.propertyColSelected.length && this.props.propertyColSelected.indexOf(colVal) > -1) {
                //column is of trait fieldset so remove from removal list
                pfColsRemoved.splice(this.props.propertyColSelected.indexOf(colVal), 1);
                this.setState({
                    propertyfieldColsRemoved: pfColsRemoved,
                    tempPropertyColSelected: this.state.tempPropertyColSelected.concat(colVal)
                })
            }
            else {
                //add column to other column list, not present in traitfieldset to add later after user clicks apply
                this.setState({
                    otherPropertyCols: this.state.otherPropertyCols.concat(colVal),
                    tempPropertyColSelected: this.state.tempPropertyColSelected.concat(colVal)
                })
            }
        }
        else {
            //add to removal list of columns of traitfieldset removal later when user clicks apply
            if (this.props.propertyColSelected.length && this.props.propertyColSelected.indexOf(colVal) > -1) {
                this.setState({propertyfieldColsRemoved: pfColsRemoved.concat(colVal)});
            }
            else {
                //removal of column not present in property fieldset column list from list of other trait columns
                this.setState({
                    otherPropertyCols: this.state.otherPropertyCols.filter((t)=> {
                        return t != colVal
                    })
                })
            }
            this.setState({
                tempPropertyColSelected: this.state.tempPropertyColSelected.filter((f)=> {
                    return f != colVal
                })
            })
        }
    }

    onTraitColToggle(e) {
        let tfColsRemoved = this.state.traitfieldColsRemoved.concat([]);
        let colVal = parseInt(e.target.value);
        if (e.target.checked) {
            if (this.props.traitColSelected.length && this.props.traitColSelected.indexOf(colVal) > -1) {
                //column is of trait fieldset so remove from removal list
                tfColsRemoved.splice(this.props.traitColSelected.indexOf(colVal), 1);
                this.setState({
                    traitfieldColsRemoved: tfColsRemoved,
                    tempTraitColSelected: this.state.tempTraitColSelected.concat(colVal)
                })
            }
            else {
                //add column to other column list, not present in traitfieldset to add later after user clicks apply
                this.setState({
                    otherTraitCols: this.state.otherTraitCols.concat(colVal),
                    tempTraitColSelected: this.state.tempTraitColSelected.concat(colVal)
                })
            }
        }
        else {
            //add to removal list of columns of traitfieldset removal later when user clicks apply
            if (this.props.traitColSelected.length && this.props.traitColSelected.indexOf(colVal) > -1) {
                this.setState({traitfieldColsRemoved: tfColsRemoved.concat(colVal)});
            }
            else {
                //removal of column not present in trait fieldset column list from list of other trait columns
                this.setState({
                    otherTraitCols: this.state.otherTraitCols.filter((t)=> {
                        return t != colVal
                    })
                })
            }
            this.setState({
                tempTraitColSelected: this.state.tempTraitColSelected.filter((f)=> {
                    return f != colVal
                })
            })
        }
    }

    toggleProperty() {
        this.refs.propertyField.value = '';
        this.props.toggleProperty();
    };

    toggleTrait() {
        this.refs.traitField.value = '';
        this.props.toggleTrait();
    }

    toggleColumn() {
        this.refs.propertyColSearch.value = '';
        this.refs.traitColSearch.value = '';
        this.props.toggleColumn();
    }

    applySelection() {
        this.props.applyColSelection(this.state.traitfieldColsRemoved, this.state.otherTraitCols, this.state.propertyfieldColsRemoved, this.state.otherPropertyCols);

        //reset search fields
        this.refs.propertyColSearch.value = '';
        this.refs.traitColSearch.value = '';
    }

    cancelChanges() {

        //reset Temporarily Selected Property and Trait columns from Select/ Choose column 
        this.setState({
            tempPropColSelected: [],
            tempTraitColSelected: []
        });
        //reset search fields
        this.refs.propertyColSearch.value = '';
        this.refs.traitColSearch.value = '';
        this.props.cancelChooseColumn();

    }

    sortColumnSelection(e) {
        this.props.sortColumnSelection(e.target.name, e.target.value)
    }

    sortOrderChange(e) {
        this.props.sortOrderChange(e.target.name, e.target.value)
    }

    yearToggle(e) {
        this.props.toggleSelectedYear(e.target.value);
    }


    render() {
        //list of year 10 year back from next year;
        let nextYear = new Date().getFullYear() + 1;
        let listOfYear = [];
        for (let i = 0; i < 10; i++) {
            let year = <li key={i}><input type="checkbox" value={nextYear - i} id={"check" + i} onChange={this.yearToggle} />
                            <label htmlFor={"check" + i}>{nextYear - i}</label>
                        </li>
            listOfYear.push(year)
        }

        let propertyFieldsetRows = this.state.searchedPropertyFieldsets.map(function (pset, index) {
            return <FieldsetRow
                key={index}
                onClick={this.selectFieldset}
                isProperty={true}
                propertyFieldsetSelected={this.props.propertyFieldsetSelected}
                traitFieldsetSelected={this.props.traitFieldsetSelected}
                description={pset.FieldSetName}
                value={pset.FieldSetID}
                text={pset.FieldSetCode}
            />
        }.bind(this));

        let traitFieldsetRows = this.state.searchedTraitFieldsets.map(function (fset, index) {
            return <FieldsetRow
                key={index}
                onClick={this.selectFieldset}
                isProperty={false}
                propertyFieldsetSelected={this.props.propertyFieldsetSelected}
                traitFieldsetSelected={this.props.traitFieldsetSelected}
                description={fset.FieldSetName}
                value={fset.FieldSetID}
                text={fset.FieldSetCode}
            />
        }.bind(this));

        // console.log("firstColSortList :", this.state.firstColSortList)
        let firstColSortListHTML = [];
        //populate first column sort when ever props of fields are updated.
        for (let key in this.props.firstColSortList) {
            firstColSortListHTML.push(<option key={key} value={key}>{this.props.firstColSortList[key]}</option>)
        }

        // console.log("secondColSortList :", this.state.secondColSortList)
        let secondColSortListHTML = [];
        //populate first column sort when ever props of fields are updated.
        for (let key in this.props.secondColSortList) {
            secondColSortListHTML.push(<option key={key} value={key}>{this.props.secondColSortList[key]}</option>)
        }

        // console.log("thirdColSortList :", this.state.thirdColSortList);
        let thirdColSortListHTML = [];
        //populate first column sort when ever props of fields are updated.
        for (let key in this.props.thirdColSortList) {
            thirdColSortListHTML.push(<option key={key} value={key}>{this.props.thirdColSortList[key]}</option>)
        }


        return (
            <div className="sidebar">
                <div className="filterSetting">
                    <h2>Settings Bar </h2>
                    <a href="#" className={this.props.disabledSidebar ? "sidebarToggler disabled" : "sidebarToggler"}
                       onClick={this.props.toggleSidebar}
                    title="Toggle Setting Bar">
                        <i className="icon-menu"></i></a>
                    <Link to="/main" className="back" style={{display: this.props.disabledSidebar ? "block" : "none"}}
                          title="Back to Main Screen"><i className="icon-left-small"></i></Link>
                    <div className="settingWrapper">
                        <ul>
                            <li><a href="#" onClick={this.props.toggleYear} title="Year" >Year</a></li>
                            <li><a href="#" title="Project" >Project </a></li>
                            <li><a href="#" title="Field Books" >Field Books</a></li>
                            <li>
                                <button title="Save Filter" >Save Filter</button>
                            </li>
                            <li><a href="#" onClick={this.props.toggleColSort} title="Column Sorting" >Column Sorting </a></li>
                            <li><span className="separator"></span></li>
                            <li><a href="#" onClick={this.toggleProperty} title="Property Fieldset" >Property Fieldset</a></li>
                            <li><a href="#" onClick={this.toggleTrait} title="Trait Fieldset" >Trait Fieldset</a></li>
                            <li><a href="#" onClick={this.toggleColumn} title="Select Column(s)" >Select Column(s)</a></li>
                            <li>
                                <button title="Add Filte" >Add Filter</button>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="yearList">
                    <h2 className="filterTitle">Years </h2>
                    <span className="close" title="Close" onClick={this.props.toggleYear}><i className="icon-cancel"></i></span>
                    <ul>
                        {listOfYear}
                    </ul>
                    <div className="actionBtns">
                        <button onClick={this.props.applyYearFilter} title="Apply">Apply
                        </button>

                    </div>
                </div>

                <div className="columnSort">
                    <h2 className="filterTitle">Select Columns to Sort </h2>
                    <span className="close" title="Close"  onClick={this.props.toggleColSort}><i
                        className="icon-cancel"></i></span>
                    <ul>
                        <li>
                            <div>
                                <h3>First Sort Column </h3>
                                <select name="column1" id="column1"
                                        onChange={this.sortColumnSelection}
                                        value={this.props.firstSortColumn}>
                                    <option value=""> Select a column</option>
                                    {firstColSortListHTML}
                                </select>
                                <input type="radio" name="column1-sOrder" id="column1-asc"
                                       checked={this.props.firstColSortOrder.toLowerCase() == "asc"}
                                       onChange={this.sortOrderChange} value="asc"/>
                                <label htmlFor="column1-asc">Ascending </label>
                                <input type="radio" name="column1-sOrder" id="column1-desc"
                                       checked={this.props.firstColSortOrder.toLowerCase() == "desc"} value="desc"
                                       onChange={this.sortOrderChange}
                                />
                                <label htmlFor="column1-desc">Descending </label>
                            </div>
                        </li>
                        <li className={(this.props.firstSortColumn == '') ? "disabled" : ''}>
                            <div>
                                <h3>Second Sort Column </h3>
                                <select name="column2" id="column2"
                                        onChange={this.sortColumnSelection}
                                        disabled={this.props.firstSortColumn == ''}
                                        value={this.props.secondSortColumn}
                                >
                                    <option value=""> Select A Column</option>
                                    {secondColSortListHTML}
                                </select>
                                <input type="radio" name="column2-sOrder" id="column2-asc"
                                       value="asc"
                                       checked={this.props.secondColSortOrder.toLowerCase() == "asc"}
                                       disabled={this.props.firstSortColumn == ''}
                                       onChange={this.sortOrderChange}
                                /><label htmlFor="column2-asc">Ascending </label>
                                <input type="radio" name="column2-sOrder" id="column2-desc" value="desc"
                                       checked={this.props.secondColSortOrder.toLowerCase() == "desc"}
                                       onChange={this.sortOrderChange}
                                       disabled={this.props.firstSortColumn == ''}
                                /><label htmlFor="column2-desc">Descending </label>

                            </div>
                        </li>
                        <li className={(this.props.firstSortColumn == '' || this.props.secondSortColumn == '') ? "disabled" : ''}>
                            <div>
                                <h3>Third Sort Column </h3>
                                <select name="column3" id="column3"
                                        onChange={this.sortColumnSelection}
                                        disabled={this.props.firstSortColumn == '' || this.props.secondSortColumn == ''}
                                        value={this.props.thirdSortColumn}
                                >
                                    <option value=""> Select A Column</option>
                                    {thirdColSortListHTML}
                                </select>
                                <input type="radio" name="column3-sOrder" id="column3-asc"
                                       value="asc"
                                       checked={this.props.thirdColSortOrder.toLowerCase() == "asc"}
                                       disabled={this.props.firstSortColumn == '' || this.props.secondSortColumn == ''}
                                       onChange={this.sortOrderChange}
                                /><label htmlFor="column3-asc">Ascending </label>
                                <input type="radio" name="column3-sOrder" id="column3-desc" value="desc"
                                       checked={this.props.thirdColSortOrder.toLowerCase() == "desc"}
                                       onChange={this.sortOrderChange}
                                       disabled={this.props.firstSortColumn == '' || this.props.secondSortColumn == ''}
                                /><label htmlFor="column3-desc">Descending </label>

                            </div>
                        </li>
                    </ul>
                    <div className="actionBtns">
                        <button onClick={this.props.applySort}
                                title="Apply Sort"
                                disabled={(this.props.firstSortColumn == '') ? true : false }>Apply Sort
                        </button>
                        <button onClick={this.props.clearSort}
                                title="Clear Sort"
                                disabled={(this.props.firstSortColumn == "" ) ? true : false }
                        >Clear Sort
                        </button>
                        <button onClick={this.props.toggleColSort}title="Cancel" >Cancel</button>
                    </div>
                </div>

                <div className="propertyFieldset">
                    <h2 className="filterTitle">Choose Property Fieldset </h2>
                    <span className="close"  title="Close" onClick={this.toggleProperty}><i className="icon-cancel"></i></span>
                    <div className="filterFieldsets">
                        <input type="text" onChange={this.onPropertyChange} placeholder="Search property fieldset"
                               ref="propertyField"/>
                        <i className="filterIcon icon-filter"></i>
                    </div>
                    <div className="fieldsetListHeader">

                        <table>
                            <colgroup>
                                <col width="100"/>
                                <col width="200"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>
                                    <div className="thHeader">FieldsetCode</div>
                                </th>
                                <th>
                                    <div className="thHeader">FieldSetName</div>
                                </th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="fieldsetList">
                        <table>
                            <colgroup>
                                <col width="100"/>
                                <col width="200"/>
                            </colgroup>
                            <tbody>
                            {propertyFieldsetRows.length == 0 ? <tr>
                                <td colSpan="2" className='empty'>No Property Fieldsets Found.</td>
                            </tr> : propertyFieldsetRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="traitFieldset">
                    <h2 className="filterTitle">Choose Trait Fieldset </h2>
                    <span className="close"  title="Close" onClick={this.toggleTrait}><i className="icon-cancel"></i></span>
                    <div className="filterFieldsets">
                        <input type="text" onChange={this.onTraitChange} placeholder="Search trait fieldset"
                               ref="traitField"/>
                        <i className="filterIcon icon-filter"></i>
                    </div>
                    <div className="fieldsetListHeader">

                        <table>
                            <colgroup>
                                <col width="100"/>
                                <col width="200"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>
                                    <div className="thHeader">FieldsetCode</div>
                                </th>
                                <th>
                                    <div className="thHeader">FieldSetName</div>
                                </th>
                            </tr>
                            </thead>
                        </table>
                    </div>

                    <div className="fieldsetList">
                        <table>
                            <colgroup>
                                <col width="100"/>
                                <col width="200"/>
                            </colgroup>
                            <tbody>
                            {traitFieldsetRows.length == 0 ? <tr>
                                <td colSpan="2" className='empty'>No Trait Fieldsets Found.</td>
                            </tr> : traitFieldsetRows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="columnList">
                    <h2 className="filterTitle">Choose Column(s)</h2>
                    <h3 className="subFilterTitle">Property Fields </h3>
                    <div className="filterFieldsets">
                        <input type="text" onChange={this.onPropertyColSearchChange}
                               placeholder="Search property columns"
                               ref="propertyColSearch"/>
                        <i className="filterIcon icon-filter"></i>
                    </div>
                    <span className="close"  title="Close" onClick={this.props.toggleColumn}><i className="icon-cancel"></i></span>
                    <div className="propertyColumnList">
                        <ul>
                            {
                                this.state.searchedPropertyColList.map(function (pcol, index) {
                                    return <li key={index}>
                                        <input
                                            type="checkbox"
                                            value={pcol.TraitID}
                                            id={"check-" + pcol.TraitID}
                                            onChange={this.onPropertyColToggle}
                                            checked={(this.state.tempPropertyColSelected.indexOf(pcol.TraitID) > -1) ? true : false }
                                        />
                                        <label htmlFor={"check-" + pcol.TraitID}>{pcol.ColumnLabel}</label>
                                    </li>

                                }.bind(this))
                            }
                        </ul>
                    </div>

                    <h3 className="subFilterTitle">Trait Fields </h3>
                    <div className="filterFieldsets">
                        <input type="text" onChange={this.onTraitColSearchChange} placeholder="Search trait columns"
                               ref="traitColSearch"/>
                        <i className="filterIcon icon-filter"></i>
                    </div>
                    <div className="traitColumnList">
                        <ul>
                            {this.state.searchedTraitColList.map(function (tcol, index) {
                                return <li key={index}>
                                    <input type="checkbox"
                                           value={tcol.TraitID}
                                           id={"check-" + tcol.TraitID}
                                           onChange={this.onTraitColToggle}
                                           checked={(this.state.tempTraitColSelected.indexOf(tcol.TraitID) > -1) ? true : false}

                                    />
                                    <label htmlFor={"check-" + tcol.TraitID}>{tcol.ColumnLabel}</label>
                                </li>

                            }.bind(this))}
                        </ul>
                    </div>

                    <div className="actionBtns">
                        <button onClick={this.applySelection}  title="Apply" >Apply</button>
                        <button onClick={this.cancelChanges}  title="Cancel">Cancel</button>
                    </div>

                </div>
            </div>

        )

    }
}

export default Sidebar;