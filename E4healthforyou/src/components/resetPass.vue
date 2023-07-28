<template>
  <div class="vue-template">
    <form @submit="resetPassword">
      <h3>Reset Password</h3>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control form-control-lg" v-model="email" required />
      </div>
      <div class="form-group">
        <label>New password</label>
        <input type="password" class="form-control form-control-lg" v-model="newPassword" required />
      </div>
      <div class="form-group">
        <label>Confirm password</label>
        <input type="password" class="form-control form-control-lg" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>
    </form>
  </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      token: '',
    };
  },
  // created() {
  //   this.token = this.$route.params.token;
  //   console.log('Received token:', this.token);
  // },

  methods: {
    async resetPassword(event) {
      event.preventDefault();

      if (this.newPassword !== this.confirmPassword) {
        console.log('Passwords do not match');
        return;
      }

      try {
        //  const token = this.$route.params.token;
        // const response = await axios.post(`http://localhost:3000/api/passwordreset/${token}`, {
          const response = await axios.post('http://localhost:3000/api/passwordreset', {
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        },{ withCredentials: true });

        console.log(response.data); // Optional: Handle success response
        toast.success('Password reset successfully');
        this.$router.push('/login');

        this.email = '';
        this.newPassword = '';
        this.confirmPassword = '';
        // this.$router.push('/login');
      } catch (error) {
        console.log(error.response.data);
        toast.error('Failed to reset password');
      }
    },
    
  },
};
</script>
  
<!-- <script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      token: '',
    };
  },
  created() {
    this.token = this.$route.params.token;
    console.log('Received token:', this.token);
  },

  methods: {
    async resetPassword(event) {
      event.preventDefault();

      if (this.newPassword !== this.confirmPassword) {
        console.log('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/passwordreset/' + this.token, {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });


      // try {
      //   const response = await axios.post('http://localhost:3000/api/passwordreset', {
      //     token: this.token,
      //     newPassword: this.newPassword,
      //   });

      console.log(response.data); // Optional: Handle success response
      this.showSuccess('Password reset successfully');

      this.email = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.$router.push('/login');
    } catch(error) {
      console.log(error.response.data);
      this.showError('Failed to reset password');
    }
  },
  showSuccess(message) {
    toast.error(message);
  },
  showError(message) {
    toast.error(message);
  },

},
  
};
</script> -->

  
<style scoped>
.vue-template {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 50px;
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
</style>
  
  