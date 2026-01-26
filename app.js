// app.js - User-side logic for Banking App

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const messageDiv = document.getElementById('message');

// Dashboard elements (only if on dashboard page)
const userNameSpan = document.getElementById('user-name');
const userBalanceSpan = document.getElementById('user-balance');
const depositForm = document.getElementById('depositForm');
const withdrawForm = document.getElementById('withdrawForm');
const userRequestsDiv = document.getElementById('user-requests');
const logoutBtn = document.getElementById('logout');

// Toggle between login and register forms
if (showRegister && showLogin) {
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });
}

// Login functionality
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            showMessage(error.message);
        }
    });
}

// Register functionality
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                balance: 0
            });

            showMessage('Registration successful! Please login.', 'success');
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        } catch (error) {
            showMessage(error.message);
        }
    });
}

// Dashboard functionality
if (window.location.pathname.includes('dashboard.html')) {
    // Load user data
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userDoc = await db.collection('users').doc(user.uid).get();
                const userData = userDoc.data();
                userNameSpan.textContent = userData.name;
                userBalanceSpan.textContent = userData.balance.toFixed(2);
                loadUserRequests(user.uid);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        } else {
            window.location.href = 'index.html';
        }
    });

    // Deposit form submission
    if (depositForm) {
        depositForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('depositAmount').value);
            if (isNaN(amount) || amount <= 0) {
                showMessage('Invalid deposit amount');
                return;
            }

            const user = auth.currentUser;
            if (user) {
                try {
                    await db.collection('depositRequests').add({
                        userId: user.uid,
                        amount: amount,
                        status: 'pending',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    showMessage('Deposit request submitted successfully', 'success');
                    depositForm.reset();
                    loadUserRequests(user.uid);
                } catch (error) {
                    showMessage('Error submitting deposit request: ' + error.message);
                }
            }
        });
    }

    // Withdraw form submission
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('withdrawAmount').value);
            if (isNaN(amount) || amount <= 0) {
                showMessage('Invalid withdraw amount');
                return;
            }

            const user = auth.currentUser;
            if (user) {
                try {
                    await db.collection('withdrawRequests').add({
                        userId: user.uid,
                        amount: amount,
                        status: 'pending',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    showMessage('Withdraw request submitted successfully', 'success');
                    withdrawForm.reset();
                    loadUserRequests(user.uid);
                } catch (error) {
                    showMessage('Error submitting withdraw request: ' + error.message);
                }
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut();
            window.location.href = 'index.html';
        });
    }

    // Load user requests
    async function loadUserRequests(userId) {
        try {
            userRequestsDiv.innerHTML = '';

            // Load deposit requests
            const depositRequests = await db.collection('depositRequests')
                .where('userId', '==', userId)
                .orderBy('timestamp', 'desc')
                .get();

            depositRequests.forEach(doc => {
                const request = doc.data();
                const requestItem = document.createElement('div');
                requestItem.className = `request-item ${request.status}`;
                requestItem.innerHTML = `
                    <strong>Deposit Request</strong><br>
                    Amount: $${request.amount.toFixed(2)}<br>
                    Status: ${request.status}<br>
                    Date: ${new Date(request.timestamp.toDate()).toLocaleString()}
                `;
                userRequestsDiv.appendChild(requestItem);
            });

            // Load withdraw requests
            const withdrawRequests = await db.collection('withdrawRequests')
                .where('userId', '==', userId)
                .orderBy('timestamp', 'desc')
                .get();

            withdrawRequests.forEach(doc => {
                const request = doc.data();
                const requestItem = document.createElement('div');
                requestItem.className = `request-item ${request.status}`;
                requestItem.innerHTML = `
                    <strong>Withdraw Request</strong><br>
                    Amount: $${request.amount.toFixed(2)}<br>
                    Status: ${request.status}<br>
                    Date: ${new Date(request.timestamp.toDate()).toLocaleString()}
                `;
                userRequestsDiv.appendChild(requestItem);
            });
        } catch (error) {
            console.error('Error loading user requests:', error);
        }
    }
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

// Check if user is logged in on page load
auth.onAuthStateChanged((user) => {
    if (user && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    }
});
