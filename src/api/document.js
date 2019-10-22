"use strict";

import * as config from "../framework/config";
import {get} from "./utils";

export function downloadTemplate(dossierId, documentTypeId) {
    return get(config.get("document.url") + "/" + dossierId + "/template", {documentTypeId})
}