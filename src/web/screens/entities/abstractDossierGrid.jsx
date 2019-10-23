"use strict";


import {Layout} from "../../components/layout";
import M from "../../../strings";
import {ActionsMatcher, FloatingButton} from "../../components/common";
import entities from "../../entities";
import AbstractEntitiesGrid from "./abstractEntitiesGrid";
import {Grid} from "../../components/grids";
import {optional, safeGet} from "../../../utils/lang";
import {PasswordText, Text} from "../../components/forms";
import * as query from "../../../api/query";
import {toast} from "../../../plugins";
import _ from "underscore";
import React from "react";

export default class AbstractDossierGrid  extends AbstractEntitiesGrid {

    constructor(props) {
        super(props)

        if (_.isEmpty(this.getEntity())) {
            throw new Error("Please specify entity for form")
        }

        let _query = entities[this.getEntity()].grid.initialQuery
        if (_.isFunction(entities[this.getEntity()].grid.initialQuery)) {
            _query = entities[this.getEntity()].grid.initialQuery()
        }
        if (!_query) {
            _query = query.create()
            _query.page = 1
            _query.rowsPerPage = 50
        }
        this.state = {grid: null, result: null, query: _query, dialogData: {}}
    }

    getActions() {
        let self = this;
        let defaultActions = [
            {
                id: "syncIssues",
                type: "button",
                icon: "zmdi zmdi-download",
                tooltip: M("syncIssues"),
                action: () => {
                    self.showModal = !self.showModal;
                    this.forceUpdate();
                }
            }
        ];

        let grid = entities[this.getEntity()].grid
        let matcher = new ActionsMatcher(defaultActions)
        return matcher.match(grid.actions)
    }

    getDialogDescriptor() {
        return {
            className: "fe-form",
            useBootstrapRow: true,
            showInCard: false,
            showFormFooter: false,
            fields: [
                {
                    property: "username",
                    control: Text,
                    label: M("username"),
                    placeholder: M("username"),
                    size: "col-md-6",
                },
                {
                    property: "password",
                    control: PasswordText,
                    label: M("password"),
                    placeholder: M("password"),
                    size: "col-md-6",
                },
            ]
        }
    }

    onChange(data) {
        this.state.dialogData = data;
    }

    onSubmit(e) {
        if (e != null)
            e.preventDefault()
        if ((this.state.dialogData.username != null && this.state.dialogData.username != "") && (this.state.dialogData.password != null && this.state.dialogData.password != "")){
            let data = {
                username: this.state.dialogData.username,
                password: this.state.dialogData.password
            };
            syncIssues(data);
            this.state.dialogData = {};
            this.hide();
        } else {
            toast(M("usernameAndPasswordRequired"))
        }
    }

    onHidden() {
        this.showModal = false;
    }

    hide(e) {
        if (e != null)
            e.preventDefault();
        $(".syncDialog").modal("hide");
    }

    render() {

        let descriptor = this.getDescriptor()
        let data = this.getData()
        let header = this.generateHeaderBlock()

        let entity = this.getEntity();
        let dialogDescriptor = this.getDialogDescriptor();
        let dialogData = optional(this.state.dialogData, {});
        let validationError = safeGet(this.state,"validationError",false);
        let validationResult = safeGet(this.state,"validationResult",{});


        return (
            <Layout>
                {header}
                <Grid
                    ref="grid"
                    descriptor={descriptor}
                    data={data}
                    hideFilters={this.hideFilters()}
                    query={this.state.query}
                    entity={this.props.entity}
                    tableClassName="table table-bordered table-hover"
                    onRowDoubleClick={this.onGridRowDoubleClick.bind(this)}
                    quickSearchEnabled={true}
                />
                {this.canCreate() &&
                <FloatingButton icon="zmdi zmdi-plus" onClick={this.createEntity.bind(this)} />
                }
            </Layout>
        )
    }
}
