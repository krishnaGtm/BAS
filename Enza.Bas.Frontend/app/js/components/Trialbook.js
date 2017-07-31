import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';

const TrialCell = (props)=> {
    let {rowIndex, col, data, trialbookSelectedIndex} = props;

    return (
        <div className={rowIndex == trialbookSelectedIndex ? "trialCellData selected" : "trialCellData"}
             onClick={props.onSelectTrialbook.bind(this,rowIndex)}>
                <span title={data[rowIndex][col]}>
                {data[rowIndex][col]}
                </span>
        </div>
    )
}

class Trialbook extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            trialbookFSData: [],
            newTrialName:''
        }
        this.selectTrialbook = this.selectTrialbook.bind(this);
        this.addNewTrialbook = this.addNewTrialbook.bind(this);
        this.onChangeTrialName = this.onChangeTrialName.bind(this);
    }

    componentDidMount() {

        //disabled sidebar
        this.props.disableSidebar();
        this.props.fetchTrialbookFS()
        this.props.fetchActionRecorddList();
    }

    componentWillReceiveProps() {
        this.setState({
            trialbookFSData: this.props.trialbookFSData,
            trialbookFields: this.props.trialbookFields
        })
    }

    selectTrialbook(rIndex) {
        this.props.selectTrialbook(rIndex)
    }

    addNewTrialbook(){
        let trialName= this.refs.newTrialbookName.value;

        if(trialName!=="") {
            this.props.addNewTrialbook(trialName)
            this.setState({newTrialName:''})
        }
    }

    onChangeTrialName(e){
        this.setState({newTrialName:e.target.value})
    }

    render() {
        let {tbTableWidth, tbTableHeight, trialbookFields, trialbookFSData,trialbookSelectedIndex} = this.props;
        return (
            <div className="trialWrapper">
                <div className="fieldbookList">
                    <h3> Select Existing Trialbook </h3>
                    <Table
                        rowHeight={35}
                        rowsCount={this.props.trialbookFSData.length}
                        width={tbTableWidth || 500}
                        height={tbTableHeight-10 || 500}
                        data={trialbookFSData}
                        headerHeight={45}
                        scrollToRow={trialbookSelectedIndex}
                        {...this.props}
                    >
                        {
                            <Column
                                header={''}

                                cell={(props) => (
                                     <div className={(props.rowIndex == trialbookSelectedIndex) ? "checkSelection selected" : "checkSelection"}>
                                        <input type="checkbox" checked={(props.rowIndex == trialbookSelectedIndex)} id={"checkbox-" + props.rowIndex}
                                               onChange={this.selectTrialbook.bind(this, props.rowIndex)}/>
                                        <label htmlFor={"checkbox-" + props.rowIndex}></label>
                                    </div>
                                )
                                }
                                width={40}
                            />
                        }
                        {
                            trialbookFields.map((col, index, props)=> {
                                return (
                                    <Column
                                        key={col}
                                        header={col}
                                        cell={
                                            <TrialCell
                                                data={this.props.trialbookFSData}
                                                trialbookSelectedIndex={this.props.trialbookSelectedIndex}
                                                col={col}
                                                onSelectTrialbook={this.selectTrialbook}
                                            />
                                        }
                                        width={150}
                                    />)
                            })
                        }
                    </Table>
                    <div className="actionBtns">
                        <button onClick ={this.props.createNewTrialEntry.bind(this,{ezid:null})}> Create New Trial </button>
                    </div>
                </div>
                <div className="newTrialbook">
                    <h3>Create New Trialbook</h3>
                    <input type="text" placeholder="New Trialbook Name" ref="newTrialbookName" value={this.state.newTrialName} onChange={this.onChangeTrialName} className="newTrialbookName"/>

                    <div className="actionBtns">

                        <button className="addFieldbook" onClick={this.addNewTrialbook} disabled={ this.state.newTrialName=="" ? true : false }>Create Trialbook</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trialbook;