<template>
  <v-card tile flat class="pa-md-10 pa-5 text-center" color="surface">
    <v-divider />
    <h2 class="text-md-h6 font-weight-bold mt-14">t-Market</h2>
    <div class="text-center">
      <v-btn
        v-for="(socialMedia, index) in socialMedias"
        :href="socialMedia.link"
        :key="`socialMedias-${index}`"
        color="surface"
        class="mr-2"
        fab
        depressed
      >
        <v-icon>
          {{ socialMedia.icon }}
        </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      socialMedias: [
        {
          icon: "mdi-facebook",
          link: "https://www.facebook.com/nguyenthanhtu2000",
        },
        {
          icon: "mdi-twitter",
          link: "#",
        },
        {
          icon: "mdi-instagram",
          link: "https://www.instagram.com/thanhtu1302/",
        },
        {
          icon: "mdi-youtube",
          link: "#",
        },
      ],
    };
  },
};
</script>

<style></style>
