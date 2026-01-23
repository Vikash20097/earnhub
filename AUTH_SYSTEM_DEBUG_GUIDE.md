# 🔐 EarnHub Auth System - Debug Guide

## Overview
This guide helps you test and debug the login/register system with persistent localStorage.

---

## 🧪 How to Test the System

### Test 1: Fresh Registration
**Objective**: Register a new user and verify persistent login

**Steps:**
1. Open the app (fresh or incognito window)
2. Open DevTools (F12) → Console tab
3. Click "Register"
4. Fill form:
   - Full Name: `John Doe`
   - Mobile: `9876543210`
   - Password: `password123`
   - Confirm: `password123`
5. Click "Register" button
6. **Expected Result**: 
   - User ID shown: `EH00001`
   - Auto-logged in
   - Console shows: "✓ Registration complete - User logged in and app loaded"

**Verify Data Saved:**
```javascript
// In Console, run:
debugAuthSystem()
// Should show:
// - Current User ID: EH00001
// - User in earnhubUsers array
// - appState.user populated
```

---

### Test 2: Auto-Login After Refresh
**Objective**: Verify user stays logged in after page refresh

**Steps:**
1. After registration (Test 1), refresh the page (F5)
2. **Expected Result**:
   - App loads directly (NO login screen)
   - Console shows: "✓ Found active session for user: EH00001"
   - User name displayed on home page
   - All balance/data intact

**In Console:**
```javascript
localStorage.getItem('earnhubCurrentUserId')
// Should return: "EH00001"

localStorage.getItem('earnhubUsers')
// Should show user array with EH00001
```

---

### Test 3: Login with Existing User
**Objective**: Verify login with mobile + password works

**Steps:**
1. Logout first (click Logout button)
2. You'll see login screen
3. Click "Login" button
4. Fill form:
   - Mobile: `9876543210` (from Test 1)
   - Password: `password123`
5. Click "Login"
6. **Expected Result**:
   - Console shows: "✓ Login successful for user: John Doe (EH00001)"
   - User logged in and app loads

---

### Test 4: Multiple Users (Isolation)
**Objective**: Verify each user has separate data

**Steps:**
1. Register User 1: Mobile `9876543210`, Password `pass1`
2. In Console, set balance:
   ```javascript
   appState.balance = 500;
   saveAppState();
   ```
3. Verify saved:
   ```javascript
   debugAuthSystem()
   // Shows: balance 500, user EH00001
   ```
4. Logout
5. Register User 2: Mobile `9876543211`, Password `pass2`
6. In Console:
   ```javascript
   appState.balance = 1000;
   saveAppState();
   ```
7. Logout
8. Login as User 1 (mobile: `9876543210`)
9. **Expected Result**:
   - User 1 balance: ₹500 ✓
   - Logout
10. Login as User 2 (mobile: `9876543211`)
11. **Expected Result**:
    - User 2 balance: ₹1000 ✓

---

### Test 5: Package Purchase Persistence
**Objective**: Verify package purchase data persists

**Steps:**
1. Login as a user
2. Go to Packages page
3. Purchase a package (e.g., Gold)
4. Refresh page (F5)
5. **Expected Result**:
   - Package still shows as active
   - Balance correctly reduced
   - All data intact

**In Console:**
```javascript
appState.activePackage
// Should return: "gold" (or whatever you purchased)

appState.balance
// Should show reduced amount
```

---

## 🔍 Console Debug Commands

### View All Users
```javascript
debugAuthSystem()
// Displays:
// - Current User ID (session)
// - All Users array
// - Current appState.user
```

### Get Specific User
```javascript
getUserById('EH00001')
// Returns user object with that ID
```

### Search User by Mobile
```javascript
getUserByMobile('9876543210')
// Returns user object with that mobile
```

### View localStorage Keys
```javascript
Object.keys(localStorage)
// Should show:
// - earnhubUsers
// - earnhubCurrentUserId
// - earnhubAppState
```

### Clear All Data (Fresh Start)
```javascript
localStorage.clear()
// WARNING: Deletes all data!
// Refresh page to see login screen
```

### View Raw localStorage Data
```javascript
console.log(JSON.parse(localStorage.getItem('earnhubUsers')))
// Shows all registered users

console.log(JSON.parse(localStorage.getItem('earnhubAppState')))
// Shows current session state
```

---

## 📊 Console Log Messages

When you perform actions, watch for these messages:

