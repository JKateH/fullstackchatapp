<template>
  <div>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center">Login</h2>
            <div class="input-field">
                <input id="email" type="email" class="validate" v-model="email">
                <label for="email">Email</label>
            </div>
            <div class="input-field">
                <input id="password" type="password" class="validate" v-model="password">
                <label for="password">Password</label>
            </div>
            <div v-if="error" class="center red-text">{{error}}</div>
            <div class="field center">
                <button class="waves-effect waves-light btn" type="submit">Login</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Login',
  data () {
    return {
      email:'',
      password:'',
      error:''
    }
  },
  methods:{
    async login () {
        try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'Home'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>


<style scoped>
    .login{
        max-width: 500px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2.4em;
    }
    .login input-field{
        margin-bottom: 10px;
    }

</style>
