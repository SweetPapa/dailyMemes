<template>
    <q-card class="blogPostCard q-pa-sm">
      <q-card-section horizontal>
        <div v-if="blogPostObj.type === 'text'" class="col">
          YEET
        </div>
        <div class="col" v-else>
          <q-img
            class="blogPostImg q-ma-sm"
            v-for="photo in blogPostObj.photos"
            v-bind:key="photo.original_size.url"
            :src="photo.original_size.url"
          />
        </div>


        <q-card-actions vertical class="justify-around">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="accent" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </q-card-actions>
      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'blog-card',
  props: {
    blogPostObj: Object
  }
  
})
</script>

<style scoped>
.blogPostCard {
    width: 100%;
    max-width: 350px;
}
.blogPostImg{
  min-width: 50%;
  max-width: 500px;
  width: 100%;
}
</style>