<template>
  <b-modal
    :active.sync="active">
    <div class="columns is-marginless">
      <div class="column is-8 is-paddingless">
        <figure class="image">
          <img
            :src="image.full"
            :alt="image.altText">
        </figure>
      </div>
      <div
        v-if="active"
        class="column is-4 is-paddingless">
        <div class="modal-card">
          <section class="modal-card-body">
            <article class="media">
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
                <div class="content">
                  <p><small>{{ image.description }}</small></p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
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
.modal-card {
  height: 100%;
  width: auto;
}
</style>
