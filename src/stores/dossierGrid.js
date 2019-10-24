"use strict"

import * as aj from "../aj";
import {DOSSIER_GRID} from "./types";
import {completed, failed} from "../utils/ajex";
import * as actions from "../actions/types";
import _ from "underscore";

export const DossierGridStore = aj.createStore(DOSSIER_GRID, (state = {}, action) => {

    switch (action.type) {
        case completed(actions.DOSSIER_COUNT):
            return _.assign(state, {
                error: false,
                dossierCount: action.dossierCount
            });
        case failed(actions.DOSSIER_COUNT):
            return _.assign(state, {
                error: true,
                dossierCount: null
            });
    }

})