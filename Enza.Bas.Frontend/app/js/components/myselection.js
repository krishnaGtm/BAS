/**
 * Created by dbasukala on 27/12/2016.
 */
import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';
import Newgroup from './newgroup'
class Myselection extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSelectionGroupLine = this.toggleSelectionGroupLine.bind(this);
    }

    toggleSelectionGroupLine(e) {
        let checked = e.target.checked,
            groupLine = e.target.getAttribute("data-ezid"),
            groupEZID = e.target.getAttribute("data-groupEzid");

        this.props.toggleSelectionGroupLine({"groupEZID": groupEZID, "groupLine": groupLine, "checked": checked})
    }

    render() {
        let {tableWidthFull, tableHeightFull, mySelection, newGroups} = this.props,
            selectionFields = (mySelection.length && Object.keys(mySelection[0])) || []
        let groupFields = newGroups.map(g => g.GroupName);
        return (

            <div className="selectionWrapper commonWrapper">
                <h3 className="componentTitle">My Selection</h3>
                <div className="buttonList">
                    <button onClick={this.props.showGroupCreation} title="Create Group"> Create Group <i
                        className="icon-cube"></i></button>
                    <button disabled="disabled" title="Create Trial"> Create Trial <i className="icon-beaker"></i>
                    </button>
                    <button className="apply" title="Apply" onClick={this.props.createGroupAndGroupLines}
                            style={{display: newGroups.length ? "block" : "none"}}>Apply
                    </button>
                </div>
                <Table
                    rowHeight={35}
                    rowsCount={mySelection.length}
                    width={tableWidthFull || 500}
                    height={tableHeightFull || 500}
                    headerHeight={45}
                    data={mySelection}
                    {...this.props}
                >
                    {
                        selectionFields.map((col, index, props) => {
                            return (
                                <Column
                                    key={col}
                                    header={() => {
                                        switch (col) {
                                            case "EntityTypeCode":
                                                return <div className=" headerField" title="Entity Type Code">Entity Type Code</div>
                                            default:
                                                return <div className=" headerField" title={col}>{col}</div>


                                        }
                                    }
                                    }
                                    cell={ props => (
                                        <div className='selectionCell fields'>
                                            {mySelection[props.rowIndex][col]}
                                        </div>
                                    )
                                    }
                                    width={150}
                                />)
                        })
                    }
                    {
                        groupFields.map((col, index, props) => {
                                let groupEZID = newGroups[index].GroupEZID;
                               // let groupEZID= currentGroup.GroupEZID;
                                return (
                                    <Column
                                        key={col}
                                        header={() => <div className=" headerField">{col}</div>}
                                        cell={ props => (
                                            <div className='groupCell fields'>
                                                <input type="checkbox"
                                                       id={"check-" + groupEZID + "-" + props.rowIndex}
                                                       defaultChecked
                                                       onChange={this.toggleSelectionGroupLine}
                                                       data-ezid={mySelection[props.rowIndex]["EZID"]}
                                                       data-groupEzid={groupEZID}
                                                />
                                                <label
                                                    htmlFor={"check-" + groupEZID + "-" + props.rowIndex}></label>
                                            </div>
                                        )
                                        }
                                        width={150}
                                    />)
                            }
                        )
                    }

                </Table>


                <Newgroup
                    visibility={this.props.createGroupModal}
                    addGroup={this.props.addGroup}
                    cancelGroupCreation={this.props.cancelGroupCreation}
                />
            </div>
        )
    }
}

export default Myselection;