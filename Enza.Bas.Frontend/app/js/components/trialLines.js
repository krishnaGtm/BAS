/**
 * Created by dbasukala on 27/12/2016.
 */
import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';
import TrialLineNaming from './trialLineNaming'

class TrialLines extends React.Component {
    constructor(props) {
        super(props)
            this.toggleTrialLinesCheck=this.toggleTrialLinesCheck.bind(this);
    }

    componentDidMount() {
        let trialID = this.props.params.id;
       // if(this.props.trialLines.length==0)
            this.props.fetchTrialLines(trialID);
    }
    //toggle trial lines selection
    toggleTrialLinesCheck(index){
        this.props.toggleTrialLinesCheck(index);
    }

    render() {
        const {tableWidthFull, tableHeightFull,trialLines,selectedTrialLineIndexes} = this.props;
        let trialLineFields = ["ezid", "name",'cropCode'];


        return (
            <div className="trialLinesWrapper commonWrapper">
                <h3 className="componentTitle">My TrialLines</h3>
                <div className="buttonList">
                    <button
                        onClick={this.props.showTrialNamingModal}
                        disabled={selectedTrialLineIndexes.length==0}
                        title="Trial Line Naming"
                    > Naming <i className="icon-cog-1"></i>
                    </button>
                </div>
                <Table
                    rowHeight={35}
                    rowsCount={trialLines.length}
                    width={tableWidthFull || 500}
                    height={tableHeightFull || 500}
                    headerHeight={45}
                    data={trialLines}
                    {...this.props}
                >
                    {
                        trialLineFields.map((col) => {
                            return (
                                <Column
                                    key={col}
                                    header={() => {
                                        switch(col){
                                            case "ezid":
                                                return  <div className=" headerField" title="EZID">EZID</div>
                                            case "name":
                                                return  <div className=" headerField" title="Name">Name</div>
                                            case "cropCode":
                                                return  <div className=" headerField" title="Crop Code">Crop Code</div>
                                            default:
                                                return  <div className=" headerField" title={col}>{col}</div>
                                        }
                                    }}
                                    cell={(props) => {
                                        return (
                                            <div className="trialLineCell fields">

                                                { (col =="ezid") ?
                                                    <div className="trialLineCheckbox">
                                                        <input
                                                            id={"check-"+props.rowIndex}
                                                            type="checkbox"
                                                            checked={selectedTrialLineIndexes.indexOf(props.rowIndex)>-1}
                                                            onChange={this.toggleTrialLinesCheck.bind(this,props.rowIndex)}/><label htmlFor={"check-"+props.rowIndex}></label>
                                                        {trialLines[props.rowIndex][col]}
                                                    </div>
                                                    :  <div>{trialLines[props.rowIndex][col]} </div>
                                                }
                                            </div>

                                        )
                                    }
                                    }
                                    width={150}
                                />)
                        })
                    }

                </Table>
                <TrialLineNaming
                    visibility={this.props.trailLineNamingModal}
                    cancelTrialLineNaming={this.props.cancelTrialLineNaming}
                    createTrialLineNaming ={this.props.createTrialLineNaming }
                    fromParent="Trial Lines"
                    selectedRecords={this.props.selectedTrialLineIndexes.length}
                />
            </div>
        )
    }
}

export default TrialLines;