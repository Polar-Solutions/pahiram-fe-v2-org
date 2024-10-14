import {LucideIcon, Users} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export const BORROW_MENULIST = [
    {
        groupLabel: "",
        menus: [
            {
                href: "/borrow/borrow-items",
                label: "Borrow Items",
                icon: Users,
                submenus: [],
            },
        ],
    },
    {
        groupLabel: "Management",
        menus: [
            {
                href: "/borrow/manage-requests",
                label: "Requests",
                icon: Users,
                submenus: [],
            },
            {
                href: "/borrow/manage-penalties",
                label: "Penalties",
                icon: Users,
                submenus: [],
            },

        ],
    }
]

