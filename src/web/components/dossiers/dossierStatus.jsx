"use strict"


import React from "react";
import {approve, candidate, commit, confirmQuotation, payOff, quotation, refuse} from "../../../actions/dossier";
import {
    AssignationType,
    DossierStatus,
    getDossierStatusDescription,
    getDossierStatusPosition
} from "../../../model/vars";
import {safeGet} from "../../../utils/lang";
import _ from "underscore";
import {connect} from "../../utils/aj";
import {DossierStore} from "../../../stores/dossier";
import M from "../../../strings";

export class DossierStatusComponent extends React.Component {
    constructor(props) {
        super(props);
        connect(this, DossierStore);
    }

    changeState(newState) {
        let dossierId = safeGet(this.props.data, "id", null);
        let currentStatus = safeGet(this.props.data, "status", null);
        let callback;
        let showDialog = false;
        if (newState === currentStatus){
            return;
        }
        if (currentStatus === DossierStatus.STATUS_APPROVED.value || currentStatus === DossierStatus.STATUS_PAY_OFF.value || currentStatus === DossierStatus.STATUS_REFUSED.value){
            showDialog = true;
        }

        switch (newState) {
            case DossierStatus.STATUS_QUOTATION.value:
                callback = ()=>quotation({
                    dossierId: dossierId
                })
                break;
            case DossierStatus.STATUS_DRAFT.value:
                callback = ()=>confirmQuotation({
                    dossierId: dossierId
                });
                break;
            case DossierStatus.STATUS_TO_CANDIDATE.value:
                callback = ()=>commit({
                    dossierId: dossierId
                });
                break;
            case DossierStatus.STATUS_CANDIDATED.value:
                callback = ()=>candidate({
                    dossierId: dossierId
                });
                break;
            case DossierStatus.STATUS_APPROVED.value:
                callback = ()=>approve({
                    dossierId: dossierId
                });
                break;
            case DossierStatus.STATUS_PAY_OFF.value:
                callback = ()=>payOff({
                    dossierId: dossierId
                });
                break;
            case DossierStatus.STATUS_REFUSED.value:
                callback = ()=>refuse({
                    dossierId: dossierId
                });
                break;
        }
        if (showDialog) {
            swal({title: M("confirm"), text: M("areYouSure"), showCancelButton: true})
                .then(res => {
                    if (res.value) {
                        callback();
                    }
                })
        } else {
            callback();
        }
    }

    getColorByStatus(status){
        switch (status) {
            case DossierStatus.STATUS_QUOTATION.value:
                return "#F2981A";
            case DossierStatus.STATUS_DRAFT.value:
                return "#116EC7";
            case DossierStatus.STATUS_TO_CANDIDATE.value:
                return "#116EC7";
            case DossierStatus.STATUS_CANDIDATED.value:
                return "#063868";
            case DossierStatus.STATUS_APPROVED.value:
                return "#063868";
            case DossierStatus.STATUS_PAY_OFF.value:
                return "#00C634";
            case DossierStatus.STATUS_REFUSED.value:
                return "#FF535A";
        }
    }

