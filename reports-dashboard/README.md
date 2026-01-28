# Reports & Analytics Dashboard

A modern, professional web application for managing Google Sheets data with comprehensive reporting and analytics capabilities.

## 🚀 Features

### 📊 Dashboard
- **KPI Cards** with real-time metrics
- **Visual Analytics** with interactive charts
- **Recent Activity** feed
- **Trend Indicators** showing performance changes

### ✍️ Data Entry
- **Web-based Form** mapped to Google Sheet columns
- **Real-time Validation**
- **Bulk CSV Upload** capability
- **Auto-sync** to Google Sheets

### 📈 Reports & Analytics
- **Interactive Data Tables** with sorting and filtering
- **Export Options** (CSV/PDF)
- **Status Tracking** (Paid/Not Paid/Not Responding)
- **Visual Charts**:
  - Payment Status Distribution (Pie Chart)
  - Response Trends (Line Chart)
  - Conversion Funnel (Bar Chart)
  - Response Rate Over Time (Area Chart)

### 🔄 Google Sheets Integration
- Real-time sync status indicator
- Manual sync capability
- Connection status monitoring
- Row count tracking

### 🎨 Design Features
- **Dark/Light Theme Toggle**
- **Responsive Layout** optimized for desktop and tablet
- **Smooth Micro-interactions** and hover effects
- **Modern Color Palette** with gradients
- **Glassmorphism Effects**
- **Professional Typography** (Inter font)

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Framework**: Vanilla JavaScript (ES6+)
- **Charts**: Chart.js
- **Styling**: Custom CSS with CSS Variables
- **Icons**: Inline SVG

## 📦 Installation

```bash
cd reports-dashboard
npm install
```

## 🏃Running the Application

### Development Mode
```bash
npm run dev
```
Visit `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

Build output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
reports-dashboard/
├── src/
│   ├── main.js          # Application entry point and UI generation
│   ├── style.css        # Global styles and theme variables
│   ├── charts.js        # Chart.js configurations
│   └── data.js          # Data handling and Google Sheets integration
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
└── README.md            # Documentation
```

## 🎯 Key Components

### Navigation
- Collapsible sidebar with icons
- 8 main sections: Dashboard, Data Entry, Reports, Analytics, Insights, Sync, Users, Settings

### Header
- Context-aware page title
- Date range selector
- Search functionality
- Sync status indicator
- Theme toggle
- User profile dropdown

### Data Management
- **Sample Data**: 10 pre-populated customer records
- **Table Features**: Search, filter, pagination
- **Status Badges**: Color-coded payment and response status

## 🔌 Google Sheets API Integration

To connect with Google Sheets, update the functions in `src/data.js`:

```javascript
// Implement Google Sheets API
export async function syncWithGoogleSheets() {
  // Add your Google Sheets API logic here
  // Use googleapis or gapi client
}
```

### Required Setup:
1. Enable Google Sheets API in Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized JavaScript origins
4. Install googleapis package: `npm install googleapis`

## 🎨 Customization

### Theme Colors
Edit CSS variables in `src/style.css`:
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  /* Add your custom colors */
}
```

### Sample Data
Modify `sampleData` in `src/data.js` to match your Google Sheet structure.

## 📊 Chart Types

1. **Doughnut Chart** - Payment status distribution
2. **Line Chart** - Response trends over time
3. **Bar Chart** - Conversion funnel
4. **Area Chart** - Response rate comparison

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Features in Development

- User Management
- Advanced Insights
- Custom Reports Builder
- Real-time Notifications
- Multi-user Collaboration

## 🤝 Contributing

This is a demo application. For production use:
1. Implement proper Google Sheets API authentication
2. Add error handling and loading states
3. Implement data persistence
4. Add comprehensive testing
5. Setup CI/CD pipeline

## 📄 License

MIT License - Feel free to use this project as a template for your own dashboard applications.

## 🙋‍♂️ Support

For questions or issues contact [Your Name] or create an issue in the repository.

---

**Built with ❤️ using Vite and modern web technologies**
