<template>
  <div>
    <Nav />
    <v-container>
      <v-row dense>
        <v-col md="3">
          <div>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              outlined
              clearable
              placeholder="Search"
            />
            <v-list
              subheader
              color="transparent"
              v-if="$vuetify.breakpoint.mdAndUp"
            >
              <v-subheader>Categories</v-subheader>
              <v-list-item
                v-for="(category, index) in categories"
                :key="`category${index}`"
                link
              >
                <v-list-item-avatar>
                  <v-img :src="category.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ category.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col md="9">
          <v-row>
            <template v-for="(product, index) in filteredProducts">
              <v-col cols="12" md="6" :key="`product${product.id}-${index}`">
                <v-card
                  nuxt
                  :to="`/products/${product.id}`"
                  color="surface"
                  class="el ma-2 mb-5 mr-5"
                >
                  <v-img :src="product.image" height="300">
                    <template #placeholder>
                      <v-row
                        class="fill-height"
                        justify="center"
                        align="center"
                      >
                        <v-progress-circular
                          width="2"
                          size="100"
                          color="primary"
                          indeterminate
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                  <v-card-title class="text-md-body-1 font weight-bold">
                    {{ product.name }}
                  </v-card-title>
                  <v-card-subtitle class="primary--text pb-3">
                    {{ $formatMoney(product.price) }}
                  </v-card-subtitle>
                  <v-card-text>
                    <ProductTags :product="product" />
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
export default {
  async created() {
    this.categories = await this.$content("category").fetch();
    this.products = await this.$content("products").fetch();
  },
  data() {
    return {
      products: null,
      categories: null,
      search: null,
    };
  },
  computed: {
    filteredProducts() {
      if (!this.search || !this.products) return this.products || [];
      return this.products.filter((product) => {
        const search = this.search.toLowerCase();
        const name = product.name.toLowerCase();
        const price = product.price.toString();
        const salePrice = product.salePrice?.toString() || "";
        const ratings = product.ratings.toString();

        return (
          name.includes(search) ||
          price.includes(search) ||
          salePrice.includes(search) ||
          salePrice.includes(search) ||
          ratings.includes(search)
        );
      });
    },
  },
};
</script>

<style></style>
