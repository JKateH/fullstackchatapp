<template>
  <div class="header">
    <nav>
        <div class="nav-wrapper grey darken-4">
            <div class="container">
                <a href="#" class="brand-logo">Chat</a>
                <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li v-if="!$store.state.isUserLoggedIn"><router-link :to="{name:'Register'}">Signup</router-link></li>
                    <li v-if="!$store.state.isUserLoggedIn"><router-link :to="{name:'Login'}">Login</router-link></li>
                    <li v-if="$store.state.isUserLoggedIn"><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <ul class="sidenav" id="mobile-nav">
        <li><router-link :to="{name:'Register'}">Signup</router-link></li>
        <li><router-link :to="{name:'Login'}">Login</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  },
  methods:{
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
        name: 'Login'
      })
      }
  }
}
</script>


<style scoped>


</style>
