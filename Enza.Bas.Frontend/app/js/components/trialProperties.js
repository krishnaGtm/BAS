/**
 * Created by dbasukala on 27/12/2016.
 */
import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';
import {Link} from 'react-router'
import Pagination from './pagination';
import NewTrialProperty from './newTrialProperties';
import TrialLineNaming from './trialLineNaming';

class TrialProperties extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moreLink: false,
            currentPage:1,
            pageSize:100,
            pagedProperties:[]
        }

        this.showMoreLinks = this.showMoreLinks.bind(this);
        this.resetToggleMoreLink = this.resetToggleMoreLink.bind(this);
        this.onPagination = this.onPagination.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.showTrialPropertyCreationModal = this.showTrialPropertyCreationModal.bind(this);
    }

    //Navigate with/to the page being selected
    onPagination(pageNo) {

        //fetch pagination data ;
        let newPageNo;

        switch (pageNo) {
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
                newPageNo = Math.ceil(this.props.trialProperties.length/ this.state.pageSize);
                break;
            default:
                newPageNo = pageNo;

        }

        this.setState({currentPage:newPageNo})
    }

    //update Page Size and reset page number to 1
    onPageSizeChange(pSize) {
        this.setState({pageSize:pSize, currentPage:1});
    }

    //fetch Trial Properties for the first time in case of refresh.
    componentDidMount() {
        this.props.fetchTrialProperties();
        document.addEventListener("click", this.resetToggleMoreLink);
    }

    //show pop up menu to select data type to create property of.
    showMoreLinks(e) {
        this.setState({moreLink: true})
        e.preventDefault();
        e.stopPropagation();
    }

    //hide Pop up menu to create properties
    resetToggleMoreLink(e) {
        if (!e.target.classList.contains("addLink"))
            this.setState({moreLink: false})
    }

    //unbind function to hide popup menu when user clicks outside the menu
    componentWillUnmount() {
        document.removeEventListener("click", this.resetToggleMoreLink)
    }

    //Shows Modal popup to create property type of selected data type.
    showTrialPropertyCreationModal(dataType, e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dataType: dataType});
        this.props.showTrialPropertyCreationModal()
    }


    render() {
        const {tableWidthFull, tableHeightFull, trialProperties} = this.props;
        let trialPropertiesFields = ["name", "columnLabel", "dataType"];

        let listFrom = (this.state.currentPage-1)*this.state.pageSize;
        let listTo = listFrom + this.state.pageSize ;
        if(trialProperties.length< listTo)
            listTo = trialProperties.length;
        let pagedProperty = trialProperties.slice(listFrom, listTo);
        return (
            <div className="trialPropertiesWrapper commonWrapper">
                <h3 className="componentTitle"> Trial Properties</h3>
                <div className="buttonList">
                    <div className="floatingMenu">
                        <button className="addLink" title="Add" onClick={this.showMoreLinks.bind(this)}>+</button>
                        <ul style={{"display": this.state.moreLink ? "block" : "none"}}>
                            <li><a href="#" onClick={this.showTrialPropertyCreationModal.bind(this, "Integer", event)} title="Integer">
                                Integer </a></li>
                            <li><a href="#" onClick={this.showTrialPropertyCreationModal.bind(this, "Decimal", event)} title="Decimal">
                                Decimal</a></li>
                            <li><a href="#" onClick={this.showTrialPropertyCreationModal.bind(this, "Date", event)} title="Date">
                                Date</a></li>
                            <li><a href="#" onClick={this.showTrialPropertyCreationModal.bind(this, "Text", event)} title="Text">
                                Text</a></li>
                            <li><a href="#" onClick={this.showTrialPropertyCreationModal.bind(this, "List", event)} title="Text from list">
                                Text from list</a></li>
                        </ul>
                    </div>
                </div>
                <Table
                    rowHeight={35}
                    rowsCount={pagedProperty.length}
                    width={tableWidthFull || 500}
                    height={tableHeightFull - 80 || 500}
                    headerHeight={45}
                    data={pagedProperty}
                    {...this.props}
                >
                    {
                        trialPropertiesFields.map((col) => {
                            return (
                                <Column
                                    key={col}
                                    header={() => {

                                        switch (col) {
                                            case "name":
                                                return <div className=" headerField" title="Name">Name</div>
                                            case "columnLabel":
                                                return <div className=" headerField" title="Column Label">Column
                                                    Label</div>
                                            case "dataType":
                                                return <div className=" headerField" title="Data Type">Data Type</div>
                                            default :
                                                return <div className="headerField" title={col}>{col}</div>
                                        }
                                    }
                                    }
                                    cell={(props) => {
                                        return (
                                            <div className="trialPropertiesCell fields">
                                                { pagedProperty[props.rowIndex][col] }
                                            </div>
                                        )
                                    }
                                    }
                                    width={250}
                                />)
                        })
                    }

                </Table>

                <Pagination
                    onPagination={this.onPagination}
                    pageNo={this.state.currentPage}
                    totalRecords={this.props.trialProperties.length}
                    pageSize={this.state.pageSize}
                    onPageSizeChange={this.onPageSizeChange}
                    tableWidth={this.props.tableWidthFull}
                />

                <NewTrialProperty
                    visibility={this.props.trialPropertyCreationModal}
                    dataType={this.state.dataType}
                    cancelTrialPropertyCreation={this.props.cancelTrialPropertyCreation}
                    createTrialProperty={this.props.createTrialProperty}
                />

                <TrialLineNaming
                    visibility={this.props.trailLineNamingModal}
                    cancelTrialLineNaming={this.props.cancelTrialLineNaming}
                    selectedTrialLineIndexes={this.props.selectedTrialLineIndexes}
                    createTrialLineNaming ={this.props.createTrialLineNaming }
                    fromParent="trials"
                />
            </div>
        )
    }
}

export default TrialProperties ;