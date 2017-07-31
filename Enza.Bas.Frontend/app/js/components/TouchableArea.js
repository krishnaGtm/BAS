import React from 'react';
import "../vendor/Animate";
import "../vendor/Scroller";
var ZyngaScroller =require('../vendor/ZyngaScroller');

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement // works on most browsers
    //    || 'onmsgesturechange' in window; // works on ie10
};

class TouchableArea extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            left: 0,
            top: 0,
            contentHeight: 0,
            contentWidth: 0
        };
        this.mousedown= false;
        this.handleTouchStart=this.handleTouchStart.bind(this);
        this.handleTouchMove=this.handleTouchMove.bind(this);
        this.handleTouchEnd=this.handleTouchEnd.bind(this);
        this.handleMousedown = this.handleMousedown.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
        this.handleMouseup = this.handleMouseup.bind(this);
        this._onContentHeightChange=this._onContentHeightChange.bind(this);
        this._handleScroll=this._handleScroll.bind(this);
    }


    handleTouchStart(e) {
        if (!this.scroller) {
            return;
        }
        this.scroller.doTouchStart(e.touches, e.timeStamp);
         //e.preventDefault();
    }

    handleTouchMove(e) {

        if (!this.scroller) {
            return;
        }
        e.preventDefault();
        this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);

    }

    handleTouchEnd(e) {

        if (!this.scroller) {
            return;
        }

       this.scroller.doTouchEnd(e.timeStamp);
      //  e.preventDefault();
    }

    handleMousedown(e) {

        if (e.target.tagName.match(/input|textarea|select/i)) {
            return;
        }

        this.scroller.doTouchStart([{
            pageX: e.pageX,
            pageY: e.pageY
        }], e.timeStamp);

        this.mousedown = true;

        this._onContentHeightChange(this.props.mainData.length*(this.props.pageSize+2));

        e.preventDefault();
    }

    handleMouseup(e) {
        if (!this.mousedown) {
            return;
        }
        this.scroller.doTouchEnd(e.timeStamp);
        this.mousedown = false;
    }

    handleMousemove(e) {
        if (!this.mousedown) {
            return;
        }
        this.scroller.doTouchMove([{
            pageX: e.pageX,
            pageY: e.pageY
        }], e.timeStamp);
        this.mousedown = true;
    }


    componentWillMount() {
        this.scroller = new ZyngaScroller(this._handleScroll);
    }

    render() {
          if (!isTouchDevice()) {
         return React.cloneElement(this.props.children, {
             height: this.props.tableHeight,
             width: this.props.tableWidth,
             touchable:false
             });
         }
        var example = React.cloneElement(this.props.children, {

            onContentHeightChange: this._onContentHeightChange,
            scrollLeft: this.state.left,
            scrollTop: this.state.top,
            height: this.props.tableHeight,
            width: this.props.tableWidth,
            overflowY: 'hidden',
            overflowX: 'hidden',
            touchable:true
        });

        return (
            <div
                 onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove}
                 onTouchEnd={this.handleTouchEnd}


                 onTouchCancel={this.handleTouchEnd}
                onMouseDown={this.handleMousedown}
                onMouseMove={this.handleMousemove}
                onMouseUp={this.handleMouseup}

                 >
                {example}
            </div>
        );
    }


    _onContentHeightChange(contentHeight) {
        this.scroller.setDimensions(
            this.props.tableWidth,
            this.props.tableHeight,
            Math.max(this.props.fields.length,this.props.tableWidth),
            contentHeight
        );
    }

    _handleScroll(left, top) {
        this.setState({
            left: left,
            top: top
        });

    }

    componentWillReceiveProps(nextProps){
        if(this.props.fields.length != nextProps.fields.length){
            this.scroller.setDimensions(
                this.props.tableWidth,
                this.props.tableHeight,
                Math.max(nextProps.fields.length*200,this.props.tableWidth),
                nextProps.mainData.length*(this.props.pageSize+2)
            );

        }
    }


};

export default TouchableArea
