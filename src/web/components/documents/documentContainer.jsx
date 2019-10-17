"use strict"

import React from "react";
import {optional} from "../../../utils/lang";
import {DocumentRow} from "./documentRow";
import _ from "underscore";

export class DocumentContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick() {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick(this.props.item)
        }
    }

    getKey(item) {
        if (_.isFunction(this.props.keygen)) {
            return this.props.keygen(item)
        } else {
            return item.id
        }
    }

    render() {
        let model = this.props.model
        let field = this.props.field
        let rows = optional(model.get(field.property), []);

        let items = rows.map(i => <DocumentRow key={this.getKey(i)} row={i} onClick={this.onClick.bind(this)} />)
        return (
            <div>
                {items}
            </div>
        )
    }
}