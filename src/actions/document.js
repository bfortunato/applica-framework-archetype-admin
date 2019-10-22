"use strict"

import {alert} from "../plugins";
import * as DocumentApi from "../api/document";
import * as responses from "../api/responses";
import {createAsyncAction} from "../utils/ajex";
import {DOWNLOAD_TEMPLATE} from "./types";

export const downloadTemplate = createAsyncAction(DOWNLOAD_TEMPLATE, data => {
    DocumentApi.downloadTemplate(data.dossierId, data.documentTypeId)
        .then(response => {
            downloadTemplate.complete();
        })
        .catch(e => {
            alert("Attenzione!", responses.msg(e), "error");
            downloadTemplate.fail()
        })
});