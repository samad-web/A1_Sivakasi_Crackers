# 🚀 Quick n8n Webhook Setup Guide

## ✅ Dashboard is Already Updated!

The dashboard form now sends data to n8n webhook automatically. Here's what to do:

---

## Step 1: Import Workflow to n8n (2 minutes)

1. **Open n8n**: Go to `http://localhost:5678`

2. **Import Workflow**:
   - Click **"Add workflow"** (or the + button)
   - Click the **"..."** menu (top right)
   - Select **"Import from File"**
   - Choose: `C:\Users\mas20\Desktop\n8n\dashboard-to-sheets-workflow.json`

3. **Configure Google Sheets**:
   - Click on the **"Google Sheets"** node
   - Click **"Create New Credential"** (if first time)
   - Follow OAuth flow to connect your Google account
   - Select your Google Sheet from the dropdown
   - Make sure Sheet name is correct (default: "Sheet1")

4. **Activate Workflow**:
   - Toggle the switch in top-right corner to **ON**
   - Workflow is now live! ✅

---

## Step 2: Get Webhook URL (1 minute)

1. Click on the **"Webhook"** node in the workflow

2. You'll see the webhook URL:
   ```
   http://localhost:5678/webhook/dashboard-update
   ```

3. Copy this URL

---

## Step 3: Update Dashboard (Optional)

The webhook URL is already set to `http://localhost:5678/webhook/dashboard-update` in the code.

**If your n8n is on a different port or domain:**

1. Open: `C:\Users\mas20\Desktop\n8n\reports-dashboard\src\main.js`

2. Find line with:
   ```javascript
   const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/dashboard-update'
   ```

3. Replace with your actual webhook URL

4. Save file (Vite will auto-reload)

---

## Step 4: Test Integration (1 minute)

1. **Open Dashboard**: http://localhost:5173

2. **Go to "Data Entry" page** (sidebar)

3. **Fill out the form**:
   - Customer Name: `Test Customer`
   - Contact Number: `+91 9876543210`
   - Payment Status: `Paid`
   - Response Status: `Responded`
   - (Optional fields)

4. **Click "Submit & Sync to Sheets"**
   - Button will show "Syncing..." while processing
   - Success: ✅ "Data submitted and synced successfully!"
   - Error: ❌ Shows helpful error message

5. **Check your Google Sheet** - New row should appear!

---

## 🎯 What Happens When You Submit

```
Dashboard Form
    ↓
    POST request with JSON data
    ↓
n8n Webhook (receives data)
    ↓
Format Data node (transforms to columns)
    ↓
Google Sheets node (appends row)
    ↓
Respond to Webhook (sends confirmation)
    ↓
Dashboard (shows success message)
```

---

## 📊 Data Structure Sent to n8n

```json
{
  "customerName": "John Doe",
  "contactNumber": "+91 9876543210",
  "messageSent": "Yes",
  "paymentStatus": "paid",
  "responseStatus": "responded",
  "date": "2024-01-28",
  "notes": "Test entry",
  "timestamp": "2024-01-28T14:00:00.000Z"
}
```

---

## 🔧 Troubleshooting

### Error: "Failed to fetch"
**Cause**: n8n is not running or webhook URL is wrong

**Fix**:
1. Make sure n8n is running: `http://localhost:5678`
2. Check workflow is activated (toggle in top-right)
3. Verify webhook path is `/webhook/dashboard-update`

### Error: "CORS policy"
**Cause**: n8n blocking requests from dashboard

**Fix**:
1. In n8n, go to Settings → Security
2. Add `http://localhost:5173` to allowed origins

### Error: "Google Sheets API"
**Cause**: Google Sheets credentials not set up

**Fix**:
1. Click Google Sheets node in workflow
2. Re-authenticate Google account
3. Select correct spreadsheet and sheet

### Sheet Header Mismatch
**Expected Headers** (Row 1 of your Google Sheet):
```
Customer Name | Contact Number | Message Sent | Payment Status | Response Status | Date | Notes | Timestamp
```

If headers don't match, n8n will create new columns.

---

## 🎨 Customization

### Change What Data is Sent

Edit `src/main.js` line ~549:
```javascript
const formData = {
  customerName: document.getElementById('customerName').value,
  // Add or remove fields here
  customField: 'your value'
}
```

### Change Google Sheet Columns

Edit the **"Format Data"** node in n8n workflow:
- Add new string values
- Change field names to match your sheet headers

### Add Validation

Before sending to n8n, add validation:
```javascript
if (!formData.customerName || !formData.contactNumber) {
  alert('Please fill required fields');
  return;
}
```

---

## 🔗 Connect to Existing Workflow

Want to connect this to your existing `Sheet_message_automation.json`?

1. **Import your existing workflow** to n8n
2. **Add a Webhook node** at the beginning
3. **Connect it** to your "Read Google Sheet" node
4. **Use that webhook URL** in the dashboard

This way, form submissions trigger your entire message automation workflow!

---

## ✅ Success Checklist

- [ ] Workflow imported to n8n
- [ ] Google Sheets connected
- [ ] Workflow activated (toggle ON)
- [ ] Webhook URL copied
- [ ] Dashboard form tested
- [ ] Data appears in Google Sheet
- [ ] Success message shows in dashboard

---

## 🎉 You're Done!

Your dashboard is now fully integrated with n8n and Google Sheets!

**What you can do now:**
- ✅ Add customer data through web form
- ✅ Automatically sync to Google Sheets
- ✅ Track sync status in dashboard header
- ✅ Get instant feedback on submissions

**Next Steps** (Optional):
- Add real-time table updates
- Connect to existing message automation
- Deploy to production
- Add user authentication
