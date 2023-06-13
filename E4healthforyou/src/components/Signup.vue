
<template>
  <div class="vue-tempalte">
    <form @submit.prevent="signUp">
      <h3>Admin Signup</h3>

      <div class="form-group">
        <label>Full Name</label>
        <input type="text" class="form-control form-control-lg" v-model="fullName" />
        <span class="error-message">{{ fullNameError }}</span>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" />
        <span class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="password" />
        <span class="error-message">{{ passwordError }}</span>
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" class="form-control form-control-lg" v-model="confirmPassword" />
        <span class="error-message">{{ confirmPasswordError }}</span>
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
      <p class="forgot-password text-right">
        Already registered
        <router-link to="/login">sign in?</router-link>
      </p>
    </form>
  </div>
</template>


<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Signup',
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
  },
  methods: {
    async signUp() {
      this.fullNameError = '';
      this.emailError = '';
      this.passwordError = '';
      this.confirmPasswordError = '';

      let isValid = true;

      if (this.fullName.trim() === '') {
        this.fullNameError = 'Full name is required.';
        isValid = false;
      }

      if (this.email.trim() === '') {
        this.emailError = 'Email address is required.';
        isValid = false;
      } else if (!this.validateEmail(this.email)) {
        this.emailError = 'Invalid email address.';
        isValid = false;
      }

      if (this.password.trim() === '') {
        this.passwordError = 'Password is required.';
        isValid = false;
      } else if (this.password.length < 6) {
        this.passwordError = 'Password should be at least 6 characters.';
        isValid = false;
      }

      if (this.confirmPassword.trim() === '') {
        this.confirmPasswordError = 'Please confirm the password.';
        isValid = false;
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = 'Passwords do not match.';
        isValid = false;
      }

      if (isValid) {
        try {
          await axios.post('http://localhost:3000/api/signup', {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
          });
          
          console.log('Admin signed up');
          toast.success('Admin signed up successfully');
          this.$router.push('/login');
        } catch (error) {
          console.log('Error signing up:', error.message);
          toast.error('Error signing up');
        }
      } else {
        console.log('Form validation failed');
        toast.error('Form validation failed');
      }
    },
    validateEmail(email) {
  // Regular expression pattern for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

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
  margin-top: 80px;
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

/* .social-icons ul {
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
} */
</style>