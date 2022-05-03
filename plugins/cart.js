export default function ({ store }, inject) {
  store.commit("cart/LoadCart");

  if (localStorage.getItem("user")) store.commit("cart/LoadUser");

  inject("formatMoney", (money) => {
    return Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
    }).format(money);
  });
}
