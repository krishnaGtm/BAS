import React from 'react';
import Datacell from './Datacell';
import Headercell from './Headercell';
import {Table, Cell, Column} from 'fixed-data-table';
import TouchableArea from './TouchableArea'
import Sidebar from './Sidebar'
import Pagination from './pagination'

class Tabledata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableWidth: null,
            tableHeight: null,
            colSortDirs: [],
            searchVisibility: false
        }

        this.columnWidth = [];
        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this.expandRow = this.expandRow.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
        this.collapseRow = this.collapseRow.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.cellClicked = this.cellClicked.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.toggleSearchBox = this.toggleSearchBox.bind(this);
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

    onPageSizeChange(pageSize) {
        this.props.onPageSizeChange(pageSize)
    }

    onSortChange(columnKey, sortDir) {

        //update sort state for corresponding columnkey
        this.setState({
            colSortDirs: {
                [columnKey]: sortDir
            }
        });
    }

    submitFilter(args) {
        this.props.submitFilter(args);
    }

    clearFilter(col) {
        this.props.clearFilter(col);
    }

    render() {

        const {
            mainData,
            fields,
            fieldsInfo,
            currentPage,
            totalRecords,
            selectedRow,
            etcList,
            entityTypeCode,
            highLightedCol,
            pageSize,
            fieldLabels,
            traitFieldsetLabels,
            propertyFieldsetLabels,
            singleSortColumnSelection,
            colSortDirs
        }  = this.props;

        let allFieldLabels = Object.assign({}, fieldLabels, traitFieldsetLabels, propertyFieldsetLabels);

        return (
            <div className="midTableWrapper">
                <Sidebar {...this.props} />


                <div className="tableData">
                    <div>
                        <TouchableArea {...this.state} {...this.props}>
                            <Table
                                rowHeight={35}
                                rowsCount={mainData.length}
                                width={this.props.tableWidth || 500}
                                height={this.props.tableHeight || 500}
                                headerHeight={45}

                                onScrollEnd={this.onScrollEnd}
                                onColumnResizeEndCallback={this._onColumnResizeEndCallback}


                                scrollTop={this.props.scrollTop}
                                scrollLeft={this.props.scrollLeft}
                                overflowX={this.props.overflowX}
                                overflowY={this.props.overflowY}
                                onContentHeightChange={this.props.onContentHeightChange}

                                {...this.props}
                            >

                                {
                                    fields.map(function (col, index) {
                                        let dir = colSortDirs.filter((f) => f.col == col);
                                        return <Column
                                            key={col}
                                            columnKey={col}
                                            header={<Headercell
                                                fieldInfo={fieldsInfo[col]}
                                                highLightedCol={highLightedCol} col={col}
                                                onSortChange={this.onSortChange}
                                                submitFilter={this.submitFilter}
                                                clearFilter={this.clearFilter}
                                                singleSortColumnSelection={singleSortColumnSelection}
                                                sortDir={dir[0] ? dir[0].ord : undefined}
                                                etcList={etcList}
                                                entityTypeCode={entityTypeCode}
                                                sometext={col + " haha "}
                                                filterData={this.props.filterApplied[col]}
                                            >
                                                {allFieldLabels[col] }
                                            </Headercell>
                                            }
                                            cell={

                                                ({...props}) => {

                                                    return <Datacell
                                                        data={mainData}
                                                        col={col}
                                                        cellClicked={this.cellClicked}
                                                        highLightedCol={highLightedCol}
                                                        selectedRow={selectedRow}
                                                        expandRow={this.expandRow}
                                                        collapseRow={this.collapseRow}
                                                        lastSearchedIndex={this.props.lastSearchedIndex}
                                                        searchedText={this.props.searchedText}
                                                        {...props}
                                                    />
                                                }

                                            }
                                            width={this.columnWidth[col] || 150}
                                        />

                                    }.bind(this))
                                }


                            </Table>

                        </TouchableArea>

                        <Pagination
                            onPagination={this.onPagination}
                            pageNo={currentPage}
                            totalRecords={totalRecords}
                            pageSize={pageSize}
                            onPageSizeChange={this.onPageSizeChange}
                            tableWidth={this.props.tableWidth}
                        />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        //enable Sidebar in main Screen
        this.props.enableSidebar();

        if (this.props.fields.length == 0)
            this.props.initialFetch();

        document.addEventListener("keydown", this.toggleSearchBox)
    }

    toggleSearchBox(e) {
        //ctrl+F support
        if (e.ctrlKey && (e.which || e.keyCode) == 70) { // ascii of f === 70
            e.preventDefault();
            this.props.toggleSearchBox();
        }
        else if (e.keyCode == 27) {
            e.preventDefault();
            this.props.toggleSearchBox(false);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.toggleSearchBox)
    }
}

export default Tabledata;