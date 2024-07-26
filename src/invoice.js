import initialRender from "./initialRender.js";
import listener from "./listener.js";

class Invoice { 
    init(){
        console.log("Invoice Start");
        listener();
        initialRender();
    }
}
export default Invoice;