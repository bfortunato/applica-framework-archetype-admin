import M from "../strings";
import _ from "underscore"

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

export function getCustomerTypeDescription(customerType) {
    let customerTypes = _.values(CustomerType).filter(f => f.value === customerType);
    if (!_.isEmpty(customerTypes))
        return customerTypes[0].label;
    else
        return ""
}