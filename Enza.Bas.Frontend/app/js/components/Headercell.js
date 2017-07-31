import React from 'react';

const SortTypes = {
    ASC: 'ASC',
    DESC: 'DESC'
};

const reverseSortDirection = (sortDir)=> sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;

class Headercell extends React.Component {
    constructor(props) {
        super(props);

        this.typeExpressionMap = {
            "ST": ['eq', 'neq', 'isnull', 'isnotnull', 'startswith', 'contains', 'doesnotcontains', 'endswith', 'isempty', 'isnotempyt'],
            "INT": ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'isnull', 'isnotnull'],
            "DT": ['eq', 'neq', 'gt', 'gte', 'lt', 'lte','isnull', 'isnotnull']
        }

        this.expressionValueMap = {
            "eq": "equals to",
            "neq": "not equals to",
            "gt": "greater than",
            "gte": "greater than or equals to",
            "lt": "less than",
            "lte": "less than or equals to",
            "isnull": "is null",
            "isnotnull": "is not null",
            "startswith": "starts with",
            "contains": "contains",
            "doesnotcontains": "does not contains",
            "endswith": "ends with",
            "isempty": "is empty",
            "isnotempyt": "is not empty"
        }

        this.typeMap = {
            "C": "ST",
            "ST": "ST",
            "I": "INT",
            "INT": "INT",
            "A": "INT",
            "D": "DT",
            "": "ST"
        }

        this.errorMessage = {
            'ST': "Invalid input. String expected.",
            'INT': "Invalid input. Number expected.",
            'DT': "Invalid input. Date expected.",
        }

        this.state = {
            dataType: (this.props.fieldInfo != undefined ) ? this.typeMap[this.props.fieldInfo.DataType] : 'ST',
            dataFormat: (this.props.fieldInfo != undefined) ? this.props.fieldInfo.DisplayFormat : '',
            columnKey: this.props.columnKey,
            filterValue1: '',
            filterValue2:  '',
            operator1: 'eq',
            operator2: 'eq',
            logicalOperator: '',
            error: false,
            etc: this.props.entityTypeCode
        }

        this.singleSortColumnSelection = this.singleSortColumnSelection.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.update = this.update.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    componentWillReceiveProps(nextProps) {


        if (this.props.sortDir != nextProps.sortDir)
            this.setState({sortDir: this.props.sortDir})

        if (this.props.entityTypeCode !== nextProps.entityTypeCode) {
            this.setState({etc: nextProps.entityTypeCode})
        }
        this.setState({columnKey: nextProps.columnKey})

        if (nextProps.filterData == undefined) {
            this.setState({
                filterValue1: '',
                filterValue2: '',
                operator1: 'eq',
                operator2: 'eq',
                logicalOperator: ''
            });
        }
        else {
            this.setState({
                filterValue1: nextProps.filterData.filterValue1,
                filterValue2: nextProps.filterData.filterValue2,
                operator1: nextProps.filterData.operator1,
                operator2: nextProps.filterData.operator2,
                logicalOperator: nextProps.filterData.logicalOperator,
                dataType: this.typeMap[nextProps.fieldInfo.DataType],
                dataFormat: nextProps.fieldInfo.DisplayFormat,
                columnKey: nextProps.columnKey
            })
        }

        if(nextProps.fieldInfo && this.state.dataType != this.typeMap[nextProps.fieldInfo.DataType]){
            this.setState({dataType: this.typeMap[nextProps.fieldInfo.DataType]})
        }
    }

    singleSortColumnSelection() {
        this.props.singleSortColumnSelection(this.props.columnKey, this.props.sortDir ? reverseSortDirection(this.props.sortDir) : SortTypes.DESC);
    }

    submitFilter(e) {
        e.preventDefault();
        // columnkey,columnDataType, search Value, logical operator
        // if secondary filter value is set , another instance of same set above with secondary field value in conjuction with logical operator

        let args;
        //hack for entitytypecode
        if (this.state.columnKey == "EntityTypeCode") {

            args = {
                "columnKey": this.props.columnKey,
                "dataType": this.typeMap[this.props.fieldInfo.DataType],
                "filterValue1": this.state.etc,
                "operator1": 'eq',
                "operator2": null,
                "filterValue2": '',
                "logicalOperator": null
            }
        }
        else {
            args = {
                "columnKey": this.props.columnKey,
                "dataType": this.typeMap[this.props.fieldInfo.DataType],
                "filterValue1": this.state.filterValue1,
                "operator1": this.state.operator1,
                "operator2": this.state.operator2,
                "filterValue2": this.state.filterValue2,
                "logicalOperator": this.state.logicalOperator
            }
        }
        this.props.submitFilter(args);

        //hide filter popup
        let visibleFilter = document.querySelector(".headerField[data-filter='visible']");
        if (visibleFilter)
            visibleFilter.setAttribute("data-filter", 'hidden');
    }

    validate(val) {

        switch (this.state.dataType) {
            case "ST": {
                //valid
                return false;
            }
                break;
            case "INT": {
                return isNaN(parseFloat(val)) || !isFinite(val);
            }
                break;
            case "DT": {
                //valid
                return false;
            }
                break;
            default: {
                //valid
                return false;
            }
        }
    }

