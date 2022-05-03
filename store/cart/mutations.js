export default {
  // Cart Mutations
  async LoadCart(state) {
    if (state.user.id) {
      await this.$axios
        .$get(
          `https://t-market-2b11c-default-rtdb.asia-southeast1.firebasedatabase.app/${state.user.id}.json`
        )
        .then((result) => {
          if (result) {
            this.state.cart.cart = result;
          } else {
            this.state.cart.cart = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let cart = localStorage.getItem("freeCart");
      if (cart) {
        state.cart = JSON.parse(cart);
      }
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

    UpdateCart(this, state);
  },

  DecreaseItemCount(state, index) {
    let item = state.cart[index];
    if (!item) return;
    if (item.quantity === 1) {
      state.cart.splice(index, 1);
    } else {
      item.quantity -= 1;
    }

    UpdateCart(this, state);
  },

  RemoveCartItem(state, index) {
    state.cart.splice(index, 1);

    UpdateCart(this, state);
  },

  IncreaseItemCount(state, index) {
    let item = state.cart[index];
    item.quantity += 1;

    UpdateCart(this, state);
  },

  ClearCart(state) {
    state.cart = [];
    UpdateCart(this, state);
  },

  // Authenticate Mutations

  async LoadUser(state) {
    const user = JSON.parse(localStorage.getItem("user"));

    this.commit("cart/AuthenticateUser", { ...user, isLoginForm: true });
  },
  async AuthenticateUser(state, { email, password, isLoginForm }) {
    let authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`;
    let message = "Login success";

    if (!isLoginForm) {
      authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`;
      message = "Register success";
    }

    await this.$axios
      .$post(authUrlApi, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((result) => {
        const id = result.email.replace("@", "-").replace(".", "-");

        state.user.email = result.email;
        state.user.id = id;

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            password,
            id,
          })
        );

        return result;
      })
      .then((result) => {
        this.$swal({
          text: message,
          icon: "success",
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: true,
          showCloseButton: true,
        });
        return result;
      })

      .then((result) => {
        return result;
      })
      .then((result) => {
        this.$router.push("/");
        return result;
      })
      .catch((error) => {
        // Convert "EMAIL_NOT_FOUND" to "email not found"
        const message = capitalizeFirstLetter(
          error.response.data.error.message.split("_").join(" ").toLowerCase()
        );
        this.$swal({
          text: message,
          icon: "error",
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: true,
          showCloseButton: true,
        });
      });

    this.commit("cart/LoadCart");
  },

  InitAuth(state) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return false;

    state.user = user;
  },

  LogOut(state) {
    state.user.email = "";
    state.user.id = "";

    localStorage.removeItem("user");

    this.commit("cart/LoadCart");
  },
};

const UpdateCart = (_this, state) => {
  if (state.user.email) {
    UpdateCartOnFirebase(_this, state.cart, state.user.id);
  } else {
    UpdateLocalStorage(state.cart);
  }

  CartAlert(_this);
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

const UpdateCartOnFirebase = (_this, cart, id) => {
  _this.$axios
    .$put(
      `https://t-market-2b11c-default-rtdb.asia-southeast1.firebasedatabase.app/${id}.json`,
      JSON.stringify(cart)
    )
    .catch((error) => {
      // Convert "EMAIL_NOT_FOUND" to "email not found"
      const message = capitalizeFirstLetter(
        error.response.data.error.message.split("_").join(" ").toLowerCase()
      );
      _this.$swal({
        text: message,
        icon: "error",
        timer: 8000,
        timerProgressBar: true,
        showConfirmButton: true,
        showCloseButton: true,
      });
    });
};

// Uppercase first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
