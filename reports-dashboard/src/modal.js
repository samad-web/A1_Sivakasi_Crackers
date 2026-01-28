// Modal System for Dashboard Application

export class Modal {
    constructor() {
        this.modalContainer = null
        this.isOpen = false
    }

    create(content, options = {}) {
        const {
            title = '',
            width = '600px',
            onClose = null,
            className = ''
        } = options

        // Remove existing modal if any
        this.close()

        // Create modal HTML
        this.modalContainer = document.createElement('div')
        this.modalContainer.className = `modal-overlay ${className}`
        this.modalContainer.innerHTML = `
      <div class="modal-dialog" style="max-width: ${width}">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          ${content}
        </div>
      </div>
    `

        document.body.appendChild(this.modalContainer)

        // Add event listeners
        const closeBtn = this.modalContainer.querySelector('.modal-close')
        closeBtn.addEventListener('click', () => {
            if (onClose) onClose()
            this.close()
        })

        // Close on overlay click
        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                if (onClose) onClose()
                this.close()
            }
        })

        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                if (onClose) onClose()
                this.close()
                document.removeEventListener('keydown', escapeHandler)
            }
        }
        document.addEventListener('keydown', escapeHandler)

        // Animate in
        setTimeout(() => {
            this.modalContainer.classList.add('active')
        }, 10)

        this.isOpen = true
        return this.modalContainer
    }

    close() {
        if (this.modalContainer) {
            this.modalContainer.classList.remove('active')
            setTimeout(() => {
                if (this.modalContainer && this.modalContainer.parentNode) {
                    this.modalContainer.parentNode.removeChild(this.modalContainer)
                }
                this.modalContainer = null
                this.isOpen = false
            }, 300)
        }
    }

    getContainer() {
        return this.modalContainer
    }
}

// Dropdown system
export class Dropdown {
    constructor(triggerElement, content, options = {}) {
        this.trigger = triggerElement
        this.content = content
        this.isOpen = false
        this.dropdown = null
        this.options = {
            position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
            width: '300px',
            ...options
        }

        this.init()
    }

    init() {
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation()
            this.toggle()
        })
    }

    toggle() {
        if (this.isOpen) {
            this.close()
        } else {
            this.open()
        }
    }

    open() {
        // Close other dropdowns
        document.querySelectorAll('.dropdown-panel.active').forEach(panel => {
            panel.classList.remove('active')
            setTimeout(() => panel.remove(), 300)
        })

        this.dropdown = document.createElement('div')
        this.dropdown.className = `dropdown-panel ${this.options.position}`
        this.dropdown.style.width = this.options.width
        this.dropdown.innerHTML = this.content

        // Position the dropdown
        const rect = this.trigger.getBoundingClientRect()

        if (this.options.position.includes('bottom')) {
            this.dropdown.style.top = `${rect.bottom + 8}px`
        } else {
            this.dropdown.style.bottom = `${window.innerHeight - rect.top + 8}px`
        }

        if (this.options.position.includes('right')) {
            this.dropdown.style.right = `${window.innerWidth - rect.right}px`
        } else {
            this.dropdown.style.left = `${rect.left}px`
        }

        document.body.appendChild(this.dropdown)

        // Animate in
        setTimeout(() => {
            this.dropdown.classList.add('active')
        }, 10)

        this.isOpen = true

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', this.closeOnOutsideClick.bind(this))
        }, 10)
    }

    close() {
        if (this.dropdown) {
            this.dropdown.classList.remove('active')
            setTimeout(() => {
                if (this.dropdown && this.dropdown.parentNode) {
                    this.dropdown.parentNode.removeChild(this.dropdown)
                }
                this.dropdown = null
                this.isOpen = false
            }, 300)
            document.removeEventListener('click', this.closeOnOutsideClick.bind(this))
        }
    }

    closeOnOutsideClick(e) {
        if (this.dropdown && !this.dropdown.contains(e.target) && !this.trigger.contains(e.target)) {
            this.close()
        }
    }

    update(content) {
        if (this.dropdown) {
            this.dropdown.innerHTML = content
        }
    }
}

// Create edit row modal
export function createEditModal(rowData, onSave) {
    const modal = new Modal()

    const content = `
    <form id="editRowForm" class="edit-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="edit-name">Customer Name <span class="required">*</span></label>
          <input type="text" id="edit-name" value="${rowData.name}" required>
        </div>
        <div class="form-group">
          <label for="edit-contact">Contact <span class="required">*</span></label>
          <input type="tel" id="edit-contact" value="${rowData.contact}" required>
        </div>
        <div class="form-group">
          <label for="edit-message">Message Sent</label>
          <select id="edit-message">
            <option value="Yes" ${rowData.messageSent === 'Yes' ? 'selected' : ''}>Yes</option>
            <option value="No" ${rowData.messageSent === 'No' ? 'selected' : ''}>No</option>
          </select>
        </div>
        <div class="form-group">
          <label for="edit-payment">Payment Status <span class="required">*</span></label>
          <select id="edit-payment" required>
            <option value="paid" ${rowData.paymentStatus === 'paid' ? 'selected' : ''}>Paid</option>
            <option value="not-paid" ${rowData.paymentStatus === 'not-paid' ? 'selected' : ''}>Not Paid</option>
            <option value="pending" ${rowData.paymentStatus === 'pending' ? 'selected' : ''}>Pending</option>
          </select>
        </div>
        <div class="form-group">
          <label for="edit-response">Response Status</label>
          <select id="edit-response">
            <option value="responded" ${rowData.responseStatus === 'responded' ? 'selected' : ''}>Responded</option>
            <option value="not-responding" ${rowData.responseStatus === 'not-responding' ? 'selected' : ''}>Not Responding</option>
            <option value="pending" ${rowData.responseStatus === 'pending' ? 'selected' : ''}>Pending</option>
          </select>
        </div>
        <div class="form-group">
          <label for="edit-date">Date</label>
          <input type="date" id="edit-date" value="${rowData.date}">
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn-secondary" id="cancelEdit">Cancel</button>
        <button type="submit" class="btn-primary">Save Changes</button>
      </div>
    </form>
  `

    modal.create(content, {
        title: 'Edit Customer Entry',
        width: '700px'
    })

    // Handle form submission
    const form = document.getElementById('editRowForm')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const updatedData = {
            ...rowData,
            name: document.getElementById('edit-name').value,
            contact: document.getElementById('edit-contact').value,
            messageSent: document.getElementById('edit-message').value,
            paymentStatus: document.getElementById('edit-payment').value,
            responseStatus: document.getElementById('edit-response').value,
            date: document.getElementById('edit-date').value
        }

        onSave(updatedData)
        modal.close()
    })

    // Handle cancel
    document.getElementById('cancelEdit').addEventListener('click', () => {
        modal.close()
    })

    return modal
}
