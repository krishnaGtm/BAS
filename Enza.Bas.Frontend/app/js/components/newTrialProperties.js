/**
 * Created by dbasukala on 12/27/2016.
 */
import React from 'react';

class NewTrialProperties extends React.Component {
    constructor(props) {
        super(props)
        this.addTrialProperty = this.addTrialProperty.bind(this);
        this.state = {
            propertyName: '',
            columnLabel: '',
            activeTab: "property",
            listOfValues: [],
            code: '',
            value: '',
            order: '',
            editing: false,
            editingIndex: -1
        }
        this.updatePropertyName = this.updatePropertyName.bind(this);
        this.updateColumnLabel = this.updateColumnLabel.bind(this);
        this.cancelTrialPropertyCreation = this.cancelTrialPropertyCreation.bind(this);
        this.showPropertyTab = this.showPropertyTab.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.editValue = this.editValue.bind(this);
        this.updateValueData = this.updateValueData.bind(this);
        this.deleteValue = this.deleteValue.bind(this);
        this.addNewValue = this.addNewValue.bind(this);
        this.validOrder = this.validOrder.bind(this);
        this.saveProperty = this.saveProperty.bind(this);
        this.dataTypeMapping = {
            Integer: "I",
            Date: 'D',
            Decimal: "A",
            Text: 'C',
            List: 'C'


        }
    }

    //Create trial property of selected data type  or go to next tab(values) in case of List property is selected.
    addTrialProperty() {
        if (this.state.propertyName === "") {
            this.newPropertyName.classList.add("error");
        }
        if (this.state.columnLabel === "") {
            this.newPropertyColumnLabel.classList.add("error");
        }

        if (this.state.propertyName !== "" && this.state.columnLabel !== "") {
            if (this.props.dataType !== "List") {
                //forward to creating trial properties
                this.props.createTrialProperty({
                    name: this.state.propertyName,
                    columnLabel: this.state.columnLabel,
                    dataType: this.dataTypeMapping[this.props.dataType],
                    listOfValues: this.props.dataType === "List",
                })
                // this.setState({propertyName: '', columnLabel: ''})
            }
            else {
                this.setState({activeTab: 'values'});
                // in case of list type,navigate to values tab.
            }

        }
    }

    // Create property for List data type selected.
    saveProperty() {
        this.props.createTrialProperty({
            name: this.state.propertyName,
            columnLabel: this.state.columnLabel,
            dataType: this.dataTypeMapping[this.props.dataType],
            listOfValues: this.props.dataType === "List",
            propertyValues: this.state.listOfValues
        })
    }

    //Switch to Property Tab
    showPropertyTab() {
        this.setState({activeTab: "property"})
    }

    // On Change Event handler for Name field
    updatePropertyName(e) {
        if (e.target.value !== "") {
            e.target.classList.remove("error")
        }
        this.setState({propertyName: e.target.value})
    }

    // On Change Event handler for Label field
    updateColumnLabel(e) {
        if (e.target.value !== "") {
            e.target.classList.remove("error")
        }
        this.setState({columnLabel: e.target.value})
    }

    // On Change Event handler for Code field
    updateCode(e) {
        if (e.target.value !== "") {
            e.target.classList.remove("error")
        }
        this.setState({code: e.target.value})
    }

    // On Change Event handler for Value field
    updateValue(e) {
        if (e.target.value !== "") {
            e.target.classList.remove("error")
        }
        this.setState({value: e.target.value})
    }

    // On Change Event handler for Order field
    updateOrder(e) {
        let order = e.target.value;
        if (isNaN(order)) {
            e.target.classList.add("error")
        }
        else {
            e.target.classList.remove("error");
        }
        this.setState({order: e.target.value})

    }

    //Hide trial property creation modal
    cancelTrialPropertyCreation() {

        this.newPropertyName.classList.remove("error");
        this.newPropertyColumnLabel.classList.remove("error");
        this.setState({propertyName: '', columnLabel: ''})
        this.props.cancelTrialPropertyCreation();
    }

    //Add values(code,value,sortorder) to list property
    addNewValue() {

        if (this.state.code === "")
            this.newCode.classList.add("error");

        if (this.state.value === "")
            this.newValue.classList.add("error");

        if (this.state.order === "")
            this.newOrder.classList.add("error");

        if (this.validOrder(this.state.order)) {
            if (this.state.code !== "" && this.state.value !== "" && this.state.order !== "" && !isNaN(this.state.order)) {
                //add new code-value pair to listOfValues
                let listOfValues = this.state.listOfValues;
                listOfValues.push({code: this.state.code, name: this.state.value, sortingOrder: this.state.order});
                this.setState({
                    listOfValues: listOfValues,
                    code: '',
                    value: '',
                    order: ''
                });
            }
        }
        else {
            this.newOrder.classList.add("error");
        }
    }

