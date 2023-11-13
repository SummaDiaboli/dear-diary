import { atom } from "recoil"

export const isEditableState = atom<boolean>({
    key: "isEditableState",
    default: false,
})
