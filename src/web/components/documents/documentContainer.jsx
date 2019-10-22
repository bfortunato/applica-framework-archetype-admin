"use strict"

import React from "react";
import {optional} from "../../../utils/lang";
import {DocumentRow} from "./documentRow";
import _ from "underscore";
import {AssignationType} from "../../../model/vars";
import M from "../../../strings";

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
        let preparatoryRows = _.filter(rows, r=>r.typology === AssignationType.PREPARATORY_DOCUMENTATION.value);
        let closingRows = _.filter(rows, r=>r.typology === AssignationType.PRIVATE_CLOSING_DOCUMENTATION.value || AssignationType.PUBLIC_CLOSING_DOCUMENTATION.value);

        let preparatoryItems = preparatoryRows.map((i, index) => <DocumentRow dossierId={model.get("id")} key={this.getKey(i)} row={i} index={index} onClick={this.onClick.bind(this)} />)
        let closingItems = closingRows.map((i, index) => <DocumentRow dossierId={model.get("id")} key={this.getKey(i)} row={i} index={index} onClick={this.onClick.bind(this)} />)
        return (
            <div className="col-md-12 zero-padding">
                <div className="col-md-6 zero-padding">
                    <div className="col-12">
                        {/*ROBOTO 16 MEDIUM*/}
                        <span className="text-uppercase">{M("preparatoryDocumentation")}</span>
                    </div>
                    <div className="col-12">
                        {preparatoryItems}
                    </div>
                </div>
                <div className="col-md-6 zero-padding">
                    <div className="col-12">
                        <span className="text-uppercase">{M("closingDocumentation")}</span>
                    </div>
                    <div className="col-12">
                        {closingItems}
                    </div>
                </div>
            </div>
        )
    }
}