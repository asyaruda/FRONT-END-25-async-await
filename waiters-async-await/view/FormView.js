import { clearFormData, 
         fillFormData,  
        getFormData, 
        isEmpty,
        showError,} 
from '../../../lib-module'

export class FormView {
    constructor() {
        this.container = this.init()
    }

    init() {
        const div = document.createElement('div')

        div.innerHTML = `
            <form id="waitersForm" class="form">
                <input type="hidden" name="id" id="id" class="formInput">
                <input type="text" name="firstName" id="firstName" class="formInput" placeholder="first name"/>
                <input type="text" name="phone" id="phone" class="formInput" placeholder="phone number"/>
                <button>Save</button>
            </form>
         `

         return div.children[0]
    }

    bindEvents() {
        this.form.addEventListener('submit', this.onFormSubmit.bind(this))
      }
    
      appendTo(rootEl) {
        rootEl.append(this.form)
      }
    
      onFormSubmit (e) {
        e.preventDefault()
    
        const waiter = getFormData(this.form.elements)
    
        if (!this.isWaiterValid(contact)) {
          showError('Invalid form data')
          return;
        }
    
        this.options.onSubmit(waiter)
      }
    
      isWaiterValid (waiter) {
        return !isEmpty(waiter.Name)
          && !isEmpty(waiter.Phone)
          && !isEmpty(waiter.Action)
      }
    
      fillForm(waiter) {
        fillFormData(this.form.elements, waiter)
      }
    
      clearForm() {
        clearFormData(this.form.elements)
      }
    }
