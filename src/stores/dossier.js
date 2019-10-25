"use strict"

import * as aj from "../aj/index";
import {completed, failed} from "../utils/ajex";
import * as actions from "../actions/types";
import _ from "underscore";
import {DOSSIER} from "./types";


export const DossierStore = aj.createStore(DOSSIER, (state = {}, action) => {

    switch (action.type) {

        case completed(actions.CREATE_DOSSIER):
        case completed(actions.EDIT_DOSSIER):
            return _.assign(state, {
                error: false,
                data: action.data,
                saved: true,
                validationError: false,
                validationResult: null
            });

        case failed(actions.CREATE_DOSSIER):
        case failed(actions.EDIT_DOSSIER):
            return _.assign(state, {
                error: true,
                data: action.data,
                saved: false,
                validationError: action.validationError,
                validationResult: action.validationResult
            });

        case actions.SHOW_ADD_DOCUMENT_DIALOG:
            return _.assign(state, {showAddDocumentDialog: true, documentType: action.documentType});
        case actions.HIDE_ADD_DOCUMENT_DIALOG:
            return _.assign(state, {showAddDocumentDialog: false, documentType: null});
        case actions.SHOW_REFUSE_DOCUMENT_DIALOG:
            return _.assign(state, {showRefuseDocumentDialog: true, documentTypeId: action.documentTypeId});
        case actions.HIDE_REFUSE_DOCUMENT_DIALOG:
            return _.assign(state, {showRefuseDocumentDialog: false, documentTypeId: null});
        case actions.ATTACH_DOCUMENT:
        case actions.REFUSE_DOCUMENT:
        case actions.CLEAR_DOCUMENT:
            return _.assign(state, {completed: false, documents: null});
        case completed(actions.ATTACH_DOCUMENT):
        case completed(actions.REFUSE_DOCUMENT):
        case completed(actions.CLEAR_DOCUMENT):
            return _.assign(state, {
                error: false,
                completed: true,
                documents: action.documents,
                status: action.status
            });

        case failed(actions.ATTACH_DOCUMENT):
        case failed(actions.REFUSE_DOCUMENT):
        case failed(actions.CLEAR_DOCUMENT):
            return _.assign(state, {
                error: true,
                completed: false,
                documents: null,
                status: null
            });
        case completed(actions.QUOTATION):
        case completed(actions.CONFIRM_QUOTATION):
        case completed(actions.COMMIT):
        case completed(actions.CANDIDATE):
        case completed(actions.APPROVE):
        case completed(actions.PAY_OFF):
        case completed(actions.REFUSE):
            return _.assign(state, {
                error: false,
                statusChanged: true,
                status: action.status
            });

        case failed(actions.QUOTATION):
        case failed(actions.CONFIRM_QUOTATION):
        case failed(actions.COMMIT):
        case failed(actions.CANDIDATE):
        case failed(actions.APPROVE):
        case failed(actions.PAY_OFF):
        case failed(actions.REFUSE):
            return _.assign(state, {
                error: true,
                statusChanged: false
            });

    }

});
