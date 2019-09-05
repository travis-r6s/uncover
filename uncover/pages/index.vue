<template>
  <section class="section">
    <div class="has-text-centered">
      <b-button
        v-show="updates"
        @click="fetchUpdates"
        type="is-info">
        <small>Updates available</small>
        <b-icon
          icon="refresh"
          size="is-small" />
      </b-button>
    </div>
    <br>
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
                  :src="image.card"
                  :src-placeholder="image.placeholder"
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
  data: () => ({ offset: 0, shouldFetchMore: true, updates: false, time: new Date().toUTCString() }),
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
        variables: {
          time: new Date().toUTCString()
        },
        result ({ data: { images } }) {
          if (images.aggregate.count) this.updates = true
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
    fetchUpdates () {
      this.$apollo.queries.images.fetchMore({
        variables: {
          where: {
            created_at: {
              _gt: this.time
            }
          }
        },
        updateQuery: ({ images }, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.images.nodes
          this.updates = false
          return {
            images: {
              ...images,
              nodes: [...newImages, ...images.nodes]
            }
          }
        }
      })
    },
    fetchMore ($state) {
      this.offset = this.offset + 10
      this.$apollo.queries.images.fetchMore({
        variables: {
          limit: 10,
          offset: this.offset
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newImages = fetchMoreResult.images.nodes
          const previousImages = previousResult.images
          if (newImages.length < 10) this.shouldFetchMore = false
          $state.loaded()
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
