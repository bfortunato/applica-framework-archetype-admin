"use strict"

import React from "react";
import {Layout} from "../../components/layout"
import EntityForm from "../../screens/entities/entityForm";
import {connect} from "../../utils/aj";
import {DossierStore} from "../../../stores/dossier";
import {createDossier, editDossier} from "../../../actions/dossier";
import {format, safeGet} from "../../../utils/lang";
import M from "../../../strings";
import {DossierStatusComponent} from "./dossierStatus";
import {DossierStatus} from "../../../model/vars";
import {alert} from "../../../plugins";
import {deleteEntities} from "../../../actions/entities";

class HeaderDossier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteDossier() {
        let data = this.props.data;
        let status = safeGet(data, "status", null);

        if (status === DossierStatus.STATUS_PAY_OFF.value) {
            alert(M("warning"), M("deleteNotAllowedForStatusPayOff"), "warning")
        } else {
            swal({title: M("confirm"), text: M("areYouSure"), showCancelButton: true})
                .then(res => {
                    if (res.value) {
                        deleteEntities({discriminator: "entity_form_dossier", entity: "dossier", ids: [safeGet(data, "id", null)]});
                    }
                })
        }
    }

    render() {
        let data = this.props.data;
        let code = safeGet(data, "code", null);
        let title = null;
        if (code != null)
            title = format(M("dossierNumber"), code);

        return (
            <div>
                <div className="header-actions-dossier fixed-top">
                    <div className="row">
                        <div className="col-md-7 col-sm-5 col-4 float-left">
                            <span style={{fontSize: "20px"}}>{title}</span>
                        </div>
                        <div className="col-md-4 col-sm-6 col-7 float-right">
                            <DossierStatusComponent
                                data={this.props.data}/>
                        </div>
                        <div className="col-1 float-right">
                            <div className="dropdown dossier-more-vert float-right">
                                <a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="zmdi zmdi-more-vert" />
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={this.deleteDossier.bind(this)}>{M("deleteDossier")}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class DossierForm extends EntityForm {
    constructor(props){
        super(props);
        this.state = {}
        connect(this, DossierStore, this.state);
    }

    componentWillUpdate(props, state) {
        if (state.saved) {
            this.refs.form.model.reset()
        }

        if (state.saved && this.willGoBack) {
            this.goBack()
            return false
        }

        if (state.validationError) {
            if (state.validationResult) {
                let form = this.refs.form
                if (form && form.model) {
                    _.each(state.validationResult.errors, e => {
                        form.model.setError(e.property, M(e.message))
                    })
                }
            }
            this.refs.form.model.invalidateForm()
        }

        if (state.loaded && !this.initialized) {
            this.onDataLoad(state.data)
            this.initialized = true;
        }

        if (state.deleted){
            this.goBack()
            return false;
        }

    }

    onSubmit(data) {
        let customer = safeGet(data, "_customer", null);
        let fabricator = safeGet(data, "_fabricator", null);
        if (safeGet(data,"id", null)){
            editDossier({
                discriminator: "entity_form_dossier",
                dossierId: safeGet(data,"id", null),
                customerId: customer != null ? customer.id : null,
                fabricatorId: fabricator != null ? fabricator.id : null,
                significantValue: safeGet(data, "_significantValue", null),
                nonSignificantValue: safeGet(data, "_nonSignificantValue", null),
                serviceValue: safeGet(data, "_serviceValue", null),
                notes: safeGet(data, "notes", null)
            })
        } else {
            createDossier({
                discriminator: "entity_form_dossier",
                customerId: customer != null ? customer.id : null,
                fabricatorId: fabricator != null ? fabricator.id : null,
                significantValue: safeGet(data, "_significantValue", null),
                nonSignificantValue: safeGet(data, "_nonSignificantValue", null),
                serviceValue: safeGet(data, "_serviceValue", null),
                notes: safeGet(data, "notes", null)
            })
        }
    }

    render() {
        let descriptor = this.getDescriptor()
        let component = this.getFormComponent()
        let selectedTab = this.props.params.selectedTab;

        let id = safeGet(this.state.data, "id", null);

        let style = {
            marginTop: id != null ? "30px" : ""
        };

        return (
            <Layout>
                {id && <HeaderDossier
                    data={this.state.data}
                />}
                {React.createElement(component, {
                    ref: "form",
                    descriptor: descriptor,
                    data: this.state.data,
                    selectedTab : selectedTab,
                    onSubmit: this.onSubmit.bind(this),
                    onCancel: this.onCancel.bind(this),
                    style: style
                })}
            </Layout>
        )
    }
}