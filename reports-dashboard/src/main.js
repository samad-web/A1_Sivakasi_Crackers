import './style.css'
import { initCharts } from './charts.js'
import { populateReportsTable, sampleData, exportToCSV, applyFilters, Pagination, updateRowData, getAllData } from './data.js'
import { createEditModal, Dropdown } from './modal.js'
import confetti from 'canvas-confetti'

// Initialize app
document.querySelector('#app').innerHTML = `
  <!-- Sidebar -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
          <path d="M10 16L14 20L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stop-color="#dc2626"/>
              <stop offset="100%" stop-color="#fbbf24"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="logo-text">A1 Sivakasi Crackers</span>
      </div>
      <button class="sidebar-toggle" id="sidebarToggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      ${createNavItem('dashboard', 'Dashboard', `
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      `)}
      ${createNavItem('data-entry', 'Data Entry', `
        <path d="M12 5v14M5 12h14"/>
      `)}
      ${createNavItem('reports', 'Reports', `
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
      `)}
      ${createNavItem('analytics', 'Analytics', `
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      `)}
      ${createNavItem('insights', 'Insights', `
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      `)}
      ${createNavItem('sync', 'Google Sheets Sync', `
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      `)}
      ${createNavItem('users', 'Users', `
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      `)}
      ${createNavItem('settings', 'Settings', `
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6"/>
      `)}
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <h1 class="page-title" id="pageTitle">Dashboard</h1>
      </div>
      <div class="header-right">
        <div class="date-range-selector">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <select id="dateRange">
            <option value="7">Last 7 days</option>
            <option value="30" selected>Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search..." id="searchInput">
        </div>
        <div class="sync-status" id="syncStatus">
          <div class="status-indicator"></div>
          <span>Synced 2m ago</span>
        </div>
        <button class="icon-button" id="notificationsBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span class="notification-badge">3</span>
        </button>
        <button class="icon-button" id="themeToggle">
          <svg class="theme-icon sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
        <div class="user-profile">
          <img src="https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff" alt="User">
          <div class="user-info">
            <span class="user-name">John Doe</span>
            <span class="user-role">Administrator</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>

    <!-- Content Pages -->
    <div class="content-wrapper">
      ${createDashboardPage()}
      ${createDataEntryPage()}
      ${createReportsPage()}
      ${createAnalyticsPage()}
      ${createInsightsPage()}
      ${createSyncPage()}
      ${createUsersPage()}
      ${createSettingsPage()}
    </div>
  </main>
`

// Helper Functions
function createNavItem(id, label, svgPath) {
  return `
    <a href="#${id}" class="nav-item ${id === 'dashboard' ? 'active' : ''}" data-page="${id}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${svgPath}
      </svg>
      <span>${label}</span>
    </a>
  `
}

function createDashboardPage() {
  return `
    <div class="page active" id="page-dashboard">
      <!-- KPI Cards -->
      <div class="kpi-grid">
        ${createKPICard('Total Messages Sent', '1,234', '+12.5%', true, 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z')}
        ${createKPICard('Paid Customers', '856', '+8.2%', true, 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0 0')}
        ${createKPICard('Not Paid', '298', '-3.1%', false, 'M12 12a10 10 0 1 0 0 0 M15 9l-6 6M9 9l6 6')}
        ${createKPICard('Not Responding', '80', '-5.3%', false, 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01')}
        ${createKPICard('Conversion Rate', '69.4%', '+2.8%', true, 'M22 12h-4l-3 9L9 3l-3 9H2', true)}
      </div>

      <!-- Charts -->
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Payment Status Distribution</h3>
            <button class="btn-text">View Details</button>
          </div>
          <canvas id="paymentChart"></canvas>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>Response Trends</h3>
            <button class="btn-text">Export</button>
          </div>
          <canvas id="trendChart"></canvas>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="activity-card">
        <div class="card-header">
          <h3>Recent Activity</h3>
          <button class="btn-text">View All</button>
        </div>
        <div class="activity-list">
          ${createActivityItem('success', 'Payment received from John Smith', '2 minutes ago', 'M20 6l-11 11-5-5')}
          ${createActivityItem('info', 'Message sent to 45 customers', '15 minutes ago', 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z')}
          ${createActivityItem('warning', '12 customers marked as not responding', '1 hour ago', 'M12 12a10 10 0 1 0 0 0 M12 8v4 M12 16h.01')}
        </div>
      </div>
    </div>
  `
}

