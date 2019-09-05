<template>
  <div class="card">
    <a
      @click="$emit('openModal', image)"
      @keyup="$emit('openModal', image)"
      class="card-image">
      <figure class="image is-4by3">
        <v-lazy-image
          :src="image.card"
          :src-placeholder="image.placeholder"
          :alt="image.altText" />
      </figure>
    </a>
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
        <div class="media-right">
          <b-button type="is-white">
            <b-icon icon="thumb-up-outline" />
            <span><small>{{ image.likes }}</small></span>
          </b-button>
        </div>
      </div>

      <div class="content">
        <p><strong>{{ image.title }}</strong> - {{ image.description }}</p>
        <small><time datetime="2016-1-1">{{ dateFormat(image.created_at) }}</time></small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: () => ({})
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

<style lang="scss" scoped>
.card {
  margin-bottom: 2rem;
}
</style>
