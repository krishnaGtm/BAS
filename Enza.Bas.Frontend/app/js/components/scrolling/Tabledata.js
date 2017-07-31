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

        var showHideNestedRows;
        return (

            <div
                className={(selectedRow.indexOf(data[rowIndex].EZID) > -1 )? 'selected'+ classes: classes}
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

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.onChange=this.onChange.bind(this);
    }
    onChange(e){
        this.props.onPageSizeChange(e.target.value);
    }

    render() {

        let {pageNo, totalRecords, pageSize}= this.props;
        let totalPages = Math.ceil(totalRecords / pageSize );

        let pagesInside=[];

        if(totalPages<6)
        {
            // << < 1 2 3 4 5 > >>
            for(let i = 1;i<=totalPages;i++){
                pagesInside.push(<PageLink key={i} onClick={this.props.onPagination} >{i}</PageLink>)
            }

        }
        else if (totalPages >= 6) {
            if (pageNo > 3 && pageNo<totalPages-2) {
                // << < 1 ... 4 5 6 ... 10 > >>
                pagesInside.push(<PageLink key={1} onClick={this.props.onPagination} data-page="1">1 </PageLink>)
                pagesInside.push(<PageLink key={2} onClick={this.props.onPagination} >...</PageLink>)
                pagesInside.push(<PageLink key={3} onClick={this.props.onPagination} data-page={pageNo-1}>{pageNo-1}</PageLink>)
                pagesInside.push(<PageLink key={4} onClick={this.props.onPagination} classes="active" data-page={pageNo}>{pageNo}</PageLink>)
                pagesInside.push(<PageLink key={5} onClick={this.props.onPagination} data-page={pageNo+1}>{pageNo+1}</PageLink>)
                pagesInside.push(<PageLink key={6} onClick={this.props.onPagination} >...</PageLink>)
                pagesInside.push(<PageLink key={7} onClick={this.props.onPagination} data-page={totalPages}>{totalPages}</PageLink>)

            }
            else if (pageNo <= 3) {
                // << < 1 2 3 ... 20
                pagesInside.push(<PageLink key={1} onClick={this.props.onPagination} classes={pageNo==1? "active": ""} data-page={1}>1</PageLink>)
                pagesInside.push(<PageLink key={2} onClick={this.props.onPagination} classes={pageNo==2? "active": ""} data-page={2}>2</PageLink>)
                pagesInside.push(<PageLink key={3} onClick={this.props.onPagination} classes={pageNo==3? "active": ""} data-page={3}>3</PageLink>)
                pagesInside.push(<PageLink key={4} onClick={this.props.onPagination} >...</PageLink>)
                pagesInside.push(<PageLink key={5} onClick={this.props.onPagination} data-page={totalPages}>{totalPages}</PageLink>)
            }
            else if ((totalPages - pageNo) <= 2) {
                // << < 1 ... 18 19 20
                pagesInside.push(<PageLink key={1} onClick={this.props.onPagination} data-page={1}>1</PageLink>)
                pagesInside.push(<PageLink key={2} onClick={this.props.onPagination} >...</PageLink>)
                pagesInside.push(<PageLink key={3} onClick={this.props.onPagination}  classes={pageNo==(totalPages-2)? "active": ""} data-page={totalPages-2}>{totalPages-2}</PageLink>)
                pagesInside.push(<PageLink key={4} onClick={this.props.onPagination}  classes={pageNo==(totalPages-1)? "active": ""} data-page={totalPages-1}>{totalPages-1}</PageLink>)
                pagesInside.push(<PageLink key={5} onClick={this.props.onPagination}  classes={pageNo==totalPages? "active": ""} data-page={totalPages}>{totalPages}</PageLink>)
            }
        }

        return (
            <div className="pagination" style={{width:this.props.tableWidth}} >
                <ul className="pages">
                    <PageLink classes={"first icon-left-dir  " + (pageNo==1?"disabled":"")} data-page="first"
                              onClick={this.props.onPagination}/>
                    <PageLink classes={"previous icon-left-dir " +  (pageNo==1?"disabled":"")} data-page="previous"
                              onClick={this.props.onPagination}/>
                    {pagesInside}


                    <PageLink classes={"next icon-right-dir " + (pageNo==totalPages?"disabled":"")} data-page="next"
                              onClick={this.props.onPagination}/>
                    <PageLink classes={"last icon-right-dir " + (pageNo==totalPages?"disabled":"")} data-page="last"
                              onClick={this.props.onPagination}/>
                </ul>

                <div className="pageSize" ><span>Showing</span>
                    <select onChange={this.onChange} >
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                    </select>
                    <span>items per page </span>
                </div>
                <p> Total  items {this.props.totalRecords}</p>
            </div>
        )
    }

}

class PageLink extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);

    }

    onClick(e) {
        this.props.onClick(this.props['data-page'])
    }

    render() {
        let link;
        if(this.props.children== "..." || (this.props.classes && this.props.classes.indexOf("disabled") > -1 )){
            link = <span className={this.props.classes} title={this.props.children}>{this.props.children}</span>
        }
        else
            link = <a href="#" className={this.props.classes} onClick={this.onClick}  >{this.props.children}</a>

        return (
            <li>{link}</li>
        )
    }

}

class Tabledata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableWidth: null,
            tableHeight: null
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

    onScrollEnd() {
        //console.log("scrollended", arguments);
    }

    expandRow(index) {
        this.props.onExpandRow(index);
    }

    collapseRow(index) {
        this.props.collapseRow(index);
    }   

    cellClicked(args) {
        this.props.onCellClick(args)
        
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

        const {mainData,
            fields,
            tableWidth,
            tableHeight,
            fetchData,
            dataHistory,
            collapseRow,
            currentPage,
            totalRecords,
            selectedRow,
            highLightedCol,
            pageSize,
            onCellClick,
            onPageSizeChange,
            onPagination,
            onExpandRow,
            fieldLabels,
            traitFieldsetLabels,
            propertyFieldsetLabels}  = this.props;
        return (
            <div className="tableData">
                <div>
                    <Table
                        rowHeight={35}
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
                    <Pagination
                        onPagination={this.onPagination}
                        pageNo={this.props.currentPage}
                        totalRecords={this.props.totalRecords}
                        pageSize={this.props.pageSize}
                        onPageSizeChange={this.onPageSizeChange}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {


    }
}

export default Tabledata;