<template>
  <div>
    <v-app-bar
      color="surface"
      height="80"
      class="el"
      app
      :style="{ padding: $vuetify.breakpoint.mdAndUp ? '0 100px' : '' }"
    >
      <v-toolbar-title
        @click="$router.push('/')"
        class="text-md-h5 font-weight-bold pointer"
      >
        t-Market
      </v-toolbar-title>
      <v-spacer />
      <v-btn nuxt to="/products" icon>
        <v-icon size="20">mdi-store-outline</v-icon>
      </v-btn>
      <v-badge
        overlap
        :content="$store.state.cart.cart.length"
        v-if="$store.state.cart.cart.length > 0"
      >
        <v-btn nuxt to="/cart" icon>
          <v-icon size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
      <v-btn nuxt to="/cart" v-else icon>
        <v-icon size="20">mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn @click="toggleTheme" icon>
        <v-icon size="20">mdi-brightness-7</v-icon>
      </v-btn>
      <v-divider vertical class="mx-md-5 mx-2" />
      <v-btn
        v-if="!email && loginButtonVisible"
        nuxt
        to="/login"
        min-width="100"
        icon
      >
        <v-icon size="20">mdi-account-outline</v-icon>
        <p style="margin: 0" class="text-capitalize">Login</p>
      </v-btn>
      <v-btn
        v-else-if="!email && !loginButtonVisible"
        nuxt
        to="/register"
        min-width="100"
        icon
      >
        <v-icon size="20">mdi-account-outline</v-icon>
        <p style="margin: 0" class="text-capitalize">Register</p>
      </v-btn>
      <v-btn v-else @click="$store.commit('cart/LogOut')" min-width="100" icon>
        <p style="margin: 0" class="text-capitalize">Logout</p>
        <v-icon size="20">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: "check-auth",
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  props: {
    loginButtonVisible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      email: (state) => state.cart.user.email,
    }),
  },
};
</script>

<style></style>
