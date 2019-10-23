"use strict"

import React from "react";
import {format, optional} from "../../../utils/lang";
import {DocumentRow} from "./documentRow";
import _ from "underscore";
import {AssignationType} from "../../../model/vars";
import M from "../../../strings";

export class DossierDocumentContainer extends React.Component {
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

        let preparatoryRows = _.filter(rows, r=>r.documentType.assignationType === AssignationType.PREPARATORY_DOCUMENTATION.value);
        let closingRows = _.filter(rows, r=>r.documentType.assignationType === AssignationType.PRIVATE_CLOSING_DOCUMENTATION.value || r.documentType.assignationType === AssignationType.PUBLIC_CLOSING_DOCUMENTATION.value);

        let preparatoryItems = preparatoryRows.map((i, index) => <DocumentRow dossierId={model.get("id")} key={this.getKey(i)} row={i} index={index} />)
        let closingItems = closingRows.map((i, index) => <DocumentRow dossierId={model.get("id")} key={this.getKey(i)} row={i} index={index} />)
        let preparatoryFilesUploaded = _.filter(preparatoryRows, r=>r.file != null).length;
        let preparatoryFilesRefused = _.filter(preparatoryRows, r=>!r.valid).length;
        let preparatoryDescription = format(M("rowsDescription"), preparatoryFilesUploaded, preparatoryRows.length);
        if (preparatoryFilesRefused > 0) {
            preparatoryDescription += " - " + format(M("refusedRows"), preparatoryFilesRefused).toUpperCase();
        }

        let closingFilesUploaded = _.filter(closingRows, r=>r.file != null).length;
        let closingFilesRefused = _.filter(closingRows, r=>!r.valid).length;
        let closingDescription = format(M("rowsDescription"), closingFilesUploaded, closingRows.length);
        if (closingFilesRefused > 0) {
            closingDescription += " - " + format(M("refusedRows"), closingFilesRefused).toUpperCase();
        }

        return (
            <div className="col-12 zero-padding m-t-15">
                <div className="row">
                    <div className="col-lg zero-padding">
                        <div className="col-12" style={{borderRight: "1px solid #C4C4C4"}}>
                            <div className="col-12 zero-padding document-header" style={{display: "inline-block"}}>
                                <span className="text-uppercase float-left">{M("preparatoryDocumentation")}</span>
                                <span className="text-uppercase float-right">{preparatoryDescription}</span>
                            </div>
                            <div className="col-12 zero-padding">
                                {preparatoryItems}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg zero-padding">
                        <div className="col-12">
                            <div className="col-12 zero-padding document-header" style={{display: "inline-block"}}>
                                <span className="text-uppercase float-left">{M("closingDocumentation")}</span>
                                <span className="text-uppercase float-right">{closingDescription}</span>
                            </div>
                            <div className="col-12 zero-padding">
                                {closingItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}