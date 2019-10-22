"use strict"

import {connect} from "../../utils/aj";
import {DossierStore} from "../../../stores/dossier";
import {attachDocument, hideAddDocumentDialog} from "../../../actions/dossier";
import React from "react";
import {MULTI_FILE_MODE_SINGLE, NewMultiFile} from "../forms";
import {Dialog} from "../dialogs";
import M from "../../../strings";

export class AddDocumentDialog extends React.Component {

    constructor(props) {
        super(props)

        connect(this, DossierStore, {showAddDocumentDialog:false, documentTypeId: null});
    }

    componentDidUpdate() {

    }

    onValueChange(newFile) {
        attachDocument({
            dossierId: this.props.model.get("id"),
            documentTypeId: this.state.documentTypeId,
            attachment: newFile
        })
        this.onClose()
    }

    onClose() {
        hideAddDocumentDialog();
    }

    render() {
        let model = this.props.model

        return (
            <Dialog onClose={this.onClose.bind(this)} ref="addDocument" icon={"zmdi zmdi-upload"} title={M("uploadDocument")}  hidden={!this.state.showAddDocumentDialog} large="false">
                <div className="col-12 zero-padding" >
                    <NewMultiFile model={model} disableInitOnModelLoad={true} onValueChange={this.onValueChange.bind(this)} mode={MULTI_FILE_MODE_SINGLE}/>
                </div>
            </Dialog>
        )

    }
}