/**
 * Created by dbasukala on 5/18/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import {Link} from 'react-router';

class Pageheader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: "ACTION_PANEL",
            searchedText: this.props.searchedText || '',
        }
     //   this.onPanelClick = this.onPanelClick.bind(this);
        this.search = this.search.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.searchPrevious = this.searchPrevious.bind(this);
        this.searchNext = this.searchNext.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.toggleSearchBox = this.toggleSearchBox.bind(this);
    }

    onEnter(e) {

        if (e.keyCode == 13 && e.target.value != "") {
            e.preventDefault();
            this.props.search(this.state.searchedText, 'next');
        }
    }

    onSearchChange(e) {
        this.setState({searchedText: e.target.value})
    }

    toggleSearchBox(flag) {
        this.props.toggleSearchBox(flag);
    }

    search(e) {
        e.preventDefault();
        this.props.search(this.state.searchedText, 'search');
    }


    searchPrevious(e) {
        e.preventDefault();
        this.props.search(this.state.searchedText, "previous")
    }

    searchNext(e) {
        e.preventDefault();
        this.props.search(this.state.searchedText, "next")
    }

    clearSearch(e) {
        e.preventDefault();
        this.setState({
            searchedText: ''
        })
    }

   /* onPanelClick(e) {
        e.preventDefault();
        this.setState({panel: e.target.getAttribute("data-panel")})

    }*/

    componentWillReceiveProps(nextProps) {


        if (nextProps.searchVisibility) {
            ReactDOM.findDOMNode(this.refs.searchedText).focus();
        }

        if (nextProps.trialbookRecordsCount !== this.props.trialbookRecordsCount) {
            this.refs.trialRecordsCount.classList.add("counterUpdate")
            setTimeout(() => this.refs.trialRecordsCount.classList.remove("counterUpdate"), 2000)
        }

        if (nextProps.crossingRecordsCount !== this.props.crossingRecordsCount) {
            this.refs.crossingCount.classList.add("counterUpdate")
            setTimeout(() => this.refs.crossingCount.classList.remove("counterUpdate"), 2000)
        }

        if (nextProps.selectionCount !== this.props.selectionCount) {
            this.refs.selectionCount.classList.add("counterUpdate")
            setTimeout(() => this.refs.selectionCount.classList.remove("counterUpdate"), 2000)
        }
    }

    render() {
        const { mySelection }=this.props;
        return (
            <header>
                <h1 className="logo"><Link to="/" className="link"/></h1>
                <div className="userInfo">
                    <span className="userIcon"  title="Logged in user">
                        <i className="icon-user" title="Logged in user"/>
                        <strong><em>{userContext.Name}</em></strong>
                    </span>
                    <span className="switchUser icon-user-secret" title="Switch User"></span>
                </div>
                <div className="topNav">
                    <ul>
                        <li><a href="javascript:void(0)"  title="Search" onClick={this.toggleSearchBox.bind(null, undefined)}>
                            <i className="icon-search"></i></a></li>
                        <li><a href="javascript:void(0)"
                               onClick={this.props.toggleFullScreen}
                               title={this.props.fullscreenMode ? "Exit Full Screen" : "Enter Full Screen"}
                        >
                            <i className={this.props.fullscreenMode ? "icon-resize-normal" : "icon-resize-full"}></i></a>
                        </li>
                    </ul>
                </div>
                <div className="actions">
                    {/*<div className="tabHeader">
                        <ul>
                            <li className={this.state.panel == "ACTION_PANEL" ? "active" : ""}>
                                <a
                                href="javascript:void(0)"
                                onClick={this.onPanelClick}
                                data-panel="ACTION_PANEL"
                                title="Action Panel">Action Panel
                                </a></li>
                            <li className={this.state.panel == "INFORMATIONAL_PANEL" ? "active" : ""}><a
                                href="javascript:void(0)"
                                onClick={this.onPanelClick}
                                data-panel="INFORMATIONAL_PANEL"
                                title="Informational Panel"
                            >Informational

                                Panel</a></li>

                            <li className={this.state.panel == "QUERY_PANEL" ? "active" : ""}><a
                                href="javascript:void(0)"
                                onClick={this.onPanelClick}
                                title="Query Panel"
                                data-panel="QUERY_PANEL">Query Panel</a></li>
                        </ul>
                    </div>*/}
                    <div className="tabSections">
                        <div className="infoSection"
                             style={this.state.panel == "INFORMATIONAL_PANEL" ? {"display": "block"} : {"display": "none"}}>
                            <ul>
                                <li><a href="javascript:void(0)" title="BreEzys Dat">BreEzys Data</a></li>
                                <li><a href="javascript:void(0)" title="VarMas Data">VarMas Data</a></li>
                                <li><a href="javascript:void(0)" title="Genebank Data">Genebank Data</a></li>
                            </ul>
                        </div>
                        <div className="actionSection"
                             style={this.state.panel == "ACTION_PANEL" ? {"display": "block"} : {"display": "none"}}>
                            <ul>
                               {/* <li>
                                    <button href="javascript:void(0)" onClick={this.props.addToTrialbook}
                                            title={this.props.trialbookRecords.join(",")}>
                                        Create Trialbook <span className="count"
                                                               ref="trialRecordsCount">{(this.props.trialbookRecordsCount) ? this.props.trialbookRecordsCount : ''}</span>
                                    </button>
                                    <a href="javascript:void(0)" onClick={this.props.goToTrialBook}
                                          className={this.props.trialbookRecordsCount ? "link " : 'link disabled'}><i
                                        className="icon-book"></i></a>
                                </li>
                                <li>
                                    <button href="javascript:void(0)" onClick={this.props.addToCrossing}>Create Crossing
                                        <span className="count"
                                              ref="crossingCount">{(this.props.crossingRecordsCount) ? this.props.crossingRecordsCount : ''}</span>
                                    </button>
                                    <a href="javascript:void(0)" onClick={this.props.goToCrossing}
                                       className={this.props.crossingRecordsCount ? "link " : 'link disabled'}>
                                        <i className="icon-flow-cross"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="createBatch"
                                       onClick={this.props.createBatch}>Create Batch <span className="link"><i
                                        className="icon-cog"></i></span></a>

                                </li>*/}
                                <li>
                                    <Link to="/main" className="analysisIcon" title="Go to Analysis">Browse <i className="icon-chart"></i></Link>

                                </li>
                                <li>
                                    <button title="Add to My Selection" onClick={this.props.addToMySelection}> Add to My Selection
                                        <span className="count" ref="selectionCount">{mySelection.length? mySelection.length:""}</span>
                                    </button>
                                    <Link to="/main/selection" title="Go to My Selection" onClick={(e)=>{mySelection.length==0? e.preventDefault():''}}
                                          className={mySelection.length ? 'link' : "link disabled" }><i className="icon-list"></i></Link>
                                </li>

                                <li>
                                    <Link
                                        to="/main/groups"
                                        className="groupIcon"
                                        title="My Groups"
                                        onClick={(e)=>{e.preventDefault();this.props.fetchGroups()}}
                                    > Groups <i className="icon-cubes"></i></Link>

                                </li>
                                <li>
                                    <Link
                                        to="/main/trials"
                                        className="trialIcon"
                                        title="My Trials"
                                        onClick={(e)=>{e.preventDefault();this.props.fetchTrials()}}
                                    > Trials <i className="icon-beaker"></i></Link>

                                </li>
                                <li>
                                    <a href="javascript:void(0)" onClick={this.props.gotoHierarchyData}
                                       className="hierarchyIcon "
                                    title="Hierarchy Diagram">Hierarchy Data <i className="icon-flow-tree"></i></a>

                                </li>
                                {/*<li><a href="javascript:void(0)">DH</a><Link to="/" className="button"><i className="icon-pagelines"></i></Link>
                                 </li>
                                 <li><a href="javascript:void(0)">Create Plant</a><Link to="/" className="button"><i
                                 className="icon-leaf"></i></Link></li>*/}
                            </ul>

                        </div>
                        <div className="querySection"
                             style={this.state.panel == "QUERY_PANEL" ? {"display": "block"} : {"display": "none"}}>
                            <ul>
                                <li><a href="javascript:void(0)" title="Pedigree">Pedigree</a></li>
                                <li><a href="javascript:void(0)" title="Disease Library">Disease Library</a></li>
                                <li><a href="javascript:void(0)" title="Germination Data">Germination Data</a></li>

                            </ul>
                        </div>

                    </div>
                </div>
                <div className={"search " + (this.props.searchVisibility ? "shown" : "") }>
                    <input type="text" value={this.state.searchedText} placeholder="search " ref="searchedText"
                           onKeyDown={this.onEnter} onChange={this.onSearchChange}/>
                    <button className={ "clearSearch " + (this.state.searchedText !== "" ? "visible" : "hidden") }
                            title="Clear text" onClick={this.clearSearch}><i className="icon-cancel-1"></i></button>
                    <button className="searchNav" title="Search Previous" onClick={this.searchPrevious}
                            disabled={this.state.searchedText == "" ? true : false }><i className="icon-left-open"></i>
                    </button>
                    <button className="searchNav" title="Search Next" onClick={this.searchNext}
                            disabled={this.state.searchedText == "" ? true : false }><i className="icon-right-open"></i>
                    </button>
                    <button title="Search" onClick={this.search}><i className="icon-search"></i></button>
                    <button title="Close" className="searchClose"
                            onClick={this.props.toggleSearchBox.bind(null, false)}><i className='icon-cancel'></i>
                    </button>
                </div>
            </header>
        )
    }
}

export default Pageheader;
