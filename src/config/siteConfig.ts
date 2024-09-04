import {ADMIN_MENULIST as ADMIN} from "@/CONSTANTS/SIDEBAR_CONSTANTS/ADMIN_MENULIST";
import {BORROW_MENULIST as BORROWER} from "@/CONSTANTS/SIDEBAR_CONSTANTS/BORROW_MENULIST";

import {EMPLOYEE_MENULIST as FAO_EMPLOYEE} from "@/CONSTANTS/SIDEBAR_CONSTANTS/FAO/EMPLOYEE_MENULIST";
import {SUPERVISOR_MENULIST as FAO_SUPERVISOR} from "@/CONSTANTS/SIDEBAR_CONSTANTS/FAO/SUPERVISOR_MENULIST";
import {COSUPERVISOR_MENULIST as FAO_COSUPERVISOR} from "@/CONSTANTS/SIDEBAR_CONSTANTS/FAO/COSUPERVISOR_MENULIST";

// TODO: Fix the aliases
import {EMPLOYEE_MENULIST} from "@/CONSTANTS/SIDEBAR_CONSTANTS/PLO/EMPLOYEE_MENULIST";
import {SUPERVISOR_MENULIST} from "@/CONSTANTS/SIDEBAR_CONSTANTS/PLO/SUPERVISOR_MENULIST";
import {COSUPERVISOR_MENULIST} from "@/CONSTANTS/SIDEBAR_CONSTANTS/PLO/COSUPERVISOR_MENULIST";

import {
    EMPLOYEE_MENULIST as LENDING_OFFICE_EMPLOYEE
} from "@/CONSTANTS/SIDEBAR_CONSTANTS/LENDING_OFFICES/EMPLOYEE_MENULIST";
import {
    SUPERVISOR_MENULIST as LENDING_OFFICE_SUPERVISOR
} from "@/CONSTANTS/SIDEBAR_CONSTANTS/LENDING_OFFICES/SUPERVISOR_MENULIST";
import {
    COSUPERVISOR_MENULIST as LENDING_OFFICE_COSUPERVISOR
} from "@/CONSTANTS/SIDEBAR_CONSTANTS/LENDING_OFFICES/COSUPERVISOR_MENULIST";
import {ENDORSER_MENULIST as ENDORSER} from "@/CONSTANTS/SIDEBAR_CONSTANTS/ENDORSER_MENULIST";


export const siteConfig = {
    label: "Pahiram",
    description: "Pahiram is a platform that connects people who need to borrow with people who have items to lend.",
    siteUrl: "https://pahiram.ph",
    image: "/images/logo.png",
    twitter: "@pahiramph",
    facebook: "pahiramph",
    instagram: "pahiramph",
    email: "pahiram@email.com",
    phone: "09123456789",
    address: "123 Street, City, Philippines",
    navItems: [
        {
            BORROW: BORROWER,
        },
        {
            ENDORSER: ENDORSER,
        },
        {
            ADMIN: ADMIN,
        },
        {
            FAO: [
                {
                    PENALTY_MANAGER: FAO_EMPLOYEE,
                },
                {
                    SUPERVISOR: FAO_SUPERVISOR,
                },
                {
                    COSUPERVISOR: FAO_COSUPERVISOR,
                },
            ],
        },
        {
            PLO: [
                {
                    INVENTORY_MANAGER: EMPLOYEE_MENULIST,
                },
                {
                    SUPERVISOR: SUPERVISOR_MENULIST,
                },
                {
                    COSUPERVISOR: COSUPERVISOR_MENULIST,
                },
            ]
        },
        {
            LENDING_OFFICES: [
                {
                    LENDING_EMPLOYEE: LENDING_OFFICE_EMPLOYEE,
                },
                {
                    SUPERVISOR: LENDING_OFFICE_SUPERVISOR,
                },
                {
                    COSUPERVISOR: LENDING_OFFICE_COSUPERVISOR,
                },
            ]
        }

    ]
}