    //Check for unique order value.
    validOrder(order) {
        if (this.state.editing) {
            if (order === this.state.listOfValues[this.state.editingIndex].sortingOrder) {
                return true
            }
        }
        return this.state.listOfValues.filter(l => l.sortingOrder === order).length == 0;
    }

    editValue(index) {
        let listOfValues = this.state.listOfValues;
        this.setState({
            editing: true,
            editingIndex: index,
            code: listOfValues[index].code,
            value: listOfValues[index].name,
            order: listOfValues[index].sortingOrder,
        })

    }

    updateValueData() {
        if (this.state.code === "")
            this.newCode.classList.add("error");

        if (this.state.value === "")
            this.newValue.classList.add("error");

        if (this.state.order === "")
            this.newOrder.classList.add("error");

        if (this.validOrder(this.state.order)) {
            if (this.state.code !== "" && this.state.value !== "" && this.state.order !== "" && !isNaN(this.state.order)) {
                //add new code-value pair to listOfValues
                let listOfValues = this.state.listOfValues;
                let eIndex = this.state.editingIndex;

                //first record is being edited
                if (eIndex == 0) {
                    listOfValues = [{code: this.state.code, name: this.state.value, sortingOrder: this.state.order},
                        ...listOfValues.slice(1)];
                }
                //last record is being edited
                else if (eIndex == listOfValues.length - 1) {
                    listOfValues = [...listOfValues.slice(0, listOfValues.length - 1),
                        {code: this.state.code, name: this.state.value, sortingOrder: this.state.order}];
                }
                else {
                    listOfValues = [...listOfValues.slice(0, eIndex),
                        {code: this.state.code, name: this.state.value, sortingOrder: this.state.order},
                        ...listOfValues.slice(eIndex + 1)];
                }


                this.setState({
                    listOfValues: listOfValues,
                    code: '',
                    value: '',
                    order: '',
                    editing: false,
                    editingIndex: -1
                });
            }
        }
        else {
            this.newOrder.classList.add("error");
        }
    }

    //Remove selected value row from list of values added to Values tab.
    deleteValue(index) {
        this.setState({listOfValues: this.state.listOfValues.filter((l, i) => i !== index)})
    }

    cancelEdit(){
        this.setState({
            code: '',
            value: '',
            order: '',
            editing: false,
            editingIndex: -1
        });
    }

    //navigate to next or submit on enter
    onEnter(e) {
        if (e.keyCode == 13) {
            this.addTrialProperty()
        }
    }

    //reset fields values when popup closes
    componentWillReceiveProps(nextProps) {

        if (!nextProps.visibility) {
            this.setState({
                propertyName: '',
                columnLabel: '',
                listOfValues: [],
                code: '',
                value: '',
                order: '',
                activeTab: "property"
            })
        }
    }


