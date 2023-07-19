<template>
  <form @submit.prevent="handleSubmit()">
  
<div class="form-floating mb-3">

  <div class="form-floating mb-3">
    <input v-model="editable.imgUrl" required type="url" class="form-control" id="imgUrl" placeholder="imgUrl...">
    <label for="imgUrl">imgUrl</label>
  </div>

    <div class="form-floating mb-3">
      <input v-model="editable.bedrooms" required type="number" class="form-control" id="bedrooms" placeholder="bedrooms...">
      <label for="bedrooms">Bedrooms</label>
    </div>
  
    <div class="form-floating mb-3">
      <input v-model="editable.bathrooms" required type="number" class="form-control" id="bathrooms"    placeholder="bathrooms...">
      <label for="bathrooms">bathrooms</label>
    </div>

    <div class="form-floating mb-3">
      <input v-model="editable.levels" required type="number" class="form-control" id="levels" placeholder="levels...">
      <label for="levels">levels</label>
    </div>

    <div class="form-floating mb-3">
      <input v-model="editable.price" required type="number" class="form-control" id="price" placeholder="price...">
      <label for="price">price</label>
    </div>

    <div class="form-floating mb-3">
      <input v-model="editable.year" required type="number" class="form-control" id="year" placeholder="year...">
      <label for="year">year</label>
    </div>

    <div class="form-floating mb-3">
      <textarea v-model="editable.description" class="form-control" placeholder="Leave a description here"
          id="description" style="height: 100px"></textarea>
        <label for="description">Description</label>
    </div>
    </div>
    <button class="btn btn-success">Submit</button>
  </form>

</template>


<script>
import { ref, watchEffect } from "vue";
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { Modal } from "bootstrap";
import { AppState } from "../AppState.js";

export default {
  setup(){
    const editable = ref({})

    watchEffect(()=> {
      if (AppState.activeHouse) {
        const houseWithBrokenReference = {...AppState.activeHouse}
        editable.value = houseWithBrokenReference
      }
    })

    return {
      editable,
      handleSubmit() {
        if (editable.value.id) {
          this.editHouse()
        }
        else {
          this.createHouse()
        }
      },

      async createHouse(){
        try {
          const houseData = editable.value
          logger.log(houseData)
          await housesService.createHouse(houseData)
          
          editable.value = {}
          Modal.getOrCreateInstance('#formModal').hide()
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async editHouse(){
        try {
          const houseData = editable.value
          await housesService.editHouse(houseData)
          
          editable.value = {}
          Modal.getOrCreateInstance('#formModal').hide()
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>