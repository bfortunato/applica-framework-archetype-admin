import _ from "underscore";
import {CheckCell, TextCell} from "./components/grids";
import {check, sanitize} from "../libs/validator";
import {
    AreaNoCard,
    Column,
    DateTime,
    Image,
    Mail,
    MULTI_FILE_MODE_SINGLE,
    NewMultiFile,
    Number,
    PasswordText,
    ReadOnlyText,
    Select,
    Spacer,
    Text,
    YesNo
} from "./components/forms";
import {EntitiesLookupContainer, ValuesLookupContainer} from "./components/containers";
import M from "../strings";
import {
    AssignationTypeDatasource,
    CustomerType,
    CustomerTypeDatasource,
    DocumentTypeTypologyDatasource,
    DossierStatus,
    getAssignationTypeDescription,
    getCustomerTypeDescription
} from "../model/vars";
import * as datasource from "../utils/datasource";
import {DocumentContainer} from "./components/documents/documentContainer";
import moment from "moment";
import {format, isDifferent} from "../utils/lang";
import {AddDocumentDialog} from "./components/documents/addDocumentDialog";
import {DossierStore} from "../stores/dossier";
import {RefuseDocumentDialog} from "./components/documents/refuseDocumentDialog";


const entities = {
	user: {
		grid: {
			title: M("adminUsersList"),
			descriptor: {
	            columns: _.union([
	                {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
	                {property: "lastname", header: M("lastname"), cell: TextCell, sortable: true, searchable: true},
                    {property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: false},
	            ], getPersonGridColumns())
	        }
		},
		form: {
			title: M("editAdmin"),
			getActions(data) {
				let actions = ["back", "save", "save-go-back", "revisions"];
				// if (hasPermission("canResetPassword")) {
				// 	if (data && data.id) {
				// 		actions.push({
				// 			type: "button",
				// 			icon: "zmdi zmdi-brush",
				// 			tooltip: "Reset password",
				// 			action: () => {
				// 				swal({
				// 					title: M("confirm"),
				// 					text: "Verrà impostata una nuova password ed inviata all'indirizzo mail dell'utente",
				// 					showCancelButton: true
				// 				})
				// 				.then((res) => {
				// 					if (res.value) {
				// 						resetUserPassword({id: data.id})
				// 						if (data.id === getLoggedUser().id) {
				// 							swal({
				// 								title: M("confirm"),
				// 								text: "La tua password è stata resettata. Dovrai eseguire un nuovo accesso",
				// 								showCancelButton: false
				// 							})
				// 							.then((res) => {
				// 								if (res.value) {
				// 									logout();
				// 									ui.navigate("/login")
				// 								}
				// 							})
				// 						}
				// 					}
				// 				})
				// 				.catch((e) => {
				// 					logger.i(e)
				// 				})
                //
				// 			}
				// 		})
				// 	}
				// }
				return actions
			},
			descriptor: {
	            areas: _.union([
	                {
	                    title: M("generalInformations"),
	                    subtitle: null,
	                    fields: [
	                        {
	                            property: "name",
	                            control: Text,
	                            label: M("name"),
	                            placeholder: M("name"),
                                size: "col-sm-4",
	                        },
                            {
                                property: "lastname",
                                control: Text,
                                label: M("lastname"),
                                placeholder: M("lastname"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_category",
                                label: M("referenceToUserCategory"),
                                control: EntitiesLookupContainer,
                                size: "col-sm-4",
                                props: {
                                    id: "user_category",
                                    mode: "single",
                                    entity: "adminUserCategory",
                                    selectionGrid: {
                                        columns: [
                                            {property: "code", header: M("code"), cell: TextCell},
                                            {property: "description", header: M("description"), cell: TextCell}
                                        ]
                                    },
                                    popupGrid: {
                                        columns: [
                                            {property: "code", header: M("code"), cell: TextCell},
                                            {property: "description", header: M("description"), cell: TextCell}
                                        ]
                                    }
                                }
                            },
                            {
                                property: "phoneNumber",
                                control: Text,
                                label: M("phoneNumber"),
                                placeholder: M("phoneNumber"),
                                size: "col-sm-4",
                            },
	                    ]
	                }
	            ], getPersonFormAreas())
	        }
		}
	},

	role: {
		grid: {
			title: M("rolesList"),
			subtitle: M("rolesListDescription"),
			quickSearchEnabled: true,
			descriptor: {
				columns: [
	                {property: "role", header: "Role", cell: TextCell, sortable: true, searchable: true}
	            ]
			}
		},
		form: {
			title: "Edit role",
			subtitle: null,
			descriptor: {
                onModelLoadFirstTime: (model) =>{
                    if (model.get("id") == null){
                        model.set("active", true)
                    }
                },
				fields: [
					{
                        property: "role",
                        control: Text,
                        label: M("role"),
                        placeholder: M("nameOfRole"),
                        sanitizer: value => sanitize(value).trim(),
                        validator: value => check(value).notEmpty()
                    },
                    {
                    	property: "_permissions",
                    	label: M("permissions"),
                    	placeholder: M("selectPermissions"),
                    	control: ValuesLookupContainer,
                    	//sanitizer: value => _.map(value, v => v.value),
                    	validator: value => check(value).notEmpty(),
                    	props: {
                    		id: "role_permissions",
                    		collection: "permissions",
	                    	mode: "multiple",
	                        selectionGrid: {
	                            columns: [
	                                {property: "label", header: M("name"), cell: TextCell}
	                            ]
	                        },
	                        popupGrid: {
	                            columns: [
	                                {property: "label", header: M("name"), cell: TextCell}
	                            ]
	                        }
                    	}

                    }
				]
			}
		}
	},

    adminUser: {
        grid: {
            canDelete: ()=> {
                return false;
            },
            title: M("adminUsersList"),
            descriptor: {
                columns: _.union([
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
                    {property: "lastname", header: M("lastname"), cell: TextCell, sortable: true, searchable: true},
                    {property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true}
                ], getPersonGridColumns("adminUserCategory"))
            }
        },
        form: {
            title: M("editAdmin"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                onModelLoadFirstTime: (model) =>{
                    if (model.get("id") == null){
                        model.set("active", true)
                    }
                },
                areas: [
                    {
                        component: AreaNoCard,
                        className: "col-sm-12",
                        fields: _.union([
                            {
                                property: "c",
                                control: Column,
                                size: "col-sm-8",
                                className: "m-b-30",
                                noLateralPadding: false,
                                fields: [
                                    {
                                        property: "c_1",
                                        control: Column,
                                        size: "col-sm-12",
                                        className: "card",
                                        noLateralPadding: false,
                                        fields: [
                                            {
                                                property: "name",
                                                control: Text,
                                                label: M("name"),
                                                placeholder: M("name"),
                                                size: "col-sm-12"
                                            },
                                            {
                                                property: "lastname",
                                                control: Text,
                                                label: M("lastname"),
                                                placeholder: M("lastname"),
                                                size: "col-sm-12"
                                            },
                                            {
                                                property: "_category",
                                                label: M("referenceToUserCategory"),
                                                control: ValuesLookupContainer,
                                                size: "col-sm-12",
                                                props: {
                                                    id: "user_category",
                                                    mode: "single",
                                                    collection: "adminUserCategories",
                                                    selectionGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "description", header: M("description"), cell: TextCell}
                                                        ]
                                                    },
                                                    popupGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "description", header: M("description"), cell: TextCell}
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                property: "phoneNumber",
                                                control: Text,
                                                label: M("phoneNumber"),
                                                placeholder: M("phoneNumber"),
                                                size: "col-sm-12"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ], getPersonFormAreas())
                    }
                ]
            }
        }
    },

    endUser: {
        grid: {
            canDelete: ()=> {
                return false;
            },
            title: M("endUsersList"),
            descriptor: {
                columns: _.union([
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
                    {property: "lastname", header: M("lastname"), cell: TextCell, sortable: true, searchable: true},
                    {property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
                    {property: "sex", header: M("sex"), cell: TextCell, sortable: true, searchable: true}
                ], getPersonGridColumns("endUserCategory"))
            }
        },
        form: {
            title: M("editEndUser"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                onModelLoadFirstTime: (model) =>{
                    if (model.get("id") == null){
                        model.set("active", true)
                    }
                },
                areas: [
                    {
                        component: AreaNoCard,
                        className: "col-sm-12",
                        fields: _.union([
                            {
                                property: "c",
                                control: Column,
                                size: "col-sm-8",
                                className: "m-b-30",
                                noLateralPadding: false,
                                fields: [
                                    {
                                        property: "c_1",
                                        control: Column,
                                        size: "col-sm-12",
                                        className: "card",
                                        noLateralPadding: false,
                                        fields: [
                                            {
                                                property: "_avatar",
                                                control: Image,
                                                label: M("image")
                                            },
                                            {
                                                property: "name",
                                                control: Text,
                                                label: M("name"),
                                                placeholder: M("name"),
                                            },
                                            {
                                                property: "lastname",
                                                control: Text,
                                                label: M("lastname"),
                                                placeholder: M("lastname"),
                                            },
                                            {
                                                property: "birthDate",
                                                control: DateTime,
                                                label: M("birthDate"),
                                                placeholder: M("birthDate"),
                                            },
                                            {
                                                property: "_category",
                                                label: M("referenceToUserCategory"),
                                                control: ValuesLookupContainer,
                                                props: {
                                                    id: "user_category",
                                                    mode: "single",
                                                    collections: "endUserCategories",
                                                    selectionGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "description", header: M("description"), cell: TextCell}
                                                        ]
                                                    },
                                                    popupGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "description", header: M("description"), cell: TextCell}
                                                        ]
                                                    }
                                                }
                                            },
                                        ]
                                    }
                                ]
                            }
                        ], getPersonFormAreas())
                    }
                ]
            }
        }
    },

    fabricator: {
        grid: {
            canDelete: ()=> {
                return false;
            },
            title: M("fabricatorList"),
            descriptor: {
                columns: _.union([
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
                    {property: "businessName", header: M("businessName"), cell: TextCell, sortable: true, searchable: true},
                    {
                        property: "address",
                        header: M("province"),
                        cell: TextCell,
                        sortable: true,
                        searchable: true,
                        props: {
                            formatter: v => {
                                return v != null ? v.province : "";
                            }
                        }
                    },
                    {
                        property: "address",
                        header: M("municipality"),
                        cell: TextCell,
                        sortable: true,
                        searchable: true,
                        props: {
                            formatter: v => {
                                return v != null ? v.municipality : "";
                            }
                        }
                    },
                ], getPersonGridColumns("fabricatorCategory"))
            }
        },
        form: {
            title: M("editFabricator"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                onModelLoadFirstTime: (model) =>{
                    if (model.get("id") == null){
                        model.set("active", true)
                    }
                },
                areas: [
                    {
                        component: AreaNoCard,
                        className: "col-sm-12",
                        fields: _.union([
                            {
                                property: "c",
                                control: Column,
                                size: "col-sm-8",
                                className: "m-b-30",
                                noLateralPadding: false,
                                fields: [
                                    {
                                        property: "c_1",
                                        control: Column,
                                        size: "col-sm-12",
                                        className: "card",
                                        noLateralPadding: false,
                                        fields: [
                                            {
                                                property: "businessName",
                                                control: Text,
                                                label: M("businessName"),
                                                placeholder: M("businessName"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_category",
                                                label: M("referenceToUserCategory"),
                                                control: ValuesLookupContainer,
                                                size: "col-sm-4",
                                                props: {
                                                    id: "user_category",
                                                    mode: "single",
                                                    collection: "fabricatorCategories",
                                                    selectionGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "description", header: M("description"), cell: TextCell}
                                                        ]
                                                    },
                                                    popupGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "description", header: M("description"), cell: TextCell}
                                                        ]
                                                    }
                                                }
                                            },

                                            {
                                                property: "referent",
                                                control: Text,
                                                label: M("referent"),
                                                placeholder: M("referent"),
                                                size: "col-sm-4",
                                            },
                                            // {
                                            //     property: "_city",
                                            //     label: M("city"),
                                            //     size: "col-sm-4",
                                            //     control: ValuesLookupContainer,
                                            //     formatter: v => {
                                            //         return v !== null ? v.description + ", " + (v.province !== null ? v.province.description : "") + ", " + v.cap : ""
                                            //     },
                                            //     props: {
                                            //         id: "city_province",
                                            //         mode: "single",
                                            //         getCollection: (data) => {
                                            //             return "cities"
                                            //         },
                                            //         selectionGrid: {
                                            //             columns: [
                                            //                 {property: "description", header: M("name"), cell: TextCell},
                                            //                 {property: "cap", header: M("cap"), cell: TextCell},
                                            //                 {
                                            //                     property: "province",
                                            //                     header: M("province"),
                                            //                     cell: TextCell,
                                            //                     props: {
                                            //                         formatter: (value) => {
                                            //                             return value ? value.description : ""
                                            //                         }
                                            //                     }
                                            //                 },
                                            //             ]
                                            //         },
                                            //         popupGrid: {
                                            //             columns: [
                                            //                 {property: "description", header: M("name"), cell: TextCell},
                                            //                 {property: "cap", header: M("cap"), cell: TextCell},
                                            //                 {
                                            //                     property: "province",
                                            //                     header: M("province"),
                                            //                     cell: TextCell,
                                            //                     props: {
                                            //                         formatter: (value) => {
                                            //                             return value ? value.description : ""
                                            //                         }
                                            //                     }
                                            //                 },
                                            //             ]
                                            //         }
                                            //     }
                                            // },
                                            {
                                                property: "_country",
                                                control: Text,
                                                label: M("country"),
                                                placeholder: M("country"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_region",
                                                control: Text,
                                                label: M("region"),
                                                placeholder: M("region"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_province",
                                                control: Text,
                                                label: M("province"),
                                                placeholder: M("province"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_postalCode",
                                                control: Text,
                                                label: M("postalCode"),
                                                placeholder: M("postalCode"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_municipality",
                                                control: Text,
                                                label: M("municipality"),
                                                placeholder: M("municipality"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_address",
                                                control: Text,
                                                label: M("address"),
                                                placeholder: M("address"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_streetNumber",
                                                control: Text,
                                                label: M("streetNumber"),
                                                placeholder: M("streetNumber"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "phoneNumber",
                                                control: Text,
                                                label: M("phoneNumber"),
                                                placeholder: M("phoneNumber"),
                                                size: "col-sm-3",
                                            },
                                        ]
                                    }
                                ]
                            }
                        ], getPersonFormAreas())
                    },
                    {
                        component: AreaNoCard,
                        className: "col-sm-12",
                        fields: [
                            {
                                property: "documents",
                                control: DocumentContainer,
                                label: null,
                                size: "col-sm-12",
                            }
                        ]
                    },
                ],
            }
        }
    },

    customer: {
        grid: {
            title: M("customerList"),
            descriptor: {
                columns: [
                    {
                        property: "code",
                        header: M("code"),
                        cell: TextCell,
                        sortable: true,
                        searchable: true,
                        searchForm: {
                            showInCard: false,
                            fields: [
                                {
                                    property: "code",
                                    label: M("code"),
                                    control: Number,
                                    filterType: "eq",
                                    isInteger: true
                                }
                            ]
                        }
                    },
                    {
                        property: "subjectType",
                        header: M("type"),
                        cell: TextCell,
                        sortable: true,
                        searchable: true,
                        searchForm: {
                            showInCard: false,
                            fields: [
                                {
                                    property: "subjectType",
                                    label: M("type"),
                                    control: Select,
                                    filterType: "eq",
                                    props: {
                                        datasource: CustomerTypeDatasource,
                                    },
                                }
                            ]
                        },
                        props: {
                            formatter: v => {
                                return v != null ? getCustomerTypeDescription(v) : "";
                            }
                        }
                    },
                    {
                        property: "name",
                        header: M("name"),
                        cell: TextCell,
                        sortable: true,
                        searchable: true,
                        searchForm: {
                            showInCard: false,
                            fields: [
                                {
                                    property: "name",
                                    label: M("name"),
                                    control: Text,
                                    filterType: "like"
                                }
                            ]
                        }
                    },
                    {
                        property: "active",
                        header: M("active"),
                        cell: CheckCell,
                        sortable: true,
                        searchable: true,
                        searchForm: {
                            showInCard: false,
                            fields: [
                                {
                                    property: "active",
                                    label: M("status"),
                                    control: Select,
                                    filterType: "eq",
                                    props: {
                                        datasource: datasource.fixed([
                                            {label: "Attivo", value: true},
                                            {label: "Non attivo", value: false},
                                        ]),
                                    },
                                }
                            ]
                        },
                    },
                ]
            }
        },
        form: {
            title: M("editCustomer"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                onModelLoadFirstTime: (model) =>{
                    model.on("property:change", (property, value) => {
                        if (property === "subjectType") {
                            model.set("_address", null);
                            model.set("_city", null);
                            model.set("_streetNumber", null);
                            model.invalidateForm()
                        }
                    })
                    if (model.get("id") == null){
                        model.set("active", true);
                        model.set("subjectType", CustomerType.SUBJECT_TYPE_PHYSICAL_PERSON.value);
                    }
                },
                visibility: (field, model, descriptor) => {
                    switch (field.property) {
                        case "firstName":
                        case "lastName":
                        case "sex":
                        case "_birthCountry":
                        case "_birthRegion":
                        case "_birthProvince":
                        case "_birthPostalCode":
                        case "_birthMunicipality":
                            return (model != null && model.get("subjectType") === CustomerType.SUBJECT_TYPE_PHYSICAL_PERSON.value);
                        case "vatCode":
                        case "vatCodeDisabled":
                        case "socialReason":
                            return (model != null && model.get("subjectType") === CustomerType.SUBJECT_TYPE_LEGAL_PERSON.value);
                        default:
                            return true;
                    }
                },
                areas: [
                    {
                        title: M("generalInformations"),
                        subtitle: null,
                        fields: [
                            {
                                property: "code",
                                control: ReadOnlyText,
                                label: M("code"),
                                placeholder: M("code"),
                                size: "col-sm-4",
                            },
                            {
                                property: "subjectType",
                                control: Select,
                                size: "col-sm-4",
                                label: M("type"),
                                placeholder: M("type"),
                                props: {
                                    id: "customer",
                                    allowNull: false,
                                    multiple: false,
                                    datasource: CustomerTypeDatasource,
                                }
                            },
                            {
                                property: "active",
                                control: YesNo,
                                label: M("active"),
                                size: "col-sm-4",
                                sanitizer: (value) => sanitize(value).toBoolean()
                            },
                        ]
                    },
                    {
                        title: M("customerInformations"),
                        subtitle: null,
                        fields: [
                            {
                                property: "firstName",
                                control: Text,
                                label: M("name"),
                                placeholder: M("name"),
                                size: "col-sm-6",
                            },
                            {
                                property: "lastName",
                                control: Text,
                                label: M("lastname"),
                                placeholder: M("lastname"),
                                size: "col-sm-6",
                            },
                            {
                                property: "sex",
                                control: Select,
                                size: "col-sm-4",
                                label: M("sex"),
                                placeholder: M("sex"),
                                props: {
                                    id: "sex",
                                    allowNull: true,
                                    multiple: false,
                                    datasource: datasource.fixed(
                                        [
                                            {label: "M", value: "M"},
                                            {label: "F", value: "F"},
                                        ]
                                    ),
                                }
                            },
                            {
                                property: "socialReason",
                                control: Text,
                                label: M("businessName"),
                                placeholder: M("businessName"),
                                size: "col-sm-12",
                            },
                            {
                                property: "vatCodeDisabled",
                                control: YesNo,
                                label: M("vatCodeDisabled"),
                                size: "col-sm-4",
                                sanitizer: (value) => sanitize(value).toBoolean()
                            },
                            {
                                property: "vatCode",
                                control: Text,
                                label: M("vatCode"),
                                placeholder: M("vatCode"),
                                size: "col-sm-4",
                            },
                            {
                                property: "fiscalCode",
                                control: Text,
                                label: M("fiscalCode"),
                                placeholder: M("fiscalCode"),
                                size: "col-sm-4",
                            },
                            {
                                property: "phoneNumber",
                                control: Text,
                                label: M("phoneNumber"),
                                placeholder: M("phoneNumber"),
                                size: "col-sm-3",
                            },
                        ]
                    },
                    {
                        title: M("placeOfBirth"),
                        subtitle: null,
                        visibility: model => {
                            return model != null && model.get("subjectType") === CustomerType.SUBJECT_TYPE_PHYSICAL_PERSON.value
                        },
                        fields: [
                            // {
                            //     property: "_birthCity",
                            //     label: M("placeOfBirth"),
                            //     size: "col-sm-4",
                            //     control: ValuesLookupContainer,
                            //     formatter: v => {
                            //         return v !== null ? v.description + ", " + (v.province !== null ? v.province.description : "") + ", " + v.cap : ""
                            //     },
                            //     props: {
                            //         id: "birth_city_province",
                            //         mode: "single",
                            //         getCollection: (data) => {
                            //             return "cities"
                            //         },
                            //         selectionGrid: {
                            //             columns: [
                            //                 {property: "description", header: M("name"), cell: TextCell},
                            //                 {property: "cap", header: M("cap"), cell: TextCell},
                            //                 {
                            //                     property: "province",
                            //                     header: M("province"),
                            //                     cell: TextCell,
                            //                     props: {
                            //                         formatter: (value) => {
                            //                             return value ? value.description : ""
                            //                         }
                            //                     }
                            //                 },
                            //             ]
                            //         },
                            //         popupGrid: {
                            //             columns: [
                            //                 {property: "description", header: M("name"), cell: TextCell},
                            //                 {property: "cap", header: M("cap"), cell: TextCell},
                            //                 {
                            //                     property: "province",
                            //                     header: M("province"),
                            //                     cell: TextCell,
                            //                     props: {
                            //                         formatter: (value) => {
                            //                             return value ? value.description : ""
                            //                         }
                            //                     }
                            //                 },
                            //             ]
                            //         }
                            //     }
                            // },
                            {
                                property: "_birthCountry",
                                control: Text,
                                label: M("country"),
                                placeholder: M("country"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_birthRegion",
                                control: Text,
                                label: M("region"),
                                placeholder: M("region"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_birthProvince",
                                control: Text,
                                label: M("province"),
                                placeholder: M("province"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_birthPostalCode",
                                control: Text,
                                label: M("postalCode"),
                                placeholder: M("postalCode"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_birthMunicipality",
                                control: Text,
                                label: M("municipality"),
                                placeholder: M("municipality"),
                                size: "col-sm-4",
                            },
                        ]
                    },
                    {
                        getTitle: model =>{
                            return model.get("subjectType") === CustomerType.SUBJECT_TYPE_PHYSICAL_PERSON.value ? M("residence") : M("registeredOffice")
                        },
                        subtitle: null,
                        fields: [
                            // {
                            //     property: "_city",
                            //     getLabel: model => {
                            //         return model.get("subjectType") === CustomerType.SUBJECT_TYPE_PHYSICAL_PERSON.value ? M("residence") : M("registeredOffice")
                            //     },
                            //     size: "col-sm-4",
                            //     control: ValuesLookupContainer,
                            //     formatter: v => {
                            //         return v !== null ? v.description + ", " + (v.province !== null ? v.province.description : "") + ", " + v.cap : ""
                            //     },
                            //     props: {
                            //         id: "address_city_province",
                            //         mode: "single",
                            //         getCollection: (data) => {
                            //             return "cities"
                            //         },
                            //         selectionGrid: {
                            //             columns: [
                            //                 {property: "description", header: M("name"), cell: TextCell},
                            //                 {property: "cap", header: M("cap"), cell: TextCell},
                            //                 {
                            //                     property: "province",
                            //                     header: M("province"),
                            //                     cell: TextCell,
                            //                     props: {
                            //                         formatter: (value) => {
                            //                             return value ? value.description : ""
                            //                         }
                            //                     }
                            //                 },
                            //             ]
                            //         },
                            //         popupGrid: {
                            //             columns: [
                            //                 {property: "description", header: M("name"), cell: TextCell},
                            //                 {property: "cap", header: M("cap"), cell: TextCell},
                            //                 {
                            //                     property: "province",
                            //                     header: M("province"),
                            //                     cell: TextCell,
                            //                     props: {
                            //                         formatter: (value) => {
                            //                             return value ? value.description : ""
                            //                         }
                            //                     }
                            //                 },
                            //             ]
                            //         }
                            //     }
                            // },
                            {
                                property: "_country",
                                control: Text,
                                label: M("country"),
                                placeholder: M("country"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_region",
                                control: Text,
                                label: M("region"),
                                placeholder: M("region"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_province",
                                control: Text,
                                label: M("province"),
                                placeholder: M("province"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_postalCode",
                                control: Text,
                                label: M("postalCode"),
                                placeholder: M("postalCode"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_municipality",
                                control: Text,
                                label: M("municipality"),
                                placeholder: M("municipality"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_address",
                                control: Text,
                                label: M("address"),
                                placeholder: M("address"),
                                size: "col-sm-4",
                            },
                            {
                                property: "_streetNumber",
                                control: Text,
                                label: M("streetNumber"),
                                placeholder: M("streetNumber"),
                                size: "col-sm-4",
                            },
                        ]
                    },
                ]
            }
        }
    },

    documentType: {
        grid: {
            title: M("documentTypeList"),
            descriptor: {
                columns: [
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: false},
                    {property: "description", header: M("description"), cell: TextCell, sortable: true, searchable: false},
                    {
                        property: "assignationType",
                        header: M("assignationType"),
                        cell: TextCell,
                        sortable: true,
                        searchable: false,
                        props: {
                            formatter: v => {
                                return v != null ? getAssignationTypeDescription(v) : "";
                            }
                        }
                    },
                    {property: "required", header: M("required"), cell: CheckCell, sortable: true, searchable: false},
                    {
                        property: "template",
                        header: M("downloadableTemplate"),
                        cell: CheckCell,
                        sortable: true,
                        searchable: false,
                        props: {
                            formatter: v => {
                                return v != null;
                            }
                        }
                    },
                    {property: "active", header: M("active"), cell: CheckCell, sortable: true, searchable: false}
                ]
            }
        },
        form: {
            title: M("editDocumentType"),
            subtitle: null,
            descriptor: {
                onModelLoadFirstTime: (model) =>{
                    if (model.get("id") == null){
                        model.set("active", true)
                    }
                    // model.on("property:change", (property, value) => {
                    //     if (property === "typology") {
                    //         model.invalidateForm()
                    //     }
                    // })
                },
                // visibility: (field, model, descriptor) => {
                //     switch (field.property) {
                //         case "_template":
                //             return (model != null && model.get("typology") != null && model.get("typology") !== DocumentTypeTypology.NO_MODEL.value);
                //         default:
                //             return true;
                //     }
                // },
                fields: [
                    {
                        property: "code",
                        control: ReadOnlyText,
                        label: M("code"),
                        placeholder: M("code"),
                        size: "col-sm-2"
                    },
                    {
                        property: "description",
                        control: Text,
                        label: M("description"),
                        placeholder: M("description"),
                        size: "col-sm-5"
                    },
                    {
                        property: "information",
                        control: Text,
                        label: M("information"),
                        placeholder: M("information"),
                        size: "col-sm-5"
                    },
                    {
                        property: "assignationType",
                        control: Select,
                        size: "col-sm-4",
                        label: M("assignationType"),
                        props: {
                            id: "customer",
                            allowNull: true,
                            multiple: false,
                            datasource: AssignationTypeDatasource,
                        }
                    },
                    {
                        property: "typology",
                        control: Select,
                        size: "col-sm-4",
                        label: M("typology"),
                        props: {
                            id: "typology",
                            allowNull: true,
                            multiple: false,
                            datasource: DocumentTypeTypologyDatasource,
                        }
                    },
                    {
                        property: "required",
                        control: YesNo,
                        label: M("required"),
                        size: "col-sm-4",
                        sanitizer: (value) => sanitize(value).toBoolean()
                    },
                    {
                        property: "active",
                        control: YesNo,
                        label: M("active"),
                        size: "col-sm-4",
                        sanitizer: (value) => sanitize(value).toBoolean()
                    },
                    {
                        property: "_template",
                        size: "col-sm-12",
                        control: NewMultiFile,
                        label: M("template"),
                        title: "",
                        props: {
                            maxFiles: 1,
                            acceptedFiles: ".docx",
                            mode: MULTI_FILE_MODE_SINGLE
                        }
                    }
                ]
            }
        }
    },

    dossier: {
        grid: {
            canDelete: ()=> {
                return false;
            },
            title: M("dossiersEcoBonus"),
            descriptor: {
                columns: [
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
                ]
            }
        },
        form: {
            title: M("dossierEcoBonus"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                stores:[DossierStore],
                formUpdateFunction: (newState, oldState, model) => {
                    if (newState && newState.completed && !_.isEmpty(newState.documents) && isDifferent(newState.documents, oldState.documents)) {
                        model.set("documents", newState.documents);
                        model.invalidateForm();
                    }
                },
                canSave: (model)=>{
                    return true;
                },
                areas: [
                    {
                        component: AreaNoCard,
                        className: "col-sm-12",
                        fields: [
                            {
                                property: "addDocumentDialog",
                                control: AddDocumentDialog,
                                emptyRow: true
                            },
                            {
                                property: "refuseDocumentDialog",
                                control: RefuseDocumentDialog,
                                emptyRow: true
                            },
                            {
                                property: "c",
                                control: Column,
                                size: "col-md-8",
                                className: "m-b-30",
                                noLateralPadding: false,
                                fields: [
                                    {
                                        property: "c_1",
                                        control: Column,
                                        size: "col-sm-12",
                                        className: "card",
                                        noLateralPadding: false,
                                        fields: [
                                            {
                                                property: "c_1",
                                                control: Column,
                                                size: "col-sm-8",
                                                className: "zero-padding",
                                                noLateralPadding: false,
                                                fields: [
                                                    {
                                                        property:"code",
                                                        control: Spacer,
                                                        label: M("dossierEcoBonus"),
                                                        size: "col-sm-12",
                                                        emptyRow: true,
                                                        className: "m-b-10",
                                                        props: {
                                                            className: "ecobonus-code",
                                                            defaultTheme: false,
                                                            formatter: v => {
                                                                return v != null ? v.get("code") : ""
                                                            }
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                property: "c_1",
                                                control: Column,
                                                size: "col-sm-4",
                                                className: "zero-padding",
                                                noLateralPadding: false,
                                                fields: [
                                                    {
                                                        property: "creationDate",
                                                        control: ReadOnlyText,
                                                        label: M("creationDate"),
                                                        placeholder: M("creationDate"),
                                                        size: "col-sm-12",
                                                        props: {
                                                            formatter: v => {
                                                                return v != null ? moment(v).format("DD/MM/YYYY HH:mm") : moment(new Date()).format("DD/MM/YYYY HH:mm")
                                                            }
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                property: "_customer",
                                                label: M("customer"),
                                                getControl: (model) => {
                                                    return model.get("id") == null || model.get("status") === DossierStatus.STATUS_QUOTATION.value ? ValuesLookupContainer : ReadOnlyText
                                                },
                                                size: "col-sm-8",
                                                props: {
                                                    id: "dossier_customer",
                                                    mode: "single",
                                                    collection: "customers",
                                                    selectionGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "name", header: M("name"), cell: TextCell}
                                                        ]
                                                    },
                                                    popupGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "name", header: M("name"), cell: TextCell}
                                                        ]
                                                    },
                                                    formatter: v => {
                                                        return v != null ? v.name : "";
                                                    }
                                                }
                                            },
                                            {
                                                property: "_fabricator",
                                                label: M("fabricator"),
                                                getControl: (model) => {
                                                    return model.get("id") == null || model.get("status") === DossierStatus.STATUS_QUOTATION.value ? ValuesLookupContainer : ReadOnlyText
                                                },
                                                size: "col-sm-4",
                                                props: {
                                                    id: "dossier_fabricator",
                                                    mode: "single",
                                                    collection: "fabricators",
                                                    selectionGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "businessName", header: M("businessName"), cell: TextCell}
                                                        ]
                                                    },
                                                    popupGrid: {
                                                        columns: [
                                                            {property: "code", header: M("code"), cell: TextCell},
                                                            {property: "businessName", header: M("businessName"), cell: TextCell}
                                                        ]
                                                    },
                                                    formatter: v => {
                                                        return v != null ? v.businessName : "";
                                                    }
                                                }
                                            },
                                            {
                                                property: "_significantValue",
                                                getControl: (model) => {
                                                    return model.get("id") == null || model.get("status") === DossierStatus.STATUS_QUOTATION.value ? Text : ReadOnlyText
                                                },
                                                label: M("significantValue"),
                                                placeholder: M("significantValue"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_nonSignificantValue",
                                                getControl: (model) => {
                                                    return model.get("id") == null || model.get("status") === DossierStatus.STATUS_QUOTATION.value ? Text : ReadOnlyText
                                                },
                                                label: M("nonSignificantValue"),
                                                placeholder: M("nonSignificantValue"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "_serviceValue",
                                                getControl: (model) => {
                                                    return model.get("id") == null || model.get("status") === DossierStatus.STATUS_QUOTATION.value ? Text : ReadOnlyText
                                                },
                                                label: M("serviceValue"),
                                                placeholder: M("serviceValue"),
                                                size: "col-sm-4",
                                            },
                                            {
                                                property: "notes",
                                                control: Text,
                                                label: M("notes"),
                                                placeholder: M("notes"),
                                                size: "col-sm-12",
                                                props: {
                                                    maxLength: 1000,
                                                    height: "91px"
                                                }
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                property: "column",
                                control: Column,
                                size: "col-md-4",
                                className: "m-b-30",
                                noLateralPadding: false,
                                useBoostrapRow: true,
                                fields: [
                                    {
                                        property: "column_1",
                                        control: Column,
                                        size: "col-sm-12",
                                        className: "card-blue p-t-10",
                                        noLateralPadding: false,
                                        useBoostrapRow: true,
                                        fields: [
                                            {
                                                property: "recommendedPrice",
                                                control: ReadOnlyText,
                                                label: M("recommendedRetailPrice"),
                                                placeholder: M("recommendedRetailPrice"),
                                                size: "col-sm-12",
                                                props: {
                                                    formatter: v => {
                                                        return v != null ? v.recommendedRetailPrice : ""
                                                    }
                                                }
                                            },
                                            {
                                                property: "recommendedPrice",
                                                control: ReadOnlyText,
                                                getLabel: model => {
                                                    return model != null && model.get("recommendedPrice") ? format(M("netAmountToBePaid"), model.get("recommendedPrice").discount) : M("priceDiscounted");
                                                },
                                                placeholder: M("priceDiscounted"),
                                                size: "col-sm-12",
                                                props: {
                                                    formatter: v => {
                                                        return v != null ? v.netAmountToBePaid : ""
                                                    }
                                                }
                                            },
                                            {
                                                property: "serviceCost",
                                                control: ReadOnlyText,
                                                label: M("initiativeCost"),
                                                placeholder: M("initiativeCost"),
                                                size: "col-sm-12",
                                                props: {
                                                    formatter: v => {
                                                        return v != null ? v.initiativeCost : ""
                                                    }
                                                }
                                            },
                                            {
                                                property: "serviceCost",
                                                control: ReadOnlyText,
                                                label: M("fabricatorPayOff"),
                                                placeholder: M("fabricatorPayOff"),
                                                size: "col-sm-12",
                                                props: {
                                                    formatter: v => {
                                                        return v != null ? v.fabricatorPayOff : ""
                                                    }
                                                }
                                            },
                                            {
                                                property: "serviceCost",
                                                control: ReadOnlyText,
                                                label: M("fabricatorPayOff"),
                                                placeholder: M("fabricatorPayOff"),
                                                size: "col-sm-12",
                                                props: {
                                                    formatter: v => {
                                                        return v != null ? v.fabricatorPayOff : ""
                                                    }
                                                }
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        component: AreaNoCard,
                        className: "col-sm-12",
                        visibility: model => {
                            return model.get("status") !== DossierStatus.STATUS_QUOTATION.value;
                        },
                        fields: [
                            {
                                property: "documents",
                                control: DocumentContainer,
                                label: null,
                                size: "col-sm-12",
                            }
                        ]
                    },
                ]
            }
        }
    },

    adminUserCategory: getUsersCategories(M("adminUserCategories"), M("editAdminUsersCategory")),
	endUserCategory: getUsersCategories(M("endUserCategories"), M("editEndUsersCategory")),
	fabricatorCategory: getUsersCategories(M("fabricatorCategories"), M("editFabricatorsCategory")),

    // ,revisionSettings: {
    //     form: {
    //         title: M("entityRevisionSettings"),
    //         subtitle: null,
    //         descriptor: {
    //             canGoBack() {
    //                 return false
    //             },
    //             fields: [
    //                 {
    //                     property: "items",
    //                     control: MultiCheckboxByValue,
    //                     size: "col-xs-12",
    //                     props: {
    //                         formatter: v => {
    //                             return M(v.itemType)
    //                         }
    //                     }
    //                 },
    //             ]
    //         }
    //     }
    // },
    // revision: {
    //     grid: {
    //         title: M("revisions"),
    //         descriptor: {
    //             columns: [
    //                 {property: "code", header: M("code"), cell: TextCell, sortable: false, searchable: false},
    //                 {property: "type", header: M("type"), cell: TextCell, sortable: false, searchable: false},
    //                 {
    //                     property: "creator",
    //                     header: M("author"),
    //                     cell: TextCell,
    //                     sortable: false,
    //                     searchable: false
    //                 },
    //
    //                 {
    //                     property: "dateToString",
    //                     header: M("date"),
    //                     cell: TextCell,
    //                     sortable: false,
    //                     searchable: false
    //                 },
    //                 {
    //                     property: "differences",
    //                     header: M("differences"),
    //                     cell: MultiTextCell,
    //                     sortable: false,
    //                     searchable: false,
    //                     props: {
    //                         singleItemFormatter(v) {
    //                             debugger
    //                             let previousValueString = "";
    //                             let newValueString = "";
    //                             previousValueString = M("previousValue") + ": " + (v.previousValueDescription? v.previousValueDescription : " null ") + ", ";
    //                             newValueString = M("newValue") + ": " + (v.newValueDescription? v.newValueDescription : " null ");
    //                             return M(v.name) + " -> " + previousValueString + newValueString
    //                         }
    //                     }
    //                 }
    //
    //             ]
    //         }
    //     },
    // }
}

function getPersonGridColumns(entityForSearch){
	return [
        {
            property: "_category",
            header: M("category"),
            cell: TextCell,
            sortable: true,
            searchable: true,
            searchForm: {
                showInCard: false,
                fields: [
                    {
                        property: "categoryId",
                        label: M("referenceToUserCategory"),
                        control: EntitiesLookupContainer,
                        props: {
                            id: "user_category",
                            mode: "single",
                            entity: entityForSearch,
                            selectionGrid: {
                                columns: [
                                    {property: "code", header: M("code"), cell: TextCell},
                                    {property: "description", header: M("description"), cell: TextCell}
                                ]
                            },
                            popupGrid: {
                                columns: [
                                    {property: "code", header: M("code"), cell: TextCell},
                                    {property: "description", header: M("description"), cell: TextCell}
                                ]
                            }
                        }
                    },
                ]
            },
            props: {
                formatter: v => {
                    return v != null ? v.description : "";
                }
            }
        },
        {
            property: "active",
            header: M("active"),
            cell: CheckCell,
            sortable: true,
            searchable: true,
            searchForm: {
                showInCard: false,
                fields: [
                    {
                        property: "active",
                        label: M("status"),
                        control: Select,
                        filterType: "eq",
                        props: {
                            datasource: datasource.fixed([
                                {label: "Attivo", value: true},
                                {label: "Non attivo", value: false},
                            ]),
                        },
                    }
                ]
            },
        }
    ]
}

function getPersonFormAreas(){
	return [
        {
            property: "column",
            control: Column,
            size: "col-sm-4",
            className: "m-b-30",
            noLateralPadding: false,
            useBoostrapRow: true,
            fields: [
                {
                    property: "column_1",
                    control: Column,
                    size: "col-sm-12",
                    className: "card-blue p-t-10",
                    noLateralPadding: false,
                    useBoostrapRow: true,
                    fields: [
                        {
                            property: "mail",
                            control: Mail,
                            label: M("mail"),
                            placeholder: M("mailAddress"),
                            size: "col-sm-12"
                        },
                        {
                            property: "password",
                            control: PasswordText,
                            label: M("password"),
                            placeholder: M("password"),
                            size: "col-sm-12",
                            sanitizer: value => sanitize(value).trim()
                        },
                        {
                            property: "active",
                            control: YesNo,
                            label: M("active"),
                            size: "col-sm-12",
                            sanitizer: (value) => sanitize(value).toBoolean()
                        },
                        {
                            property: "notes",
                            control: Text,
                            label: M("notes"),
                            placeholder: M("notes"),
                            size: "col-sm-12",
                            props: {
                                maxLength: 1000
                            }
                        },
                    ]
                }
            ]
        }
    ]
}

function getUsersCategories(gridTitle, formTitle) {
	return {
        grid: {
            canDelete: () => {
                return false;
            },
            title: gridTitle,
            descriptor: {
                columns: [
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: false},
                    {property: "description", header: M("description"), cell: TextCell, sortable: true, searchable: false},
                    {property: "active", header: M("active"), cell: CheckCell, sortable: true, searchable: false}
                ]
            }
        },
        form: {
            title: formTitle,
            descriptor: {
                onModelLoadFirstTime: (model) =>{
                    if (model.get("id") == null){
                        model.set("active", true)
                    }
                },
                areas: [
                    {
                        title: M("generalInformations"),
                        subtitle: null,
                        fields: [
                            {
                                property: "code",
                                control: ReadOnlyText,
                                label: M("code"),
                                placeholder: M("code"),
                                size: "col-sm-6"
                            },
                            {
                                property: "active",
                                control: YesNo,
                                label: M("active"),
                                size: "col-sm-6",
                                sanitizer: (value) => sanitize(value).toBoolean()
                            },
                            {
                                property: "description",
                                control: Text,
                                label: M("description"),
                                placeholder: M("description"),
                                size: "col-sm-12",
                                props: {
                                    maxLength: 200
                                }
                            },
                        ]
                    }
                ]
            }
        }
    }
}


export default entities