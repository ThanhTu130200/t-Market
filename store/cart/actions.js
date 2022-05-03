export default {
  authenticate: async ({ commit }, loginInfo) => {
    await commit("AuthenticateUser", loginInfo);
    commit("LoadCart");
  },
  logout: ({ commit }) => {
    commit("LogOut");
    commit("LoadCart");
  },
  loadUser: ({ commit }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    commit("AuthenticateUser", { ...user, isLoginForm: true });
  },
  addToCart: ({ commit }, product) => {
    commit("AddToCart", product);
    commit("UpdateCart");
  },
  decreaseItemCount: ({ commit }, index) => {
    commit("DecreaseItemCount", index);
    commit("UpdateCart");
  },

  increaseItemCount: ({ commit }, index) => {
    commit("IncreaseItemCount", index);
    commit("UpdateCart");
  },
  removeCartItem: ({ commit }, index) => {
    commit("RemoveCartItem", index);
    commit("UpdateCart");
  },

  clearCart: ({ commit }) => {
    commit("ClearCart");
    commit("UpdateCart");
  },
};
