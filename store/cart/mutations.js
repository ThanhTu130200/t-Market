export default {
  LoadCart(state) {
    let cart = localStorage.getItem("freeCart");
    if (cart) {
      state.cart = JSON.parse(cart);
    }
  },
  AddToCart(state, product) {
    //   Check if the item is in the cart already
    let itemFound = state.cart.find((p) => p.product.id === product.id);
    if (!itemFound) {
      state.cart.push({
        product,
        quantity: 1,
      });
    }
    if (itemFound) {
      itemFound.quantity += 1;
    }

    UpdateLocalStorage(state.cart);

    CartAlert(this);
  },
  DecreaseItemCount(state, index) {
    let item = state.cart[index];
    if (!item) return;
    if (item.quantity === 1) {
      state.cart.splice(index, 1);
    } else {
      item.quantity -= 1;
    }

    UpdateLocalStorage(state.cart);

    CartAlert(this);
  },
  RemoveCartItem(state, index) {
    state.cart.splice(index, 1);

    UpdateLocalStorage(state.cart);

    CartAlert(this, "Item removed");
  },
  IncreaseItemCount(state, index) {
    let item = state.cart[index];
    item.quantity += 1;

    UpdateLocalStorage(state.cart);

    CartAlert(this);
  },
  ClearCart(state) {
    state.cart = [];
    localStorage.removeItem("freeCart");
  },
};

const CartAlert = (_this, message = "Cart updated") => {
  _this.$swal({
    toast: true,
    text: message,
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
    showCloseButton: true,
    position: "top-end",
  });
};

const UpdateLocalStorage = (cart) => {
  localStorage.setItem("freeCart", JSON.stringify(cart));
};
