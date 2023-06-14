
<template>
    <div class="vue-tempalte">
        <form @submit.prevent="signIn">
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/ForgotPassword">Forgot password?</router-link>
                <!-- <router-link to="/Signup">Forgot password?</router-link> -->
            </p>
            <div class="social-icons">
                <ul>
                    <li><a href="https://www.google.com"><i class="fa fa-google"></i></a></li>
                    <li><a href="https://www.facebook.com"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.twitter.com"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    mounted() {
        if (document.cookie.includes('myCookie')) {
            // Cookie is set
            console.log('Cookie is set');
        } else {
            // Cookie is not set
            console.log('Cookie is not set');
        }
    },
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            
        };
    },
    methods: {
        async signIn() {
            try {
                await axios.post('http://localhost:3000/api/login', {
                    email: this.email,
                    password: this.password,
                });
                


                console.log('Login successful');
                // Handle the response or redirect to another page
            } catch (error) {
                console.log('Error logging in:', error.message);
                // Handle the error, show an error message, etc.
            }
        },
    },
};
</script>
  



<!-- <template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/ForgotPassword">Forgot password ?</router-link>
                 <router-link to="/Signup">Forgot password ?</router-link> 
            </p>
            <div class="social-icons">
                <ul>
                    <li><a href="https://www.google.com"><i class="fa fa-google"></i></a></li>
                    <li><a href="https://www.facebook.com"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.twitter.com"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </form>
    </div>
</template> -->
    
<!-- <script>
import axios from 'axios';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login'

}
</script>  -->

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
