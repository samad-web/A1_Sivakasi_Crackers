// Sample data for demonstration
export const sampleData = [
    {
        id: 1,
        name: 'John Smith',
        contact: '+91 98765 43210',
        messageSent: 'Yes',
        paymentStatus: 'paid',
        responseStatus: 'responded',
        date: '2024-01-15'
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        contact: '+91 98765 43211',
        messageSent: 'Yes',
        paymentStatus: 'not-paid',
        responseStatus: 'not-responding',
        date: '2024-01-16'
    },
    {
        id: 3,
        name: 'Michael Brown',
        contact: '+91 98765 43212',
        messageSent: 'Yes',
        paymentStatus: 'paid',
        responseStatus: 'responded',
        date: '2024-01-17'
    },
    {
        id: 4,
        name: 'Emily Davis',
        contact: '+91 98765 43213',
        messageSent: 'Yes',
        paymentStatus: 'pending',
        responseStatus: 'responded',
        date: '2024-01-18'
    },
    {
        id: 5,
        name: 'David Wilson',
        contact: '+91 98765 43214',
        messageSent: 'Yes',
        paymentStatus: 'paid',
        responseStatus: 'responded',
        date: '2024-01-19'
    },
    {
        id: 6,
        name: 'Jennifer Martinez',
        contact: '+91 98765 43215',
        messageSent: 'Yes',
        paymentStatus: 'not-paid',
        responseStatus: 'pending',
        date: '2024-01-20'
    },
    {
        id: 7,
        name: 'Robert Garcia',
        contact: '+91 98765 43216',
        messageSent: 'Yes',
        paymentStatus: 'paid',
        responseStatus: 'responded',
        date: '2024-01-21'
    },
    {
        id: 8,
        name: 'Lisa Anderson',
        contact: '+91 98765 43217',
        messageSent: 'Yes',
        paymentStatus: 'not-paid',
        responseStatus: 'not-responding',
        date: '2024-01-22'
    },
    {
        id: 9,
        name: 'James Taylor',
        contact: '+91 98765 43218',
        messageSent: 'Yes',
        paymentStatus: 'paid',
        responseStatus: 'responded',
        date: '2024-01-23'
    },
    {
        id: 10,
        name: 'Mary Thomas',
        contact: '+91 98765 43219',
        messageSent: 'Yes',
        paymentStatus: 'pending',
        responseStatus: 'pending',
        date: '2024-01-24'
    }
]

// Populate reports table
export function populateReportsTable(data) {
    const tbody = document.getElementById('reportsTableBody')
    if (!tbody) return

    tbody.innerHTML = data.map(row => `
    <tr>
      <td>${row.name}</td>
      <td>${row.contact}</td>
      <td>${row.messageSent}</td>
      <td>
        <span class="status-badge ${row.paymentStatus}">
          ${formatStatus(row.paymentStatus)}
        </span>
      </td>
      <td>
        <span class="status-badge ${row.responseStatus === 'responded' ? 'paid' : row.responseStatus === 'not-responding' ? 'not-responding' : 'not-paid'}">
          ${formatStatus(row.responseStatus)}
        </span>
      </td>
      <td>${formatDate(row.date)}</td>
      <td>
        <button class="btn-text" onclick="editRow(${row.id})">Edit</button>
      </td>
    </tr>
  `).join('')
}

function formatStatus(status) {
    return status.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export function editRow(id) {
    alert(`Edit functionality for row ${id} (Demo)`)
}

// Google Sheets API integration (placeholder)
export async function syncWithGoogleSheets() {
    // This would integrate with Google Sheets API
    console.log('Syncing with Google Sheets...')
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Sync complete!')
            resolve({ success: true })
        }, 1500)
    })
}

