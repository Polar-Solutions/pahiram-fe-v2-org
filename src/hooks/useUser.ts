import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import GenerateAvatarName from "@/helper/login/generateAvatarName";
import { OfficeAcronym, RoleForOffice } from "@/CONSTANTS/OFFICES_CONSTANTS";

/**
 * UserState is the state of the user
 *
 * This is the type of the user state which is used by the userStore
 *
 * @typedef {Object} UserState
 */
export type UserState = {
  userData: {
    avatarName: string;
    apc_id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    office: OfficeAcronym;
    role: RoleForOffice<OfficeAcronym>;
    is_admin: boolean;
  };
  setUserData: (response: any) => void;
  handleSignout: () => void;
};

/**
 * The useUserStore hook is used to manage the user state.
 *
 * It uses the zustand library to create a store that persists the state of
 * the user across page reloads.
 *
 * The hook returns an object with three properties:
 * - userData: the user data object
 * - setUserData: a function to set the user data object
 * - handleSignout: a function to handle the user signout
 *
 * @return {UserState} The user state object
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: {
        avatarName: "",
        apc_id: "",
        first_name: "",
        last_name: "",
        full_name: "",
        email: "",
        office: "N/A" as OfficeAcronym,
        role: "" as RoleForOffice<OfficeAcronym>,
        is_admin: false,
      },
      setUserData: (data: any) => {
        set({
          userData: {
            avatarName: GenerateAvatarName(data?.first_name, data?.last_name),
            apc_id: data?.apc_id,
            first_name: data?.first_name,
            last_name: data?.last_name,
            full_name: [data?.first_name, data?.user?.last_name]
              .filter(Boolean)
              .join(" "),
            email: data?.email,
            office: data?.department as OfficeAcronym,
            role: data?.role as RoleForOffice<OfficeAcronym>,
            is_admin: data?.is_admin,
          },
        });
      },
      handleSignout: () => {
        set({
          userData: {
            avatarName: "",
            apc_id: "",
            first_name: "",
            last_name: "",
            full_name: "",
            email: "",
            office: "N/A" as OfficeAcronym,
            role: "" as RoleForOffice<OfficeAcronym>,
            is_admin: false,
          },
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
