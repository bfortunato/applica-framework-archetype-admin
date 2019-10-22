"use strict"

import {alert, hideLoader, showLoader} from "../plugins";
import {createAsyncAction} from "../utils/ajex";
import * as responses from "../api/responses";
import _ from "underscore";
import {
    ATTACH_DOCUMENT,
    CLEAR_DOCUMENT,
    CREATE_DOSSIER,
    DELETE_ATTACHMENT,
    EDIT_DOSSIER,
    HIDE_ADD_DOCUMENT_DIALOG,
    HIDE_REFUSE_DOCUMENT_DIALOG,
    REFUSE_DOCUMENT,
    SHOW_ADD_DOCUMENT_DIALOG,
    SHOW_REFUSE_DOCUMENT_DIALOG
} from "./types";
import * as DossierApi from "../api/dossier";
import {getEntity} from "./entities";
import M from "../strings";
import * as aj from "../aj";

export const createDossier = createAsyncAction(CREATE_DOSSIER, data => {

    if (_.isEmpty(data.customerId)) {
        alert(M("problemOccoured"), M("customerRequired"), "error")
        return;
    }

    if (_.isEmpty(data.fabricatorId)) {
        alert(M("problemOccoured"), M("fabricatorRequired"), "error")
        return;
    }

    if (_.isEmpty(data.significantValue) || _.isEmpty(data.nonSignificantValue) || _.isEmpty(data.serviceValue)) {
        alert(M("problemOccoured"), M("priceCalculatorSheetRequired"), "error")
        return;
    }

    showLoader();
    DossierApi.createDossier(data.customerId, data.fabricatorId, data.significantValue, data.nonSignificantValue, data.serviceValue, data.notes)
        .then(response => {
            hideLoader();

            createDossier.complete()

            if (data.reload) {
                getEntity({discriminator: data.discriminator, entity: data.entity, id: response.value.id})
            }
        })
        .catch(e => {
            hideLoader()
            alert("Attenzione!", responses.msg(e), "error");
            createDossier.fail()
        })
});

export const editDossier = createAsyncAction(EDIT_DOSSIER, data => {
    if (_.isEmpty(data.customerId)) {
        alert(M("problemOccoured"), M("customerRequired"), "error")
        return;
    }

    if (_.isEmpty(data.fabricatorId)) {
        alert(M("problemOccoured"), M("fabricatorRequired"), "error")
        return;
    }

    if (_.isNull(data.significantValue) || _.isNull(data.nonSignificantValue) || _.isNull(data.serviceValue)) {
        alert(M("problemOccoured"), M("priceCalculatorSheetRequired"), "error")
        return;
    }

    showLoader();
    DossierApi.editDossier(data.dossierId, data.customerId, data.fabricatorId, data.significantValue, data.nonSignificantValue, data.serviceValue, data.notes)
        .then(response => {
            hideLoader();

            createDossier.complete()

            if (data.reload) {
                getEntity({discriminator: data.discriminator, entity: data.entity, id: response.value.id})
            }
        })
        .catch(e => {
            hideLoader()
            alert("Attenzione!", responses.msg(e), "error");
            createDossier.fail()
        })
});

export const attachDocument = createAsyncAction(ATTACH_DOCUMENT, data => {
    aj.dispatch({
        type: ATTACH_DOCUMENT
    })

    showLoader();
    DossierApi.attachDocument(data.dossierId, data.documentTypeId, data.attachment.path)
        .then(response => {
            hideLoader();
            attachDocument.complete({documents: response.value});
        })
        .catch(e => {
            hideLoader()
            alert("Attenzione!", responses.msg(e), "error");
            attachDocument.fail()
        })
});

export const refuseDocument = createAsyncAction(REFUSE_DOCUMENT, data => {
    aj.dispatch({
        type: REFUSE_DOCUMENT
    })

    showLoader();
    DossierApi.refuseDocument(data.dossierId, data.documentTypeId, data.refuseReason)
        .then(response => {
            hideLoader();
            refuseDocument.complete({documents: response.value});
        })
        .catch(e => {
            hideLoader()
            alert("Attenzione!", responses.msg(e), "error");
            refuseDocument.fail()
        })
});

export const clearDocument = createAsyncAction(CLEAR_DOCUMENT, data => {
    aj.dispatch({
        type: CLEAR_DOCUMENT
    })

    showLoader();
    DossierApi.clearDocument(data.dossierId, data.documentTypeId)
        .then(response => {
            hideLoader();
            refuseDocument.complete({documents: response.value});
        })
        .catch(e => {
            hideLoader()
            alert("Attenzione!", responses.msg(e), "error");
            refuseDocument.fail()
        })
});

export const showAddDocumentDialog = aj.createAction(SHOW_ADD_DOCUMENT_DIALOG, data => {
    aj.dispatch({
        type: SHOW_ADD_DOCUMENT_DIALOG,
        documentTypeId: data.documentTypeId
    })
});

export const hideAddDocumentDialog = aj.createAction(HIDE_ADD_DOCUMENT_DIALOG, data => {
    aj.dispatch({
        type: HIDE_ADD_DOCUMENT_DIALOG
    })
});

export const showRefuseDocumentDialog = aj.createAction(SHOW_REFUSE_DOCUMENT_DIALOG, data => {
    aj.dispatch({
        type: SHOW_REFUSE_DOCUMENT_DIALOG,
        documentTypeId: data.documentTypeId
    })
});

export const hideRefuseDocumentDialog = aj.createAction(HIDE_REFUSE_DOCUMENT_DIALOG, data => {
    aj.dispatch({
        type: HIDE_REFUSE_DOCUMENT_DIALOG
    })
});