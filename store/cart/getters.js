export default {
  isAuthenticated: (state) => !!state.user.idToken,
};
