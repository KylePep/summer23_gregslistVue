<template>
     <div class="d-flex border border-dark rounded bg-light">
          <img class="img-fluid" :src="houseProp.imgUrl" alt="House" style="height: 40vh;">
          <div class="d-flex flex-column justify-content-between"> 
            <div>
              <div>Price: {{ houseProp.price }}</div>
              <div>Year: {{ houseProp.year }}</div>
              <div>Bathrooms: {{ houseProp.bathrooms }}</div>
              <div>Bedrooms: {{ houseProp.bedrooms }}</div>
              <div>Levels: {{ houseProp.levels }}</div>
              <div>Description: {{ houseProp.description }}</div>
              <div class="d-flex">
                <div> Listed by: {{ houseProp.creator.name }}</div>
                <img class="creator-picture" :src="houseProp.creator.picture" :alt="houseProp.creator.name">
              </div>
            </div>
            <div v-if="houseProp.creator.id == account.id">
              <button @click="removeHouse()" class="btn btn-danger" title="Delete house" type="button">
                Delete
              </button>
              <button @click="setHouseToEdit()" class="btn btn-info" title="Edit house" type="button" data-bs-toggle="modal"
          data-bs-target="#formModal">
                Edit
              </button>
            </div>
          </div>
        </div>
</template>


<script>
import { computed } from "vue";
import { House } from "../models/House.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";

export default {
  props:{
    houseProp:{type: House, required: true}
  },
  setup(props){
    return {
      account: computed(()=> AppState.account),

      async removeHouse(){
        try {
          const wantsToRemoveHouse = await Pop.confirm('Delete This House?')
          if (!wantsToRemoveHouse){
            return
          }
          const houseId = props.houseProp.id
          await housesService.removeHouse(houseId)
        } catch (error) {
          Pop.error(error.message)
        }
      },

      setHouseToEdit(){
        const houseToEdit = props.houseProp
        housesService.setHouseToEdit(houseToEdit)
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.creator-picture{
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
}
</style>