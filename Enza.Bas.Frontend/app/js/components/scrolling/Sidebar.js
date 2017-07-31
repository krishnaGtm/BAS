import React from 'react';

class FieldsetRow extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        e.preventDefault();
        if (!(this.props.value == this.props.traitFieldsetSelected || this.props.value == this.props.propertyFieldsetSelected))
            this.props.onClick(this.props.value, this.props.isProperty);
    }

    render() {
        let { value,traitFieldsetSelected,propertyFieldsetSelected,text,description}= this.props;
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

            searchedPropertyFieldsets:[],
            searchedTraitFieldsets:[],
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
            otherPropertyCols: []

        }
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

    }

    componentWillReceiveProps() {

        this.refs.propertyField.value = '';
        let propertyFieldsets = [],
            traitFieldsets = [],
            fs = this.props.fieldsets,
            fsLen = fs.length;
        for (let i = 0; i < fsLen; i++) {
            if (fs[i].Property == true)
                propertyFieldsets.push(fs[i])
            else
                traitFieldsets.push(fs[i])
        }

        this.setState({
            propertyFieldsets: propertyFieldsets,
            searchedPropertyFieldsets:propertyFieldsets,
            traitFieldsets: traitFieldsets,
            searchedTraitFieldsets: traitFieldsets
        });


        this.setState({tempTraitColSelected: this.props.traitColSelected.concat(this.props.otherTraitCols)});
        this.setState({tempPropertyColSelected: this.props.propertyColSelected.concat(this.props.otherPropertyCols)});

        this.setState({
            traitfieldColsRemoved: this.props.traitfieldColsRemoved,
            otherTraitCols: this.props.otherTraitCols,
            propertyfieldColsRemoved: this.props.propertyfieldColsRemoved,
            otherPropertyCols: this.props.otherPropertyCols

        })

        this.setState({columnsList: this.props.columnsList})

        let traitfieldsetColumns = Object.keys(this.props.traitFieldsetLabels);

        //filter trait and property columns list
        let traitColumnList = [], propertyColumnList = [];
        for (let col of this.props.columnsList) {
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
            if (this.props.propertyColSelected.length && this.props.propertyColSelected.indexOf(colVal) > 0) {
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
            if (this.props.propertyColSelected.length && this.props.propertyColSelected.indexOf(colVal)>-1) {
                this.setState({propertyfieldColsRemoved: pfColsRemoved.concat(colVal)});
            }
            else {
                //removal of column not present in trait fieldset column list from list of other trait columns
                this.setState({otherPropertyCols: this.state.otherPropertyCols.filter((t)=>{ return t!=colVal})})
            }
            this.setState({tempPropertyColSelected: this.state.tempPropertyColSelected.filter((f)=> {return f !=colVal})})
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
            if (this.props.traitColSelected.length && this.props.traitColSelected.indexOf(colVal) >0) {
                this.setState({traitfieldColsRemoved: tfColsRemoved.concat(colVal)});
            }
            else {
                //removal of column not present in trait fieldset column list from list of other trait columns
                this.setState({otherTraitCols: this.state.otherTraitCols.filter((t)=>{ return t!=colVal})})
            }
            this.setState({tempTraitColSelected: this.state.tempTraitColSelected.filter((f)=> {return f !=colVal})})
        }
    }

    toggleProperty(){
        this.refs.propertyField.value=''
        this.props.toggleProperty();
    }

    toggleTrait(){
        this.refs.traitField.value=''
        this.props.toggleTrait();
    }

    toggleColumn(){
        this.refs.propertyColSearch.value='';
        this.refs.traitColSearch.value='';
        this.props.toggleColumn();
    }

    applySelection() {
        this.props.applyColSelection(this.state.traitfieldColsRemoved, this.state.otherTraitCols, this.state.propertyfieldColsRemoved,this.state.otherPropertyCols);

        //reset search fields
        this.refs.propertyColSearch.value='';
        this.refs.traitColSearch.value='';
    }

    cancelChanges() {

        //reset Temporarily Selected Property and Trait columns from Select/ Choose column 
        this.setState({
            tempPropColSelected: [],
            tempTraitColSelected: []
        });
        //reset search fields
        this.refs.propertyColSearch.value='';
        this.refs.traitColSearch.value='';
        this.props.cancelChooseColumn();

    }

    render() {
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

        return (
            <div className="sidebar">
                <div className="filterSetting">
                    <h2>Settings Bar </h2>
                    <a href="#" className="sidebarToggler" onClick={this.props.toggleSidebar}>
                        <i className="icon-menu"></i></a>
                    <div className="settingWrapper">
                        <ul>
                            <li><a href="#" onClick={this.props.toggleYear}>Year</a></li>
                            <li><a href="#">Project</a></li>
                            <li><a href="#">Field Books</a></li>
                            <li>
                                <button>Save Filter</button>
                            </li>
                            <li><span className="separator"></span></li>
                            <li><a href="#" onClick={this.toggleProperty}>Property Fieldset</a></li>
                            <li><a href="#" onClick={this.toggleTrait}>Trait Fieldset</a></li>
                            <li><a href="#" onClick={this.toggleColumn}>Select Column(s)</a></li>
                            <li>
                                <button>Add Filter</button>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="yearList">
                    <h2 className="filterTitle">Years </h2>
                    <span className="close" onClick={this.props.toggleYear}><i className="icon-cancel"></i></span>
                    <ul>
                        <li><input type="checkbox" value="2015" id="check1"/><label htmlFor="check1">2015</label></li>
                        <li><input type="checkbox" value="2014" id="check2"/><label htmlFor="check2">2014</label></li>
                        <li><input type="checkbox" value="2013" id="check3"/><label htmlFor="check3">2013</label></li>
                        <li><input type="checkbox" value="2012" id="check4"/><label htmlFor="check4">2012</label></li>
                        <li><input type="checkbox" value="2011" id="check5"/><label htmlFor="check5">2011</label></li>
                        <li><input type="checkbox" value="2010" id="check6"/><label htmlFor="check6">2010</label></li>
                        <li><input type="checkbox" value="2009" id="check7"/><label htmlFor="check7">2009</label></li>
                        <li><input type="checkbox" value="2008" id="check8"/><label htmlFor="check8">2008</label></li>
                        <li><input type="checkbox" value="2007" id="check9"/><label htmlFor="check9">2007</label></li>
                        <li><input type="checkbox" value="2006" id="check10"/><label htmlFor="check10">2006</label></li>
                    </ul>

                </div>

                <div className="propertyFieldset">
                    <h2 className="filterTitle">Choose Property Fieldset </h2>
                    <span className="close" onClick={this.toggleProperty}><i className="icon-cancel"></i></span>
                    <div className="filterFieldsets">
                        <input type="text" onChange={this.onPropertyChange} placeholder="Search property fieldset" ref="propertyField"/>
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
                                    <div className="thHeader">Name</div>
                                </th>
                                <th>
                                    <div className="thHeader">Description</div>
                                </th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="fieldsetList">
                        <table>

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
                    <span className="close" onClick={this.toggleTrait}><i className="icon-cancel"></i></span>
                    <div className="filterFieldsets">
                        <input type="text" onChange={this.onTraitChange} placeholder="Search trait fieldset" ref="traitField"/>
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
                                    <div className="thHeader">Name</div>
                                </th>
                                <th>
                                    <div className="thHeader">Description</div>
                                </th>
                            </tr>
                            </thead>
                        </table>
                    </div>

                    <div className="fieldsetList">
                        <table>
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
                        <input type="text" onChange={this.onPropertyColSearchChange} placeholder="Search property columns"
                               ref="propertyColSearch"/>
                        <i className="filterIcon icon-filter"></i>
                    </div>
                    <span className="close" onClick={this.props.toggleColumn}><i className="icon-cancel"></i></span>
                    <div className="propertyColumnList">
                        <ul>
                            {
                                this.state.searchedPropertyColList.map(function (pcol, index) {
                                    return <li key={index}>
                                        <input
                                            type="checkbox"
                                            value={pcol.TraitID}
                                            id={"check-"+pcol.TraitID}
                                            onChange={this.onPropertyColToggle}
                                            checked={(this.state.tempPropertyColSelected.indexOf(pcol.TraitID)>-1) ? true : false }
                                        />
                                        <label htmlFor={"check-"+pcol.TraitID}>{pcol.ColumnLabel}</label>
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
                                           id={"check-"+tcol.TraitID}
                                           onChange={this.onTraitColToggle}
                                           checked={(this.state.tempTraitColSelected.indexOf(tcol.TraitID)>-1) ? true : false}

                                    />
                                    <label htmlFor={"check-"+tcol.TraitID}>{tcol.ColumnLabel}</label>
                                </li>

                            }.bind(this))}
                        </ul>
                    </div>

                    <div className="actionBtns">
                        <button onClick={this.applySelection}>Apply</button>
                        <button onClick={this.cancelChanges}>Cancel</button>
                    </div>

                </div>
            </div>

        )

    }
}

export default Sidebar;