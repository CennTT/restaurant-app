<template>
  <div class="table m-4">
    <div class="container m-2 p-2">
      <h3>Tables</h3>
      <div class="row">
        <div v-for="i in 20" :key="i" class="col-md-2">
          <div class="box rounded">
            {{ i }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    margin: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
</style>
