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
            <td>{{ order.orderDetails }}</td>
            <td>{{ order.status }}</td>
            <td class="d-flex">
              <button v-if="order.status === 'Open'" class="btn btn-warning me-2 rounded-pill">Edit</button>
              <button v-else class="btn btn-secondary me-2 rounded-pill" disabled>Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal v-if="isShowModal" :title="'Add New Order'" @close="close">
      <template #body>
        <div class="modal-body">
          <div v-for="(form, index) in orderForms" :key="index">
            <div class="form-group">
              <label for="tableNumber" class="fw-semibold mb-2">Table Number:</label>
              <select v-model="form.tableNumber" class="form-select" style="border-color: orange;">
                <option value="1">1</option>
                <option value="2">2</option>
                <!-- ga ush gw lanjutin lah ya, nanti pakai dari API aj -->
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
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  data() {
    return {
      orders: [
        { tableNumber: 1, orderDetails: 'See Details', status: 'Invoiced' },
        { tableNumber: 3, orderDetails: 'See Details', status: 'Open' },
        { tableNumber: 6, orderDetails: 'See Details', status: 'Open' },
      ],
      isShowModal: false,
      orderForms: [
        {
          tableNumber: '',
          menu: '',
          qty: '',
        },
      ],
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
      // Add logic to save orders
      this.orders.push(...this.orderForms);
      this.close();
    },
    addNewForm() {
      this.orderForms.push({
        tableNumber: '',
        menu: '',
        qty: '',
      });
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