<template>
  <v-container>
    <Nav />
    <v-form lazy-validation ref="form" class="mt-10">
      <div class="d-flex justify-center align-center mb-5">
        <p class="font-weight-bold mb-0">Already have an account ?</p>
        <v-btn
          nuxt
          to="/login"
          min-width="120"
          color="lime lighten-2"
          class="ml-3 text-capitalize"
        >
          Login
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
        <v-col cols="12">
          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required, rules.confirmPassword]"
            outlined
            label="Confirm Password"
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
        @click="register"
        min-width="150"
        min-height="45"
        color="primary"
        class="ml-3"
      >
        Register
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
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

          return pattern.test(value) || "Invalid e-mail";
        },
        password: (value) =>
          !!(value.length >= 6) || "Password must be 6 characters",
        confirmPassword: (value) =>
          !!(value === this.password) || "Confirm Password does not match",
      },
    };
  },
  methods: {
    register() {
      if (!this.$refs.form.validate()) return;

      this.$store.commit("cart/AuthenticateUser", {
        email: this.email,
        password: this.password,
        isLoginForm: false,
      });
    },
  },
};
</script>

<style></style>
