import M from "../strings"

export default [
    {
        icon: "zmdi zmdi-male-female",
        text: M("profiles"),
        roles: ["admin"],
        href: "/#/entities/profile"
    },
    {
        icon: "zmdi zmdi-hospital",
        text: M("tests"),
        roles: ["admin"],
        href: "/#/tests"
    },
    {
        icon: "zmdi zmdi-shield-security",
        text: M("security"),
        roles: ["admin"],
        children: [
            {
                icon: "zmdi zmdi-accounts-alt",
                text: M("users"),
                href: "/#/entities/user?grid=users",
                permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-key",
                text: M("roles"),
                href: "/#/entities/role?grid=roles",
                permissions: ["role:list"]
            }
            // ,{
            //     icon: "zmdi zmdi-accounts-alt",
            //     text: M("entityRevisionSettings"),
            //     href: "/#/entities/single/revisionSettings",
            //     permissions: ["entityRevisionSettings:edit"]
            // }
        ]
    },
    {
        icon: "zmdi zmdi-settings",
        text: M("settings"),
        roles: ["admin"],
        href: "/#/"
    },
]