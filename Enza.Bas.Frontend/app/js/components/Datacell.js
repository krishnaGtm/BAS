import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class Datacell extends React.Component {

    constructor(props) {
        super(props);
        this.cellClicked = this.cellClicked.bind(this);
        this.expandRow = this.expandRow.bind(this);
        this.collapseRow = this.collapseRow.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    cellClicked(col, index, event) {
        if (event.shiftKey)
            document.getSelection().removeAllRanges();
        this.props.cellClicked({col: col, index: index, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey})
    }

    expandRow(index, e) {
        e.stopPropagation();
        this.props.expandRow(index);
    }

    collapseRow(index, e) {
        e.stopPropagation();
        this.props.collapseRow(index);
    }

    render() {
        let {rowIndex, col, data, highLightedCol, selectedRow, searchedText} = this.props,
            classes = ' fields ',
            showHideNestedRows;

        if ((col === "EZID")) {
            classes += "level-" + data[rowIndex].Level + " ";
        }

        if ((col === "EZID") && (data[rowIndex].HasChildren || data[rowIndex].ChildRows > 0)) {
            classes += "expandable collapsed";
            if (data[rowIndex].expanded == undefined || data[rowIndex].expanded === false)
                showHideNestedRows =
                    <span onClick={this.expandRow.bind(this, rowIndex)} title="Show Children"><i className="icon-plus-circle"></i></span>
            else
                showHideNestedRows =
                    <span onClick={this.collapseRow.bind(this, rowIndex)} title="Hide Children"><i className="icon-minus-circle"></i></span>
        }

        if (highLightedCol == col)
            classes += "selectedColumn";



        let newSearchedContent = data[rowIndex][col];
        if (searchedText != '' && newSearchedContent) {
            let searchedContent =  newSearchedContent.toString(),
                regEx = new RegExp(searchedText, "gi"),
                matchedIndex = searchedContent.match(regEx, 'gi');

            if (matchedIndex != null) {
                let sArray = searchedContent.split(searchedText);
                newSearchedContent = sArray.join('<span class="query">' + searchedText + '</span>');
            }
        }

        return (

            <div
                className={ ((selectedRow.indexOf(data[rowIndex].EZID) > -1 ) ? 'selected' + classes : classes) }
                onClick={this.cellClicked.bind(this, col, rowIndex)}
                title={data[rowIndex][col]}
            >{ showHideNestedRows}<span dangerouslySetInnerHTML={{__html: newSearchedContent}}></span>

            </div>
        )
    }
}

export default Datacell;