<template>
  <section class="section">
    <div class="columns is-centered">
      <div
        v-if="images"
        class="column is-one-third">
        <lazy-hydrate
          v-for="image in images.nodes"
          :key="image.id"
          when-visible>
          <div class="card">
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
        </lazy-hydrate>
      </div>
    </div>
    <client-only>
      <infinite-loading
        v-if="shouldFetchMore"
        @infinite="fetchMore" />
    </client-only>
  </section>
</template>

<script>
// Components
import LazyHydrate from 'vue-lazy-hydration'
import InfiniteLoading from 'vue-infinite-loading'
// Queries
import ALL_IMAGES_QUERY from '@/graphql/Images/AllImages.gql'
import ALL_IMAGES_SUBSCRIPTION from '@/graphql/Images/AllImagesSubscription.gql'
export default {
  components: {
    LazyHydrate,
    InfiniteLoading
  },
  data: () => ({ offset: 0, count: 0 }),
  computed: {
    shouldFetchMore () { return this.images && (this.images.nodes.length % 10 === 0) }
  },
  apollo: {
    images: {
      prefetch: true,
      query: ALL_IMAGES_QUERY,
      variables: {
        limit: 10
      }
    },
    $subscribe: {
      images: {
        query: ALL_IMAGES_SUBSCRIPTION,
        result ({ data: { images } }) {
          if (!this.count) this.count = images.aggregate.count
          else {
            console.log('updates available')
          }
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
    },
    fetchMore () {
      this.$apollo.queries.images.fetchMore({
        variables: {
          limit: 10,
          offset: this.offset + 10
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.images.nodes
          const previousImages = previousResult.images
          return {
            images: {
              ...previousImages,
              nodes: [...previousImages.nodes, ...newImages]
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 2rem;
}
</style>
