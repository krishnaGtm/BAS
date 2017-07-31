/**
 * Created by dbasukala on 27/12/2016.
 */
import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';
import {Link} from 'react-router';
import TrialLineNaming from './trialLineNaming';

    class Trials extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            moreLink: false
        }
        this.toogleTrialReady = this.toogleTrialReady.bind(this);
        this.showMoreLinks = this.showMoreLinks.bind(this);
        this.resetToggleMoreLink = this.resetToggleMoreLink.bind(this);
    }

    componentDidMount() {
       this.props.fetchTrials();
        document.addEventListener("click",this.resetToggleMoreLink);
    }

    toogleTrialReady(index) {
        this.props.toogleTrialReady(index)
    }

    showMoreLinks(e) {
        this.setState({moreLink: true})
        e.preventDefault();
        e.stopPropagation();

    }

    resetToggleMoreLink(e){
        if(!e.target.classList.contains("icon-ellipsis-vert" ) && !e.target.classList.contains("moreLink"))
            this.setState({moreLink: false})
    }

    componentWillUnmount(){
        document.removeEventListener("click",this.resetToggleMoreLink)
    }


    render() {
        const {tableWidthFull, tableHeightFull, trials} = this.props;
        let trialFields = ["name", "countryName", "completed"];
        let selectedRecords = trials.filter(t=>t.checked).length
        let disableReady = selectedRecords==0;

        return (
            <div className="trialsWrapper commonWrapper">
                <h3 className="componentTitle">My Trials</h3>
                <div className="buttonList">
                    <button title="Make selected trials ready" onClick={this.props.showTrialNamingModal} disabled={disableReady}> Ready <i className="icon-beaker"></i>
                    </button>
                    <div className="floatingMenu">
                    <button className="moreLink" title="More" onClick={this.showMoreLinks.bind(this)}><i className="icon-ellipsis-vert"></i></button>
                        <ul style={{"display": this.state.moreLink? "block": "none"}}>
                            <li><Link to="/main/trials/properties" title="Trial Properties"> Trial Properties </Link></li>
                            <li><Link to="#" title="Property Set"> Property Sets </Link></li>
                        </ul>
                    </div>
                </div>
                <Table
                    rowHeight={35}
                    rowsCount={trials.length}
                    width={tableWidthFull || 500}
                    height={tableHeightFull || 500}
                    headerHeight={45}
                    data={trials}
                    {...this.props}
                >
                    {
                        trialFields.map((col) => {
                            return (
                                <Column
                                    key={col}
                                    header={() => {

                                        switch (col) {
                                            case "name":
                                                return <div className=" headerField" title="Name" >Name</div>
                                            case "countryName":
                                                return <div className=" headerField" title="Country" >Country</div>
                                            case "completed" :
                                                return <div className=" headerField" title="Status" >Status</div>
                                            default :
                                                return <div className="headerField" title={col} >{col}</div>
                                        }
                                    }
                                    }
                                    cell={(props) => {
                                        return (
                                            <div className="trialCell fields">
                                                { (col == "name") ?
                                                    <div className="trialCheckboxes">
                                                        <input
                                                            id={"check-" + props.rowIndex}
                                                            type="checkbox"
                                                            checked = {trials[props.rowIndex].checked}
                                                            disabled={trials[props.rowIndex].completed}
                                                            onChange={this.toogleTrialReady.bind(this,props.rowIndex)}/><label
                                                        htmlFor={"check-" + props.rowIndex}
                                                        title="Select for Ready process"
                                                    ></label>
                                                        <Link to={"/main/trials/" + (trials[props.rowIndex].ezid) }
                                                              title="Go to Trial Lines">{trials[props.rowIndex][col]}</Link>
                                                    </div>
                                                    : <div>{col == "completed" ? (trials[props.rowIndex][col] ? <i className="icon-ok" title="Ready" style={{cursor:"default"}}></i>: "_") : trials[props.rowIndex][col] }  </div>

                                                }
                                            </div>

                                        )
                                    }
                                    }
                                    width={250}
                                />)
                        })
                    }

                </Table>
                <TrialLineNaming
                    visibility={this.props.trailLineNamingModal}
                    cancelTrialLineNaming={this.props.cancelTrialLineNaming}
                    createTrialLineNaming ={this.props.createTrialLineNaming }
                    fromParent="Trials"
                    selectedRecords={selectedRecords}
                />
            </div>
        )
    }
}

export default Trials;