"use strict"

import {connect} from "../../utils/aj";
import {DossierStore} from "../../../stores/dossier";
import {attachDocument, hideAddDocumentDialog} from "../../../actions/dossier";
import React from "react";
import {MULTI_FILE_MODE_SINGLE, NewMultiFile} from "../forms";
import {Dialog} from "../dialogs";
import M from "../../../strings";
import {getSessionToken} from "../../../api/session";
import * as config from "../../../framework/config";
import {safeGet} from "../../../utils/lang";
import {DocumentTypeTypology} from "../../../model/vars";

export class AddDocumentDialog extends React.Component {

    constructor(props) {
        super(props)

        connect(this, DossierStore, {showAddDocumentDialog:false, documentType: null});
    }

    componentDidUpdate() {

    }

    onValueChange(newFile) {
        attachDocument({
            dossierId: this.props.model.get("id"),
            documentTypeId: this.state.documentType.id,
            attachment: newFile
        })
        this.onClose()
    }

    onClose() {
        hideAddDocumentDialog();
    }

    downloadTemplate(e){
        e.preventDefault()
        window.open(config.get("attachment.download") + "?filename=" + this.state.documentType.description + "&path=" + encodeURI(this.state.documentType.template.path) + "&__TOKEN=" + encodeURIComponent(getSessionToken()))
    }

    downloadSelfCompiledTemplate(e){
        e.preventDefault()
        //TODO:
    }

    render() {
        let model = this.props.model;
        let documentType = safeGet(this.state, "documentType", null);
        let typology = safeGet(documentType, "typology", null);

        return (
            <Dialog onClose={this.onClose.bind(this)} ref="addDocument" icon={"zmdi zmdi-upload"} title={M("uploadDocument")}  hidden={!this.state.showAddDocumentDialog} large="false">
                <div className="row" style={{marginBottom: "30px"}}>
                    <div className="col-sm">
                        <button style={{width: "100%"}} onClick={this.downloadTemplate.bind(this)} className="btn btn-primary">{typology === DocumentTypeTypology.SELF_COMPILED_DOWNLOADABLE_TEMPLATE.value ? M("downloadEmptyTemplate") : M("downloadTemplate")}</button>
                    </div>
                    {typology === DocumentTypeTypology.SELF_COMPILED_DOWNLOADABLE_TEMPLATE.value &&
                    <div className="col-sm">
                        <div className="col-sm">
                            <button style={{width: "100%"}} onClick={this.downloadSelfCompiledTemplate.bind(this)} className="btn btn-primary">{M("downloadTemplate")}</button>
                        </div>
                    </div>}
                </div>
                <div className="col-12 zero-padding" >
                    <NewMultiFile model={model} disableInitOnModelLoad={true} onValueChange={this.onValueChange.bind(this)} mode={MULTI_FILE_MODE_SINGLE}/>
                </div>
            </Dialog>
        )

    }
}