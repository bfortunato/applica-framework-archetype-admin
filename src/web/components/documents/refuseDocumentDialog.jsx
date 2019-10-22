"use strict"

import {connect} from "../../utils/aj";
import {DossierStore} from "../../../stores/dossier";
import {hideRefuseDocumentDialog, refuseDocument} from "../../../actions/dossier";
import React from "react";
import {Dialog, DIALOG_RESULT_CANCEL, DIALOG_RESULT_OK} from "../dialogs";
import M from "../../../strings";

export class RefuseDocumentDialog extends React.Component {

    constructor(props) {
        super(props)
        this.refuseReason = null;
        connect(this, DossierStore, {showRefuseDocumentDialog:false, documentTypeId: null});
    }

    componentDidUpdate() {

    }

    onValueChange(e) {
        let value = e.target.value
        this.setState({refuseReason: value})
    }

    onClose() {
        hideRefuseDocumentDialog();
    }

    refuse() {
        refuseDocument({
            dossierId: this.props.model.get("id"),
            documentTypeId: this.state.documentTypeId,
            refuseReason: this.state.refuseReason
        })
    }

    getButtons() {
        return [
            {
                text: M("cancel"),
                action: (dialog) => {
                    this.onClose()
                    dialog.hide()
                },
                dialogResult: DIALOG_RESULT_CANCEL
            },
            {
                text: M("refuse"),
                action: (dialog) => {
                    this.refuse()
                    dialog.hide()
                },
                dialogResult: DIALOG_RESULT_OK,
                className: "btn btn-link waves-effect ok-button",
            }
        ];
    }

    render() {
        let style = {
            marginTop: "20px",
            marginBottom: "20px",
            height: "150px"
        };
        
        let buttons = this.getButtons();

        return (
            <Dialog onClose={this.onClose.bind(this)} buttons={buttons} ref="refuseDocument" title={M("refuseDocument")}  hidden={!this.state.showRefuseDocumentDialog} large="false">
                <div className="col-12 zero-padding" >
                    <p>{M("refuseReasonDescription")}</p>
                    <textarea className="form-control" value={this.state.refuseReason} style={style} onChange={this.onValueChange.bind(this)} placeholder=""/>
                </div>
                {/*<div className="col-12 zero-padding float-right">*/}
                    {/*<button className="btn btn-primary" onClick={this.refuse.bind(this)}>{M("refuse")}</button>*/}
                {/*</div>*/}
            </Dialog>
        )

    }
}