function createKPICard(label, value, change, isPositive, icon, highlight = false) {
  const changeClass = isPositive ? 'positive' : 'negative'
  const arrow = isPositive ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'

  return `
    <div class="kpi-card ${highlight ? 'highlight' : ''}">
      <div class="kpi-header">
        <span class="kpi-label">${label}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="${icon}"/>
        </svg>
      </div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-footer">
        <span class="kpi-change ${changeClass}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="${arrow}"/>
          </svg>
          ${change}
        </span>
        <span class="kpi-period">vs last month</span>
      </div>
    </div>
  `
}

function createActivityItem(type, title, time, icon) {
  return `
    <div class="activity-item">
      <div class="activity-icon ${type}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="${icon}"/>
        </svg>
      </div>
      <div class="activity-content">
        <div class="activity-title">${title}</div>
        <div class="activity-time">${time}</div>
      </div>
    </div>
  `
}

function createDataEntryPage() {
  return `
    <div class="page" id="page-data-entry">
      <div class="page-header">
        <h2>Add New Entry</h2>
        <p>Enter customer data that will be synced to Google Sheets</p>
      </div>

      <div class="form-card">
        <form id="dataEntryForm">
          <div class="form-grid">
            <div class="form-group">
              <label for="customerName">Customer Name <span class="required">*</span></label>
              <input type="text" id="customerName" required placeholder="Enter customer name">
            </div>
            <div class="form-group">
              <label for="contactNumber">Contact Number <span class="required">*</span></label>
              <input type="tel" id="contactNumber" required placeholder="Enter phone number">
            </div>
            <div class="form-group">
              <label for="messageSent">Message Sent</label>
              <select id="messageSent">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div class="form-group">
              <label for="paymentStatus">Payment Status <span class="required">*</span></label>
              <select id="paymentStatus" required>
                <option value="">Select status</option>
                <option value="paid">Paid</option>
                <option value="not-paid">Not Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div class="form-group">
              <label for="responseStatus">Response Status</label>
              <select id="responseStatus">
                <option value="">Select status</option>
                <option value="responded">Responded</option>
                <option value="not-responding">Not Responding</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div class="form-group">
              <label for="entryDate">Date</label>
              <input type="date" id="entryDate">
            </div>
            <div class="form-group full-width">
              <label for="notes">Notes</label>
              <textarea id="notes" rows="4" placeholder="Add any additional notes..."></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" id="clearForm">Clear Form</button>
            <button type="submit" class="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Submit & Sync to Sheets
            </button>
          </div>
        </form>
      </div>

      <div class="bulk-upload-card">
        <div class="upload-header">
          <h3>Bulk Upload</h3>
          <p>Upload a CSV file to add multiple entries at once</p>
        </div>
        <div class="upload-zone" id="uploadZone">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <p>Drag and drop CSV file or <span class="link">browse</span></p>
        </div>
      </div>
    </div>
  `
} function createReportsPage() {
  return `
    <div class="page" id="page-reports">
      <div class="page-header">
        <h2>Reports</h2>
        <div class="page-actions">
          <button class="btn-secondary" id="exportCSV">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
          <button class="btn-primary" id="syncNow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Sync Now
          </button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-filters">
          <input type="text" class="filter-input" placeholder="Search in table..." id="tableSearch">
          <select class="filter-select" id="statusFilter">
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="not-paid">Not Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Message Sent</th>
                <th>Payment Status</th>
                <th>Response Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="reportsTableBody">
            </tbody>
          </table>
        </div>
        <div class="table-pagination">
          <span class="pagination-info">Showing 1-10 of 156 entries</span>
          <div class="pagination-controls">
            <button class="pagination-btn" disabled>Previous</button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <button class="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  `
}

