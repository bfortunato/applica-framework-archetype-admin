import M from "../strings";
import _ from "underscore"
import * as datasource from "../utils/datasource";

export const CustomerType = {
    SUBJECT_TYPE_PHYSICAL_PERSON: {
        label: M("physicalPerson"),
        value: "physical-person"
    },
    SUBJECT_TYPE_LEGAL_PERSON: {
        label: M("legalPerson"),
        value: "legal-person"
    },
};

export const CustomerTypeDatasource = datasource.fixed(_.map(CustomerType,f => {return {value: f.value, label: f.label}}));

export function getCustomerTypeDescription(customerType) {
    let customerTypes = _.values(CustomerType).filter(f => f.value === customerType);
    if (!_.isEmpty(customerTypes))
        return customerTypes[0].label;
    else
        return ""
}

export const AssignationType = {
    FABRICATOR_PROFILE: {
        label: M("fabricatorProfile"),
        value: "fabricator-profile"
    },
    PREPARATORY_DOCUMENTATION: {
        label: M("preparatoryDocumentation"),
        value: "preparatory-documentation"
    },
    PRIVATE_CLOSING_DOCUMENTATION: {
        label: M("privateClosingDocumentation"),
        value: "private-closing-documentation"
    },
    PUBLIC_CLOSING_DOCUMENTATION: {
        label: M("publicClosingDocumentation"),
        value: "public-closing-documentation"
    },
};

export const AssignationTypeDatasource = datasource.fixed(_.map(AssignationType,f => {return {value: f.value, label: f.label}}));


export function getAssignationTypeDescription(assignationType) {
    let assignationTypes = _.values(AssignationType).filter(f => f.value === assignationType);
    if (!_.isEmpty(assignationTypes))
        return assignationTypes[0].label;
    else
        return ""
}

export const DocumentTypeTypology = {
    NO_MODEL: {
        label: M("noModel"),
        value: "no-model"
    },
    DOWNLOADABLE_TEMPLATE: {
        label: M("downloadableTemplate"),
        value: "downloadable-template"
    },
    SELF_COMILED_DOWNLOADABLE_TEMPLATE: {
        label: M("selfCompiledDownloadableTemplate"),
        value: "self-compiled-downloadable-template"
    },
};

export const DocumentTypeTypologyDatasource = datasource.fixed(_.map(DocumentTypeTypology,f => {return {value: f.value, label: f.label}}));

export const DocumentStatus = {
    TO_BE_UPLOAD: {
        label: M("toBeUpload"),
        value: "to-be-upload"
    },
    UPLOADED: {
        label: M("uploaded"),
        value: "uploaded"
    },
    TO_RECHARGE: {
        label: M("toRecharge"),
        value: "to-recharge"
    },
};

export const DossierStatus = {
    STATUS_QUOTATION: {
        label: M("quotation"),
        value: "quotation"
    },
    STATUS_DRAFT: {
        label: M("toBeUpload"),
        value: "draft"
    },
    STATUS_TO_CANDIDATE: {
        label: M("toCandidate"),
        value: "to-candidate"
    },
    STATUS_CANDIDATED: {
        label: M("candidated"),
        value: "candidated"
    },
    STATUS_REFUSED: {
        label: M("refused"),
        value: "refused"
    },
    STATUS_APPROVED: {
        label: M("approved"),
        value: "approved"
    },
    STATUS_PAY_OFF: {
        label: M("payOff"),
        value: "pay-off"
    },
};