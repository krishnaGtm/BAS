import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';

class Crossing extends React.Component {
    constructor(props) {
        super(props);
        this.selectMale=this.selectMale.bind(this);
        this.selectFemale=this.selectFemale.bind(this);
    }

    componentDidMount() {

        //disabled sidebar
        this.props.disableSidebar();
        if (this.props.crossingRecords.length == 0)
            this.props.fetchActionRecorddList();
    }

    selectMale(rIndex){
        this.props.selectMale(rIndex);
    }

    selectFemale(rIndex){
        this.props.selectFemale(rIndex);
    }


    render() {
        let {crossingRecords, crossingFields, tableWidth, tableHeight,crossingSuccess,selectedMale,selectedFemale,selectedCrossingList} = this.props;
        return (
            <div className="crossingWrapper">
                <h3 className="componentTitle">Selected Crossing Data
                <span style={{display: crossingSuccess? 'block':'none'}} className="crossingMessage">Crossing Created with {selectedMale.EZID}*{selectedFemale.EZID}</span>
                </h3>
                <Table
                    rowHeight={35}
                    rowsCount={crossingRecords.length}
                    width={tableWidth || 500}
                    height={tableHeight - 30 || 500}
                    data={crossingRecords}
                    headerHeight={45}
                    {...this.props}
                >

                    {
                        <Column
                            key={"checkbox"}
                            header=''
                            cell={ props => (
                                <div className="crossingCell checkbox " title="">
                                    <input
                                        type="checkbox"
                                        id={'checkCrossing-' + props.rowIndex }
                                        checked={selectedCrossingList.indexOf(crossingRecords[props.rowIndex].EZID)>-1? true:false }
                                        onChange={(e)=>{this.props.selectCrossingList(crossingRecords[props.rowIndex].EZID,e.target.checked)}}
                                    />
                                    <label htmlFor = {'checkCrossing-' + props.rowIndex }></label>

                                </div>
                            )
                            }
                            width={50}
                        />
                    }

                    {
                        crossingFields.map((col, index, props)=> {
                            return (
                                <Column
                                    key={col}
                                    header={col}
                                    cell={ props => (
                                        <div className="crossingCell" title={crossingRecords[props.rowIndex][col]}>
                                            {crossingRecords[props.rowIndex][col]}
                                        </div>
                                    )
                                    }
                                    width={150}
                                />)
                        })
                    }
                    {
                        <Column
                            key={"sex"}
                            header={"Sex"}
                            cell={ props => (
                                <div className="crossingCell" title="Sex">
                                    <input
                                        type="radio"
                                        name="male"
                                        id={'genderM-' + props.rowIndex }
                                        value="M"
                                        checked={selectedMale && selectedMale.EZID==crossingRecords[props.rowIndex].EZID? true:false }
                                    />
                                    <label htmlFor = {'genderM-' + props.rowIndex } onClick={this.selectMale.bind(this,props.rowIndex)}><i className="icon-male"></i>Male</label>
                                    <input
                                        type="radio"
                                        name="female"
                                        id={'genderF-' + props.rowIndex }
                                        value="F"
                                        checked={selectedFemale && selectedFemale.EZID==crossingRecords[props.rowIndex].EZID? true:false }
                                    />
                                    <label htmlFor={'genderF-' + props.rowIndex } onClick={this.selectFemale.bind(this,props.rowIndex)}><i className="icon-female"></i>Female</label>
                                </div>
                            )
                            }
                            width={250}
                        />
                    }
                </Table>
                <div className="actionBtns">
                    <button className="button" disabled={Object.keys(selectedFemale).length && Object.keys(selectedMale).length ? false : true} onClick={this.props.createCrossing}>Create Crossing</button>
                    <button className="button" disabled={selectedCrossingList.length? false : true} onClick={this.props.removeCrossingList}>Delete</button>
                    </div>
            </div>
        )
    }
}

export default Crossing;