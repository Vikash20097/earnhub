# Deposit & Withdrawal System - Quick Reference Guide

## 🎯 For College Project Demo Evaluation

### Key Points:
- ✅ **No real payment processing** - Educational demo only
- ✅ **Manual admin approval** - Click buttons to approve/reject deposits & withdrawals
- ✅ **Real-like UI** - Professional card-based interface
- ✅ **Persistent data** - Survives page refresh (localStorage)
- ✅ **Full integration** - Blocks package purchase without deposit

---

## 📋 User Journey

### Step 1: Register
```
Register Form
  ↓
Account Created
  ↓
Unique User ID Generated (EH-USER-XXXXX)
```

### Step 2: View Deposit Page
```
Home → Navigation → "Deposit"
  ↓
Deposit & Withdraw Page Opens
  ↓
Shows:
  - Current Balance
  - User ID (copyable)
  - Tabs: Deposit | Withdraw | History | Admin
```

### Step 3: Make Deposit
```
Deposit Tab
  ↓
Select Amount (₹100, ₹300, ₹500, ₹1000, or custom)
  ↓
View Demo QR Code
  ↓
Enter Transaction Reference ID (e.g., "TXN123456")
  ↓
Click "I Have Deposited"
  ↓
Request Created → Status: PENDING
```

### Step 4: Admin Approval
```
Admin Panel Tab
  ↓
See "Pending Deposits"
  ↓
Click "Approve" button on deposit
  ↓
Balance increases automatically
  ↓
Status changes to "APPROVED"
```

### Step 5: Buy Package
```
Now CAN purchase packages
(Previously blocked without deposit)
  ↓
Select package → Confirm
  ↓
Balance deducted, package activated
```

---

## 💰 Wallet Operations

### Deposit
- **Min Amount:** ₹50
- **Status:** PENDING → APPROVED/REJECTED
- **Balance:** Increases on APPROVAL
- **When:** Before buying packages

### Withdrawal
- **Min Amount:** ₹100
- **Max Amount:** Current balance
- **Method:** UPI or Bank
- **Status:** PENDING → APPROVED/REJECTED
- **Balance:** Decreases on APPROVAL

### Transaction Log
- All deposits recorded
- All withdrawals recorded
- Timestamps maintained
- Full audit trail

---

## 🔐 User ID System

### Display Locations:
1. **Account Page** → "Profile Information" section
2. **Deposit Page** → "Your User ID" box

### Format:
```
EH-USER-123456
     ↑    ↑
  Prefix  Random 6-digit number
```

### Usage:
- Reference for identification
- Include in support tickets
- For payment verification
- Copy button to clipboard

---

## 📊 Admin Panel Features

### What Admin Sees:
```
Pending Deposits:
  • User: John Doe
  • Amount: ₹500
  • Ref ID: TXN123456
  • Date: 1/23/2026 2:30 PM
  
  [✓ Approve] [✗ Reject]

Pending Withdrawals:
  • User: Jane Smith
  • Amount: ₹250
  • Method: UPI (jane@upi)
  • Date: 1/23/2026 3:15 PM
  
  [✓ Approve] [✗ Reject]
```

### Approve Action:
```
Click "✓ Approve"
  ↓
User balance updated instantly
  ↓
Status changed to "APPROVED"
  ↓
Timestamp recorded
  ↓
Notification shown
```

### Reject Action:
```
Click "✗ Reject"
  ↓
No balance change
  ↓
Status changed to "REJECTED"
  ↓
Notification shown
```

---

## 📱 Tab Navigation

### Tabs Available:

#### 1. **Deposit Tab**
- Select amount buttons
- Custom amount input
- Demo QR code display
- Reference ID form
- "I Have Deposited" button

#### 2. **Withdraw Tab**
- Amount input
- Method dropdown (UPI/Bank)
- Details input field
- Submit button

#### 3. **History Tab**
- Deposit history list
- Withdrawal history list
- Status badges
- Timestamps

#### 4. **Admin Panel**
- Pending deposits section
- Pending withdrawals section
- Approve/Reject buttons

---

## 🎨 Status Colors

### Status Badges:
```
PENDING     → 🟠 Orange background (#fff3cd)
APPROVED    → 🟢 Green background (#d4edda)
REJECTED    → 🔴 Red background (#f8d7da)
```

---

## ✅ Validation Rules

### Deposit:
- Amount must be ≥ ₹50
- Reference ID must be 8+ characters
- Cannot be empty

