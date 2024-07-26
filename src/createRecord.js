import Swal from "sweetalert2";
import { addFormRecord, recordNetTotal, recordRowsGroup, recordRowTemplate, recordRowTotal, recordTax, recordTotal } from "./selectors";
import arrProducts from "./state";
import { v4 as uuidv4 } from 'uuid';


export const createFormDataHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(addFormRecord);

    // console.log(formData.get("form-select"));
    // console.log(formData.get("form-qtyinput"));

    // console.log(arrProducts)

    console.log(
        arrProducts.find((product) => 
            product.id == formData.get("form-select")
        )
    )

    const currentProduct = arrProducts.find((product) => 
        product.id == formData.get("form-select")
    );


    const isExisted = document.querySelector(`[product-id='${currentProduct.id}']`);
    if (isExisted === null) {
        recordRowsGroup.append(createRowRecord(currentProduct,formData.get("form-qtyinput"))); 
    } else {
        Swal.fire({
            title: "Are you sure to add this product again?",
            icon: "information",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
              funUpdateQty(isExisted.getAttribute("row-id"),parseInt(formData.get("form-qtyinput")));
              const currentRecordRow = document.querySelector(`[row-id='${rowID}']`);
              // console.log(currentRecordRow)
              currentRecordRow.remove();
          });
    }

// //will add to observer function since this is reusable codes
//     const rowCostTotal = calRecordTotal();
//     const Tax = calTax(rowCostTotal);
//     console.log(rowCostTotal);
//     recordTotal.innerText = rowCostTotal;
//     recordTax.innerText = Tax;
//     recordNetTotal.innerText = Tax+rowCostTotal;

    addFormRecord.reset(); 
}

const createRowRecord = ({id,name,price},qty) => {
    const rowRecord = recordRowTemplate.content.cloneNode(true);
    const recordRowName = rowRecord.querySelector(".record-row-name");
    const recordRowPrice = rowRecord.querySelector(".record-row-price");
    const recordRowTotal = rowRecord.querySelector(".record-row-total");
    const recordRowQty = rowRecord.querySelector(".record-row-qty");
    const currentRecordRow = rowRecord.querySelector("#recordRow");

    currentRecordRow.setAttribute("product-id",id); //set the row with an id
    currentRecordRow.setAttribute("row-id",uuidv4()); //to remove the product

    recordRowName.innerText = name;
    recordRowPrice.innerText = price;
    recordRowQty.innerText = qty;
    recordRowTotal.innerText = price*qty;

    return rowRecord;
}

const calRecordTotal = () => {
    let total = 0;
    recordRowsGroup.querySelectorAll('.record-cost').forEach((el) => (total += parseFloat(el.innerText)));
 
    return total;
}
const calTax = (amount, percentage = 5) => {
    const tax = (amount/100)*percentage;
    return tax;
}

export const removeRecord = (rowID) => {
    Swal.fire({
      title: "Are you sure to remove the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        const currentRecordRow = document.querySelector(`[row-id='${rowID}']`);
        // console.log(currentRecordRow)
        currentRecordRow.remove();
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been removed.",
          icon: "success"
        });
      }
    });
};

//Qty add and Subtract
export const funUpdateQty = (rowID,newQty) => {
    const currentRecordRow = document.querySelector(`[row-id='${rowID}']`);
    const recordRowPrice = currentRecordRow.querySelector(".record-row-price");
    const recordRowTotal = currentRecordRow.querySelector(".record-row-total");
    const recordRowQty = currentRecordRow.querySelector(".record-row-qty");

    if( newQty > 0 || recordRowQty.innerText > 1) {
        recordRowQty.innerText = parseInt(recordRowQty.innerText) + newQty;
        recordRowTotal.innerText = recordRowQty.innerText * recordRowPrice.innerText;
    }
}
// export const quantityAdd = (rowID) => {
//     const currentRecordRow = document.querySelector(`[row-id='${rowID}']`);
//     const recordRowPrice = currentRecordRow.querySelector(".record-row-price");
//     const recordRowTotal = currentRecordRow.querySelector(".record-row-total");
//     const recordRowQty = currentRecordRow.querySelector(".record-row-qty");

//     recordRowQty.innerText = parseInt(recordRowQty.innerText) + 1;
//     recordRowTotal.innerText = recordRowQty.innerText * recordRowPrice;
// }
// export const quantityMinus = (rowID) => {
//     const currentRecordRow = document.querySelector(`[row-id='${rowID}']`);
//     const recordRowPrice = currentRecordRow.querySelector(".record-row-price");
//     const recordRowTotal = currentRecordRow.querySelector(".record-row-total");
//     const recordRowQty = currentRecordRow.querySelector(".record-row-qty");

//     if(recordRowQty.innerText > 0) {
//         recordRowQty.innerText = parseInt(recordRowQty.innerText) - 1;
//         recordRowTotal.innerText = recordRowQty.innerText * recordRowPrice;
//     }
// }

export const recordRowBtnHandler = (event) => {
    if(event.target.classList.contains("record-remove")) {
        const currentRecordRow = event.target.closest("#recordRow");
        console.log(currentRecordRow)
        removeRecord(currentRecordRow.getAttribute("row-id"));
    } else if(event.target.classList.contains("quantity-add")) {
        const currentRecordRow = event.target.closest("#recordRow");
        funUpdateQty(currentRecordRow.getAttribute("row-id"),1);
    } else if(event.target.classList.contains("quantity-minus")) {
        const currentRecordRow = event.target.closest("#recordRow");
        funUpdateQty(currentRecordRow.getAttribute("row-id"),-1);
    }
}

// update total cost changes for observer
const updateTotal = () => {
    const rowCostTotal = calRecordTotal();
    const Tax = calTax(rowCostTotal);
    console.log(rowCostTotal);
    recordTotal.innerText = rowCostTotal;
    recordTax.innerText = Tax;
    recordNetTotal.innerText = Tax+rowCostTotal;
}
// observer for dynamic change of the products' price according to the product changes in the cart
export const recordRowObserver = () => {
    const observerOptions = {
        childList: true,
        subtree: true,
      };
      
      const observer = new MutationObserver(updateTotal);
      observer.observe(recordRowsGroup, observerOptions); //1st parameter is the one which you want to observer the changes in 
}

export const checkoutHandler = () => {
    print();
}