function createAnalyticsPage() {
  return `
    <div class="page" id="page-analytics">
      <div class="page-header">
        <h2>Analytics & Insights</h2>
      </div>
      <div class="analytics-grid">
        <div class="chart-card large">
          <div class="chart-header">
            <h3>Conversion Funnel</h3>
          </div>
          <canvas id="conversionChart"></canvas>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>Response Rate Over Time</h3>
          </div>
          <canvas id="responseChart"></canvas>
        </div>
      </div>
    </div>
  `
}

function createInsightsPage() {
  return `
    <div class="page" id="page-insights">
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        <h3>Insights Coming Soon</h3>
        <p>Advanced insights and recommendations will be available here</p>
      </div>
    </div>
  `
}

function createSyncPage() {
  return `
    <div class="page" id="page-sync">
      <div class="sync-card">
        <div class="sync-header">
          <h2>Google Sheets Sync</h2>
          <div class="sync-badge connected">
            <div class="status-dot"></div>
            Connected
          </div>
        </div>
        <div class="sync-info">
          <div class="info-item">
            <span class="info-label">Sheet Name:</span>
            <span class="info-value">Customer Analytics 2024</span>
          </div>
          <div class="info-item">
            <span class="info-label">Last Synced:</span>
            <span class="info-value">2 minutes ago</span>
          </div>
          <div class="info-item">
            <span class="info-label">Total Rows:</span>
            <span class="info-value">1,234</span>
          </div>
        </div>
        <button class="btn-primary btn-large">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Force Sync Now
        </button>
      </div>
    </div>
  `
}

function createUsersPage() {
  return `
    <div class="page" id="page-users">
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <h3>User Management</h3>
        <p>Manage team members and their permissions</p>
      </div>
    </div>
  `
}

function createSettingsPage() {
  return `
    <div class="page" id="page-settings">
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
        </svg>
        <h3>Settings</h3>
        <p>Configure your dashboard preferences and integrations</p>
      </div>
    </div>
  `
}