// Export data to CSV
export function exportToCSV(data) {
    const headers = ['Name', 'Contact', 'Message Sent', 'Payment Status', 'Response Status', 'Date']
    const csvContent = [
        headers.join(','),
        ...data.map(row => [
            row.name,
            row.contact,
            row.messageSent,
            row.paymentStatus,
            row.responseStatus,
            row.date
        ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reports_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}

// Data management and filtering
let allData = [...sampleData]
let filteredData = [...sampleData]

// Search functionality
export function searchData(query, data = allData) {
    if (!query || query.trim() === '') {
        return data
    }

    const searchTerm = query.toLowerCase()
    return data.filter(row => {
        return (
            row.name.toLowerCase().includes(searchTerm) ||
            row.contact.toLowerCase().includes(searchTerm) ||
            row.paymentStatus.toLowerCase().includes(searchTerm) ||
            row.responseStatus.toLowerCase().includes(searchTerm)
        )
    })
}

// Filter by status
export function filterByStatus(status, data = allData) {
    if (!status || status === '') {
        return data
    }

    return data.filter(row => row.paymentStatus === status)
}

// Combined search and filter
export function applyFilters(searchQuery, statusFilter, data = allData) {
    let result = data

    // Apply status filter first
    if (statusFilter && statusFilter !== '') {
        result = filterByStatus(statusFilter, result)
    }

    // Then apply search
    if (searchQuery && searchQuery.trim() !== '') {
        result = searchData(searchQuery, result)
    }

    filteredData = result
    return result
}

// Pagination
export class Pagination {
    constructor(data, itemsPerPage = 10) {
        this.data = data
        this.itemsPerPage = itemsPerPage
        this.currentPage = 1
        this.totalPages = Math.ceil(data.length / itemsPerPage)
    }

    updateData(data) {
        this.data = data
        this.totalPages = Math.ceil(data.length / this.itemsPerPage)
        this.currentPage = 1
    }

    getCurrentPageData() {
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.data.slice(start, end)
    }

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page
            return this.getCurrentPageData()
        }
        return null
    }

    nextPage() {
        return this.goToPage(this.currentPage + 1)
    }

    previousPage() {
        return this.goToPage(this.currentPage - 1)
    }

    hasNextPage() {
        return this.currentPage < this.totalPages
    }

    hasPreviousPage() {
        return this.currentPage > 1
    }

    getPageInfo() {
        const start = (this.currentPage - 1) * this.itemsPerPage + 1
        const end = Math.min(this.currentPage * this.itemsPerPage, this.data.length)
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            totalItems: this.data.length,
            start,
            end
        }
    }
}

// Update row data
export function updateRowData(id, updatedData) {
    const index = allData.findIndex(row => row.id === id)
    if (index !== -1) {
        allData[index] = { ...allData[index], ...updatedData }
        return true
    }
    return false
}

// Add new row
export function addRowData(newRow) {
    const newId = Math.max(...allData.map(r => r.id), 0) + 1
    const rowWithId = { id: newId, ...newRow }
    allData.push(rowWithId)
    return rowWithId
}

// Delete row
export function deleteRowData(id) {
    const index = allData.findIndex(row => row.id === id)
    if (index !== -1) {
        allData.splice(index, 1)
        return true
    }
    return false
}

// Get all data
export function getAllData() {
    return [...allData]
}

// Parse CSV file
export function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim())
    if (lines.length < 2) {
        throw new Error('CSV file is empty or has no data rows')
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    const rows = []

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim())

        const row = {
            name: values[headers.indexOf('name')] || values[headers.indexOf('customer name')] || '',
            contact: values[headers.indexOf('contact')] || values[headers.indexOf('phone')] || '',
            messageSent: values[headers.indexOf('message sent')] || 'Yes',
            paymentStatus: values[headers.indexOf('payment status')] || 'pending',
            responseStatus: values[headers.indexOf('response status')] || 'pending',
            date: values[headers.indexOf('date')] || new Date().toISOString().split('T')[0]
        }

        // Validate required fields
        if (row.name && row.contact) {
            rows.push(row)
        }
    }

    return rows
}

// Bulk import from CSV
export function importFromCSV(csvText) {
    try {
        const rows = parseCSV(csvText)
        rows.forEach(row => addRowData(row))
        return { success: true, count: rows.length }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

// Make editRow globally available
window.editRow = editRow
