<template>
  <div class="order m-4">
    <div class="container m-2 p-2">
      <h3>Orders</h3>
      <div class="d-md-flex justify-content-md-end">
        <button class="btn btn-success rounded-pill" @click="callModal">+ Add Order</button>
      </div>
      <table class="content-table">
        <thead>
          <tr>
            <th scope="col">Table Number</th>
            <th scope="col">List of Orders</th>
            <th scope="col">Status</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(order, index) in orders" :key="index" :class="{ 'active-row': order.status === 'Open' }">
          <td>{{ order.tableNumber }}</td>
          <td>
            <span v-if="order.orderDetails.length === 0">See Details</span>
            <button class="btn btn-sm btn-outline-warning rounded-pill" v-else @click="showDetails(order.orderDetails)">See Details</button>
          </td>
          <td>{{ order.status }}</td>
          <td class="d-flex">
            <button v-if="order.status === 'Open'" class="btn btn-warning me-2 rounded-pill" @click="editOrder(index)">Edit</button>
            <button v-else class="btn btn-secondary me-2 rounded-pill" disabled>Edit</button>
          </td>
        </tr>
      </tbody>
      </table>
    </div>

    <!-- Ini modal untuk yang Add New Order --> 
    <Modal v-if="isShowModal" :title="'Add New Order'" @close="close">
      <template #body>
        <div class="modal-body">
          <div v-for="(form, index) in orderForms" :key="index">
            <div class="form-group">
              <label for="tableNumber" class="fw-semibold mb-2">Table Number:</label>
              <select v-model="form.tableNumber" class="form-select">
                <option
                  v-for="option in tableNumberOptions"
                  :key="option"
                  :value="option"
                  :style="{ 'color': isRed(option) ? 'red' : 'green' }"
                  :disabled="isRed(option)"
                >
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="form-group menu-qty d-flex gap-3">
              <div class="menu-group">
                <label for="menu" class="fw-semibold mb-2">Menu:</label>
                <select v-model="form.menu" class="form-select" style="border-color: orange; width: 400px;">
                  <option value="burger">Burger</option>
                  <option value="pizza">Pizza</option>
                  <!-- ga ush gw lanjutin lah ya, nanti pakai dari API aj -->
                </select>
              </div>
              <div class="qty-group">
                <label for="qty" class="fw-semibold mb-2">Qty:</label>
                <input v-model="form.qty" type="number" class="form-control" style="border-color: orange;">
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-primary rounded-pill mt-2" @click="addNewForm">+ Add</button>
          </div>
        </div>
      </template>
      <template #footer>
        <button class="btn bg-secondary bg-opacity-50 rounded-pill px-4" @click="close">Cancel</button>
        <button class="btn btn-success rounded-pill px-4" @click="saveOrder">Save Order</button>
      </template>
      </Modal>

      <!-- Ini Modal untuk yang Edit Order -->
      <Modal v-if="isShowEditModal" :title="'Edit Order'" @close="closeEditModal">
        <template #body>
          <div class="modal-body">
            <div class="form-group">
              <label for="tableNumber" class="fw-semibold mb-2">Table Number:</label>
              <select v-model="editedOrder.tableNumber" class="form-control">
                <option
                  v-for="option in tableNumberOptions"
                  :key="option"
                  :value="option"
                  :style="{ 'color': isRed(option) ? 'red' : 'green' }"
                  :disabled="isRed(option)"
                >
                  {{ option }}
                </option>
              </select>          
            </div>
            <h6 class="pt-3">Order:</h6>
            <ul v-if="currentOrderDetails && currentOrderDetails.length > 0">
              <li v-for="(detail, index) in currentOrderDetails" :key="index">
                {{ detail.menu }} - {{ detail.qty }}
              </li>
            </ul>
            <div v-else>
              No orders found.
            </div>
            <div class="form-group mt-3" v-for="(item, index) in editedOrder.orderDetails" :key="index">
              <label class="fw-semibold">Menu:</label>
              <select v-model="item.menu" class="form-select" style="border-color: orange; width: 400px;">
                <option value="burger">Burger</option>
                <option value="pizza">Pizza</option>
                <!-- Add other menu options as needed -->
              </select>
              <label class="fw-semibold">Qty:</label>
              <input v-model="item.qty" type="number" class="form-control" style="border-color: orange; width: 80px;">
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-sm btn-primary rounded-pill mt-2" @click="addNewFormInEdit">+ Add</button>
            </div>
          </div>
        </template>
        <template #footer>
          <button class="btn bg-secondary bg-opacity-50 rounded-pill px-4" @click="closeEditModal">Cancel</button>
          <button class="btn btn-success rounded-pill px-4" @click="saveEditedOrder">Save Changes</button>
        </template>
      </Modal>
      
      <!-- Ini modal untuk yang List of Orders/Order Details -->
      <Modal v-if="isShowDetailsModal" :title="'Order Details'" @close="closeDetailsModal">
        <template #body>
          <div class="modal-body">
            <ul v-for="(detail, index) in currentOrderDetails" :key="index">
              <li>{{ detail.menu }} - {{ detail.qty }}</li>
            </ul>
          </div>
        </template>
        <template #footer>
          <button class="btn bg-secondary bg-opacity-50 rounded-pill px-4" @click="closeDetailsModal">Close</button>
        </template>
      </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
