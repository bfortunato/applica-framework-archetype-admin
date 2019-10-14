import _ from "underscore";
import {CheckCell, TextCell} from "./components/grids";
import {check, sanitize} from "../libs/validator";
import {DateTime, Image, Mail, PasswordText, ReadOnlyText, Text, TextArea, YesNo} from "./components/forms";
import {EntitiesLookupContainer, ValuesLookupContainer} from "./components/containers";
import M from "../strings";


const entities = {
	user: {
		grid: {
			title: M("usersList"),
			subtitle: M("usersListDescription"),
			descriptor: {
	            columns: _.union([
	                {property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
	                {property: "lastname", header: M("lastname"), cell: TextCell, sortable: true, searchable: true},
	            ], getPersonGridColumns())
	        }
		},
		form: {
			title: M("editUser"),
			subtitle: M("editUserDescription"),
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
	                            placeholder: M("name")
	                        },
                            {
                                property: "lastname",
                                control: Text,
                                label: M("lastname"),
                                placeholder: M("lastname"),
                            },
                            {
                                property: "phoneNumber",
                                control: Text,
                                label: M("phoneNumber"),
                                placeholder: M("phoneNumber"),
                            },
                            {
                                property: "_category",
                                label: M("referenceToUserCategory"),
                                control: EntitiesLookupContainer,
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

    endUser: {
        grid: {
            title: M("endUsersList"),
            descriptor: {
                columns: _.union([
                    {property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
                    {property: "lastname", header: M("lastname"), cell: TextCell, sortable: true, searchable: true}
                ], getPersonGridColumns())
            }
        },
        form: {
            title: M("editEndUser"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                areas: _.union([
                    {
                        title: M("generalInformations"),
                        subtitle: null,
                        fields: [
                            {
                                property: "avatar",
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
                                control: EntitiesLookupContainer,
                                props: {
                                    id: "user_category",
                                    mode: "single",
                                    entity: "endUserCategory",
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
                ], getPersonFormAreas())
            }
        }
    },

    fabricator: {
        grid: {
            title: M("fabricatorList"),
            descriptor: {
                columns: _.union([
                    {property: "businessName", header: M("businessName"), cell: TextCell, sortable: true, searchable: true},
                ], getPersonGridColumns())
            }
        },
        form: {
            title: M("editFabricator"),
            getActions(data) {
                return ["back", "save", "save-go-back", "revisions"];
            },
            descriptor: {
                areas: _.union([
                    {
                        title: M("generalInformations"),
                        subtitle: null,
                        fields: [
                            {
                                property: "businessName",
                                control: Text,
                                label: M("businessName"),
                                placeholder: M("businessName"),
                            },
                            {
                                property: "province",
                                control: Text,
                                label: M("province"),
                                placeholder: M("province"),
                            },
                            {
                                property: "city",
                                control: Text,
                                label: M("city"),
                                placeholder: M("city"),
                            },
                            {
                                property: "address",
                                control: Text,
                                label: M("address"),
                                placeholder: M("address"),
                            },
                            {
                                property: "phoneNumber",
                                control: Text,
                                label: M("phoneNumber"),
                                placeholder: M("phoneNumber"),
                            },
                            {
                                property: "referent",
                                control: Text,
                                label: M("referent"),
                                placeholder: M("referent"),
                            },
                            {
                                property: "_category",
                                label: M("referenceToUserCategory"),
                                control: EntitiesLookupContainer,
                                props: {
                                    id: "user_category",
                                    mode: "single",
                                    entity: "fabricatorCategory",
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
                ], getPersonFormAreas())
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

function getPersonGridColumns(){
	return [
        {property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
        {property: "active", header: M("active"), cell: CheckCell, sortable: true, searchable: true}
    ]
}

function getPersonFormAreas(){
	return [
        {
            title: M("accountInformations"),
            subtitle: null,
            fields: [
                {
                    property: "mail",
                    control: Mail,
                    label: M("mail"),
                    placeholder: M("mailAddress"),
                },
                {
                    property: "password",
                    control: PasswordText,
                    label: M("password"),
                    placeholder: M("password"),
                    sanitizer: value => sanitize(value).trim()
                },
                {
                    property: "active",
                    control: YesNo,
                    label: M("active"),
                    sanitizer: (value) => sanitize(value).toBoolean()
                },
                {
                    property: "notes",
                    control: TextArea,
                    label: M("notes"),
                    placeholder: M("notes"),
                },
            ]
        }
    ]
}

function getUsersCategories(gridTitle, formTitle) {
	return {
        grid: {
            title: gridTitle,
            descriptor: {
                columns: [
                    {property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
                    {property: "description", header: M("description"), cell: TextCell, sortable: true, searchable: true},
                    {property: "active", header: M("active"), cell: CheckCell, sortable: true, searchable: true}
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
                            },
                            {
                                property: "description",
                                control: Text,
                                label: M("description"),
                                placeholder: M("description"),
                            },
                            {
                                property: "active",
                                control: YesNo,
                                label: M("active"),
                                sanitizer: (value) => sanitize(value).toBoolean()
                            },
                        ]
                    }
                ]
            }
        }
    }
}


export default entities