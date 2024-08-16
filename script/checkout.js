import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

/* (Practice Purpose (Fetch not linked))
async function loadPage() {
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}
loadPage();
*/

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