    update(e) {
        //hack for entitytypecode
        if (e.target.name == "etc") {
            //udpate local state
            this.setState({
                etc: this.refs.etc.value
            });
            return
        }
        else {
            //udpate local state
            this.setState({
                operator1: this.refs.operator1.value,
                operator2: this.refs.operator2.value,
                filterValue1: this.refs.filterValue1.value,
                logicalOperator: this.refs.logicalOperator.value,
                filterValue2: this.refs.filterValue2.value
            });
        }


        let val = e.target.value;


        let inValid = (val == "") ? false : this.validate(e.target.value);
        //check for validation and set error flag is invalid

        if (inValid) {
            if (e.target.name == "filterValue1")
                this.setState({errorInValue1: inValid});
            if (e.target.name == "filterValue2")
                this.setState({errorInValue2: inValid});
        }
        else {
            this.setState({errorInValue1: false, errorInValue2: false});
        }
    }

    clearFilter(e) {
        e.preventDefault();
        //hack for entitytypecode
        if (e.target.name == "etc") {
            //udpate local state
            this.setState({
                etc: this.refs.filterValue1.value
            });
        }
        else {
            this.setState({
                operator1: "eq",
                operator2: "eq",
                filterValue1: '',
                logicalOperator: 'AND',
                filterValue2: ''
            })
        }
        this.props.clearFilter(this.props.columnKey);
        this.hideFilter();

    }

    hideFilter() {
        let visibleFW = document.querySelector('.headerField[data-filter="visible"]');
        if (visibleFW)
            visibleFW.setAttribute("data-filter", "hidden");
    }

    showFilter(e) {

        let filterWrapper = e.target.parentElement;
        if (filterWrapper.getAttribute("data-filter") == "hidden") {
            let visibleFW = document.querySelector('.headerField[data-filter="visible"]');
            if (visibleFW)
                visibleFW.setAttribute("data-filter", "hidden");
            filterWrapper.setAttribute("data-filter", "visible");
        }
        else {
            filterWrapper.setAttribute("data-filter", "hidden");
        }

    }


    render() {
        var {highLightedCol, sortDir}= this.props;
        var operatorOptions = this.typeExpressionMap[(this.props.fieldInfo != undefined ) ? this.typeMap[this.props.fieldInfo.DataType] : 'ST'].map(function (expression) {
            return <option key={expression} value={expression}>{this.expressionValueMap[expression]}</option>
        }.bind(this));


        let errorMessageInValue1 = (this.state.errorInValue1) ?
            <span className="error">{this.errorMessage[this.state.dataType]}</span> : '';
        let errorMessageInValue2 = (this.state.errorInValue2) ?
            <span className="error">{this.errorMessage[this.state.dataType] }</span> : '';
        return (
            <div className={(highLightedCol == this.props.col) ? 'selected headerField' : ' headerField'}
                 data-filter="hidden" data-filterapplied={this.props.filterData ? 1 : 0}
                 id={this.props.columnKey}
                 title={this.props.children}
            >

                <span onClick={this.singleSortColumnSelection} className="headerText">
                    {this.props.children}
                    {sortDir ? (sortDir.toLowerCase() === SortTypes.DESC.toLowerCase() ? ' \u2191' : ' \u2193' ) : ''}</span>
                <i className=" filterHandle filterIcon icon-filter" title="Column Filter" onClick={this.showFilter}></i>

                <div className="filterWrapper" id={"filter" + this.props.columnKey}>
                    <span className="close"  title="Close" onClick={this.hideFilter}><i className="icon-cancel"></i></span>
                    <form onSubmit={this.submitFilter}>

                        <a href="javascript:void(0)" className="sortColumn"
                           onClick={this.singleSortColumnSelection}>Sort {sortDir ? (sortDir === SortTypes.DESC ? 'Z-A' : 'A-Z' ) : ''}</a>
                        <div style={{display: (this.state.columnKey === "EntityTypeCode") ? "none" : "block"}}>
                            <label style={{display: (this.state.columnKey === "EntityTypeCode") ? "none" : "block"}}>Show
                                item with value that</label>
                            <select className="operator" ref="operator1" onChange={this.update}
                                    value={this.state.operator1}>
                                {operatorOptions}
                            </select>

                            <input type="text" className="filterValue1" name="filterValue1" ref="filterValue1"
                                   value={this.state.filterValue1}
                                   onChange={this.update}
                            />
                        </div>
                        <div style={{display: (this.state.columnKey === "EntityTypeCode") ? "block" : "none"}}>
                            <label>Select Entity Type Code</label>

                            <select className="filterValue1" name="etc" ref="etc" value={this.state.etc}
                                    onChange={this.update}>


                                {
                                    this.props.etcList.map((f)=> {
                                        return <option key={f.EntityTypeCode}
                                                       value={f.EntityTypeCode}>{f.EntityTypeName}</option>
                                    })
                                }
                            </select>
                        </div>
                        {
                            errorMessageInValue1
                        }
                        <div style={{display: (this.state.columnKey === "EntityTypeCode") ? "none" : "block"}}>
                            <select className="logicalOperator" ref="logicalOperator" value={this.state.logicalOperator}
                                    onChange={this.update}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>

                            <select className="operator" ref="operator2" onChange={this.update}
                                    value={this.state.operator2}>
                                {operatorOptions}
                            </select>


                            <input type="text" className="filterValue2" name="filterValue2" ref="filterValue2"
                                   value={this.state.filterValue2}
                                   onChange={this.update}
                            />
                            {
                                errorMessageInValue2
                            }
                        </div>
                        <div className="actionBtns">
                            <button disabled={this.state.errorInValue1 || this.state.errorInValue2 ? true : false }
                            title="Submit Filter"
                            >
                                Filter
                            </button>
                            <button onClick={this.clearFilter} title="Clear Filter">Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Headercell;