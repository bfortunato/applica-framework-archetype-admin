"use strict";

import * as config from "../framework/config";
import {post} from "./utils";

export function createDossier(customerId, fabricatorId, significantValue, nonSignificantValue, serviceValue, notes) {
    return post(config.get("dossier.url") + "/quotation", {customerId, fabricatorId, significantValue, nonSignificantValue, serviceValue, notes})
}

export function editDossier(dossierId, customerId, fabricatorId, significantValue, nonSignificantValue, serviceValue, notes) {
    return post(config.get("dossier.url") + "/" + dossierId + "/edit", {customerId, fabricatorId, significantValue, nonSignificantValue, serviceValue, notes})
}

export function attachDocument(dossierId, documentTypeId, path) {
    return post(config.get("dossier.url") + "/" + dossierId + "/attachPath/" + documentTypeId, {path})
}

export function refuseDocument(dossierId, documentTypeId, refuseReason) {
    return post(config.get("dossier.url") + "/" + dossierId + "/refuse/" + documentTypeId, {refuseReason})
}

export function clearDocument(dossierId, documentTypeId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/clear/" + documentTypeId)
}


export function quotation(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/quotation")
}

export function confirmQuotation(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/confirmQuotation")
}

export function commit(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/commit")
}

export function candidate(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/candidate")
}

export function approve(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/approve")
}

export function payOff(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/payOff")
}

export function refuse(dossierId) {
    return post(config.get("dossier.url") + "/" + dossierId + "/refuse")
}