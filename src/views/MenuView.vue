<template>
	<div class="menu m-4">
		<div class="container m-2 p-2">
			<h3>Menu</h3>
			<div class="d-md-flex justify-content-md-end">
				<button
					class="btn btn-success rounded-pill"
					@click="callModal(null)"
				>
					+ Add Menu
				</button>
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
					<tr
						v-for="(menuItem, index) in menuItems"
						:key="index"
						:class="{ 'active-row': menuItem === selectedMenuItem }"
					>
						<td>{{ menuItem.name }}</td>
						<td>{{ menuItem.type }}</td>
						<td>{{ menuItem.price }}</td>
						<td class="d-flex">
							<button
								@click="() => callModal(menuItem)"
								class="btn btn-warning me-2 rounded-pill"
							>
								Edit
							</button>
							<button
								@click="deleteMenuItem(index)"
								class="btn btn-danger rounded-pill"
							>
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<Modal
				v-if="isShowModal"
				:title="selectedMenuItem ? 'Edit Menu' : 'Add Menu'"
				@close="close"
			>
				<template #body>
					<div style="display: flex; flex-direction: column">
						<div style="margin-bottom: 10px">
							<label for="name" class="fw-semibold mb-2"
								>Name:</label
							>
							<input
								v-model="editedMenuItem.name"
								type="text"
								id="name"
								class="form-control"
								style="border-color: orange"
							/>
						</div>

						<div style="margin-bottom: 10px">
							<label for="types" class="fw-semibold mb-2"
								>Types:</label
							>
							<select
								v-model="editedMenuItem.type"
								id="types"
								class="form-select"
								style="border-color: orange"
							>
								<option value="food">Foods</option>
								<option value="beverage">Beverages</option>
							</select>
						</div>

						<div>
							<label for="price" class="fw-semibold mb-2"
								>Price:</label
							>
							<input
								v-model="editedMenuItem.price"
								type="text"
								id="price"
								class="form-control"
								style="border-color: orange"
							/>
						</div>
					</div>
				</template>
				<template #footer>
					<button
						class="btn bg-secondary bg-opacity-50 rounded-pill px-4"
						@click="close"
					>
						Cancel
					</button>
					<button
						class="btn btn-success rounded-pill px-4"
						@click="saveMenuItem"
					>
						Save
					</button>
				</template>
			</Modal>
		</div>
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { useMenuStore } from '@/store/menuStore';
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
  async created() {
    try {
      const menuStore = useMenuStore();
      await menuStore.fetchMenuItems();   

      this.menuItems = menuStore.menuItems;

      if (this.menuItems.length > 0) {
        this.editedMenuItem = { ...this.menuItems[0] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  components: {
    Modal
  },
  methods: {
    close() {
      this.isShowModal = false;
      this.selectedMenuItem = null;
      this.editedMenuItem = { name: '', type: '', price: '' };
    },
    callModal(menuItem) {
      this.selectedMenuItem = menuItem;
      if (menuItem) {
        this.editedMenuItem = { ...menuItem };
      } else {
        this.editedMenuItem = { name: '', type: 'food', price: 0 };
      }

      this.isShowModal = true;
    },
    async saveMenuItem() {
    try {
      if (this.selectedMenuItem) {
        const index = this.menuItems.findIndex(item => item.id === this.selectedMenuItem.id);
        if (index !== -1) {
          this.menuItems[index] = { ...this.editedMenuItem };

          await axios.put(`http://localhost:5000/api/v1/foodnbaverages/${this.selectedMenuItem.id}`, this.editedMenuItem);
        }
      } else {
        this.editedMenuItem.price = parseFloat(this.editedMenuItem.price);
        console.log(this.editedMenuItem);
        const response = await axios.post('http://localhost:5000/api/v1/create-foodnbaverage', this.editedMenuItem);
        const newItem = response.data;

        this.menuItems.push(newItem);
        window.location.reload();
      }
      this.isShowModal = false;
    } catch (error) {
      console.error("Error updating/creating item:", error);
    }
  },
    async deleteMenuItem(index) {
      try {
        const deletedItemId = this.menuItems[index].id;
        await axios.delete(`http://localhost:5000/api/v1/foodnbaverages/${deletedItemId}`);
        this.menuItems.splice(index, 1);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
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
	background-color: #ff8a00;
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
	border-bottom: 2px solid #ff8a00;
}

.content-table tbody tr.active-row {
	font-weight: bold;
	color: #ff8a00;
}
</style>
