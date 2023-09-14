import { FormView } from '../../waiters-async-await/view/FormView.js'
import { ListView } from '../../waiters-async-await/view/ListView.js'
import { Collection } from '../../waiters-async-await/model/Collection.js'
import { showError } from '../../lib-module'

export class Controller {
    constructor(rootEl) {
        this.rootEl = rootEl
        this.collection = new Collection()
        this.formView = new FormView({
            onSubmit: waiter => this.saveWaiter(waiter),
        })
        this.listView = new ListView({
            onEdit: async (id) => {
                try {
                    const waiter = await this.collection.getWaiterById(id)
                    this.formView.fillForm(waiter)
                } 
                catch (error) {
                    showError(error)
                }
            },
            onDelete: async (id) => {
                try {
                    await this.collection.remove(id)
                    this.listView.deleteWaiterById(id)
                } 
                catch (error) {
                    showError(error)
                }
            },
        })

        this.formView.appendTo(this.rootEl)
        this.listView.appendTo(this.rootEl)

        this.init()
    }

    async init() {
        try {
            const list = await this.collection.getList()
            this.listView.renderList(list)
        } 
        catch (error) {
            showError(error)
        }
    }

    async saveWaiter(waiter) {
        try {
            if (waiter.id) {
                await this.collection.update(waiter)
                this.listView.replaceWaiterEl(waiter.id, waiter)
            }
            
            else {
                const newWaiterWithId = await this.collection.create(waiter)
                this.listView.renderWaiter(newWaiterWithId)
            }
            this.formView.clearForm()
        } catch (error) {
            showError(error)
        }
    }
}