### Withdrawal:
- Amount must be ≥ ₹100
- Amount must be ≤ current balance
- Method must be selected
- Details must be entered

### Package Purchase:
- User must have deposited at least once
- Balance must be sufficient
- Shows error message if cannot purchase

---

## 🗂️ Data Storage

### What Gets Stored (localStorage):
```
earnhubAppState {
  deposits: [
    { id, userId, username, amount, referenceId, status, createdAt, ... }
  ]
  
  withdrawals: [
    { id, userId, username, amount, method, details, status, createdAt, ... }
  ]
  
  hasDepositedAtLeastOnce: true/false
  
  balance: 0
  transactions: [...]
  ...
}
```

### Persistence:
- ✅ Survives page refresh
- ✅ Survives browser restart
- ✅ Survives logout/login
- ✅ Data available across sessions

---

## 🧪 Testing the System

### Test Case 1: New User Deposit
```
1. Register new account
2. Go to Deposit page
3. Select ₹300
4. Enter ref ID "TXN000001"
5. Click "I Have Deposited"
6. See PENDING in history
7. Go to Admin Panel
8. Click Approve
9. Balance increases ✅
```

### Test Case 2: Withdrawal
```
1. Ensure balance > ₹100
2. Go to Withdraw tab
3. Enter amount ₹200
4. Select UPI method
5. Enter UPI ID
6. Click Submit
7. See PENDING in history
8. Admin approves
9. Balance decreases ✅
```

### Test Case 3: Package Purchase Block
```
1. New account (no deposit)
2. Go to Packages page
3. Click any package "Buy"
4. See error: "Deposit Required"
5. Redirected to Deposit page
6. Make deposit
7. Admin approves
8. Can now buy package ✅
```

### Test Case 4: Data Persistence
```
1. Make a deposit
2. Refresh page (F5)
3. Data still visible
4. History still shows
5. Balance unchanged ✅
```

---

## 💡 Demo Account

### Credentials:
```
Email:    demo@test.com
Password: demo123
```

### Demo User State:
```
Balance:        ₹500 (pre-loaded)
Package:        Gold (active)
User ID:        EH-USER-XXXXX
HasDeposited:   true
```

### Use Case:
Quick testing without registration flow

---

## 🚨 Important Disclaimers

### For Evaluators:
1. **This is educational demo** - No real money involved
2. **Frontend only** - No backend/database
3. **Manual approval** - You (admin) click buttons
4. **LocalStorage** - Data lives in browser only
5. **NOT for production** - Missing real payment integration

### For Users:
1. **No real payment processing**
2. **Reference ID is fake** - Just for tracking
3. **QR code is demo** - Not functional
4. **Admin approval is manual** - Wait for instructor
5. **Balance is simulated** - Not real money

---

## 🔗 Navigation Quick Links

```
Home          → Home page
Packages      → Buy packages (blocked without deposit)
Missions      → Daily missions
Games         → Play games
Deposit       → THIS SYSTEM ← You are here
Wallet        → View balance & history
Rewards       → Redemption options
Account       → Profile & referral code
```

---

## 📞 Common Actions

### "Copy User ID"
```
1. On Deposit page or Account page
2. Find "Your User ID" / "User ID" field
3. Click "Copy" button
4. ID copied to clipboard
5. Share for reference
```

### "Check Balance"
```
1. Top of Deposit page → "Current Balance"
2. Or Wallet page → "Total Balance"
3. Updates in real-time
```

### "View History"
```
1. Deposit page → History tab
2. Shows all deposits (status colored)
3. Shows all withdrawals (status colored)
4. Shows timestamps
```

### "Admin Approval"
```
1. Deposit page → Admin Panel tab
2. Find pending request
3. Click ✓ or ✗ button
4. User sees update immediately
```

---

## ⚡ Quick Stats

| Feature | Status |
|---------|--------|
| User ID Generation | ✅ Working |
| Deposit Submission | ✅ Working |
| Withdrawal Submission | ✅ Working |
| Admin Approval | ✅ Working |
| Balance Updates | ✅ Real-time |
| Data Persistence | ✅ localStorage |
| Package Purchase Block | ✅ Active |
| History Display | ✅ Color-coded |
| Form Validation | ✅ Complete |
| Error Handling | ✅ User-friendly |

---

**Last Updated:** January 23, 2026
**Version:** 1.0 (College Demo)
**Status:** ✅ Ready for Evaluation
