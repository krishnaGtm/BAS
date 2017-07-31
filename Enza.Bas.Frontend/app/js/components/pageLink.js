/**
 * Created by dbasukala on 1/10/2017.
 */
import React from 'react';

class PageLink extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onClick(this.props['data-page'])
    }

    render() {
        let link;
        if (this.props.children == "..." || (this.props.classes && this.props.classes.indexOf("disabled")  > -1 ) || (this.props.classes && this.props.classes.indexOf("active")  > -1 ) ) {
            link = <span className={this.props.classes} title={this.props.title ? this.props.title : this.props.children}>{this.props.children}</span>
        }
        else
            link = <a href="#" className={this.props.classes} onClick={this.onClick}  title={this.props.title ? this.props.title : this.props.children}>{this.props.children}</a>

        return (
            <li>{link}</li>
        )
    }
}

export default PageLink;