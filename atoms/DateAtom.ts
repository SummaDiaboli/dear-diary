import { atom } from "recoil"

export const currentDate = atom({
    key: "currentDate",
    default: new Date(),
})
