export default {
  AuthenticateUser(state, { email, password, isLoginForm }) {
    let authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`;

    if (!isLoginForm)
      authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`;

    this.$axios
      .$post(authUrlApi, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((result) => {
        this.$swal({
          title: "Success",
          icon: "success",
          timer: 8000,
          timerProgressBar: true,
          showConfirmButton: true,
          showCloseButton: true,
        });
        return result;
      })
      .then((result) => {
        state.user.email = result.email;
        return result;
      })
      .then((result) => {
        this.$router.go(-1);
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
  },
  LogOut(state) {
    state.user.email = "";
  },
};

// Uppercase first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