// Event Listeners
function initEventListeners() {
  // Sidebar toggle
  const sidebar = document.getElementById('sidebar')
  const sidebarToggle = document.getElementById('sidebarToggle')
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed')
  })

  // Navigation
  const navItems = document.querySelectorAll('.nav-item')
  const pages = document.querySelectorAll('.page')
  const pageTitle = document.getElementById('pageTitle')

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const pageName = item.dataset.page

      navItems.forEach(nav => nav.classList.remove('active'))
      item.classList.add('active')

      pages.forEach(page => page.classList.remove('active'))
      document.getElementById(`page-${pageName}`).classList.add('active')

      pageTitle.textContent = item.querySelector('span').textContent

      // Trigger confetti on navigation
      festiveConfettiBurst()
    })
  })

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle')
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme')
    const sunIcon = themeToggle.querySelector('.sun')
    const moonIcon = themeToggle.querySelector('.moon')
    sunIcon.style.display = sunIcon.style.display === 'none' ? 'block' : 'none'
    if (moonIcon) moonIcon.style.display = moonIcon.style.display === 'none' ? 'block' : 'none'
  })

  // Data entry form
  const dataEntryForm = document.getElementById('dataEntryForm')
  if (dataEntryForm) {
    dataEntryForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      // Collect form data
      const formData = {
        customerName: document.getElementById('customerName').value,
        contactNumber: document.getElementById('contactNumber').value,
        messageSent: document.getElementById('messageSent').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        responseStatus: document.getElementById('responseStatus').value,
        date: document.getElementById('entryDate').value || new Date().toISOString().split('T')[0],
        notes: document.getElementById('notes').value,
        timestamp: new Date().toISOString()
      }

      // n8n webhook URL - Update this with your actual webhook URL
      const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/dashboard-update'

      try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.22-8.5"/></svg> Syncing...'
        submitBtn.disabled = true

        // Send to n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })

        if (response.ok) {
          const result = await response.json()
          console.log('n8n response:', result)

          // Success feedback with celebration
          celebrationConfetti()
          alert('✅ Data submitted and synced successfully!')
          dataEntryForm.reset()

          // Update sync status in header
          const syncStatus = document.getElementById('syncStatus')
          if (syncStatus) {
            syncStatus.querySelector('span').textContent = 'Synced just now'
          }
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        // Restore button
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false

      } catch (error) {
        console.error('Error submitting to n8n:', error)

        // Error feedback
        alert('❌ Error syncing data: ' + error.message + '\n\nPlease check:\n1. n8n is running\n2. Webhook URL is correct\n3. Workflow is activated')

        // Restore button
        const submitBtn = e.target.querySelector('button[type="submit"]')
        submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Submit & Sync to Sheets'
        submitBtn.disabled = false
      }
    })
  }

  // Clear form
  const clearForm = document.getElementById('clearForm')
  if (clearForm) {
    clearForm.addEventListener('click', () => {
      dataEntryForm.reset()
    })
  }

  // Sync now button
  const syncNow = document.getElementById('syncNow')
  if (syncNow) {
    syncNow.addEventListener('click', () => {
      const syncStatus = document.getElementById('syncStatus')
      syncStatus.querySelector('span').textContent = 'Syncing...'
      setTimeout(() => {
        syncStatus.querySelector('span').textContent = 'Synced just now'
      }, 1500)
    })
  }

  // Initialize Reports page functionality
  initReportsPage()

  // Initialize header dropdowns
  initHeaderDropdowns()

  // Initialize dashboard buttons
  initDashboardButtons()

  // Initialize data entry upload
  initDataEntryUpload()

  // Initialize sync page button
  initSyncPageButton()

  // Start festive confetti bursts
  startFestiveConfetti()
}

// Festive Confetti Functions
function startFestiveConfetti() {
  // Initial burst on page load
  setTimeout(() => {
    festiveConfettiBurst()
  }, 500)

  // Random bursts every 8-15 seconds
  function randomBurst() {
    festiveConfettiBurst()
    const nextBurst = Math.random() * 7000 + 8000 // 8-15 seconds
    setTimeout(randomBurst, nextBurst)
  }

  setTimeout(randomBurst, 10000) // Start random bursts after 10s
}

function festiveConfettiBurst() {
  const colors = ['#dc2626', '#ef4444', '#fbbf24', '#fcd34d', '#f59e0b']

  // Create burst from random sides
  const side = Math.random()

  if (side < 0.33) {
    // Burst from left
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      gravity: 1.2,
      scalar: 1.2,
      drift: 0.5
    })
  } else if (side < 0.66) {
    // Burst from right
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      gravity: 1.2,
      scalar: 1.2,
      drift: -0.5
    })
  } else {
    // Burst from center
    confetti({
      particleCount: 150,
      angle: 90,
      spread: 100,
      origin: { x: 0.5, y: 0.3 },
      colors: colors,
      gravity: 1,
      scalar: 1.5,
      ticks: 200
    })
  }
}

function celebrationConfetti() {
  // Multiple rapid bursts for celebrations
  const duration = 3000
  const animationEnd = Date.now() + duration
  const colors = ['#dc2626', '#ef4444', '#fbbf24', '#fcd34d', '#f59e0b']

    ; (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      })

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame)
      }
    })()
}

