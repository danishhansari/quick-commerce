import { atom } from "recoil";

export const productStore = atom({
  key: "product",
  default: {
    name: "Name",
  },
});
