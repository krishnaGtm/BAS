/**
 * Created by dbasukala on 6/23/2016.
 */
import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';

class NewTrialBook extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){

        //disabled sidebar
        this.props.disableSidebar();

        if(this.props.newTrialData.length==0){
            this.props.createNewTrialEntry({ezid:this.props.params.id})
        }
        this.props.fetchActionRecorddList();
    }
    render() {
        let {tableWidth, tableHeight, newTrialData, newTrialFields,newTrialEntryDetail,} = this.props;

        return (
            <div className="newTrialWrapper">
                <h3 className="componentTitle">{newTrialEntryDetail[0] ? newTrialEntryDetail[0].TrialName : ''}<span className="number">{newTrialData.length? "Total records: " + newTrialData.length: ''}</span></h3>
                <Table
                    rowHeight={35}
                    rowsCount={newTrialData.length}
                    width={tableWidth || 500}
                    height={tableHeight+30 || 500}
                    data={newTrialData}
                    headerHeight={45}
                    {...this.props}
                >

                    {
                        newTrialFields.map((col, index, props)=> {
                            return (
                                <Column
                                    key={col}
                                    header={col}
                                    cell={ props => (
                                        <div className='newTrailCell'>
                                            {newTrialData[props.rowIndex][col]}
                                        </div>
                                    )
                                    }
                                    width={150}
                                />)
                        })
                    }
                </Table>
            </div>
        )
    }
}

export default NewTrialBook;