"use strict"

import React from "react";
import {Layout} from "../../components/layout"
import EntityForm from "../../screens/entities/entityForm";
import {connect} from "../../utils/aj";
import {DossierStore} from "../../../stores/dossier";
import {createDossier} from "../../../actions/dossier";
import {format, safeGet} from "../../../utils/lang";
import M from "../../../strings";

class HeaderDossier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let data = this.props.data;
        let code = safeGet(data, "code", null);
        let title = null;
        if (code != null)
            title = format(M("dossierNumber"), code);
        let status = safeGet(data, "status", null);

        return (
            <div>
                <div className="header-actions-grid fixed-top">
                    <div className="float-left">
                        {title}
                    </div>
                    <div className="float-right">
                        {status}
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

    onSubmit(data) {
        let customer = safeGet(data, "_customer", null);
        let fabricator = safeGet(data, "_fabricator", null);
        createDossier({
            discriminator: "entity_form_dossier",
            customerId: customer != null ? customer.id : null,
            fabricatorId: fabricator != null ? fabricator.id : null,
            significantValue: safeGet(data, "_significantValue", null),
            nonSignificantValue: safeGet(data, "_nonSignificantValue", null),
            serviceValue: safeGet(data, "_serviceValue", null)
        })
    }

    render() {
        let descriptor = this.getDescriptor()
        let component = this.getFormComponent()
        let selectedTab = this.props.params.selectedTab;


        return (
            <Layout>
                <HeaderDossier
                    data={this.state.data}
                />
                {React.createElement(component, {
                    ref: "form",
                    descriptor: descriptor,
                    data: this.state.data,
                    selectedTab : selectedTab,
                    onSubmit: this.onSubmit.bind(this),
                    onCancel: this.onCancel.bind(this)
                })}
            </Layout>
        )
    }
}