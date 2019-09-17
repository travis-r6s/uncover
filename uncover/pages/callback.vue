<template>
  <section class="section">
    <h3 class="subtitle">
      Just finishing up...
    </h3>
  </section>
</template>

<script>
export default {
  async mounted () {
    const hash = this.$route.hash
    const { idToken } = await this.$auth.parseHash(hash)
    await this.$apolloHelpers.onLogin(idToken)
    await this.$store.commit('setAuthenticated', true)
    this.$router.push('/')
  }
}
</script>
