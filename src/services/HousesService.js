import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {
  async getHouses() {
    const res = await api.get('api/houses')
    // logger.log('[Response from Api]', res.data)

    const houses = res.data.map(housePojo => new House(housePojo))
    AppState.houses = houses
    // logger.log('[Appstate houses]', AppState.houses)
  }

  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    const house = new House(res.data)
    const houses = AppState.houses
    houses.push(house)
  }

  async removeHouse(houseId) {
    const res = await api.delete(`api/houses/${houseId}`)
    logger.log(res.data)
    const house = AppState.houses.findIndex(h => h.id == houseId)
    AppState.houses.splice(house, 1)
  }

  async editHouse(houseData) {
    const res = await api.put(`api/houses/${houseData.id}`, houseData)
    logger.log(res.data)
    const houseIndex = AppState.houses.findIndex(h => h.id == houseData.id)
    const house = new House(res.data)
    AppState.houses.splice(houseIndex, 1, house)
  }

  setHouseToEdit(houseToEdit) {
    AppState.activeHouse = houseToEdit
  }

}
export const housesService = new HousesService()