// Reports Page Functionality
function initReportsPage() {
  const exportCSVBtn = document.getElementById('exportCSV')
  const tableSearch = document.getElementById('tableSearch')
  const statusFilter = document.getElementById('statusFilter')

  if (!exportCSVBtn || !tableSearch || !statusFilter) return

  // Initialize pagination
  let currentData = getAllData()
  const pagination = new Pagination(currentData, 10)

  // Render initial page
  renderTablePage(pagination)

  // Export CSV button
  exportCSVBtn.addEventListener('click', () => {
    exportToCSV(currentData)
    festiveConfettiBurst()
  })

  // Table search
  tableSearch.addEventListener('input', (e) => {
    const searchQuery = e.target.value
    const statusValue = statusFilter.value
    currentData = applyFilters(searchQuery, statusValue)
    pagination.updateData(currentData)
    renderTablePage(pagination)
  })

  // Status filter
  statusFilter.addEventListener('change', (e) => {
    const statusValue = e.target.value
    const searchQuery = tableSearch.value
    currentData = applyFilters(searchQuery, statusValue)
    pagination.updateData(currentData)
    renderTablePage(pagination)
  })

  // Pagination controls
  const paginationControls = document.querySelector('.pagination-controls')
  if (paginationControls) {
    paginationControls.addEventListener('click', (e) => {
      const btn = e.target.closest('.pagination-btn')
      if (!btn || btn.disabled) return

      const text = btn.textContent.trim()
      if (text === 'Previous') {
        pagination.previousPage()
      } else if (text === 'Next') {
        pagination.nextPage()
      } else {
        const pageNum = parseInt(text)
        if (!isNaN(pageNum)) {
          pagination.goToPage(pageNum)
        }
      }
      renderTablePage(pagination)
    })
  }

  function renderTablePage(pag) {
    const pageData = pag.getCurrentPageData()
    populateReportsTable(pageData)

    // Update pagination info and controls
    const info = pag.getPageInfo()
    const paginationInfo = document.querySelector('.pagination-info')
    if (paginationInfo) {
      paginationInfo.textContent = `Showing ${info.start}-${info.end} of ${info.totalItems} entries`
    }

    // Update pagination buttons
    updatePaginationButtons(pag, info)
  }

  function updatePaginationButtons(pag, info) {
    const controls = document.querySelector('.pagination-controls')
    if (!controls) return

    // Build pagination buttons
    let buttonsHTML = ''

    // Previous button
    buttonsHTML += `<button class="pagination-btn" ${!pag.hasPreviousPage() ? 'disabled' : ''}>Previous</button>`

    // Page numbers (show up to 5 pages)
    const maxButtons = 5
    let startPage = Math.max(1, info.currentPage - Math.floor(maxButtons / 2))
    let endPage = Math.min(info.totalPages, startPage + maxButtons - 1)

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttonsHTML += `<button class="pagination-btn ${i === info.currentPage ? 'active' : ''}">${i}</button>`
    }

    // Next button
    buttonsHTML += `<button class="pagination-btn" ${!pag.hasNextPage() ? 'disabled' : ''}>Next</button>`

    controls.innerHTML = buttonsHTML
  }
}

// Global editRow function (called from data.js)
window.editRow = function (id) {
  const allData = getAllData()
  const rowData = allData.find(row => row.id === id)

  if (rowData) {
    createEditModal(rowData, (updatedData) => {
      if (updateRowData(id, updatedData)) {
        // Refresh the table
        const tableSearch = document.getElementById('tableSearch')
        const statusFilter = document.getElementById('statusFilter')
        const searchQuery = tableSearch ? tableSearch.value : ''
        const statusValue = statusFilter ? statusFilter.value : ''
        const currentData = applyFilters(searchQuery, statusValue)
        populateReportsTable(currentData)
      }
    })
  }
}

