/**
 * Created by dbasukala on 12/27/2016.
 */
import React from 'react';

class Newgroup extends React.Component {
    constructor(props) {
        super(props)
        this.addGroup= this.addGroup.bind(this);
        this.state={
            groupName: '',
            remarks:''
        }
        this.updateGroupName=this.updateGroupName.bind(this);
        this.updateRemarks= this.updateRemarks.bind(this);
        this.cancelGroupCreation= this.cancelGroupCreation.bind(this);
        this.onEnter= this.onEnter.bind(this);
    }
    addGroup(){
        if(this.state.groupName!=""){
            this.props.addGroup({
                name:this.state.groupName,
                remark:this.state.remarks
            })
        }
        else {
            this.refs.newGroupName.classList.add("error");
        }
    }

    updateGroupName(e){
        if(e.target.value!==""){
            e.target.classList.remove("error")
        }
        this.setState({groupName:e.target.value})
    }

    updateRemarks(e){
        this.setState({remarks:e.target.value})
    }

    cancelGroupCreation(){
        this.refs.newGroupName.classList.remove("error");
        this.setState({groupName:'',remarks:''})
        this.props.cancelGroupCreation();
    }

    onEnter(e){
        if(e.keyCode == 13){
            this.addGroup()
        }
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.visibility) {
            this.setState({
                groupName:'',remarks:''})
        }
    }

    render() {
        return (
            <div className="modalWrapper" style={{display:this.props.visibility? 'block' :"none"}}>

            <div className="newGroupWrapper modalPopup">
                <h2>New Group</h2>
                <div className="form"  >
                    <div className="inputWrapper">
                        <label>Name</label>
                        <input type="text" ref="newGroupName" id="newGroupName" onKeyDown={this.onEnter}  value={this.state.groupName} placeholder="New Group Name" onChange={this.updateGroupName}/>
                        <label className="err"> Name cannot be empty.</label>
                    </div>
                    <div className="inputWrapper">
                        <label>Remarks</label>
                        <input type="text" ref="newGroupRemark" id="newGroupRemark"  onKeyDown={this.onEnter} value={this.state.remarks} placeholder="Remarks" onChange={this.updateRemarks}/>
                    </div>
                    <div className="buttonList floatRight">
                        <button className="cancel" onClick={this.cancelGroupCreation}> Cancel</button>
                        <button onClick={this.addGroup}>Save </button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Newgroup