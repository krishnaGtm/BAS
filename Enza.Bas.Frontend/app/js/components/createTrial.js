/**
 * Created by dbasukala on 12/27/2016.
 */
import React from 'react';

class Newtrial extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            trialName:'',
            country:''
        }
        this.createTrial = this.createTrial.bind(this);
        this.updateTrialName = this.updateTrialName.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
        this.cancelTrialCreation = this.cancelTrialCreation.bind(this);
    }

    createTrial(e) {

        //required validation for Trial name
        if(this.state.trialName=="") {
            this.refs.newTrialName.classList.add("error");
        }

        //required validation for country
        if (this.state.country==""){
            this.refs.trialCountry.classList.add("error");

        }
        if(this.state.trialName!=="" && this.state.country!=="") {
            this.props.createTrial({name: this.refs.newTrialName.value, countryCode: this.refs.trialCountry.value})
        }
    }

     updateTrialName(e){
        if(e.target.value!==""){
            e.target.classList.remove("error")
        }
        this.setState({trialName:e.target.value})
    }


    updateCountry(e){
        if(e.target.value !==""){
            e.target.classList.remove("error")
        }
        this.setState({country:e.target.value})
    }

    componentDidMount(){
        this.props.fetchCountries();
    }

    cancelTrialCreation(){
        this.refs.newTrialName.value='';
        this.refs.trialCountry.value=''
        this.props.cancelTrialCreation();
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.visibility) {
            this.setState({
                trialName:'',
                country:''})
        }
    }
    render() {
        const {countries} =this.props;
        return (
            <div className="modalWrapper" style={{display: this.props.visibility ? 'block' : "none"}}>
            <div className="newTrialWrapper modalPopup">
                <h2>New Trial</h2>
                <div className="form">
                    <div className="inputWrapper">
                        <label>Name</label>
                        <input type="text" ref="newTrialName" id="newTrialName" value={this.state.trialName} placeholder="New Trial Name" onChange={this.updateTrialName}/>
                        <label className="err"> Name cannot be empty.</label>

                    </div>
                    <div className="inputWrapper">
                        <label>Country</label>
                       <select ref="trialCountry" id="trialCountry"  value={this.state.country} placeholder="Country" onChange={this.updateCountry}>
                           <option value='' > Select Country </option>
                            {
                               countries.map(c => {
                                    return <option key={c.CountryCode} value={c.CountryCode}>{c.CountryName}</option>
                                })
                            }
                        </select>
                        <label className="err"> Please select country.</label>


                    </div>
                    <div className="buttonList floatRight">
                        <button className="cancel" onClick={this.cancelTrialCreation}> Cancel</button>
                        <button onClick={this.createTrial}>Save</button>
                    </div>
                </div>
            </div>
            </div>
    )
    }
    }

    export default Newtrial