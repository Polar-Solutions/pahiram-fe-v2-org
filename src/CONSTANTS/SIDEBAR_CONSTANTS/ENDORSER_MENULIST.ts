import { Users } from "lucide-react";
import { BORROW_MENULIST } from "@/CONSTANTS/SIDEBAR_CONSTANTS/BORROW_MENULIST";

export const ENDORSER_MENULIST = BORROW_MENULIST.map(group => ({
    groupLabel: group.groupLabel,
    menus: [
        ...group.menus,
        ...(group.groupLabel === "Management"
                ? [{
                    href: "/borrow/manage-endorsements",
                    label: "Endorsements",
                    icon: Users,
                    submenus: [],
                }]
                : []
        )
    ]
}));
