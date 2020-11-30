import {CheckCell, DateCell, MultiTextCell, TextCell} from "./components/grids";
import {Autocomplete, DateTime, Image, Mail, PasswordText, ReadOnlyText, Select, Text, YesNo} from "./components/forms";
import {EntitiesLookupContainer, ValuesLookupContainer, ValuesSelectContainer} from "./components/containers";
import M, {M_Multiple} from "../strings";
import {getLoggedUser, hasPermission} from "../api/session";
import {resetUserPassword} from "../actions/account";
import * as ui from "./utils/ui";
import {logout} from "../actions/session";
import {activeSearchForm} from "./screens/entities/commonFields";
import { SEARCH_FORM_DATE_DESCRIPTOR } from "../model/searchForms";
import * as datasource from "../utils/datasource";

const entities = {
	user: {
		grid: {
			quickSearchEnabled: true,
			title: M("usersList"),
			subtitle: M("usersListDescription"),
			descriptor: {
				columns: [
					{property: "code", header: M("code"), cell: TextCell, sortable: true, searchable: true},
					{property: "name", header: M("name"), cell: TextCell, sortable: true, searchable: true},
					{property: "lastname", header: M("lastname"), cell: TextCell, sortable: true, searchable: true},
					{
						property: "registrationDate", 
						header: M("registrationDate"), 
						cell: DateCell, 
						sortable: true, 
                        searchable: true, 
                        searchForm: SEARCH_FORM_DATE_DESCRIPTOR("registrationDate"),
                    },
					{property: "mail", header: M("mail"), cell: TextCell, sortable: true, searchable: true},
					{property: "roleDescription", header: M("role"), cell: TextCell, sortable: true, searchable: true},
					{
						property: "active",
						header: M("active"),
						cell: CheckCell,
						sortable: true,
						searchable: true,
						searchForm: activeSearchForm
					}
				]
			}
		},
		form: {
			getTitle(data, params) {
				return !data || !data.id ? M(["create", "user"]) : M(["edit", "user"]) + " <b>" + " <b>" + data.fullDescription + "</b>" + "</b>"
			},
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
				onModelLoadFirstTime: model => {
					model.on("property:change", (property, value) => {
						if (property === "active"  || property === "roles")  {
							model.invalidateForm()
						}

					})

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
								size: "col-sm-4"
							},
							{
								property: "name",
								control: Text,
								label: M("name"),
								placeholder: M("name"),
								size: "col-sm-4"
							},
							{
								property: "lastname",
								control: Text,
								label: M("lastname"),
								placeholder: M("lastname"),
								size: "col-sm-4"
							},
							{
								property: "_image",
								control: Image,
								label: M("image")
							}
						]
					},
					{
						title: "Account",
						fields: [
							{
								property: "mail",
								control: Mail,
								label: M("mail"),
								placeholder: M("mailAddress"),
								size: "col-sm-6"
							},
							{
								property: "active",
								control: YesNo,
								label: M("active"),
								size: "col-sm-6"
							},
							{
								property: "roles",
								label: M("role"),
								size: "col-sm-6",
								control: EntitiesLookupContainer,
								formatter: v => {
									return v.role
								},
								props: {
									id: "user_roles",
									mode: "multiple",
									entity: "role",
									selectionGrid: {
										columns: [
											{property: "localizedRole", header: M("name"), cell: TextCell}
										]
									},
									popupGrid: {
										columns: [
											{property: "localizedRole", header: M("name"), cell: TextCell}
										]
									}
								}
							},
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
	                {property: "role", header: M("role"), cell: TextCell, sortable: true, searchable: true}
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
                        placeholder: M("nameOfRole")
                    },
                    {
                    	property: "_permissions",
                    	label: M("permissions"),
                    	placeholder: M("selectPermissions"),
                    	control: ValuesLookupContainer,
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


    revision: {
        grid: {
            title: M("revisions"),
            descriptor: {
                columns: [
                    {property: "code", header: M("code"), cell: TextCell, sortable: false, searchable: false},
                    {property: "type", header: M("type"), cell: TextCell, sortable: false, searchable: false},
                    {
                        property: "creator",
                        header: M("author"),
                        cell: TextCell,
                        sortable: false,
                        searchable: false
                    },

                    {
                        property: "dateToString",
                        header: M("date"),
                        cell: TextCell,
                        sortable: false,
                        searchable: false
                    },
                    {
                        property: "differences",
                        header: M("differences"),
                        cell: MultiTextCell,
                        sortable: false,
                        searchable: false,
                        props: {
                            singleItemFormatter(v) {
                                let previousValueString = "";
                                let newValueString = "";
                                previousValueString = M("previousValue") + ": " + (v.previousValueDescription? v.previousValueDescription : " null ") + ", ";
                                newValueString = M("newValue") + ": " + (v.newValueDescription? v.newValueDescription : " null ");
                                return M(v.name) + " -> " + previousValueString + newValueString
                            }
                        }
                    }

                ]
            }
        },
	}

}

export default entities