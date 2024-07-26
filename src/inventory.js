import { v4 as uuidv4 } from 'uuid';
import { productGroup, productSelector } from './selectors';
import arrProducts from './state';

export const btnAddNewProductHandler = () => {
    // console.log(inputProductName.value, inputProductPrice.value);
    const productCardID = uuidv4();
    productGroup.append(
        createProductCard(productCardID,inputProductName.value,Number(inputProductPrice.value))
    )
    productSelector.append(new Option(inputProductName.value,productCardID)); //new Option HTML tag
    
    //add to Array
    arrProducts.push({
        id : productCardID,
        name : inputProductName.value,
        price : inputProductPrice.valueAsNumber
    });
    inputProductName.value = "";
    inputProductPrice.value = "";
}
export const createProducts = () => { //to add products in array for initial render
    arrProducts.forEach(({id,name,price}) => {
        productGroup.append(
            createProductCard(id,name,price) //add to inventory
        );
        productSelector.append(new Option(`${name}  -  ${price} MMK`,id)); //add to selector
        
    })
}
export const createProductCard = (id,name,price) => {
    const productCard = productCardTemplate.content.cloneNode(true); //clone the template from index.html
    const productPrice = productCard.querySelector(".product_price");
    const productName = productCard.querySelector(".product_name");
    const productCardChild = productCard.querySelector("#productCard");

    productCardChild.id = id //uuid4

    productName.innerText = name;
    productPrice.innerText = price;

    return productCard;
}