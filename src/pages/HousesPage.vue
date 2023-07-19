<template>
  <h1>Houses</h1>
  <div class="container-fluid">
    <button v-if="account.id" class="btn btn-secondary" data-bs-toggle="modal"
          data-bs-target="#formModal">List house</button>
    <section class="row">
      <div v-for="house in houses" :key="house.id" class="col-10 m-auto mb-3">
        <!-- <div class="d-flex border border-dark rounded bg-light">
          <img class="img-fluid" :src="house.imgUrl" alt="House" style="height: 40vh;">
          <div class="d-flex flex-column justify-content-between"> 
            <div>
              <div>Bathrooms: {{ house.bathrooms }}</div>
              <div>Bedrooms: {{ house.bedrooms }}</div>
              <div>Levels: {{ house.levels }}</div>
              <div>Description: {{ house.description }}</div>
            </div>
            <div v-if="house.creator.id == account.id">
              <button @click="removeHouse(`${house.id}`)" class="btn btn-danger" title="Delete house" type="button">
                Delete
              </button>
              <button class="btn btn-info">
                Edit
              </button>
            </div>
          </div>
        </div> -->
        <HouseCard :houseProp="house"/>
      </div>
    </section>
  </div>

  <ModalComponent>
    <!-- <h1>Slots are cool</h1> -->
    <template #header>
      <span> House Form</span>
    </template>
    <template #body>
      <!-- <CarForm /> -->
      <HouseForm />
    </template>
  </ModalComponent>
</template>


<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";

export default {
  setup(){

    async function getHouses(){
      try {
        await housesService.getHouses()
      } catch (error) {
        Pop.error(error.message)
      }


    }

    onMounted(()=>{
      getHouses()
    })
    return {
      houses: computed(() => AppState.houses),
      account: computed(() => AppState.account),
      async removeHouse(houseId){
        try {
          const wantsToRemoveHouse = await Pop.confirm('Delete This House?')
          if (!wantsToRemoveHouse){
            return
          }
          const house = houseId
          logger.log(houseId)
          await housesService.removeHouse(house)
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