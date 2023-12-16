<template>
  <div class="home m-4">
    <div class="container m-2 p-2">
      <h3>Home</h3>
      <ul class="box-info mt-4">
        <li>
          <div class="icon-with-text" style="background-color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <i class="fas fa-braille me-4 p-4 rounded" style="font-size: 30px; background-color: #ffd6d6; color: #e14040;"></i>
            <span class="text">
              <h4>Tables</h4>
              <div class="tables-category d-flex gap-2">
                <h6 class="text-danger fw-bold">In Used: 6</h6>
                <h6 class="text-secondary fw-bold">Available: 14</h6>
              </div>            
            </span>
          </div>
        </li>
        <li>
          <div class="icon-with-text" style="background-color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <i class="fas fa-receipt me-4 p-4 rounded"  style="font-size: 30px; background-color: #fffcd6; color: #e19040;"></i>
            <span class="text">
              <h4>Orders</h4>
              <div class="orders-category d-flex gap-2">
                <h6 class="text-warning fw-bold">Open: 0</h6>
                <h6 class="text-secondary fw-bold">Invoiced: 6</h6>
              </div>            
            </span>
          </div>
        </li>
        <li>
          <div class="icon-with-text" style="background-color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <i class="fas fa-cutlery me-4 p-4 rounded" style="font-size: 30px; background-color: #d6f7ff; color: #4088e1;"></i>
            <span class="text">
              <h4>Menus</h4>
              <div class="menus-category d-flex gap-2">
                <h6 class="text-primary fw-bold">Foods: 7</h6>
                <h6 class="text-secondary fw-bold">Beverages: 7</h6>
              </div>            
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .box-info {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 0;
  }

  .box-info li {
    border-radius: 10px;
    width: 30%; 
  }

  .icon-with-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .icon-with-text .text {
    flex: 1;
  }

  .icon-with-text h3,
  .icon-with-text p {
    margin: 5px 0;
  }
</style>
