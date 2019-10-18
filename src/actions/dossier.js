"use strict"

import {alert, hideLoader, showLoader} from "../plugins";
import {createAsyncAction} from "../utils/ajex";
import * as responses from "../api/responses";
import _ from "underscore";
import {CREATE_DOSSIER} from "./types";
import * as DossierApi from "../api/dossier";
import {getEntity} from "./entities";
import M from "../strings";

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
    DossierApi.createDossier(data.customerId, data.fabricatorId, data.significantValue, data.nonSignificantValue, data.serviceValue)
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