// Header Dropdowns
function initHeaderDropdowns() {
  // Notifications dropdown
  const notificationsBtn = document.getElementById('notificationsBtn')
  if (notificationsBtn) {
    const notificationsContent = `
      <div class="dropdown-header">Notifications</div>
      <div class="notification-item unread">
        <div class="notification-title">Payment Received</div>
        <div class="notification-message">John Smith has completed payment</div>
        <div class="notification-time">2 minutes ago</div>
      </div>
      <div class="notification-item unread">
        <div class="notification-title">Message Sent</div>
        <div class="notification-message">45 messages sent successfully</div>
        <div class="notification-time">15 minutes ago</div>
      </div>
      <div class="notification-item">
        <div class="notification-title">Data Synced</div>
        <div class="notification-message">Google Sheets sync completed</div>
        <div class="notification-time">1 hour ago</div>
      </div>
      <div class="dropdown-divider"></div>
      <div class="dropdown-item" onclick="alert('View all notifications')">
        <span>View All Notifications</span>
      </div>
    `
    new Dropdown(notificationsBtn, notificationsContent, { width: '350px' })
  }

  // User profile dropdown
  const userProfile = document.querySelector('.user-profile')
  if (userProfile) {
    const userContent = `
      <div class="dropdown-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Profile</span>
      </div>
      <div class="dropdown-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6"></path>
        </svg>
        <span>Settings</span>
      </div>
      <div class="dropdown-divider"></div>
      <div class="dropdown-item" onclick="alert('Logout')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span>Logout</span>
      </div>
    `
    new Dropdown(userProfile, userContent, { width: '220px' })
  }
}

// Dashboard Buttons
function initDashboardButtons() {
  // Chart "View Details" buttons
  document.querySelectorAll('.chart-header .btn-text').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === 0) {
        alert('Payment Status Details: This would show a detailed breakdown of payment statuses')
      } else if (index === 1) {
        const data = getAllData()
        exportToCSV(data)
      }
    })
  })

  // Activity "View All" button
  const viewAllBtn = document.querySelector('.activity-card .btn-text')
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      // Navigate to Reports page
      const reportsNav = document.querySelector('a[data-page="reports"]')
      if (reportsNav) reportsNav.click()
    })
  }
}

// Data Entry Upload
function initDataEntryUpload() {
  const uploadZone = document.getElementById('uploadZone')
  if (!uploadZone) return

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadZone.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  // Highlight drop zone
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadZone.addEventListener(eventName, () => {
      uploadZone.classList.add('dragover')
    }, false)
  })

  ['dragleave', 'drop'].forEach(eventName => {
    uploadZone.addEventListener(eventName, () => {
      uploadZone.classList.remove('dragover')
    }, false)
  })

  // Handle dropped files
  uploadZone.addEventListener('drop', handleDrop, false)

  // Click to browse
  uploadZone.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = (e) => handleFiles(e.target.files)
    input.click()
  })

  function handleDrop(e) {
    const dt = e.dataTransfer
    const files = dt.files
    handleFiles(files)
  }

  function handleFiles(files) {
    if (files.length === 0) return

    const file = files[0]
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const csvText = e.target.result
      // Import would happen here - for now just show success
      alert(`CSV file "${file.name}" uploaded successfully!\n\nThis would parse and import the data.`)
    }
    reader.readAsText(file)
  }
}

// Sync Page Button
function initSyncPageButton() {
  const forceSyncBtn = document.querySelector('.sync-card .btn-primary')
  if (forceSyncBtn) {
    forceSyncBtn.addEventListener('click', () => {
      const originalHTML = forceSyncBtn.innerHTML
      forceSyncBtn.disabled = true
      forceSyncBtn.innerHTML = '<div class="spinner"></div> Syncing...'

      setTimeout(() => {
        forceSyncBtn.disabled = false
        forceSyncBtn.innerHTML = originalHTML
        const syncStatus = document.getElementById('syncStatus')
        if (syncStatus) {
          syncStatus.querySelector('span').textContent = 'Synced just now'
        }
        celebrationConfetti()
        alert('✅ Data synced successfully with Google Sheets!')
      }, 2000)
    })
  }
}

// Initialize app
initEventListeners()
populateReportsTable(sampleData)
initCharts()
