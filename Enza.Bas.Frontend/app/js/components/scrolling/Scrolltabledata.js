import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';

class Mycell extends React.Component {

    constructor(props) {
        super(props);
        this.cellClicked = this.cellClicked.bind(this);
        this.expandRow = this.expandRow.bind(this);
        this.collapseRow = this.collapseRow.bind(this);
    }

    cellClicked(col,index,event) {
        if(event.shiftKey)
            document.getSelection().removeAllRanges();
        this.props.cellClicked({col:col,index:index,ctrlKey:event.ctrlKey,shiftKey:event.shiftKey})
    }

    expandRow(index, e) {
        e.stopPropagation();
        this.props.expandRow(index);
    }

    collapseRow(index, e) {
        e.stopPropagation();
        this.props.collapseRow(index);
    }

    render() {
        var {rowIndex, col, data, highLightedCol, selectedRow} = this.props;
        var classes = ' fields ';
        var showHideNestedRows;
        if ((col === "EZID")) {
            classes += "level-" + data[rowIndex].Level + " ";
        }

        if ((col === "EZID") && data[rowIndex].HasChildren) {
            classes += "expandable collapsed";
            if (data[rowIndex].expanded == undefined || data[rowIndex].expanded === false)
                showHideNestedRows =
                    <span onClick={this.expandRow.bind(this,rowIndex)}><i className="icon-plus-circle"></i></span>
            else
                showHideNestedRows =
                    <span onClick={this.collapseRow.bind(this,rowIndex)}><i className="icon-minus-circle"></i></span>
        }
        if (highLightedCol == col)
            classes += "selectedColumn";


        return (

            <div
                className={(selectedRow.indexOf(data[rowIndex].EZID)>-1)? 'selected'+ classes: classes}
                onClick={this.cellClicked.bind(this,col,rowIndex)}
            >{ showHideNestedRows}<span>{data[rowIndex][col]}</span>
            </div>
        )
    }
}

class HCell extends React.Component {

    render() {
        var {highLightedCol}= this.props;
        return (
            <div className={(highLightedCol==this.props.col)? 'selected headerField': ' headerField'}>
                {this.props.children}
            </div>
        )
    }
}

class ScrollTabledata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableWidth: null,
            tableHeight: null,
            rowHeight: 35
        }

        this.columnWidth = [];
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this.expandRow = this.expandRow.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
        this.collapseRow = this.collapseRow.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.cellClicked= this.cellClicked.bind(this);
        this.onPageSizeChange= this.onPageSizeChange.bind(this);
    }

    onScrollEnd(scrollX, scrollY) {

        let scrolledTo = this.props.tableHeight + scrollY,
            cumulativeHeight = this.props.mainData.length*this.state.rowHeight ;
        if(scrolledTo>= cumulativeHeight)
            this.props.onPagination(this.props.currentPage+1);

    }

    expandRow(index) {
        this.props.onExpandRow(index);
    }

    collapseRow(index) {
        this.props.collapseRow(index);
    }   

    cellClicked(col,index) {
        this.props.onCellClick(col,index)
        
    }

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {

        this.setState(function (previousState, currentProps) {
            previousState.columnWidths[columnKey] = newColumnWidth;
            return previousState.columnWidths;

        })
    }

    onPagination(pageNo) {
        this.props.onPagination(pageNo);
    }

    onPageSizeChange(pageSize){
        this.props.onPageSizeChange(pageSize)
    }


    render() {
        let allFieldLabels = Object.assign({},this.props.fieldLabels,this.props.traitFieldsetLabels,this.props.propertyFieldsetLabels);
        return (
            <div className="ScrollingTableData">
                <div>
                    <Table
                        rowHeight={this.state.rowHeight}
                        rowsCount={this.props.mainData.length}
                        width={this.props.tableWidth || 500}
                        height={this.props.tableHeight || 500}
                        headerHeight={45}
                        onScrollEnd={this.onScrollEnd}
                        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                        {...this.props}
                    >

                        {
                            this.props.fields.map(function (col, index) {
                                return <Column
                                    key={"col "+index}
                                    header={<HCell
                                        highLightedCol={this.props.highLightedCol} col={col}
                                        >
                                        {allFieldLabels[col]}
                                        </HCell>
                                        }
                                    cell={

                                    ({...props}) => {

                                       return   <Mycell
                                                    data = {this.props.mainData}
                                                    col={col}
                                                    cellClicked={this.cellClicked}
                                                    highLightedCol={this.props.highLightedCol}
                                                    selectedRow = {this.props.selectedRow}
                                                    expandRow = {this.expandRow}
                                                    collapseRow= {this.collapseRow}
                                                    {...props}
                                                />
                                    }

                                        }
                                    width={this.columnWidth[col]||130}
                                />

                            }.bind(this))
                        }
                    </Table>

                    <div className="scrollPageInfo">
                        <div>Showing  <strong><em>{ this.props.mainData.length} </em></strong>  records of {this.props.totalRecords}.</div>

                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(this.props.fields.length==0)
            this.props.initialFetch();

    }
}

export default ScrollTabledata;

