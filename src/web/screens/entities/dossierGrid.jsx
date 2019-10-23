"use strict"

import {connectDiscriminated} from "../../utils/aj";
import {EntitiesStore} from "../../../stores/entities";
import AbstractDossierGrid from "./abstractDossierGrid";

export default class DossierGrid extends AbstractDossierGrid {
    constructor(props) {
        super(props)

        this.state.query.on("change", () => {
            this.onQueryChanged()
        })


        this.discriminator = "entity_grid_" + this.getEntity()

        connectDiscriminated(this.discriminator, this, [EntitiesStore])
    }
}