export default {
  data() {
    return {
      orders: [
        { tableNumber: 1, orderDetails: [{ menu: 'Burger', qty: 2 }], status: 'Invoiced' },
        { tableNumber: 3, orderDetails: [], status: 'Open' },
        { tableNumber: 6, orderDetails: [{ menu: 'Burger', qty: 2 }], status: 'Open' }    
      ],
      isShowModal: false,
      orderForms: [
        {
          tableNumber: '',
          menu: '',
          qty: '',
        },
      ],
      isShowDetailsModal: false,
      currentOrderDetails: [],
      isShowEditModal: false,
      editedOrder: {}, 
      newMenuItem: {
        menu: '',
        qty: '',
      },
      tableNumberOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    };
  },
  components: {
    Modal,
  },
  methods: {
    close() {
      this.isShowModal = false;
      this.orderForms = [
        {
          tableNumber: '',
          menu: '',
          qty: '',
        },
      ];
    },
    callModal() {
      this.isShowModal = true;
    },
    saveOrder() {
      this.orders.push(...this.orderForms);
      this.close();
    },
    addNewForm() {
      const newForm = { tableNumber: this.orderForms[0].tableNumber, menu: '', qty: '' };
      this.orderForms.push(newForm);
    },
    showDetails(orderDetails) {
      this.currentOrderDetails = orderDetails;
      this.isShowDetailsModal = true;
    },
    closeDetailsModal() {
      this.isShowDetailsModal = false;
    },
    editOrder(index) {
      this.editedOrder = { ...this.orders[index] };
      this.currentOrderDetails = this.orders[index].orderDetails; 
      this.isShowEditModal = true;
    },
    EditModal() {
      this.isShowEditModal = false;
      this.editedOrder = {}; 
    },
    isRed(tableNumber) {
      const tableOrder = this.orders.find(order => order.tableNumber === tableNumber);
      return tableOrder && tableOrder.status === 'Open';
    },
    addNewFormInEdit() {
      this.editedOrder.orderDetails.push({ menu: '', qty: '' });
    },
    saveEditedOrder() {
      const validOrderDetails = this.editedOrder.orderDetails.filter(item => {
        return item.menu && item.qty > 0;
      });
      this.editedOrder.orderDetails = validOrderDetails;
      const editedIndex = this.orders.findIndex(
        order => order.tableNumber === this.editedOrder.tableNumber
      );

      if (editedIndex !== -1) {
        this.orders.splice(editedIndex, 1, this.editedOrder);
      }
      this.isShowEditModal = false;
      this.editedOrder = {};
    },

    saveOrder() {
      for (const form of this.orderForms) {
        if (form.tableNumber && form.menu && form.qty > 0) {
          const existingOrderIndex = this.orders.findIndex(order => 
            order.tableNumber === form.tableNumber && order.status === 'Open'
          );

          if (existingOrderIndex !== -1) {
            this.orders[existingOrderIndex].orderDetails.push({ menu: form.menu, qty: form.qty });
          } else {
            this.orders.push({
              tableNumber: form.tableNumber,
              orderDetails: [{ menu: form.menu, qty: form.qty }],
              status: 'Open',
            });
          }
        }
      }

      this.close();
    },


  },
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