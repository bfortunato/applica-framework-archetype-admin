"use strict"

import React from "react";
import M from "../../../strings";
import _ from "underscore";

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
        let index = this.props.index + 1;
        index = index < 10 ? "0" + index : index
        let status = row.file != null ? (row.valid ? format(M("uploadedDate"), row.uploadDate) : format(M("refusedDate"), row.refusedDate)) : M("toBeUpload");
        let valid = row.file != null ? row.valid : true;
        let documentStatusClass = "col-12" + (valid ? "" : " not-valid");

        return (
            <div className="col-12 zero-padding" onClick={this.onClick.bind(this)}>
                <div className="card m-t-10 m-b-10 p-15">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-1">
                                <div className="user-badge">
                                    <button onClick={(e)=>{e.preventDefault()}}>
                                        <i className="zmdi zmdi-check" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className={documentStatusClass}>
                                    <span style={{marginRight: "10px"}}><b>{index}</b></span>{row.documentType.description}
                                </div>
                                <div className="col-12">
                                    {status}
                                </div>
                            </div>
                            <div className="col-2">
                            </div>
                            <div className="col-1">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}