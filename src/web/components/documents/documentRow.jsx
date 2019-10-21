"use strict"

import React from "react";
import M from "../../../strings";
import _ from "underscore";
import {attachDocument} from "../../../actions/dossier";

export class DocumentRow extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick() {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick(this.props.item)
        }
    }

    attachAttachment(row) {
        attachDocument({
            dossierId: this.props.dossierId,
            documentTypeId: row.documentType.id
        })
    }

    render() {
        let row = this.props.row
        debugger
        let index = this.props.index + 1;
        index = index < 10 ? "0" + index : index
        let status = row.file != null ? (row.valid ? format(M("uploadedDate"), row.uploadDate) : format(M("refusedDate"), row.refusedDate)) : M("toBeUpload");
        let valid = row.file != null ? row.valid : true;
        let documentStatusClass = "col-12 document-status" + (row.file == null ? " pending" : (valid ? "" : " not-valid"));

        let cardStyle = {};
        if (row.file == null){
            cardStyle.backgroundColor = "#EBEBEB";
        }

        return (
            <div className="col-12 zero-padding" onClick={this.onClick.bind(this)}>
                <div className="card m-t-10 m-b-0 p-15" style={cardStyle}>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-10 p-t-12">
                                <div className="circle-document float-left">
                                    <button onClick={(e)=>{e.preventDefault()}}>
                                        {row.file != null && <i className="zmdi zmdi-check" />}
                                    </button>
                                </div>
                                <div className="float-left">
                                    <div className={documentStatusClass}>
                                        <span className="fs-18" style={{fontWeight: 700, marginRight: "10px"}}>{index}</span><span className="fs-18">{row.documentType.description}</span>
                                    </div>
                                    <div className="col-12">
                                        <span className="fs-14">{status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="document-more-vert float-right">
                                    <i style={{marginTop: "20px"}} className="zmdi zmdi-more-vert" />
                                </div>
                                <div className="attachment-box float-right" onClick={this.attachAttachment.bind(this, row)}>
                                    <div className="add-circle-document float-left">
                                        <button onClick={(e)=>{e.preventDefault()}}>
                                           <i className="zmdi zmdi-plus" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}