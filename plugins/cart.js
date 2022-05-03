export default function ({ store }, inject) {
  store.commit("cart/LoadCart");
  // store.dispatch("cart/loadUser");

  inject("formatMoney", (money) => {
    return Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
    }).format(money);
  });
}
