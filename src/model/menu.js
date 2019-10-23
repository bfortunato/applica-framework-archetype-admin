import M from "../strings"

export default [
    {
        icon: "zmdi zmdi-accounts-alt",
        text: M("dossierEcoBonus"),
        href: "/#/entities/dossier?grid=dossiers",
        permissions: ["dossier:list"]
    },
    {
        icon: "zmdi zmdi-accounts-alt",
        text: M("customers"),
        href: "/#/entities/customer?grid=customers",
        permissions: ["customer:list"]
    },
    {
        icon: "zmdi zmdi-account",
        text: M("users"),
        roles: ["admin"],
        permissions: ["user:list"],
        children: [
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("admins"),
                href: "/#/entities/adminUser?grid=adminUsers",
                permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("endUser"),
                href: "/#/entities/endUser?grid=finalUsers",
                permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("fabricators"),
                href: "/#/entities/fabricator?grid=fabricators",
                permissions: ["user:list"]
            }
        ]
    },
    {
        icon: "zmdi zmdi-wrench",
        text: M("settings"),
        roles: ["admin"],
        children: [
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("adminUserCategories"),
                href: "/#/entities/adminUserCategory?grid=users",
                permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("endUserCategories"),
                href: "/#/entities/endUserCategory?grid=endUsers",
                permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("fabricatorCategories"),
                href: "/#/entities/fabricatorCategory?grid=fabricators",
                permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("documentType"),
                href: "/#/entities/documentType?grid=documentTypes",
                permissions: ["documentType:list"]
            },
        ]
    },
]