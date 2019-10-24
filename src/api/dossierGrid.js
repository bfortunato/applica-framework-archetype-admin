"use strict"

import {get} from "./utils";
import * as config from "../framework/config";

export function getDossierCount() {
    return get(config.get("dossier.url") + "/count")
}