"use strict"

import * as aj from "../aj";
import * as DossierGridApi from "../api/dossierGrid";
import {DOSSIER_COUNT} from "./types";
import {alert} from "../plugins";
import * as responses from "../api/responses";
import {createAsyncAction} from "../utils/ajex";

export const getDossierCount = createAsyncAction(DOSSIER_COUNT, data => {
    aj.dispatch({
        type: DOSSIER_COUNT
    })

    // showLoader();
    DossierGridApi.getDossierCount()
        .then(response => {
            // hideLoader();
            getDossierCount.complete({dossierCount: response.value});
        })
        .catch(e => {
            // hideLoader()
            alert("Attenzione!", responses.msg(e), "error");
            getDossierCount.fail()
        })
});