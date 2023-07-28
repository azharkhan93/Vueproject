<template>
    <form class="form" @submit.prevent="handleEdit">
        <div class="mb-3">
            <label for="name" class="form-label">Edit Name: </label>
            <input type="text" class="form-control form-control-sm" v-model="form.name" placeholder="Enter new name"
                id="name" />
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">Edit Address: </label>
  
            <input type="text" class="form-control form-control-sm" v-model="form.address" placeholder="Enter new address"
                id="address" />
        </div>
        <div class="mb-3">
            <label for="phoneNumber" class="form-label">Edit PhoneNumber: </label>
          
            <input type="text" class="form-control form-control-sm" v-model="form.phoneNumber"
                placeholder="Enter new phone number" id="phoneNumber" />
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Edit Email: </label>

            <input type="text" class="form-control form-control-sm" v-model="form.email" placeholder="Enter new email"
                id="email" />

        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <!-- <button type="button" class="btn btn-secondary" @click="handleClose">Cancel</button> -->
    </form>
</template>
  
<script>

import { reactive, watch } from "vue";
import axios from "axios";

export default {
    props: ['fetchPatients', '_id', 'name', 'address', 'phoneNumber', 'email'],
    setup(props) {
        const form = reactive({
            _id: "",
            name: "",
            address: "",
            phoneNumber: "",
            email: ""
        });

        watch(() => props, (newVal) => {
           form._id = newVal._id;
           form.name = newVal.name;
           form.address = newVal.address;
           form.phoneNumber = newVal.phoneNumber;
           form.email = newVal.email;
        }, {
            deep: true
        });

        const handleEdit = async () => {
            
            // include token for sensitive requests
            const response = await axios.post(`http://localhost:3000/api/updatePatient`, {
                token: localStorage.getItem('token'),
                form: form
            });

    
            if(response.data.success) {

              props.fetchPatients();
            }
        }

        return { handleEdit, form, props }
    }
}
</script>
  
<style scoped>
.form {
    width: 50%;
    margin: 0 auto;
    margin-top: 10px;
    padding: 30px;

}
</style>