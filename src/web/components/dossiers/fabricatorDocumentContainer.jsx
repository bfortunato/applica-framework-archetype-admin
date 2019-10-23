"use strict"

import React from "react";
import {format, optional} from "../../../utils/lang";
import {DocumentRow} from "./documentRow";
import _ from "underscore";
import M from "../../../strings";

export class FabricatorDocumentContainer extends React.Component {
    constructor(props) {
        super(props)
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

        let items = rows.map((i, index) => <DocumentRow dossierId={model.get("id")} key={this.getKey(i)} row={i} index={index} />)

        let filesUploaded = _.filter(rows, r=>r.file != null).length;
        let filesRefused = _.filter(rows, r=>!r.valid).length;
        let description = format(M("rowsDescription"), filesUploaded, rows.length);
        if (filesRefused > 0) {
            description += " - " + format(M("refusedRows"), filesRefused).toUpperCase();
        }

        return (
            <div className="col-12 zero-padding m-t-15">
                <div className="row">
                    <div className="col-lg zero-padding">
                        <div className="col-12">
                            <div className="col-12 zero-padding document-header" style={{display: "inline-block"}}>
                                <span className="text-uppercase float-left">{M("fabricatorDocumentation")}</span>
                                <span className="text-uppercase float-right">{description}</span>
                            </div>
                            <div className="col-12 zero-padding">
                                {items}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}