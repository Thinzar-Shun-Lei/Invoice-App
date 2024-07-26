import { inputProductName, inputProductPrice, productCardTemplate, productGroup, sideBar } from "./selectors.js";

export const manageInventoryHandler = () => {
    sideBar.classList.remove("translate-x-full");
    sideBar.classList.add("duration-300");
}

export const closeInventoryHandler = () => {
    sideBar.classList.add("translate-x-full");
}

