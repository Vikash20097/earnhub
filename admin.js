// admin.js - Admin-side logic for Banking App

// DOM Elements
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPanel = document.getElementById('admin-panel');
const adminLogin = document.getElementById('admin-login');
const usersDiv = document.getElementById('users');
const depositsDiv = document.getElementById('deposits');
const withdrawsDiv = document.getElementById('withdraws');
const adminLogoutBtn = document.getElementById('adminLogout');
const messageDiv = document.getElementById('message');

// Hardcoded admin email for simplicity (in production, use proper admin authentication)
const ADMIN_EMAIL = 'admin@example.com';

// Admin login functionality
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        if (email !== ADMIN_EMAIL) {
            showMessage('Invalid admin email');
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);
            showAdminPanel();
        } catch (error) {
            showMessage('Invalid admin credentials');
        }
    });
}

// Show admin panel
function showAdminPanel() {
    adminLogin.style.display = 'none';
    adminPanel.style.display = 'block';
    loadUsers();
    loadDepositRequests();
    loadWithdrawRequests();
}

// Load users
async function loadUsers() {
    try {
        usersDiv.innerHTML = '';
        const usersSnapshot = await db.collection('users').get();
        usersSnapshot.forEach(doc => {
            const user = doc.data();
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <div>
                    <strong>${user.name}</strong><br>
                    Email: ${user.email}<br>
                    Balance: $${user.balance.toFixed(2)}
                </div>
                <div>
                    <input type="number" id="balance-${doc.id}" value="${user.balance}" step="0.01" min="0">
                    <button onclick="updateUserBalance('${doc.id}')">Update Balance</button>
                </div>
            `;
            usersDiv.appendChild(userItem);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Update user balance
async function updateUserBalance(userId) {
    const newBalance = parseFloat(document.getElementById(`balance-${userId}`).value);
    if (isNaN(newBalance) || newBalance < 0) {
        showMessage('Invalid balance amount');
        return;
    }

    try {
        await db.collection('users').doc(userId).update({ balance: newBalance });
        showMessage('User balance updated successfully', 'success');
        loadUsers();
    } catch (error) {
        showMessage('Error updating balance: ' + error.message);
    }
}

// Load deposit requests
async function loadDepositRequests() {
    try {
        depositsDiv.innerHTML = '';
        const depositsSnapshot = await db.collection('depositRequests')
            .where('status', '==', 'pending')
            .orderBy('timestamp', 'desc')
            .get();

        depositsSnapshot.forEach(doc => {
            const request = doc.data();
            const depositItem = document.createElement('div');
            depositItem.className = 'deposit-item';
            depositItem.innerHTML = `
                <div>
                    <strong>Deposit Request</strong><br>
                    User: ${request.userId}<br>
                    Amount: $${request.amount.toFixed(2)}<br>
                    Date: ${new Date(request.timestamp.toDate()).toLocaleString()}
                </div>
                <div>
                    <button onclick="approveDeposit('${doc.id}', '${request.userId}', ${request.amount})">Approve</button>
                    <button onclick="rejectDeposit('${doc.id}')">Reject</button>
                </div>
            `;
            depositsDiv.appendChild(depositItem);
        });
    } catch (error) {
        console.error('Error loading deposit requests:', error);
    }
}

// Approve deposit
async function approveDeposit(requestId, userId, amount) {
    try {
        // Update request status
        await db.collection('depositRequests').doc(requestId).update({ status: 'approved' });

        // Update user balance
        const userDoc = await db.collection('users').doc(userId).get();
        const currentBalance = userDoc.data().balance;
        await db.collection('users').doc(userId).update({ balance: currentBalance + amount });

        showMessage('Deposit approved successfully', 'success');
        loadDepositRequests();
        loadUsers();
    } catch (error) {
        showMessage('Error approving deposit: ' + error.message);
    }
}

// Reject deposit
async function rejectDeposit(requestId) {
    try {
        await db.collection('depositRequests').doc(requestId).update({ status: 'rejected' });
        showMessage('Deposit rejected successfully', 'success');
        loadDepositRequests();
    } catch (error) {
        showMessage('Error rejecting deposit: ' + error.message);
    }
}

// Load withdraw requests
async function loadWithdrawRequests() {
    try {
        withdrawsDiv.innerHTML = '';
        const withdrawsSnapshot = await db.collection('withdrawRequests')
            .where('status', '==', 'pending')
            .orderBy('timestamp', 'desc')
            .get();

        withdrawsSnapshot.forEach(doc => {
            const request = doc.data();
            const withdrawItem = document.createElement('div');
            withdrawItem.className = 'withdraw-item';
            withdrawItem.innerHTML = `
                <div>
                    <strong>Withdraw Request</strong><br>
                    User: ${request.userId}<br>
                    Amount: $${request.amount.toFixed(2)}<br>
                    Date: ${new Date(request.timestamp.toDate()).toLocaleString()}
                </div>
                <div>
                    <button onclick="approveWithdraw('${doc.id}', '${request.userId}', ${request.amount})">Approve</button>
                    <button onclick="rejectWithdraw('${doc.id}')">Reject</button>
                </div>
            `;
            withdrawsDiv.appendChild(withdrawItem);
        });
    } catch (error) {
        console.error('Error loading withdraw requests:', error);
    }
}

// Approve withdraw
async function approveWithdraw(requestId, userId, amount) {
    try {
        // Check user balance
        const userDoc = await db.collection('users').doc(userId).get();
        const currentBalance = userDoc.data().balance;
        if (currentBalance < amount) {
            showMessage('Insufficient balance for withdrawal');
            return;
        }

        // Update request status
        await db.collection('withdrawRequests').doc(requestId).update({ status: 'approved' });

        // Update user balance
        await db.collection('users').doc(userId).update({ balance: currentBalance - amount });

        showMessage('Withdraw approved successfully', 'success');
        loadWithdrawRequests();
        loadUsers();
    } catch (error) {
        showMessage('Error approving withdraw: ' + error.message);
    }
}

// Reject withdraw
async function rejectWithdraw(requestId) {
    try {
        await db.collection('withdrawRequests').doc(requestId).update({ status: 'rejected' });
        showMessage('Withdraw rejected successfully', 'success');
        loadWithdrawRequests();
    } catch (error) {
        showMessage('Error rejecting withdraw: ' + error.message);
    }
}

// Admin logout
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
        auth.signOut();
        adminPanel.style.display = 'none';
        adminLogin.style.display = 'block';
    });
}

// Show message function
function showMessage(message, type = 'error') {
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 5000);
    }
}

// Check if admin is logged in on page load
auth.onAuthStateChanged((user) => {
    if (user && user.email === ADMIN_EMAIL && window.location.pathname.includes('admin.html')) {
        showAdminPanel();
    }
});