    render() {

        const {dataType} = this.props;
        let propertyTab = this.state.activeTab === "property",
            valuesTab = this.state.activeTab === "values";
        return (
            <div className="modalWrapper" style={{display: this.props.visibility ? 'block' : "none"}}>

                <div className="newTrialPropertyWrapper modalPopup">
                    <h2>New {dataType} Property</h2>
                    <ul className="modalTabs">
                        <li>
                            <button onClick={this.showPropertyTab}
                                    className={this.state.activeTab == 'property' ? "active" : ""}>Property
                            </button>
                        </li>
                        <li style={{display: dataType === "List" ? "block" : "none"}}>
                            <button onClick={this.addTrialProperty}
                                    className={this.state.activeTab == 'values' ? "active" : ""}> Values
                            </button>
                        </li>
                    </ul>
                    <div className="form">
                        <div className="propertyTab" style={{display: propertyTab ? "block" : "none"}}>
                            <div className="inputWrapper">
                                <label>Name</label>
                                <input type="text"
                                       ref={(input) => {
                                           this.newPropertyName = input;
                                       }}
                                       id="newPropertyName"
                                       onKeyDown={this.onEnter}
                                       value={this.state.propertyName}
                                       placeholder="New Property Name"
                                       onChange={this.updatePropertyName}
                                />
                                <label className="err"> Name cannot be empty.</label>
                            </div>
                            <div className="inputWrapper">
                                <label>Column Label</label>
                                <input type="text"
                                       ref={(input) => {
                                           this.newPropertyColumnLabel = input;
                                       }}
                                       id="newPropertyColumnLabel"
                                       onKeyDown={this.onEnter}
                                       value={this.state.columnLabel}
                                       placeholder="Column Label"
                                       onChange={this.updateColumnLabel}
                                />
                                <label className="err"> Column label cannot be empty.</label>

                            </div>
                        </div>
                        <div className="valuesTab" style={{display: valuesTab ? "block" : "none"}}>
                            <div className="inputWrapper">
                                <label>Code</label>
                                <input type="text"
                                       ref={(input) => {
                                           this.newCode = input;
                                       }}
                                       id="newCode"
                                       onKeyDown={this.onEnter}
                                       value={this.state.code}
                                       placeholder="Code"
                                       onChange={this.updateCode}
                                />
                                <label className="err"> Code cannot be empty</label>
                            </div>
                            <div className="inputWrapper">
                                <label>Value</label>
                                <input type="text"
                                       ref={(input) => {
                                           this.newValue = input;
                                       }}
                                       id="newValue"
                                       onKeyDown={this.onEnter}
                                       value={this.state.value}
                                       placeholder="Value"
                                       onChange={this.updateValue}
                                />
                                <label className="err"> Value cannot be empty</label>

                            </div>
                            <div className="inputWrapper">
                                <label>Order</label>
                                <input type="text"
                                       ref={(input) => {
                                           this.newOrder = input;
                                       }}
                                       id="newOrder"
                                       onKeyDown={this.onEnter}
                                       value={this.state.order}
                                       placeholder="Order"
                                       onChange={this.updateOrder}
                                />
                                <label className="err"> Order must be a unique #</label>
                            </div>
                            <div className="inputWrapper buttonList ">
                                {this.state.editing
                                    ? <button onClick={this.updateValueData} className="addValue" title="Update">Update </button>
                                    : <button onClick={this.addNewValue} className="addValue" title="Add">Add </button>
                                }
                            </div>
                            <div className="valuesListWrapper"
                                 style={{display: this.state.listOfValues.length > 0 ? "inline-block" : "none"}}>
                                <table width="100%">
                                    <colgroup>
                                        <col width="25%"/>
                                        <col width="25%"/>
                                        <col width="25%"/>
                                        <col width="25%"/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Value</th>
                                        <th>Order</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                </table>
                                <div className="valuesList">
                                    <table width="100%">
                                        <colgroup>
                                            <col width="25%"/>
                                            <col width="25%"/>
                                            <col width="25%"/>
                                            <col width="25%"/>
                                        </colgroup>
                                        <tbody>{
                                            this.state.listOfValues.map((l, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{l.code}</td>
                                                        <td>{l.name}</td>
                                                        <td>{l.sortingOrder}</td>
                                                        <td>


                                                            <button title="Edit"
                                                                    onClick={this.editValue.bind(this, index, event)}
                                                                    disabled={this.state.editing}
                                                            >
                                                                <i className="icon-pencil"></i>
                                                            </button>
                                                            <button title="Delete"
                                                                    onClick={this.deleteValue.bind(this, index, event)}
                                                                    className="delete"
                                                                    disabled={this.state.editing}
                                                            >
                                                                <i className="icon-trash"></i>
                                                            </button>


                                                            <button title="Cancel"
                                                                    className="cancel"
                                                                    style={{display:(this.state.editing && this.state.editingIndex===index) ? "inline-block": "none"}}
                                                                    onClick={this.cancelEdit.bind(this, index, event)}
                                                                >
                                                                <i className="icon-cancel"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="buttonList floatRight">
                            <button className="cancel"  title="Cancel" onClick={this.cancelTrialPropertyCreation}> Cancel</button>
                            <button onClick={this.addTrialProperty}
                                    title="Next"
                                    style={{display: this.state.activeTab === "property" && dataType === "List" ? "inline-block" : "none"}}>
                                Next
                            </button>
                            <button onClick={this.showPropertyTab}
                                    title="Previous"
                                    style={{
                                        display: this.state.activeTab === "values" && dataType === "List" ? "inline-block" : "none",
                                        float: "left"
                                    }}>
                                Previous
                            </button>
                            <button
                                title="Save"
                                style={{
                                    display: (this.state.activeTab === "values" && dataType === "List") || (dataType !== "List") ? "inline-block" : "none",
                                    marginRight: 0
                                }}
                                onClick={ this.state.activeTab === "values" ? this.saveProperty : this.addTrialProperty}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export  default NewTrialProperties;