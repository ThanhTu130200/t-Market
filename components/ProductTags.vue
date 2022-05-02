<template>
  <div>
    <v-chip
      x-small
      label
      outlined
      class="mr-1"
      v-for="(tag, index) in product.tags"
      :key="`prod${product.id}-${index}`"
    >
      {{ tag }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style></style>
