
<!-- <template>
    <div class="vue-template">
      <form @submit.prevent="login">
        <h3>Admin Login</h3>
  
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
        <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
        <p class="forgot-password text-right mt-2 mb-4">
           <router-link to="/ForgotPassword">Forgot password?</router-link> 
        </p>
      </form>
    </div>
  </template> -->
  <template>
    <div class="vue-tempalte">
        <form @submit.prevent="login">
            <h3>Sign In</h3>
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
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/ForgotPassword">Forgot password?</router-link>
               
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
    name: 'Login',
  
    data() {
      return {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
      };
    },
  
    methods: {
      async login() {
        this.emailError = '';
        this.passwordError = '';
  
        let isValid = true;
  
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
        }
  
        if (isValid) {
          try {
            const response = await axios.post('http://localhost:3000/api/login', {
              email: this.email,
              password: this.password,
            }, { withCredentials: true });
            
            // save this token in local storage
            window.localStorage.setItem('token', response.data.token);
  
            console.log('Admin logged in');
            toast.success('Admin logged in successfully');
            this.$router.push('/customer');
          } catch (error) {
            console.log('Error logging in:', error.message);
            toast.error('Error logging in');
          }
        } else {
          console.log('Form validation failed');
          toast.error('Form validation failed');
        }
      },
  
      validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }
    },
  };
  </script>
  
<style scoped>
.vue-tempalte {
    background-color: #ffffff;
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
</style>
<!-- <router-link to="/ForgotPassword">Forgot password?</router-link> -->





 
<!-- <script>
import { toast } from 'vue3-toastify';
import axios from 'axios';

export default {
  
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },

  methods: {
    async login() {
      this.emailError = '';
      this.passwordError = '';

      let isValid = true;

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
      }

      if (isValid) {
        try {
          await axios.post('http://localhost:3000/api/login', {
            email: this.email,
            password: this.password,
          }, { withCredentials: true });

          console.log('Admin logged in');
          toast.success('Admin logged in successfully');
          
        } catch (error) {
          console.log('Error logging in:', error.message);
          toast.error('Error logging in');
        }
      } else {
        console.log('Form validation failed');
        toast.error('Form validation failed');
      }
    },

    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  },
};

</script>  -->