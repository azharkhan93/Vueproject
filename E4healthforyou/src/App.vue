<template>
  <!-- <template> -->
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar  bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left"  target="_blank">
           E4HealthForYou
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <!-- <li class="nav-item">
            <router-link class="nav-link pr-3" to="/Login">Sign in</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script >

export default {
  name: 'App',
  // components:{
    
    
  //   Login,
  //   Signup,
  // }
}
</script>

<style scope >
.vue-tempalte,
.vertical-center {
  margin-bottom: 30px;
  width: 100%;
  height: 100%;
  background: rgba(34, 35, 58, 0.2);
}
.nav-item {
  margin-left: 20px;
}
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

</style>
