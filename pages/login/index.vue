<template>
  <v-container>
    <Nav />
    <v-form lazy-validation ref="form" class="mt-10">
      <div class="d-flex justify-center align-center mb-5">
        <p class="font-weight-bold mb-0">Don't have any account ?</p>
        <v-btn
          nuxt
          to="/register"
          min-width="120"
          color="lime lighten-2"
          class="ml-3 text-capitalize"
        >
          Register
        </v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            outlined
            label="Email"
            type="email"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.password]"
            outlined
            label="Password"
            type="password"
            validate-on-blur
          />
        </v-col>
      </v-row>
    </v-form>
    <div class="justify-end d-flex mt-3">
      <v-btn @click="$router.go(-1)" min-width="150" min-height="45" depressed>
        Back
      </v-btn>
      <v-btn
        @click="login"
        min-width="150"
        min-height="45"
        color="primary"
        class="ml-3"
      >
        Login
      </v-btn>
    </div>
    <Footer />
    <ScrollTop />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

          return pattern.test(value) || "Invalid e-mail";
        },
        password: (value) =>
          !!(value.length >= 6) || "Password must be 6 characters",
      },
    };
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return;

      await this.$axios
        .$post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`,
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true,
          }
        )
        .then(() =>
          this.$swal({
            title: "Login success",
            icon: "success",
            timer: 8000,
            timerProgressBar: true,
            showConfirmButton: true,
            showCloseButton: true,
          })
        )
        .then(() => this.$router.push("/"))
        .catch(() =>
          this.$swal({
            text: "Something went wrong. Try again",
            icon: "error",
            timer: 8000,
            timerProgressBar: true,
            showConfirmButton: true,
            showCloseButton: true,
          })
        );
    },
  },
};
</script>

<style></style>
