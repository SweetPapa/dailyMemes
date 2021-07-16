<template>
  <q-page class="flex flex-center">
    <!-- Popup Window  -->
    <q-dialog v-model="imgPopup" v-if="selectedMeme !== null">
        <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        height="500px"
        class="bg-white shadow-1 rounded-borders"
      >
        <q-carousel-slide v-for="photo in selectedMeme.photos" v-bind:key="photo.original_size.url" :name="photo.original_size.url" class="column no-wrap flex-center">
          <q-img
            width="80%"
            :src="photo.original_size.url"
          />
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>

    <!-- Cards -->
    <BlogCard class="q-ma-lg" v-for="meme in memeVault" v-bind:key="meme.id" :blogPostObj="meme"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import tumblrAPI from "../js/tumblrAPI"
import BlogCard from "../components/blog-card.vue"

export default defineComponent({
  name: 'PageIndex',
  async created(){
    let memes = await tumblrAPI.getBlogPosts()

    memes.result.forEach(blog => {
      blog.posts.forEach(post => {
        this.memeVault.push(post)
      })
    })
    console.log(this.memeVault)

  },
  data: function(){
    return {
      memeVault: [],
      imgPopup: false,
      selectedMeme: null,
      slide: "0"
    }
  },
  methods:{
    loadMemePopup(meme){
      this.selectedMeme = meme

      if (meme.type === "photo"){
        this.imgPopup = true
        this.slide = this.selectedMeme.photos[0].original_size.url
      }
    }
  },
  components: {
    BlogCard
  }
})
</script>
