import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
hello();

const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

let cartHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

  const dateString = deliveryDate.format("dddd , MMMM D");

  cartHTML += `<div class="cart-item-container cartContainer-${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}" />

              <div class="cart-item-details">
                <div class="product-name">${matchingProduct.name}</div>
                <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary"> Update </span>
                  <span class="delete-quantity-link link-primary deleteQuantity" data-product-id="${matchingProduct.id}"> Delete </span>
                </div>
              </div>

              <div class="delivery-options ">
                <div class="delivery-options-title">Choose a delivery option:</div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}  
              </div>
            </div>
          </div>`;
});

function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd , MMMM D");
    const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${((deliveryOption.priceCents / 100) * 10).toFixed(2)}"-`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += ` <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id= "${
      deliveryOption.id
    }">
                  <input type="radio" ${isChecked ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString} Shipping</div>
                  </div>
                </div>  `;
  });
  return html;
}

document.querySelector(".orderSummary").innerHTML = cartHTML;
document.querySelectorAll(".deleteQuantity").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.cartContainer-${productId}`);
    container.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
