<template>
 
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Patient Management</a>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" @click="handleLogout">Logout</a>
      </li>
    </ul>
  </nav>
  <!-- End Custom Navbar -->
  <div class="container">
    <!-- <PatientForm  :name="editingPatient?.name" :address="editingPatient.address" :phoneNumber="editingPatient.phoneNumber" :email="editingPatient.email" /> -->
    <div class="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
      <PatientForm  v-if="editingMode" :fetchPatients="fetchPatients" :_id="editingPatient._id" :name="editingPatient?.name" :address="editingPatient.address" :phoneNumber="editingPatient.phoneNumber" :email="editingPatient.email" />
      <div class="navbar">

      </div>
      
      <div class="row">
        <div class="col-sm-3 mt-5 mb-4 text-red">
          <div class="search">
            <form class="form-inline">
              <input class="form-control mr-sm-2" type="search" placeholder="Search patient" aria-label="Search"
                v-model="searchQuery" />
            </form>
          </div>
        </div>
        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-red" style="color:purple">
          <h2><b>Patient Details</b></h2>
        </div>
        <div class="col-sm-3 offset-sm-1 mt-5 mb-4 text-red">
          <button class="btn btn-primary" @click="handleShow" v-if="!show">Add New Patient</button>
        </div>
      </div>

      <!-- Form box -->
      <div class="row mt-4" v-if="show">
        <div class="col-sm-6 offset-sm-3">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="handleAddPatient">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name" v-model="newPatient.name">
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" id="address" v-model="newPatient.address">
                </div>
                <div class="form-group">
                  <label for="phoneNumber">PhoneNumber</label>
                  <input type="text" class="form-control" id="phoneNumber" v-model="newPatient.phoneNumber">
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" id="email" v-model="newPatient.email">
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-secondary" @click="handleClose">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      

      <div class="row">
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th @click="sort('name')">Name</th>
                <th @click="sort('address')">Address</th>
                <th @click="sort('phoneNumber')">PhoneNumber</th>
                <th @click="sort('email')">Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <!-- <tbody> -->
            <tbody>
              <tr v-for="(patient, index) in paginatedPatients" :key="index">

                <!-- <tr v-for="(patient, index) in paginatedPatients" :key="index"> -->
                <td>{{ patient.name }}</td>
                <td>{{ patient.address }}</td>
                <td>{{ patient.phoneNumber }}</td>
                <td>{{ patient.email }}</td>
                <td>
                  <a href="#" class="view" title="View" data-toggle="tooltip" style="color: #10ab80">
                    <i class="material-icons">&#xE417;</i>
                  </a>
                  <a href="#" class="edit" title="Edit" data-toggle="tooltip" @click="handleEdit(patient, index)">
                    <i class="material-icons">&#xE254;</i>
                  </a>
                  <a href="#" class="save" title="Save" data-toggle="tooltip" style="color: blue"
                    @click="handleSave(patient)">
                    <i class="material-icons">&#xE161;</i>
                  </a>

                  <a href="#" class="delete" title="Delete" data-toggle="tooltip" style="color: red">
                    <i class="material-icons">&#xE872;</i>
                  </a>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <nav>
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click="changePage(currentPage - 1)">Previous</a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientForm from '../components/PatientForm.vue'
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Customer',
  components: {
    PatientForm,
  },
  setup() {
   
    const editingIndex = ref(-1);

    const show = ref(false);
    const patients = ref([]);
    const newPatient = ref({
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    });
    let editingPatient = reactive({ name: '', address: '', email: '', phoneNumber: '' });
    const searchQuery = ref('');

    if (!searchQuery.value) {
      searchQuery.value = '';
    }

    const currentPage = ref(1);
    const itemsPerPage = ref(6);
    const sortBy = ref('');
    const sortDirection = ref('asc');

    function handleShow() {
      show.value = true;
    }

    function handleClose() {
      show.value = false;
    }

    async function handleEdit(patient, index) {
      try {
        this.editingMode = true;
        this.editCount = this.editCount + 1;
        const response = await axios.get(`http://localhost:3000/api/Getpatients/${patient._id}`);
        editingPatient._id = patient._id;
        editingPatient.name = response.data.name;
        editingPatient.address = response.data.address;
        editingPatient.phoneNumber = response.data.phoneNumber;
        editingPatient.email = response.data.email;
        editingIndex.value = index;
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    }

    async function handleSave(patient) {
      try {
        this.editingMode = false;
        const patientId = patient._id;
        await axios.patch(`http://localhost:3000/api/Getpatients/${patientId}`, patient);

        const index = patients.value.findIndex((p) => p._id === patientId);
        if (index !== -1) {
          patients.value[index] = { ...patient };
        }

        editingPatient.value = null;
      } catch (error) {
        console.error('Error updating patient:', error);
      }
    }

    async function handleAddPatient() {
      try {
        await axios.post('http://localhost:3000/api/patients', newPatient.value);
        patients.value.push({ ...newPatient.value });
        newPatient.value = {
          name: '',
          address: '',
          phoneNumber: '',
          email: '',
        };
        show.value = false;
      } catch (error) {
        console.error('Error creating patient:', error);
      }
    }

    async function handleLogout() {
      try {

        alert('function is working');
        await axios.post('http://localhost:3000/api/logout', {token: localStorage.getItem('token')});
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }

    const filteredPatients = computed(() => {
      const query = searchQuery.value ? searchQuery.value.toLowerCase() : '';
      if (!query) {
        return patients.value;
      }
      return patients.value.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.address.toLowerCase().includes(query) ||
          patient.phoneNumber.toLowerCase().includes(query) ||
          patient.email.toLowerCase().includes(query)
      );
    });

    const sortedPatients = computed(() => {
      const field = sortBy.value;
      const direction = sortDirection.value === 'asc' ? 1 : -1;
      if (!field) {
        return filteredPatients.value;
      }
      return filteredPatients.value.slice().sort((a, b) => {
        if (a[field] < b[field]) {
          return -1 * direction;
        }
        if (a[field] > b[field]) {
          return 1 * direction;
        }
        return 0;
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(sortedPatients.value.length / itemsPerPage.value);
    });

    const paginatedPatients = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return sortedPatients.value.slice(start, end);
    });

    function sort(field) {
      if (sortBy.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy.value = field;
        sortDirection.value = 'asc';
      }
    }

    function changePage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    }

    async function fetchPatients() {
      try {
        const response = await axios.get('http://localhost:3000/api/Getpatients', {
          params: {
            token: window.localStorage.getItem('token')
          }
        });
        patients.value = response.data;
      
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    }

    onMounted(async () => {
        fetchPatients();
    });

    return {
      editingMode: false,
      show,
      patients,
      newPatient,
      editingPatient,
      searchQuery,
      currentPage,
      itemsPerPage,
      sortBy,
      sortDirection,
      handleShow,
      handleClose,
      handleAddPatient,
      filteredPatients,
      sortedPatients,
      totalPages,
      paginatedPatients,
      handleEdit,
      handleSave,
      sort,
      changePage,
      handleLogout,
      fetchPatients
    };
  },
};
</script>










<style scoped>
@import url('https://fonts.googleapis.com/css?family=Material+Icons');
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

/* .container {
  margin-top: 90px;
} */

.crud {
  color: blueviolet;
}

.search {
  margin-top: 10px;
  width: 60%;
  font: bold
}

.form-inline {
  color: aqua
}

.table-responsive {
  color: brown
}

.table {
  margin-bottom: 10px;
}

.model_box {
  padding: 5px;
}

.row {
  margin-bottom: 25px;
}

.btn {
  margin: 5px;
}

/* .navbar{
  padding: 15px;
} */


/* .nav-link {
  margin-left: 80%;
} */
</style>