/**
 * Created by dbasukala on 27/12/2016.
 */
import React from 'react';
import {Table, Cell, Column} from 'fixed-data-table';
import Newtrial from './createTrial'
class Groups extends React.Component {
    constructor(props) {
        super(props)
        this.toggleGroupLines = this.toggleGroupLines.bind(this);
    }

    componentDidMount() {
        //fetch groups;
        this.props.fetchGroups();
    }

    toggleGroupLines(index, expanded) {
        this.props.toggleGroupLines({index:index, expanded: expanded,isGroup:this.props.groups[index].hasOwnProperty("ChildRows")})
    }

    render() {
        const {tableWidthFull, tableHeightFull, groups} = this.props;
        let groupFields = ["Name", "Remark", "EntityTypeCode"];
        let disabledCreateTrial = groups.filter(g=> g.ChildRows==undefined && g.expanded).length ==0
        return (
            <div className="groupWrapper commonWrapper">
                <h3 className="componentTitle">My Groups</h3>
                <div className="buttonList">
                    <button onClick={this.props.showTrialCreation} disabled={disabledCreateTrial}> Create Trial <i className="icon-beaker-1"></i>
                    </button>
                </div>
                <Table
                    rowHeight={35}
                    rowsCount={groups.length}
                    width={tableWidthFull || 500}
                    height={tableHeightFull || 500}
                    headerHeight={45}
                    data={groups}
                    {...this.props}
                >
                    {
                        groupFields.map((col) => {
                            return (
                                <Column
                                    key={col}
                                    header={() => <div className=" headerField">{col}</div>}
                                    cell={ props => {
                                        let isGroupNameCol = col == "Name",
                                            group = groups[props.rowIndex],
                                            hasChildren = group.ChildRows && group.ChildRows > 0; //check if group or groupline


                                        if (isGroupNameCol) {
                                           let isDisabled = !(group.hasOwnProperty("GroupEZID") || (group.ChildRows && group.ChildRows>0));
                                            return <div
                                                className={"groupCell fields groupNameColumn " + ((group.ChildRows == undefined) ? "groupLineCell" : "")}>
                                                <input type="checkbox"
                                                       id={"check-" + props.rowIndex}
                                                       checked={group.expanded}
                                                       disabled={isDisabled }
                                                       data-ezid={groups[props.rowIndex]["EZID"]}
                                                       onChange={this.toggleGroupLines.bind(null, props.rowIndex,group.expanded )}
                                                />
                                                <label
                                                    htmlFor={"check-" + props.rowIndex}
                                                    title={ !isDisabled ? (group.expanded? "Hide Group Lines " : "Show Group Lines") : ''}
                                                >{group[col]}</label>
                                                {(hasChildren) ? <span className="groupLineCount" title="Number of group lines">{group.ChildRows}</span> : ''}
                                            </div>
                                        }

                                        return <div
                                            className='groupCell fields '>{group[col]}</div>
                                    }
                                    }
                                    width={150}
                                />)
                        })
                    }
                </Table>
                <Newtrial
                    visibility={this.props.createTrialModal}
                    cancelTrialCreation={this.props.cancelTrialCreation}
                    createTrial={this.props.createTrial}
                    countries={this.props.countries}
                    fetchCountries={this.props.fetchCountries}
                />
            </div>
        )
    }
}

export default Groups;