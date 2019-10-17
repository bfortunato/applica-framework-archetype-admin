"use strict"

import React from "react";

export class DocumentRow extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick() {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick(this.props.item)
        }
    }

    render() {
        let row = this.props.row
        return (
            <div className="pointer-cursor" onClick={this.onClick.bind(this)}>
                {row.description}
            </div>
        )
    }
}