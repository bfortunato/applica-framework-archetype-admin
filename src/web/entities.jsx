import _ from "underscore";
import {CheckCell, TextCell} from "./components/grids";
import {check, sanitize} from "../libs/validator";
import {Image, Mail, PasswordText, Text, YesNo} from "./components/forms";
import {EntitiesLookupContainer, ValuesLookupContainer} from "./components/containers";
import M from "../strings";
import {getLoggedUser, hasPermission} from "../api/session";
import { optional } from "../utils/lang";
import moment from "moment";
import * as query from "../framework/query";
import ProfileArea from "./components/areas/profileArea";
import FamilyArea from "./components/areas/familyArea";


const entities = {
	user: {
		grid: {
			title: M("usersList"),
			subtitle: M("usersListDescription"),
			descriptor: {
	            columns: [
	                {property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
	                {property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
	                {property: "active", header: M("active"), cell: CheckCell, sortable: true, searchable: true}
	            ]
	        }
		},
		form: {
			title: M("editUser"),
			subtitle: M("editUserDescription"),
			getActions(data) {
				let actions = ["back", "save", "save-go-back", "revisions"];
				if (hasPermission("canResetPassword")) {
					if (data && data.id) {
						actions.push({
							type: "button",
							icon: "zmdi zmdi-brush",
							tooltip: "Reset password",
							action: () => {
								swal({
									title: M("confirm"),
									text: "Verrà impostata una nuova password ed inviata all'indirizzo mail dell'utente",
									showCancelButton: true
								})
								.then((res) => {
									if (res.value) {
										resetUserPassword({id: data.id})
										if (data.id === getLoggedUser().id) {
											swal({
												title: M("confirm"),
												text: "La tua password è stata resettata. Dovrai eseguire un nuovo accesso",
												showCancelButton: false
											})
											.then((res) => {
												if (res.value) {
													logout();
													ui.navigate("/login")
												}
											})
										}
									}
								})
								.catch((e) => {
									logger.i(e)
								})

							}
						})
					}
				}
				return actions
			},
			descriptor: {
	            areas: [
	                {
	                    title: M("generalInformations"),
	                    subtitle: null,
	                    fields: [
	                        {
	                            property: "name",
	                            control: Text,
	                            label: M("name"),
	                            placeholder: M("name"),
	                            sanitizer: (value) => sanitize(value).trim(),
	                            validator: (value) => check(value).notEmpty()
	                        },
	                        {
	                            property: "mail",
	                            control: Mail,
	                            label: M("mail"),
	                            placeholder: M("mailAddress"),
	                            sanitizer: (value) => sanitize(value).trim(),
	                            validator: (value) => check(value).isEmail()
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
								property: "_image",
								control: Image,
								label: M("image")
							},
	                        {
	                            property: "roles",
	                            label: M("roles"),
	                            control: EntitiesLookupContainer,
	                            props: {
	                            	id: "user_roles",
	                            	mode: "multiple",
	                            	entity: "role",
		                            selectionGrid: {
		                                columns: [
		                                    {property: "role", header: M("name"), cell: TextCell}
		                                ]
		                            },
		                            popupGrid: {
		                                columns: [
		                                    {property: "role", header: M("name"), cell: TextCell}
		                                ]
		                            }
	                            }	                            
	                        }
	                    ]
	                }
	            ]
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
	
	profile: {
		grid: {
			title: M("profiles"),
			subtitle: M("profilesListDescription"),
			quickSearchEnabled: true,
			descriptor: {
				columns: [
					{property: "firstName", header: M("firstName"), cell: TextCell, sortable: true, searchable: true},
					{property: "lastName", header: M("lastName"), cell: TextCell, sortable: true, searchable: true},
					{property: "fiscalCode", header: M("fiscalCode"), cell: TextCell, sortable: true, searchable: true},
					{property: "address.municipality", header: M("city"), cell: TextCell, sortable: true, searchable: true},
					{property: "familyMember", header: M("familyMember"), cell: CheckCell, sortable: true, searchable: true},
	            ]
			}
		},
		form: {
			title: M("editProfile"),
			subtitle: M("editProfileDescription"),
			descriptor: {
				areas: [
					{
						component: ProfileArea
					},
					{
						title: M("generalInformations"),
						fields: [
							{
								property: "firstName",
								control: Text,
								label: M("firstName"),
								placeholder: M("firstName"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "lastName",
								control: Text,
								label: M("lastName"),
								placeholder: M("lastName"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "phoneNumber",
								control: Text,
								label: M("phoneNumber"),
								placeholder: M("phoneNumber"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "fiscalCode",
								control: Text,
								label: M("fiscalCode"),
								placeholder: M("fiscalCode"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "user",
								label: M("user"),
								placeholder: M("selectUser"),
								size: "col-sm-6",
								control: EntitiesLookupContainer,
									props: {
										id: "profile_user",
										mode: "single",
										entity: "user",
										initialQuery: query.create().eq("active", true),
										selectionGrid: {
											filtersVisible: false,
											columns: [
												{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
												{property: "email", header: M("email"), cell: TextCell, sortable: true, searchable: true},
											]
										},
										popupGrid: {
											columns: [
												{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
												{property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
											]
										}
									}	               
		
							},
							{
								property: "parentUser",
								label: M("parent"),
								size: "col-sm-6",
								placeholder: M("selectParent"),
								control: EntitiesLookupContainer,
								props: {
									id: "profile_parent_user",
									mode: "single",
									entity: "user",
									initialQuery: query.create().eq("active", true),
									selectionGrid: {
										filtersVisible: false,
										columns: [
											{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
											{property: "email", header: M("email"), cell: TextCell, sortable: true, searchable: true},
										]
									},
									popupGrid: {
										columns: [
											{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
											{property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
										]
									}
								}
							},
							{
								property: "familyMember",
								control: YesNo,
								label: M("familyMember"),
								placeholder: M("familyMember"),
							},
						]
					},
					{
						title: M("Address"),
						fields: [
							{
								property: "address.region",
								control: Text,
								label: M("region"),
								placeholder: M("region"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "address.province",
								control: Text,
								label: M("province"),
								placeholder: M("province"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "address.municipality",
								control: Text,
								label: M("municipality"),
								placeholder: M("municipality"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "address.address",
								control: Text,
								label: M("address"),
								placeholder: M("address"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
						]
					},
					{
						title: M("family"),
						component: FamilyArea,
					},

				]
			}
		}
	},

	test: {
		grid: {
			title: M("tests"),
			subtitle: M("testsListDescription"),
			quickSearchEnabled: true,
			descriptor: {
				columns: [
					{property: "date", header: M("date"), cell: TextCell, sortable: true, searchable: true, props: {formatter: v => moment(v).format("YYYY/MM/DD HH:mm")}},
					{property: "profile.firstName", header: M("firstName"), cell: TextCell, sortable: true, searchable: true },
					{property: "profile.lastName", header: M("lastName"), cell: TextCell, sortable: true, searchable: true },
					{property: "profile.fiscalCode", header: M("fiscalCode"), cell: TextCell, sortable: true, searchable: true },
					{property: "profile.address.municipality", header: M("city"), cell: TextCell, sortable: true, searchable: true },
					{property: "type", header: M("testType"), cell: TextCell, sortable: true, searchable: true },
					{property: "result", header: M("result"), cell: TextCell, sortable: true, searchable: true },
	            ]
			}
		},
		form: {
			title: M("editProfile"),
			subtitle: M("editProfileDescription"),
			descriptor: {
				areas: [
					{
						component: ProfileArea
					},
					{
						title: M("generalInformations"),
						fields: [
							{
								property: "firstName",
								control: Text,
								label: M("firstName"),
								placeholder: M("firstName"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "lastName",
								control: Text,
								label: M("lastName"),
								placeholder: M("lastName"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "phoneNumber",
								control: Text,
								label: M("phoneNumber"),
								placeholder: M("phoneNumber"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "fiscalCode",
								control: Text,
								label: M("fiscalCode"),
								placeholder: M("fiscalCode"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "user",
								label: M("user"),
								placeholder: M("selectUser"),
								size: "col-sm-6",
								control: EntitiesLookupContainer,
									props: {
										id: "profile_user",
										mode: "single",
										entity: "user",
										initialQuery: query.create().eq("active", true),
										selectionGrid: {
											filtersVisible: false,
											columns: [
												{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
												{property: "email", header: M("email"), cell: TextCell, sortable: true, searchable: true},
											]
										},
										popupGrid: {
											columns: [
												{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
												{property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
											]
										}
									}	               
		
							},
							{
								property: "parentUser",
								label: M("parent"),
								size: "col-sm-6",
								placeholder: M("selectParent"),
								control: EntitiesLookupContainer,
								props: {
									id: "profile_parent_user",
									mode: "single",
									entity: "user",
									initialQuery: query.create().eq("active", true),
									selectionGrid: {
										filtersVisible: false,
										columns: [
											{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
											{property: "email", header: M("email"), cell: TextCell, sortable: true, searchable: true},
										]
									},
									popupGrid: {
										columns: [
											{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
											{property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
										]
									}
								}
							},
							{
								property: "familyMember",
								control: YesNo,
								label: M("familyMember"),
								placeholder: M("familyMember"),
							},
						]
					},
					{
						title: M("Address"),
						fields: [
							{
								property: "address.region",
								control: Text,
								label: M("region"),
								placeholder: M("region"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "address.province",
								control: Text,
								label: M("province"),
								placeholder: M("province"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "address.municipality",
								control: Text,
								label: M("municipality"),
								placeholder: M("municipality"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
							{
								property: "address.address",
								control: Text,
								label: M("address"),
								placeholder: M("address"),
								sanitizer: value => sanitize(value).trim(),
								validator: value => check(value).notEmpty(),
								size: "col-sm-6",
							},
						]
					},
					{
						title: M("family"),
						component: FamilyArea,
					},

				]
			}
		}
	}
}

export default entities