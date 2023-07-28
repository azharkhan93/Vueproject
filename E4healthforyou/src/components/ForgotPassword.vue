<template>
  <div class="vue-tempalte">
    <form @submit="resetPassword">
      <h3>Forgot Password</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>
    </form>
  </div>
</template> 
<!-- <template>
  <div class="vue-template">
    <form @submit="resetPassword">
      <h3>Forgot Password</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>
    </form>
  </div>
</template> -->

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RouterLink,
  },
  data() {
    return {
      email: '',
    };

  },
  created() {
  // Access the token from the route params
  const token = this.$route.params.token;
  console.log('Token:', token);
  // Use the token for further processing
},

  // created() {
  //   // Access the token from the query parameter
  //   const token = this.$route.query.token;
  //   console.log('Token:', token);
  //   // Use the token for further processing
  // },
  methods: {
    async resetPassword(event) {
      event.preventDefault();

      // Send a request to the backend to initiate password reset
      try {
        const response = await axios.post('http://localhost:3000/api/forgotpassword', { email: this.email });
        console.log(response.data)
        const token = response.data.token;
        // this.$router.push('/resetPass/' + token);

        // this.$router.push({
        //   name: 'resetPass',
        //   params: { token: "6c1a739c872c07cf5f3ea25b95d386e54f447b3ce6cc7cdb6e89872eaff7853c" }
        // });
        this.$router.push({
          name: '/resetPass',
          params: { token: token }
        },{ withCredentials: true });

      } catch (error) {
        // console.log(error.response.data);
        // this.$router.push('/resetPass');  // Optional: Handle error response
      }

      // Reset the email input field after submission
      this.email = '';
    },
  },
};
</script>
<style scoped>
.vue-tempalte {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  width: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input.form-control-lg {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 4px;
}

.forgot-password a {
  color: #2554FF;
}

.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}

.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>