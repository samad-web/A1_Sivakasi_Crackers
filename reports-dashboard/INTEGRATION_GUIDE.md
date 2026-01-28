# Quick Start: Google Sheets + n8n Integration

This guide will help you quickly integrate your dashboard with Google Sheets and n8n.

## 🚀 Quick Setup (30 minutes)

### Step 1: Google Cloud Setup (10 min)

1. **Create Project**: https://console.cloud.google.com/
   - Click "New Project" → Name it "Reports Dashboard"
   
2. **Enable APIs**:
   - Navigate to "APIs & Services" → "Library"
   - Enable "Google Sheets API"
   - Enable "Google Drive API"

3. **Create Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Add redirect URI: `http://localhost:5173/auth/callback`
   - Download JSON credentials

### Step 2: Install Dependencies (2 min)

```bash
cd C:\Users\mas20\Desktop\n8n\reports-dashboard
npm install googleapis dotenv
```

### Step 3: Create `.env` File (3 min)

Create `.env` in project root:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_GOOGLE_SHEET_ID=your_google_sheet_id
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/dashboard-update
```

**How to get Sheet ID:**
- Open your Google Sheet
- Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### Step 4: Update `.gitignore` (1 min)

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

### Step 5: Create n8n Webhook (5 min)

1. Open n8n: `http://localhost:5678`
2. Create new workflow
3. Add **Webhook** node:
   - HTTP Method: `POST`
   - Path: `/dashboard-update`
4. Add **Google Sheets** node:
   - Operation: `Append`
   - Document: (Select your sheet)
   - Sheet: `Sheet1`
5. **Activate** the workflow
6. Copy the webhook URL

### Step 6: Update Dashboard Code (5 min)

Add this to `src/main.js` inside the form submit handler:

```javascript
// Replace the existing form submit with this:
dataEntryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    customerName: document.getElementById('customerName').value,
    contactNumber: document.getElementById('contactNumber').value,
    messageSent: document.getElementById('messageSent').value,
    paymentStatus: document.getElementById('paymentStatus').value,
    responseStatus: document.getElementById('responseStatus').value,
    date: document.getElementById('entryDate').value || new Date().toISOString().split('T')[0],
    notes: document.getElementById('notes').value
  };
  
  try {
    // Send to n8n webhook
    const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      alert('✅ Data submitted and synced to Google Sheets!');
      dataEntryForm.reset();
    } else {
      throw new Error('Failed to sync');
    }
  } catch (error) {
    alert('❌ Error: ' + error.message);
  }
});
```

### Step 7: Test Integration (4 min)

1. **Restart dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Navigate to Data Entry page**

3. **Fill form and submit**

4. **Check your Google Sheet** - new row should appear!

---

## 🔄 Integration Architecture

```
┌─────────────────┐
│   Dashboard     │
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTP POST
         ▼
┌─────────────────┐
│   n8n Webhook   │
│   (Workflow)    │
└────────┬────────┘
         │
         │ Append Row
         ▼
┌─────────────────┐
│  Google Sheets  │
│   (Database)    │
└─────────────────┘
```

---

## 📊 Sample n8n Workflow

### Complete Workflow Nodes:

1. **Webhook Trigger**
   ```json
   {
     "httpMethod": "POST",
     "path": "dashboard-update",
     "responseMode": "responseNode"
   }
   ```

2. **Set Node** (Transform Data)
   ```json
   {
     "values": {
       "string": [
         {
           "name": "Customer Name",
           "value": "={{$json.customerName}}"
         },
         {
           "name": "Contact",
           "value": "={{$json.contactNumber}}"
         },
         {
           "name": "Message Sent",
           "value": "={{$json.messageSent}}"
         },
         {
           "name": "Payment Status",
           "value": "={{$json.paymentStatus}}"
         },
         {
           "name": "Response Status",
           "value": "={{$json.responseStatus}}"
         },
         {
           "name": "Date",
           "value": "={{$json.date}}"
         },
         {
           "name": "Notes",
           "value": "={{$json.notes}}"
         },
         {
           "name": "Timestamp",
           "value": "={{$now.format('yyyy-MM-dd HH:mm:ss')}}"
         }
       ]
     }
   }
   ```

3. **Google Sheets Node**
   - Select your Google Sheets credentials
   - Operation: `Append`
   - Document: Choose from list
   - Sheet: `Sheet1`
   - Data Mode: `Auto-Map Input Data`

4. **Respond to Webhook**
   ```json
   {
     "respondWith": "json",
     "responseBody": {
       "success": true,
       "message": "Data added to Google Sheets",
       "rowNumber": "={{$json.updatedRange}}"
     }
   }
   ```

---

## ✅ Verification Checklist

- [ ] Google Cloud project created
- [ ] APIs enabled (Sheets + Drive)
- [ ] OAuth credentials downloaded
- [ ] `.env` file configured
- [ ] Dependencies installed
- [ ] n8n workflow created and activated
- [ ] Dashboard form updated
- [ ] Test submission works
- [ ] Data appears in Google Sheet

---

## 🔧 Troubleshooting

### Issue: "CORS error"
**Solution**: Update n8n webhook settings to allow origins

### Issue: "Authentication failed"
**Solution**: Check that CLIENT_ID and CLIENT_SECRET match in .env

### Issue: "Sheet not found"
**Solution**: Verify SHEET_ID is correct and sheet is shared with service account

### Issue: "n8n webhook not responding"
**Solution**: Make sure n8n workflow is activated (toggle in top-right)

---

## 📱 Connecting to Existing n8n Workflow

If you want to use your existing message automation workflow:

1. Add a **Webhook** node at the start
2. Connect it to your existing **Google Sheets** node
3. Use the webhook URL in dashboard `.env`
4. Your workflow will now receive data from dashboard

### Example: Augment Message Automation

```
[Dashboard Webhook] → [Read Sheet] → [Process Payments] → [Send Messages]
```

This allows you to:
- Update customer data from dashboard
- Trigger message automation from form submission
- Track responses in real-time

---

## 🚀 Next Steps

1. **Add Authentication**: Implement OAuth flow for users
2. **Real-time Sync**: Use WebSockets for live updates
3. **Batch Operations**: Import/export CSV files
4. **Error Handling**: Add retry logic and notifications
5. **Production Deploy**: Host on Vercel/Railway

For full implementation details, see the complete `implementation_plan.md`!
