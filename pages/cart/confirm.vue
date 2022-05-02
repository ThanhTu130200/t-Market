<template>
  <div>
    <Nav />
    <div v-if="$store.state.cart.cart.length == 0" class="text-center">
      <br /><br />
      <p>No items just yet. Keep shopping</p>
      <br /><br />
      <v-btn nuxt to="/products" min-width="150" min-height="45" depressed>
        Go To Store
      </v-btn>
    </div>
    <v-container>
      <div class="mb-3" v-if="$store.state.cart.cart.length > 0">
        <v-form lazy-validation ref="form" class="mt-10">
          <p class="font-weight-bold">Personal & Delivery</p>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                outlined
                label="Email"
                type="email"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                outlined
                label="Full name"
                type="name"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="phone" outlined label="Phone" type="tel" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="address"
                :rules="[rules.required]"
                outlined
                label="Address"
                type="text"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="city"
                :rules="[rules.required]"
                outlined
                label="City"
                type="text"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="country"
                :rules="[rules.required]"
                outlined
                label="Country"
                type="text"
              />
            </v-col>
          </v-row>
          <p class="font-weight-bold">Credit card</p>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="cc"
                :rules="[rules.required]"
                outlined
                label="Credit Card Number"
                type="number"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="expDate"
                :rules="[rules.required]"
                outlined
                label="Exp date"
                type="text"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="cvv"
                :rules="[rules.required]"
                outlined
                label="Security code/CVV"
                type="text"
              />
            </v-col>
          </v-row>
        </v-form>
        <div class="justify-end d-flex mt-3">
          <v-btn nuxt to="/cart" min-width="150" min-height="45" depressed>
            Back
          </v-btn>
          <v-btn
            @click="process"
            min-width="150"
            min-height="45"
            color="primary"
            class="ml-3"
          >
            Complete
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      name: null,
      phone: null,
      address: null,
      city: null,
      country: null,
      cc: "4242424424242",
      expDate: "06/25",
      cvv: "123",
      rules: {
        required: (value) => !!value || "Required",
        email: (value) => {
          const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

          return pattern.test(value) || "Invalid e-mail";
        },
      },
    };
  },
  methods: {
    async process() {
      if (!this.$refs.form.validate()) return;

      await this.$swal({
        title: "Processing your order",
        icon: "info",
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        text: "Please Wait",
        showConfirmButton: false,
      });

      await this.$swal({
        title: "Order Complete",
        icon: "success",
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        text: "Thank You So Much ❤",
        showConfirmButton: true,
        showCloseButton: true,
      });

      this.$store.commit("cart/ClearCart");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
