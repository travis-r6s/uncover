<template>
  <section class="section">
    <div class="columns is-centered">
      <div
        v-if="images"
        class="column is-one-third">
        <div
          v-for="image in images.nodes"
          :key="image.id"
          class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <v-lazy-image
                :src="image.url"
                :src-placeholder="require('@/assets/placeholder.png')"
                :alt="image.altText" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    :src="profileImg(image.user.profile)"
                    :alt="image.user.profile.username">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">
                  {{ image.user.profile.first_name }}
                  {{ image.user.profile.last_name }}
                </p>
                <p class="subtitle is-6">
                  @{{ image.user.profile.username }}
                </p>
              </div>
            </div>

            <div class="content">
              <p><strong>{{ image.title }}</strong> - {{ image.description }}</p>
              <small><time datetime="2016-1-1">{{ dateFormat(image.created_at) }}</time></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Queries
import ALL_IMAGES_QUERY from '@/graphql/Images/AllImages.gql'
export default {
  data: () => ({
    limit: 10,
    offset: 0
  }),
  apollo: {
    images: {
      prefetch: true,
      query: ALL_IMAGES_QUERY,
      variables () {
        return {
          limit: this.limit,
          offset: this.offset
        }
      }
    }
  },
  methods: {
    profileImg (profile) {
      if (!profile) return ``
      return `https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}&rounded=true`
    },
    dateFormat (created_at) {
      return new Date(created_at).toLocaleString('en-GB', { timeZone: 'UTC', dateStyle: 'short' })
    }
  }
}
</script>
