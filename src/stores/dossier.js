"use strict"

import * as aj from "../aj/index";
import {completed, failed} from "../utils/ajex";
import * as actions from "../actions/types";
import _ from "underscore";
import {DOSSIER} from "./types";


export const DossierStore = aj.createStore(DOSSIER, (state = {}, action) => {

    switch (action.type) {

        case completed(actions.CREATE_DOSSIER):
            return _.assign(state, {
                error: false,
                data: action.data,
                saved: true,
                validationError: false,
                validationResult: null
            });

        case failed(actions.CREATE_DOSSIER):
            return _.assign(state, {
                error: true,
                data: action.data,
                saved: false,
                validationError: action.validationError,
                validationResult: action.validationResult
            });

        case actions.SHOW_ADD_DOCUMENT_DIALOG:
            return _.assign(state, {showAddDocumentDialog: true, documentTypeId: action.documentTypeId});
        case actions.HIDE_ADD_DOCUMENT_DIALOG:
            return _.assign(state, {showAddDocumentDialog: false, documentTypeId: null});
        case actions.ATTACH_DOCUMENT:
            return _.assign(state, {documents: null});
        case completed(actions.ATTACH_DOCUMENT):
            return _.assign(state, {
                error: false,
                attached: true,
                documents: action.documents
            });

        case failed(actions.ATTACH_DOCUMENT):
            return _.assign(state, {
                error: true,
                attached: false,
                documents: null
            });

    }

});
