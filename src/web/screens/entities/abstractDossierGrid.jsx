"use strict";


import {Layout} from "../../components/layout";
import M from "../../../strings";
import {ActionsMatcher, FloatingButton} from "../../components/common";
import entities from "../../entities";
import AbstractEntitiesGrid from "./abstractEntitiesGrid";
import {safeGet} from "../../../utils/lang";
import {PasswordText, Text} from "../../components/forms";
import * as query from "../../../api/query";
import _ from "underscore";
import React from "react";
import {DossierStatus} from "../../../model/vars";
import {CustomDossierGrid} from "../../components/customDossierGrids";
import {loadEntities} from "../../../actions/entities";
import {connect} from "../../utils/aj";
import {DossierGridStore} from "../../../stores/dossierGrid";
import {getDossierCount} from "../../../actions/dossierGrid";

class StatusFilter extends React.Component {
    constructor(props){
        super(props);
    }

    onClick() {
        let status = safeGet(this.props, "status", null);
        if(_.isFunction(this.props.onClick)){
            this.props.onClick(status);
        }
    }

    render() {
        let status = safeGet(this.props, "status", null);
        let label = status != null ? status.label : M("allStates");
        let query = this.props.query;
        let active = false;
        if (query.filters.length > 0){
            if (status != null) {
                active = _.filter(query.filters, f=>f.property === "status" && f.value === status.value).length > 0
            }
        } else {
            if (status == null)
                active = true;
        }

        let cardStyle = {
            backgroundColor: active ? "#063868" : "#EBEBEB"
        }

        let textStyle = {
            color: active ? "#FFFFFF" : "#AAAAAA"
        }

        return (
            <div className="col-md-2">
                <div className="card status-filter" style={cardStyle} onClick={this.onClick.bind(this)}>
                    <div className="row">
                        <span className="status-filter-label" style={textStyle}>{label}</span>
                        <span className="status-filter-value" style={textStyle}>{this.props.count}</span>
                    </div>
                </div>
            </div>
        )
    }
}

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
            _query.rowsPerPage = 10
        }
        this.state = {grid: null, result: null, query: _query, dossierCount: null}
        connect(this, DossierGridStore, this.state);
    }

    componentDidMount() {
        loadEntities({discriminator: this.discriminator, entity: this.getEntity(), query: this.state.query});
        getDossierCount();
    }

    getActions() {
        let self = this;
        let defaultActions = [

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

    onRowClick(row) {
        if (_.isFunction(this.props.onRowClick))
            this.props.onRowClick(row);
    }
    
    filter(status){
        let query = safeGet(this.state, "query", null);

        query.die();
        query.setPage(1)
        query.live();

        if (status != null){
            query.eq("status", status.value)
        } else {
            query.unfilter("status");
        }
    }

    generateFilters() {
        let components = [];
        let dossierCount = this.state.dossierCount;
        components.push(
            <StatusFilter count={dossierCount.all} onClick={this.filter.bind(this)} query={this.state.query}/>
        )
        _.each(DossierStatus, d=> {
            components.push(
                <StatusFilter count={dossierCount[d.value.replace("-","")]} status={d} onClick={this.filter.bind(this)} query={this.state.query}/>
            )
        })
        return components;
    }

    render() {

        let descriptor = this.getDescriptor();
        let data = this.getData();
        let filters = null;
        if (this.state.dossierCount != null)
            filters = this.generateFilters();
        let header = this.generateHeaderBlock();

        return (
            <Layout>
                {header}
                <div className="row">
                    {filters}
                </div>
                <CustomDossierGrid
                    ref="grid"
                    descriptor={descriptor}
                    data={data}
                    hideFilters={this.hideFilters()}
                    query={this.state.query}
                    entity={this.props.entity}
                    tableClassName="table table-dossier table-bordered table-hover table-responsive"
                    onRowDoubleClick={this.onGridRowDoubleClick.bind(this)}
                    quickSearchEnabled={true}
                    checkboxSelectEnabled={false}
                    selectionEnabled="true"
                    selectionMode="single"
                    quickSearchPlaceholder={M("searchCode")}
                    onRowClick={this.onRowClick.bind(this)}
                />
                {this.canCreate() &&
                <FloatingButton icon="zmdi zmdi-plus" onClick={this.createEntity.bind(this)} />
                }
            </Layout>
        )
    }
}
