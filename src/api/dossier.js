"use strict";

import * as config from "../framework/config";
import {post} from "./utils";

export function createDossier(customerId, fabricatorId , significantValue, nonSignificantValue, serviceValue) {
    return post(config.get("dossier.url") + "/quotation", {customerId, fabricatorId, significantValue, nonSignificantValue, serviceValue})
}

export function attachDocument(dossierId, documentTypeId , attachmentData, attachmentName) {
    return post(config.get("dossier.url") + "/" + dossierId + "/attach/" + documentTypeId, {attachmentData, attachmentName})
}