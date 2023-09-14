import { Api } from '../../../api/Api.js'
import { contactsUrl } from '../../../api/url.js'

export class Collection {
  #list = []

  constructor() {
    this.api = new Api(contactsUrl)
  }

  async getList() {
    try {
      const list = await this.api.getList()
      this.setWaiters(list)
      return list
    } 
    catch (error) {
      throw error
    }
  }

  async remove(id) {
    try {
      await this.api.delete(id)
      this.deleteWaiterInList(id)
      return id
    } 
    catch (error) {
      throw error
    }
  }

  async create(waiter) {
    try {
      const newWaiterWithId = await this.api.create(waiter)
      this.addWaiterInList(newWaiterWithId)
      return newWaiterWithId
    } 
    catch (error) {
      throw error
    }
  }

  async update(waiter) {
    try {
      await this.api.update(waiter.id, waiter)
      this.replaceWaiterInList(waiter.id, waiter)
      return waiter
    } catch (error) {
      throw error
    }
  }

  setWaiters(list) {
    this.#list = list
  }

  getWaiters() {
    return this.#list
  }

  getWaiterById(id) {
    return this.#list.find(waiter => waiter.id === id)
  }

  replaceWaiterInList(id, waiter) {
    this.#list = this.#list.map(w => w.id === Number(id) ? { ...waiter, id: Number(id) } : w)
  }

  addWaiterInList(waiter) {
    this.#list.push(waiter)
  }

  deleteWaiterInList(id) {
    this.#list = this.#list.filter(waiter => waiter.id !== Number(id))
  }
}