    getDropdownItems(status) {
        let items = [];
        let size = _.size(DossierStatus);
        let index = 0;
        _.each(DossierStatus, d => {
            let hasStatus = getDossierStatusPosition(status) >= getDossierStatusPosition(d.value);
            let circleClassName = "circle-status float-left " + (hasStatus ? " button-orange" : "");
            let statusTextStyle = {
                padding: "12px 8px",
                color: hasStatus ? "#F2981A" : "#AAAAAA"
            };

            items.push(
                <div className="dropdown-item cursor-pointer" onClick={this.changeState.bind(this, d.value)} style={{display: "inline-flex", paddingTop: "0px", paddingBottom: "0px", background: hasStatus ? "#FFFFFF" : "#F4F4F4", height: "48px", marginTop: d.value === DossierStatus.STATUS_REFUSED.value ? "10px" : "0"}}>
                    <div className={circleClassName} style={{paddingTop: "0px"}}>
                        {index !== 0 && d.value !== DossierStatus.STATUS_REFUSED.value && <div style={{width: "2px", height: "8px", backgroundColor: hasStatus ? "#F2981A" : "#AAAAAA", display: "block", margin: "0 auto"}}/>}
                        <button style={{marginTop: index === 0 || d.value === DossierStatus.STATUS_REFUSED.value ? "8px" : "0"}} onClick={(e)=>{e.preventDefault()}}>
                            <i style={{color: hasStatus ? "#FFFFFF" : "#F4F4F4"}} className="zmdi zmdi-check" />
                        </button>
                        {index !== (size-1) && d.value !== DossierStatus.STATUS_PAY_OFF.value && d.value !== DossierStatus.STATUS_REFUSED.value && <div style={{width: "2px", height: "8px", backgroundColor: hasStatus ? "#F2981A" : "#AAAAAA", display: "block", margin: "0 auto"}}/> }
                    </div>
                    <span className="text-uppercase status-text" style={statusTextStyle}>{d.label}</span>
                </div>
            )
            index++;
        })
        return items;
    }

    getDraftWidth(){
        let data = this.props.data;
        let status = safeGet(data, "status", null);
        let documents = safeGet(data, "documents", []);
        let preparatoryDocuments = _.filter(documents, d=> d.documentType.assignationType === AssignationType.PREPARATORY_DOCUMENTATION.value);

        if (getDossierStatusPosition(status) > getDossierStatusPosition(DossierStatus.STATUS_DRAFT.value)){
            return "100%";
        }
        return ((100 * _.filter(preparatoryDocuments, d=> d.file != null && d.valid).length)/preparatoryDocuments.length) + "%";
    }

    render() {
        let data = this.props.data;
        let status = safeGet(this.state, "status", safeGet(data, "status", null));
        let color = this.getColorByStatus(status);
        let statusStyle = {
            color: color,
            marginLeft: "2px"
        };

        let statusPosition = getDossierStatusPosition(status);

        let draftWidth = this.getDraftWidth();

        let dropdownItems = this.getDropdownItems(status);

        return(
            <div className="dropdown">
                {/*<a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                <div className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="row">
                        <div className="col-10">
                            <div className="col-12 float-right">
                                <span className="text-uppercase status-text" style={statusStyle}>{getDossierStatusDescription(status)}</span>
                            </div>
                            <div className="col-12" style={{display: "flex", marginTop: "5px"}}>
                                <div className="rounded-line" style={{backgroundColor: color, width: "20%"}} />
                                <div style={{width: "60%", position: "relative", marginRight: "4px"}}>
                                    <div className="rounded-line" style={{width: "100%", position: "absolute"}} />
                                    <div className="rounded-line" style={{backgroundColor: color, width: draftWidth, position: "absolute"}} />
                                </div>
                                <div className="rounded-line" style={{backgroundColor: statusPosition >= getDossierStatusPosition(DossierStatus.STATUS_TO_CANDIDATE.value) ? color : "#d7d7d7", width: "5%"}} />
                                <div className="rounded-line" style={{backgroundColor: statusPosition >= getDossierStatusPosition(DossierStatus.STATUS_CANDIDATED.value) ? color : "#d7d7d7", width: "5%"}} />
                                <div className="rounded-line" style={{backgroundColor: statusPosition >= getDossierStatusPosition(DossierStatus.STATUS_APPROVED.value) ? color : "#d7d7d7", width: "5%"}} />
                                <div className="rounded-line" style={{backgroundColor: statusPosition >= getDossierStatusPosition(DossierStatus.STATUS_PAY_OFF.value) || statusPosition >= getDossierStatusPosition(DossierStatus.STATUS_REFUSED.value) ? color : "#d7d7d7", width: "5%"}} />
                            </div>
                        </div>
                        <div className="col-2">
                            <i style={{fontSize: "24px", marginTop: "5px"}} className="zmdi zmdi-caret-down" />
                        </div>
                    </div>
                </div>
                {/*</a>*/}
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {dropdownItems}
                </div>
            </div>
        )
    }


}