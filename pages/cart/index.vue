<template>
  <div>
    <Nav />
    <br />
    <div v-if="$store.state.cart.cart.length == 0" class="text-center">
      <br /><br />
      <p>No items just yet. Keep shopping</p>
      <br /><br />
      <v-btn nuxt to="/products" min-width="150" min-height="45" depressed>
        Go To Store
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <template v-for="(c, i) in $store.state.cart.cart">
          <v-col :key="`cartItem${i}`">
            <v-card color="surface" flat>
              <!-- On Laptop and larger -->
              <v-btn
                @click="$store.commit('cart/RemoveCartItem', i)"
                absolute
                top
                right
                icon
                class="d-none d-md-block"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <!-- On Mobile -->
              <v-btn
                @click="$store.commit('cart/RemoveCartItem', i)"
                absolute
                right
                icon
                class="d-md-none"
                style="bottom: 4px"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-row dense>
                <v-col md="3">
                  <v-img class="rounded-lg" height="220" :src="c.product.image">
                  </v-img>
                </v-col>
                <v-col class="pl-5 pt-2" md="9">
                  <h2 class="text-md-h6 font-weight-bold">
                    {{ c.product.name }} x {{ c.quantity }}
                  </h2>
                  <p class="primary--text mt-2">
                    {{ $formatMoney(c.product.price) }}
                  </p>
                  <v-btn
                    @click="$store.commit('cart/IncreaseItemCount', i)"
                    icon
                  >
                    <v-icon size="20">mdi-plus-circle</v-icon>
                  </v-btn>
                  <v-btn
                    @click="$store.commit('cart/DecreaseItemCount', i)"
                    icon
                  >
                    <v-icon size="20">mdi-minus-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </template>
        <v-container class="mt-3" v-if="$store.state.cart.cart.length > 0">
          <v-btn
            nuxt
            to="/cart/confirm"
            min-width="150"
            min-height="45"
            color="primary"
            style="float: right"
            class="mr-5"
          >
            Checkout
          </v-btn>
        </v-container>
      </v-row>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
