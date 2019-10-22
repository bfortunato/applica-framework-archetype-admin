"use strict"

import React from "react";
import M from "../../../strings";
import _ from "underscore";
import {clearDocument, showAddDocumentDialog, showRefuseDocumentDialog} from "../../../actions/dossier";
import {format} from "../../../utils/lang";
import moment from "moment";
import {DocumentStatus, DocumentTypeTypology} from "../../../model/vars";
import * as config from "../../../framework/config";
import {getSessionToken} from "../../../api/session";

export class DocumentRow extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick() {
        if (_.isFunction(this.props.onClick)) {
            this.props.onClick(this.props.item)
        }
    }

    attachAttachment() {
        let row = this.props.row
        showAddDocumentDialog({
            documentTypeId: row.documentTypeId
        });
    }

    refuseDocument() {
        let row = this.props.row
        showRefuseDocumentDialog({
            documentTypeId: row.documentTypeId
        });
    }

    clearDocument() {
        let row = this.props.row
        clearDocument({
            documentTypeId: row.documentTypeId,
            dossierId: this.props.dossierId
        })
    }

    downloadTemplate(){
        let row = this.props.row
        window.open(config.get("attachment.download") + "?filename=" + row.documentType.description + "&path=" + encodeURI(row.documentType.template.path) + "&__TOKEN=" + encodeURIComponent(getSessionToken()))
    }

    render() {
        let row = this.props.row
        let index = this.props.index + 1;
        index = index < 10 ? "0" + index : index
        let status = row.status === DocumentStatus.TO_BE_UPLOAD.value && row.valid ? M("toBeUpload") : (row.status === DocumentStatus.UPLOADED.value ? format(M("uploadedDate"), moment(row.uploadDate).format("DD/MM/YYYY")) : (_.isUndefined(row.refuseReason) ? format(M("refusedDateAndReason"), moment(row.refusedDate).format("DD/MM/YYYY"), row.refuseReason) : format(M("refusedDate"), moment(row.refusedDate).format("DD/MM/YYYY"))));
        // let status = row.file != null ? (row.valid ? format(M("uploadedDate"), moment(row.uploadDate).format("DD/MM/YYYY")) : (row.refuseReason != null ? format(M("refusedDateAndReason"), moment(row.refusedDate).format("DD/MM/YYYY"), row.refuseReason) : format(M("refusedDate"), moment(row.refusedDate).format("DD/MM/YYYY")))) : M("toBeUpload");
        let documentStatusClass = "col-12 document-status" + (row.file == null && row.valid ? " pending" : (row.valid ? "" : " not-valid"));

        let cardStyle = {};
        if (row.file == null){
            cardStyle.backgroundColor = "#EBEBEB";
        }
        let circleClassName = "circle-document float-left " + (row.file ? " button-blue" : "");

        let imgStyle = {
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "contain",
            "backgroundPosition": "center",
            "height": "70px",
            "backgroundColor": "#F2F2F2"
        }

        return (
            <div className="col-12 zero-padding" onClick={this.onClick.bind(this)}>
                <div className="card m-t-10 m-b-0 p-15" style={cardStyle}>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-10 col-8 p-t-12">
                                <div className={circleClassName}>
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
                            <div className="col-md-2 col-4">


                                <div className="dropleft document-more-vert float-right">
                                    <a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i style={{marginTop: "20px"}} className="zmdi zmdi-more-vert" />
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {row.valid && <a className="dropdown-item" onClick={this.refuseDocument.bind(this)}>{M("refuse")}</a>}
                                        {row.file != null && <a className="dropdown-item" onClick={this.clearDocument.bind(this)}>{M("remove")}</a>}
                                        {row.documentType.typology !== DocumentTypeTypology.NO_MODEL.value && <a className="dropdown-item" onClick={this.downloadTemplate.bind(this)}>{M("downloadTemplate")}</a>}
                                    </div>
                                </div>

                                {row.file == null && <div className="attachment-box float-right" onClick={this.attachAttachment.bind(this, row)}>
                                    <div className="add-circle-document float-left">
                                        <button onClick={(e)=>{e.preventDefault()}}>
                                           <i className="zmdi zmdi-plus" />
                                        </button>
                                    </div>
                                </div>}
                                {row.file != null &&
                                <div className="attachment-box float-right">
                                    <div className="input-image" style={_.assign(imgStyle, {"backgroundImage": `url("${row.preview}")`})}></div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}