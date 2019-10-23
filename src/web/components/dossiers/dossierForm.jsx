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

        return (
            <div>
                <div className="header-actions-dossier fixed-top">
                    <div className="col-8 float-left">
                        <span style={{fontSize: "20px"}}>{title}</span>
                    </div>
                    <div className="col-4 float-right">
                        <DossierStatusComponent
                            data={this.props.data}/>
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