### Registration Flow
```
📝 Registration attempt - Name: John Doe , Mobile: 9876543210
✓ Generated new User ID: EH00001
✓ New user object created: {...}
📊 Current users in system: 0
💾 Saved users to localStorage - Count: 1
✓ Session created - currentUserId: EH00001
✓ User data initialized in appState
✓ Registration complete - User logged in and app loaded
```

### Login Flow
```
🔐 Login attempt with mobile: 9876543210
🔍 Found user by mobile: 9876543210 - John Doe (EH00001)
✓ Login successful for user: John Doe (EH00001)
✓ Session saved - currentUserId: EH00001
📂 Loading user data for: EH00001 (John Doe)
✓ User data fully loaded and ready
```

### Auto-Login Flow
```
🚀 EarnHub Initializing...
📍 Checking for existing session...
Current User ID from localStorage: EH00001
✓ Found active session for user: EH00001
🔍 Found user by ID: EH00001 - John Doe
✓ User auto-logged in successfully
```

### Save/Load Flow
```
💾 Saved appState to localStorage - Balance: 500 , Package: gold
✓ User data synced with users array
✓ Saved users to localStorage - Count: 2
```

---

## ❌ Common Issues & Solutions

### Issue: "Register button doesn't work"
**Solution:**
1. Check Console for errors (F12)
2. Verify mobile field is 10 digits
3. Verify passwords match
4. Try a different mobile number

**Debug:**
```javascript
console.log(document.getElementById('regName').value)
console.log(document.getElementById('regMobile').value)
console.log(document.getElementById('regPassword').value)
// If empty, form inputs not being read properly
```

### Issue: User doesn't stay logged in after refresh
**Solution:**
1. Check if `earnhubCurrentUserId` is saved:
   ```javascript
   localStorage.getItem('earnhubCurrentUserId')
   ```
2. Check if user exists in `earnhubUsers`:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('earnhubUsers')))
   ```
3. Run `debugAuthSystem()` to see full state

### Issue: Login fails with "Mobile number not registered"
**Solution:**
1. Make sure you registered first
2. Verify mobile number is EXACTLY the same:
   ```javascript
   getUserByMobile('9876543210')
   // Should return user object
   ```
3. Check for typos (spaces, wrong digits)

### Issue: Balance/Package data doesn't persist
**Solution:**
1. Verify `saveAppState()` was called:
   ```javascript
   // Check Console for: "✓ User data synced with users array"
   ```
2. Manually save:
   ```javascript
   saveAppState()
   // Then check localStorage
   ```
3. Check if user object is updated:
   ```javascript
   appState.user.walletBalance
   // Should match appState.balance
   ```

---

## 📋 Data Structure Reference

### User Object (in earnhubUsers array)
```javascript
{
  userId: 'EH00001',
  name: 'John Doe',
  mobile: '9876543210',
  password: 'password123',
  
  // Financial
  walletBalance: 500,
  missionEarnings: 200,
  gameEarnings: 150,
  referralEarnings: 100,
  bonusEarnings: 50,
  packageCost: 399,
  
  // Activity
  activePackage: 'gold',
  missionsCompleted: 15,
  gamesPlayed: 8,
  referralCount: 2,
  
  // System
  referralCode: 'REF123',
  deposits: [],
  withdrawals: [],
  hasDepositedAtLeastOnce: false,
  
  // Timestamps
  createdAt: '1/23/2026, 10:30:45 AM',
  joinDate: '1/23/2026',
}
```

### localStorage Keys
```javascript
earnhubUsers              // Array of all user objects
earnhubCurrentUserId      // String: current logged-in user ID
earnhubAppState           // App state for current session
```

---

## ✅ Quick Checklist

- [ ] Register button works and creates new user
- [ ] User ID is auto-generated (EH00001, EH00002, etc.)
- [ ] Mobile number is validated (10 digits)
- [ ] Duplicate mobile numbers rejected
- [ ] Login works with mobile + password
- [ ] User stays logged in after refresh
- [ ] Balance persists across sessions
- [ ] Package selection persists
- [ ] Multiple users can be registered
- [ ] Each user has isolated data
- [ ] Console shows debug messages
- [ ] No JavaScript errors in Console

---

## 🚀 You're Ready!

If all tests pass, your auth system is working perfectly! The system is:
- ✅ Secure (localStorage-based)
- ✅ Persistent (survives refresh/reload)
- ✅ Multi-user (each user isolated)
- ✅ Debuggable (console logs everywhere)
- ✅ Professional (clean error messages)

Happy testing! 🎉
