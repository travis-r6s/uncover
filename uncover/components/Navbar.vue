<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item
        :to="{ path: '/' }"
        tag="nuxt-link">
        <h3 class="is-size-3">
          Uncover
        </h3>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">
        <b-icon icon="compass-outline" />&nbsp;
        <span>Explore</span>
      </b-navbar-item>
      <b-navbar-item href="#">
        <b-icon icon="magnify" />&nbsp;
        <span>Search</span>
      </b-navbar-item>
    </template>

    <template
      slot="end"
      v-if="isAuthenticated">
      <b-navbar-item
        :to="{name: 'create'}"
        tag="nuxt-link">
        <b-icon icon="image-filter" />&nbsp;
        <span>New Post</span>
      </b-navbar-item>
      <b-navbar-item href="#">
        <b-icon icon="account-outline" />&nbsp;
        <span>Account</span>
      </b-navbar-item>
    </template>

    <template
      slot="end"
      v-if="!isAuthenticated">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <b-button
            @click="$auth.login()"
            class="button is-light">
            Log in
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated () { return !!this.$apolloHelpers.getToken() }
  }
}
</script>
