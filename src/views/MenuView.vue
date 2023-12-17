<template>
  <div class="menu m-4">
    <div class="container m-2 p-2">
      <h3>Menu</h3>
      <div class="d-md-flex justify-content-md-end">
        <button class="btn btn-success rounded-pill" @click="callModal(null)">+ Add Menu</button>
      </div>
      <table class="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(menuItem, index) in menuItems" :key="index" :class="{ 'active-row': menuItem === selectedMenuItem }">
            <td>{{ menuItem.name }}</td>
            <td>{{ menuItem.type }}</td>
            <td>{{ menuItem.price }}</td>
            <td class="d-flex">
              <button @click="() => callModal(menuItem)" class="btn btn-warning me-2 rounded-pill">Edit</button>
              <button @click="deleteMenuItem(index)" class="btn btn-danger rounded-pill">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal v-if="isShowModal" :title="selectedMenuItem ? 'Edit Menu' : 'Add Menu'" @close="close">
        <template #body>
          <div style="display: flex; flex-direction: column;">
            <div style="margin-bottom: 10px;">
              <label for="name" class="fw-semibold mb-2">Name:</label>
              <input v-model="editedMenuItem.name" type="text" id="name" class="form-control" style="border-color: orange;">
            </div>

            <div style="margin-bottom: 10px;">
              <label for="types" class="fw-semibold mb-2">Types:</label>
              <select v-model="editedMenuItem.type" id="types" class="form-select" style="border-color: orange;">
                <option value="foods">Foods</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>

            <div>
              <label for="price" class="fw-semibold mb-2">Price:</label>
              <input v-model="editedMenuItem.price" type="text" id="price" class="form-control" style="border-color: orange;">
            </div>
          </div>
        </template>
        <template #footer>
          <button class="btn bg-secondary bg-opacity-50 rounded-pill px-4" @click="close">Cancel</button>
          <button class="btn btn-success rounded-pill px-4" @click="saveMenuItem">Save</button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import axios from 'axios';

export default {
  data() {
    return {
      isShowModal: false,
      selectedMenuItem: null,
      editedMenuItem: null,
      menuItems: []
    };
  },
  created() {
    this.fetchMenuItems();
  },
  components: {
    Modal
  },
  methods: {
    async fetchMenuItems() {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/v1/foodnbaverages"
				);

				if (response) {
					const data = response.data;
					this.menuItems = data.foods || [];
					if (data.foods && data.foods.length > 0) {
						this.editedMenuItem = { ...data.foods[0] };
					}
				} else {
					throw new Error("Failed to fetch data");
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		},
    close() {
      this.isShowModal = false;
      this.selectedMenuItem = null;
      this.editedMenuItem = { name: '', type: 'foods', price: '' }; 
    },
    callModal(menuItem) {
      this.selectedMenuItem = menuItem;

      if (menuItem) {
        this.editedMenuItem = { ...menuItem }; 
      } else {
        this.editedMenuItem = { name: '', type: 'foods', price: '' };
      }

      this.isShowModal = true;
    },
    saveMenuItem() {
      if (this.selectedMenuItem) {
        const index = this.menuItems.indexOf(this.selectedMenuItem);
        if (index !== -1) {
          this.menuItems[index] = { ...this.editedMenuItem }; 
        }
      } else {
        this.menuItems.push({ ...this.editedMenuItem }); 
      }
      this.isShowModal = false;
    },
    deleteMenuItem(index) {
      this.menuItems.splice(index, 1);
    }
  }
};
</script>


<style scoped>
  .content-table {
      border-collapse: collapse;
      margin: 25px 0;
      width: 100%;
      border-radius: 5px 5px 0 0;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .content-table thead tr {
      background-color: #FF8A00;
      color: #ffffff;
      text-align: left;
      font-weight: bold;
  }

  .content-table th,
  .content-table td {
      padding: 12px 15px;
  }

  .content-table tbody tr {
      border-bottom: 1px solid #dddddd;
  }

  .content-table tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
  }

  .content-table tbody tr:last-of-type {
      border-bottom: 2px solid #FF8A00;
  }

  .content-table tbody tr.active-row {
      font-weight: bold;
      color: #FF8A00;
  }
</style>

