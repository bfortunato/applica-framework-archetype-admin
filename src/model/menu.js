import M from "../strings"

export default [    
    {
        icon: "zmdi zmdi-home",
        text: "Home",
        href: "/#/",
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
                // permissions: ["user:list"]
            },
            {
                icon: "zmdi zmdi-key",
                text: M("roles"),
                href: "/#/entities/role?grid=roles",
                // permissions: ["role:list"]
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
        id: "customers",
        icon: "zmdi zmdi-accounts-list-alt",
        text: M("customers"),
        href: "/#/entities/customer?grid=customers",
        // permissions: ["customer:list"],
    },
    {
        icon: "zmdi zmdi-settings",
        text: M("settings"),
        roles: ["admin"],
        href: "/#/"
    },
]