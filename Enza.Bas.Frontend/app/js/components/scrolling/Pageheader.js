/**
 * Created by dbasukala on 5/18/2016.
 */
import React from 'react';
import {Link} from 'react-router';

class Pageheader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            panel: "INFORMATIONAL_PANEL"
        }
        this.onPanelClick= this.onPanelClick.bind(this);
    }
    onPanelClick(e){
        e.preventDefault();
        this.setState({panel: e.target.getAttribute("data-panel")})

    }


    render(){

        return(
            <header>
                <h1 className="logo"><Link to="/" className="link"/></h1>
                <div className="userInfo">
                    <span className="userIcon">
                        <i className="icon-user" title="Logged in user"/>
                        <strong><em>{userContext.Name}</em></strong>
                    </span>
                    <span className="switchUser icon-user-secret" title="Switch User"></span>
                </div>
                <div className="topNav">
                    <ul>
                        <li><a href="#"><i className="icon-arrows-ccw"></i>Refresh</a></li>
                        <li><a href="#"><i className="icon-pencil-1"></i>Update</a></li>
                        <li><a href="#"><i className="icon-floppy"></i>Save</a></li>
                        <li><a href="#"><i className="icon-ccw"></i>Undo</a></li>
                        <li><a href="#"><i className="icon-file-excel"></i>Export</a></li>
                        <li><a href="#"
                               onClick={this.props.toggleFullScreen}
                               title={this.props.fullscreenMode ? "Exit Full Screen" : "Enter Full Screen"}
                        >
                            <i
                                className={this.props.fullscreenMode ? "icon-resize-normal" : "icon-resize-full"} ></i></a></li>
                    </ul>
                </div>
                <div className="actions">
                    <div className="tabHeader">
                        <ul>
                            <li className={this.state.panel=="INFORMATIONAL_PANEL" ? "active": ""}><a href="#" onClick={this.onPanelClick} data-panel="INFORMATIONAL_PANEL">Informational Panel</a></li>
                            <li className={this.state.panel=="ACTION_PANEL" ? "active": ""}><a href="#"  onClick={this.onPanelClick} data-panel="ACTION_PANEL">Action Panel</a></li>
                            <li className={this.state.panel=="QUERY_PANEL" ? "active": ""}><a href="#" onClick={this.onPanelClick} data-panel="QUERY_PANEL">Query Panel</a></li>
                        </ul>
                    </div>
                    <div className="tabSections">
                        <div className="infoSection" style={this.state.panel=="INFORMATIONAL_PANEL" ? {"display":"block"}: {"display": "none" }}>
                            <ul>
                                <li><a href="#">BreEzys Data</a></li>
                                <li><a href="#">VarMas Data</a></li>
                                <li><a href="#">Genebank Data</a></li>
                            </ul>
                        </div>
                        <div className="actionSection" style={this.state.panel=="ACTION_PANEL" ? {"display":"block"}: {"display": "none" }}>
                            <ul>
                                <li>
                                    <a href="#" onClick={this.props.addToTrialbook} title={this.props.trialbookRecords.join(",")}>
                                        Create Trialbook {(this.props.trialbookRecords.length>0) ? " ("+this.props.trialbookRecords.length+") " : ''}
                                    </a>
                                    <Link to="#" className="button"><i className="icon-book"></i></Link>
                                   
                                </li>
                                <li><a href="#">Marker Test</a><Link to="#" className="button" ><i className="icon-beaker"></i></Link></li>
                                <li><a href="#">Advance Generation</a><Link to="#" className="button" ><i className="icon-chart"></i></Link></li>
                                <li><a href="#">DH</a><Link to="#" className="button" ><i className="icon-pagelines"></i></Link></li>
                                <li><a href="#">Create Plant</a><Link to="#" className="button" ><i className="icon-leaf"></i></Link></li>
                            </ul>a
                        </div>
                        <div className="querySection" style={this.state.panel=="QUERY_PANEL" ? {"display":"block"}: {"display": "none" }}>
                            <ul>
                                <li><a href="#">Pedigree</a></li>
                                <li><a href="#">Disease Library</a></li>
                                <li><a href="#">Germination Data</a></li>

                            </ul>
                        </div>

                    </div>
                </div>
            </header>
        )
    }
}

export default Pageheader;
