import { checkoutHandler, createFormDataHandler, recordRowBtnHandler } from "./createRecord.js";
import { closeInventoryHandler, manageInventoryHandler } from "./handlers.js";
import { btnAddNewProductHandler } from "./inventory.js";
import observer from "./observer.js";
import { addFormRecord, btnAddNewProduct, btnCheckout, btnCloseInventory, btnManageInventory, recordRowsGroup } from "./selectors.js";

const listener = () => {
    console.log("This is listener");
    observer();
    btnManageInventory.addEventListener("click", manageInventoryHandler);
    btnCloseInventory.addEventListener("click", closeInventoryHandler);
    btnAddNewProduct.addEventListener("click", btnAddNewProductHandler);
    addFormRecord.addEventListener("submit", createFormDataHandler); //need to add form to use "Submit" event
    recordRowsGroup.addEventListener("click", recordRowBtnHandler);
    btnCheckout.addEventListener("click", checkoutHandler);
}   
export default listener;