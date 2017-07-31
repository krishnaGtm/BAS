/**
 * Created by dbasukala on 12/27/2016.
 */
import React from 'react';

class TrialLineNaming extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startNumber: '',
            increaseBy: '',
            prefixBy: '',
            numberLength: '',
            leadingZero: false,
            error: false
        }

        this.cancelTrialCreation = this.cancelTrialCreation.bind(this);
        this.createTrialLineNaming = this.createTrialLineNaming.bind(this);
        this.changeStartNumber = this.changeStartNumber.bind(this);
        this.changeIncreaseByNumber = this.changeIncreaseByNumber.bind(this);
        this.changeNumberLength = this.changeNumberLength.bind(this);
        this.changePrefix = this.changePrefix.bind(this);
    }

    createTrialLineNaming(e) {
        this.changeStartNumber()
        this.changeIncreaseByNumber()
        this.changeNumberLength()
        this.changePrefix()


        if (this.state.error==0) {
            let data = {
                startNumber: this.startNumber.value,
                increaseBy: this.increaseBy.value,
                prefixBy: this.prefixBy.value,
                numberLength: this.numberLength.value,
                leadingZero: this.leadingZero.value === "true" ? true : false,
            }
            this.props.createTrialLineNaming({data:data, from:this.props.fromParent});
            this.setState({
                startNumber: '',
                increaseBy: '',
                prefixBy: '',
                numberLength: '',
                leadingZero: true,
                error: 0
            })
        }
    }

    cancelTrialCreation() {
        this.newTrialName.value = '';
        this.trialCountry.value = ''
        this.setState({
            trialName: '',
            country: ''
        })
        this.props.cancelTrialCreation();
    }

    changeStartNumber(e) {
        let startNumber = this.startNumber;

        if (startNumber.value == "" || isNaN(startNumber.value)) {
            startNumber.classList.add("error");
            this.setState({error: ++this.state.error})
        }

        else {
            startNumber.classList.remove("error");

            this.setState({startNumber: startNumber.value,
                error: this.state.error>0 ? --this.state.error : 0
            })

        }


    }

    changeIncreaseByNumber(e) {
        let increaseBy = this.increaseBy;
        if (increaseBy.value == "" || isNaN(increaseBy.value)) {
            increaseBy.classList.add("error");
            this.setState({error: ++this.state.error})        }
        else {
            increaseBy.classList.remove("error");
            this.setState({increaseBy: increaseBy.value,
                error: this.state.error>0 ? --this.state.error : 0
            })
        }
    }

    changeNumberLength(e) {
        let numberLength = this.numberLength;
        if (numberLength.value == "" || isNaN(numberLength.value)) {
            numberLength.classList.add("error");
            this.setState({error: ++this.state.error})        }
        else {
            numberLength.classList.remove("error");
            this.setState({numberLength: numberLength.value,
                error: this.state.error>0 ? --this.state.error : 0
            })

        }
    }

    changePrefix(e) {
        let prefixBy = this.prefixBy;
        if (prefixBy.value == "") {
            prefixBy.classList.add("error");
            this.setState({error: ++this.state.error})        }
        else {
            prefixBy.classList.remove("error");
            this.setState({prefixBy: prefixBy.value,
                error: this.state.error>0 ? --this.state.error : 0
            })

        }
    }

    componentWillReceiveProps(nextProps){

    }

    render() {
        return (
            <div className="modalWrapper" style={{display: this.props.visibility ? 'block' : "none"}}>
                <div className="trialLineNamingWrapper modalPopup">
                    <h2>Trial Line Naming</h2>
                    <div className="form">
                        <div className="inputWrapper">
                            <label>Number of {this.props.fromParent} Selected</label>
                            <input type="text" id="numberSelected"  value={this.props.selectedRecords} readOnly
                                   placeholder="Number Selected"/>
                        </div>

                        <div className="inputWrapper">
                            <label>Start number</label>
                            <input type="text" ref={(input)=>{this.startNumber= input;}}  id="startNumber" autoFocus placeholder="Start number"
                                   onChange={this.changeStartNumber}/>
                            <label className="err"> Start Number must be a number.</label>
                        </div>

                        <div className="inputWrapper">
                            <label>Increased by</label>
                            <input type="text" ref={(input)=>{this.increaseBy= input;}} id="increaseBy" placeholder="Increased by"
                                   onChange={this.changeIncreaseByNumber}/>
                            <label className="err"> Increment value must be a number.</label>
                        </div>

                        <div className="inputWrapper">
                            <label>Prefix</label>
                            <input type="text" ref={(input)=>{this.prefixBy= input;}} id="prefixBy" placeholder="Prefix"
                                   onChange={this.changePrefix}/>
                            <label className="err"> Prefix is required. </label>
                        </div>

                        <div className="inputWrapper">
                            <label>Length</label>
                            <input type="text" ref={(input)=>{this.numberLength= input;}} id="numberLength" placeholder="Length"
                                   onChange={this.changeNumberLength}/>
                            <label className="err"> Length must be a number.</label>
                        </div>

                        <div className="inputWrapper">
                            <label>Leading zeros</label>
                            <select ref={(input)=>{this.leadingZero= input;}} id="leadingZero" placeholder="Leading zeros">
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>

                            <label className="err"> Name cannot be empty.</label>
                        </div>

                        <div className="buttonList floatRight">
                            <button className="cancel" onClick={this.props.cancelTrialLineNaming} title="Cancel">
                                Cancel
                            </button>
                            <button onClick={this.createTrialLineNaming} title="Save ">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TrialLineNaming