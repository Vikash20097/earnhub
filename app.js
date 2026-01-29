   // App.js - User Side Functionality

// DOM Elements
const authContainer = document.getElementById('auth-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const disclaimerModal = document.getElementById('disclaimer-modal');
const popupModal = document.getElementById('popup-modal');

// Auth Elements
const loginMobile = document.getElementById('login-mobile');
const loginPassword = document.getElementById('login-password');
const registerMobile = document.getElementById('register-mobile');
const registerPassword = document.getElementById('register-password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// App Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const logoutBtn = document.getElementById('logout-btn');

// Dashboard Elements
const userName = document.getElementById('user-name');
const balance = document.getElementById('balance');
const totalEarnings = document.getElementById('total-earnings');
const activePackage = document.getElementById('active-package');

// Packages Elements
const packagesList = document.getElementById('packages-list');

// Missions Elements
const missionsList = document.getElementById('missions-list');

// Wallet Elements
const walletTabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const depositAmount = document.getElementById('deposit-amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawAmount = document.getElementById('withdraw-amount');
const withdrawBtn = document.getElementById('withdraw-btn');
const transactionHistory = document.getElementById('transaction-history');

// Admin Elements
const adminUnlockBtn = document.getElementById('admin-unlock-btn');
const adminPanel = document.getElementById('admin-panel');
const adminTabs = document.querySelectorAll('.admin-tab-btn');
const adminTabContents = document.querySelectorAll('.admin-tab-content');
const depositRequestsList = document.getElementById('deposit-requests-list');
const withdrawalRequestsList = document.getElementById('withdrawal-requests-list');
const usersList = document.getElementById('users-list');

// Help Elements
const helpMessage = document.getElementById('help-message');
const submitHelp = document.getElementById('submit-help');

// Modal Elements
const acceptDisclaimer = document.getElementById('accept-disclaimer');
const closePopup = document.getElementById('close-popup');

// Data
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];
let referrals = JSON.parse(localStorage.getItem('referrals')) || [];

// Packages Data
const packages = [
    { name: 'Iron', price: 100, dailyEarning: 5, missionLimit: 3, benefits: ['Basic access', '3 missions/day', 'Standard support'], cooldown: 300, priority: 1 },
    { name: 'Bronze', price: 200, dailyEarning: 10, missionLimit: 5, benefits: ['Bronze badge', '5 missions/day', 'Priority support'], cooldown: 300, priority: 2 },
    { name: 'Silver', price: 500, dailyEarning: 25, missionLimit: 8, benefits: ['Silver badge', '8 missions/day', 'Faster cooldowns'], cooldown: 240, priority: 3 },
    { name: 'Gold', price: 1000, dailyEarning: 50, missionLimit: 12, benefits: ['Gold badge', '12 missions/day', 'VIP support', 'Bonus rewards'], cooldown: 180, priority: 4 },
    { name: 'Platinum', price: 2000, dailyEarning: 100, missionLimit: 15, benefits: ['Platinum badge', '15 missions/day', 'Instant support', 'Exclusive missions'], cooldown: 120, priority: 5 },
    { name: 'Diamond', price: 5000, dailyEarning: 250, missionLimit: 20, benefits: ['Diamond badge', '20 missions/day', 'Premium features', 'Monthly bonuses'], cooldown: 60, priority: 6 },
    { name: 'Titanium', price: 10000, dailyEarning: 500, missionLimit: 25, benefits: ['Titanium badge', '25 missions/day', 'Advanced analytics', 'Custom rewards'], cooldown: 30, priority: 7 },
    { name: 'Uranium', price: 20000, dailyEarning: 1000, missionLimit: 30, benefits: ['Uranium badge', '30 missions/day', 'Unlimited access', 'Referral bonuses'], cooldown: 15, priority: 8 },
    { name: 'Plutonium', price: 50000, dailyEarning: 2500, missionLimit: 35, benefits: ['Plutonium badge', '35 missions/day', 'Elite status', 'Passive income'], cooldown: 10, priority: 9 },
    { name: 'Neutronium', price: 100000, dailyEarning: 5000, missionLimit: 40, benefits: ['Neutronium badge', '40 missions/day', 'Ultimate perks', 'Investment opportunities'], cooldown: 5, priority: 10 },
    { name: 'Adamantium', price: 200000, dailyEarning: 10000, missionLimit: 45, benefits: ['Adamantium badge', '45 missions/day', 'Legendary status', 'Exclusive events'], cooldown: 1, priority: 11 },
    { name: 'Vibranium', price: 500000, dailyEarning: 25000, missionLimit: 50, benefits: ['Vibranium badge', '50 missions/day', 'Mythical rewards', 'Community leadership'], cooldown: 1, priority: 12 },
    { name: 'Kryptonite', price: 1000000, dailyEarning: 50000, missionLimit: 55, benefits: ['Kryptonite badge', '55 missions/day', 'Superhero status', 'Global recognition'], cooldown: 1, priority: 13 },
    { name: 'Unobtainium', price: 2000000, dailyEarning: 100000, missionLimit: 60, benefits: ['Unobtainium badge', '60 missions/day', 'Impossible achievements', 'Legacy builder'], cooldown: 1, priority: 14 },
    { name: 'Dilithium', price: 5000000, dailyEarning: 250000, missionLimit: 65, benefits: ['Dilithium badge', '65 missions/day', 'Starfleet access', 'Galactic influence'], cooldown: 1, priority: 15 },
    { name: 'Tritanium', price: 10000000, dailyEarning: 500000, missionLimit: 70, benefits: ['Tritanium badge', '70 missions/day', 'Imperial status', 'Empire builder'], cooldown: 1, priority: 16 },
    { name: 'Naquadah', price: 20000000, dailyEarning: 1000000, missionLimit: 75, benefits: ['Naquadah badge', '75 missions/day', 'Ancient power', 'God-like abilities'], cooldown: 1, priority: 17 },
    { name: 'Element X', price: 50000000, dailyEarning: 2500000, missionLimit: 80, benefits: ['Element X badge', '80 missions/day', 'Elemental mastery', 'Reality bending'], cooldown: 1, priority: 18 },
    { name: 'Quantumite', price: 100000000, dailyEarning: 5000000, missionLimit: 85, benefits: ['Quantumite badge', '85 missions/day', 'Quantum supremacy', 'Multiverse control'], cooldown: 1, priority: 19 },
    { name: 'Dark Matter', price: 200000000, dailyEarning: 10000000, missionLimit: 90, benefits: ['Dark Matter badge', '90 missions/day', 'Cosmic power', 'Universe shaper'], cooldown: 1, priority: 20 },
    { name: 'Antimatter', price: 500000000, dailyEarning: 25000000, missionLimit: 95, benefits: ['Antimatter badge', '95 missions/day', 'Anti-matter control', 'Destruction creator'], cooldown: 1, priority: 21 },
    { name: 'Exotic Matter', price: 1000000000, dailyEarning: 50000000, missionLimit: 100, benefits: ['Exotic Matter badge', '100 missions/day', 'Exotic energies', 'Reality weaver'], cooldown: 1, priority: 22 },
    { name: 'God Particle', price: 2000000000, dailyEarning: 100000000, missionLimit: 105, benefits: ['God Particle badge', '105 missions/day', 'Divine power', 'Creation master'], cooldown: 1, priority: 23 },
    { name: 'Infinity Stone', price: 5000000000, dailyEarning: 250000000, missionLimit: 110, benefits: ['Infinity Stone badge', '110 missions/day', 'Infinite possibilities', 'Stone wielder'], cooldown: 1, priority: 24 },
    { name: 'Cosmic Cube', price: 10000000000, dailyEarning: 500000000, missionLimit: 115, benefits: ['Cosmic Cube badge', '115 missions/day', 'Cube mastery', 'Wish granter'], cooldown: 1, priority: 25 },
    { name: 'Reality Gem', price: 20000000000, dailyEarning: 1000000000, missionLimit: 120, benefits: ['Reality Gem badge', '120 missions/day', 'Reality control', 'Illusion master'], cooldown: 1, priority: 26 },
    { name: 'Power Gem', price: 50000000000, dailyEarning: 2500000000, missionLimit: 125, benefits: ['Power Gem badge', '125 missions/day', 'Unlimited power', 'Energy manipulator'], cooldown: 1, priority: 27 },
    { name: 'Space Gem', price: 100000000000, dailyEarning: 5000000000, missionLimit: 130, benefits: ['Space Gem badge', '130 missions/day', 'Space mastery', 'Teleporter'], cooldown: 1, priority: 28 },
    { name: 'Time Gem', price: 200000000000, dailyEarning: 10000000000, missionLimit: 135, benefits: ['Time Gem badge', '135 missions/day', 'Time control', 'Chronomancer'], cooldown: 1, priority: 29 },
    { name: 'Soul Gem', price: 500000000000, dailyEarning: 25000000000, missionLimit: 140, benefits: ['Soul Gem badge', '140 missions/day', 'Soul manipulation', 'Life giver'], cooldown: 1, priority: 30 },
    { name: 'Mind Gem', price: 1000000000000, dailyEarning: 50000000000, missionLimit: 145, benefits: ['Mind Gem badge', '145 missions/day', 'Mind control', 'Psychic master'], cooldown: 1, priority: 31 }
];

// Missions Data
const missions = [
    { id: 1, title: 'Watch Video', reward: 10, cooldown: 300, type: 'basic' }, // 5 minutes
    { id: 2, title: 'Complete Survey', reward: 25, cooldown: 600, type: 'basic' }, // 10 minutes
    { id: 3, title: 'Share on Social Media', reward: 15, cooldown: 1800, type: 'basic' }, // 30 minutes
    { id: 4, title: 'Download App', reward: 50, cooldown: 3600, type: 'basic' }, // 1 hour
    { id: 5, title: 'Refer Friend', reward: 100, cooldown: 7200, type: 'basic' }, // 2 hours
    { id: 6, title: 'Stop the Timer Game', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 7, title: 'Click Speed Challenge', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 8, title: 'Memory Card Game', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 9, title: 'Reaction Test', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 10, title: 'Number Guess Game', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 11, title: 'Quick Math Challenge', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 12, title: 'Puzzle Slider Game', reward: 50, cooldown: 600, type: 'game', maxReward: 50 }, // 10 minutes
    { id: 13, title: 'Color Match Challenge', reward: 45, cooldown: 480, type: 'game', maxReward: 45 }, // 8 minutes
    { id: 14, title: 'Word Scramble', reward: 40, cooldown: 540, type: 'game', maxReward: 40 }, // 9 minutes
    { id: 15, title: 'Shape Recognition', reward: 35, cooldown: 420, type: 'game', maxReward: 35 }, // 7 minutes
    { id: 16, title: 'Sequence Memory', reward: 55, cooldown: 720, type: 'game', maxReward: 55 }, // 12 minutes
    { id: 17, title: 'Typing Speed Test', reward: 30, cooldown: 360, type: 'game', maxReward: 30 }, // 6 minutes
    { id: 18, title: 'Pattern Matching', reward: 45, cooldown: 480, type: 'game', maxReward: 45 }, // 8 minutes
    { id: 19, title: 'Rhythm Game', reward: 40, cooldown: 540, type: 'game', maxReward: 40 }, // 9 minutes
];

// Utility Functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1001;
        animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => document.body.removeChild(alertDiv), 300);
    }, 3000);
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString();
}

function getCurrentDate() {
    return new Date().toDateString();
}

// Auth Functions
function initAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
        checkDisclaimer();
    } else {
        showAuth();
    }
}

function showAuth() {
    authContainer.style.display = 'block';
    appContainer.style.display = 'none';
}

function showApp() {
    authContainer.style.display = 'none';
    appContainer.style.display = 'block';
    updateDashboard();
    loadPackages();
    loadMissions();
    loadReferrals();
    loadWallet();
    updateDepositReference();
}

function checkDisclaimer() {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (!disclaimerAccepted) {
        disclaimerModal.style.display = 'flex';
    }
}

function login() {
    const mobile = loginMobile.value.trim();
    const password = loginPassword.value;

    if (!mobile || !password) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    const user = users.find(u => u.mobile === mobile && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showApp();
        checkDisclaimer();
        showAlert('Login successful!', 'success');
    } else {
        showAlert('Invalid credentials', 'error');
    }
}

function register() {
    const mobile = registerMobile.value.trim();
    const password = registerPassword.value;

    if (!mobile || !password) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'error');
        return;
    }

    const existingUser = users.find(u => u.mobile === mobile);
    if (existingUser) {
        showAlert('Mobile number already registered', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        mobile,
        password,
        name: `User${mobile.slice(-4)}`,
        balance: 0,
        totalEarnings: 0,
        activePackage: null,
        missionsCompleted: {},
        joinedDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Check for referral
    checkReferral();

    showApp();
    checkDisclaimer();
    popupModal.style.display = 'flex';
    showAlert('Registration successful!', 'success');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuth();
    showAlert('Logged out successfully');
}

// Dashboard Functions
function updateDashboard() {
    if (!currentUser) return;

    userName.textContent = currentUser.name;
    balance.textContent = formatCurrency(currentUser.balance);
    totalEarnings.textContent = formatCurrency(currentUser.totalEarnings);
    activePackage.textContent = currentUser.activePackage ? currentUser.activePackage.name : 'None';
}

// Packages Functions
function loadPackages() {
    packagesList.innerHTML = '';
    packages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = `package-card card package-${pkg.name.toLowerCase()}`;
        packageCard.innerHTML = `
            <div class="package-header">
                <h3>${pkg.name}</h3>
                <div class="priority-badge">Priority ${pkg.priority}</div>
            </div>
            <div class="package-price">${formatCurrency(pkg.price)}</div>
            <div class="package-details">
                <div class="detail-item">
                    <span class="detail-label">Daily Earnings:</span>
                    <span class="detail-value">${formatCurrency(pkg.dailyEarning)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Mission Limit:</span>
                    <span class="detail-value">${pkg.missionLimit}/day</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Cooldown:</span>
                    <span class="detail-value">${pkg.cooldown}s</span>
                </div>
            </div>
            <div class="package-benefits">
                <h4>Benefits:</h4>
                <ul>
                    ${pkg.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            <button onclick="purchasePackage('${pkg.name}')" ${currentUser.activePackage && currentUser.activePackage.name === pkg.name ? 'disabled' : ''}>
                ${currentUser.activePackage && currentUser.activePackage.name === pkg.name ? 'Active Package' : 'Purchase'}
            </button>
        `;
        packagesList.appendChild(packageCard);
    });
}

function purchasePackage(packageName) {
    if (currentUser.activePackage) {
        showAlert('You can only have one active package', 'error');
        return;
    }

    const pkg = packages.find(p => p.name === packageName);
    if (currentUser.balance < pkg.price) {
        showAlert('Insufficient balance', 'error');
        return;
    }

    currentUser.balance -= pkg.price;
    currentUser.activePackage = pkg;
    updateUserData();
    updateDashboard();
    loadPackages();
    showAlert(`Package ${packageName} purchased successfully!`, 'success');
}

// Missions Functions
function loadMissions() {
    // Check if user has any approved deposits
    const hasDeposit = transactions.some(t => t.userId === currentUser.id && t.type === 'Deposit' && t.status === 'approved');

    if (!hasDeposit) {
        missionsList.innerHTML = `
            <div class="deposit-required-message">
                <h3>🚫 Missions Locked</h3>
                <p>You must make a deposit to unlock missions and games.</p>
                <p>Complete a deposit request and wait for admin approval to access these features.</p>
                <button onclick="switchSection('wallet')" class="deposit-btn">Go to Wallet</button>
            </div>
        `;
        return;
    }

    missionsList.innerHTML = '';
    const today = getCurrentDate();
    const userMissions = currentUser.missionsCompleted[today] || {};

    missions.forEach(mission => {
        const completedCount = userMissions[mission.id] || 0;
        const canComplete = completedCount < (currentUser.activePackage ? currentUser.activePackage.missionLimit : 3);
        const lastCompleted = userMissions[`${mission.id}_last`] || 0;
        const timeLeft = Math.max(0, mission.cooldown - (Date.now() - lastCompleted) / 1000);
        const isOnCooldown = timeLeft > 0;

        const missionCard = document.createElement('div');
        missionCard.className = `mission-card ${mission.type === 'game' ? 'game-mission' : 'basic-mission'} ${completedCount >= (currentUser.activePackage ? currentUser.activePackage.missionLimit : 3) ? 'completed' : ''}`;

        const buttonText = mission.type === 'game' ? 'Play Game' : (isOnCooldown ? 'Cooldown' : 'Complete');
        const buttonAction = mission.type === 'game' ? `playGame(${mission.id})` : `completeMission(${mission.id})`;

        missionCard.innerHTML = `
            <div class="mission-header">
                <h4>${mission.title}</h4>
                <div class="reward-badge">Max Reward: ${formatCurrency(mission.maxReward || mission.reward)}</div>
            </div>
            <div class="mission-details">
                <p>Cooldown: ${Math.ceil(mission.cooldown / 60)} min</p>
                ${isOnCooldown ? `<p class="cooldown-timer">Ready in: ${Math.ceil(timeLeft)}s</p>` : ''}
            </div>
            <button onclick="${buttonAction}" ${!canComplete || isOnCooldown ? 'disabled' : ''}>
                ${buttonText}
            </button>
        `;
        missionsList.appendChild(missionCard);
    });
}

function completeMission(missionId) {
    const today = getCurrentDate();
    if (!currentUser.missionsCompleted[today]) {
        currentUser.missionsCompleted[today] = {};
    }

    const mission = missions.find(m => m.id === missionId);
    const completedCount = currentUser.missionsCompleted[today][missionId] || 0;
    const maxMissions = currentUser.activePackage ? currentUser.activePackage.missionLimit : 3;

    if (completedCount >= maxMissions) {
        showAlert('Daily mission limit reached', 'error');
        return;
    }

    const lastCompleted = currentUser.missionsCompleted[today][`${missionId}_last`] || 0;
    const timeLeft = Math.max(0, mission.cooldown - (Date.now() - lastCompleted) / 1000);

    if (timeLeft > 0) {
        showAlert('Mission is on cooldown', 'error');
        return;
    }

    currentUser.missionsCompleted[today][missionId] = completedCount + 1;
    currentUser.missionsCompleted[today][`${missionId}_last`] = Date.now();
    currentUser.balance += mission.reward;
    currentUser.totalEarnings += mission.reward;

    // Process referral reward for first mission completion
    if (missionId === 1 && completedCount === 0) {
        processReferralReward();
    }

    updateUserData();
    updateDashboard();
    loadMissions();
    showAlert(`Mission completed! Earned ${formatCurrency(mission.reward)}`, 'success');
}

function processReferralReward() {
    // Check if this user was referred
    const userReferral = referrals.find(r => r.referredId === currentUser.id);
    if (userReferral) {
        // Referral reward already processed during registration
        return;
    }
}

function checkReferral() {
    // Check if there's a referral code in URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref') || localStorage.getItem('referralCode');

    if (referralCode) {
        // Find the referrer
        const referrer = users.find(u => u.id === referralCode);
        if (referrer && referrer.id !== currentUser.id) {
            // Create referral record
            const referral = {
                id: Date.now(),
                referrerId: referrer.id,
                referredId: currentUser.id,
                date: new Date().toISOString(),
                rewardGiven: false
            };
            referrals.push(referral);
            localStorage.setItem('referrals', JSON.stringify(referrals));

            // Give referral reward to referrer
            referrer.balance += 500; // ₹500 referral bonus
            referrer.totalEarnings += 500;
            updateUserData();

            // Update referrer in users array
            const referrerIndex = users.findIndex(u => u.id === referrer.id);
            if (referrerIndex !== -1) {
                users[referrerIndex] = referrer;
                localStorage.setItem('users', JSON.stringify(users));
            }

            showAlert('Referral bonus of ₹500 credited to referrer!', 'success');
        }
    }
}

function loadReferrals() {
    const referralContent = document.getElementById('referral-content');
    if (!referralContent) return;

    const referralLink = `${window.location.origin}${window.location.pathname}?ref=${currentUser.id}`;

    // Calculate referral stats
    const userReferrals = referrals.filter(r => r.referrerId === currentUser.id);
    const totalReferrals = userReferrals.length;
    const totalEarnings = userReferrals.length * 500;

    referralContent.innerHTML = `
        <div class="referral-link-section">
            <h4>Your Referral Link</h4>
            <div class="referral-link" id="referral-link">${referralLink}</div>
            <button class="copy-btn" onclick="copyReferralLink()">Copy Link</button>
        </div>

        <div class="referral-stats">
            <div class="stat-card">
                <h5>Total Referrals</h5>
                <div class="stat-value">${totalReferrals}</div>
            </div>
            <div class="stat-card">
                <h5>Earnings from Referrals</h5>
                <div class="stat-value">₹${totalEarnings}</div>
            </div>
        </div>

        <div class="referred-users">
            <h4>Your Referred Users</h4>
            ${userReferrals.length > 0 ? userReferrals.map(ref => {
                const referredUser = users.find(u => u.id === ref.referredId);
                return `
                    <div class="referred-user-item">
                        <div class="referred-user-name">${referredUser ? referredUser.name : 'Unknown User'}</div>
                        <div class="referred-user-date">${new Date(ref.date).toLocaleDateString()}</div>
                        <div class="referred-user-reward">₹500</div>
                    </div>
                `;
            }).join('') : '<p>No referrals yet. Share your link to earn!</p>'}
        </div>
    `;
}

function copyReferralLink() {
    const referralLink = document.getElementById('referral-link').textContent;
    navigator.clipboard.writeText(referralLink).then(() => {
        showAlert('Referral link copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showAlert('Referral link copied to clipboard!', 'success');
    });
}

// Wallet Functions
function loadWallet() {
    loadTransactionHistory();
}

function loadTransactionHistory() {
    transactionHistory.innerHTML = '';
    const userTransactions = transactions.filter(t => t.userId === currentUser.id);

    userTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.innerHTML = `
            <div>
                <div class="type">${transaction.type}</div>
                <div class="date">${new Date(transaction.date).toLocaleDateString()}</div>
            </div>
            <div class="amount">${formatCurrency(transaction.amount)}</div>
            <div class="status ${transaction.status}">${transaction.status}</div>
        `;
        transactionHistory.appendChild(transactionItem);
    });
}

function requestDeposit() {
    const amount = parseFloat(depositAmount.value);
    if (!amount || amount <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    const transaction = {
        id: Date.now(),
        userId: currentUser.id,
        type: 'Deposit',
        amount,
        status: 'pending',
        date: new Date().toISOString()
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    depositAmount.value = '';
    loadTransactionHistory();
    showAlert('Deposit request submitted successfully!', 'success');
}

function requestWithdraw() {
    const amount = parseFloat(withdrawAmount.value);
    if (!amount || amount <= 0) {
        showAlert('Please enter a valid amount', 'error');
        return;
    }

    if (currentUser.balance < amount) {
        showAlert('Insufficient balance', 'error');
        return;
    }

    const transaction = {
        id: Date.now(),
        userId: currentUser.id,
        type: 'Withdraw',
        amount,
        status: 'pending',
        date: new Date().toISOString()
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    withdrawAmount.value = '';
    loadTransactionHistory();
    loadAdminData();
    showAlert('Withdraw request submitted successfully!', 'success');
}

// Admin Functions
function unlockAdmin() {
    const password = prompt('Enter Admin Password:');
    if (password === 'ADMIN@123') {
        adminPanel.style.display = 'block';
        loadAdminData();
        showAlert('Admin panel unlocked!', 'success');
    } else {
        showAlert('Incorrect password!', 'error');
    }
}

function loadAdminData() {
    loadDepositRequests();
    loadWithdrawalRequests();
    loadUsersAdmin();
}

function loadDepositRequests() {
    depositRequestsList.innerHTML = '';
    const depositTransactions = transactions.filter(t => t.type === 'Deposit' && t.status === 'pending');

    depositTransactions.forEach(transaction => {
        const user = users.find(u => u.id === transaction.userId);
        const requestItem = document.createElement('div');
        requestItem.className = 'admin-request-item';
        requestItem.innerHTML = `
            <div>
                <div class="user">${user ? user.name : 'Unknown'}</div>
                <div class="amount">${formatCurrency(transaction.amount)}</div>
                <div class="date">${new Date(transaction.date).toLocaleDateString()}</div>
            </div>
            <div class="actions">
                <button class="approve-btn" onclick="approveTransaction(${transaction.id})">Approve</button>
                <button class="reject-btn" onclick="rejectTransaction(${transaction.id})">Reject</button>
            </div>
        `;
        depositRequestsList.appendChild(requestItem);
    });
}

function loadWithdrawalRequests() {
    withdrawalRequestsList.innerHTML = '';
    const withdrawalTransactions = transactions.filter(t => t.type === 'Withdraw' && t.status === 'pending');

    withdrawalTransactions.forEach(transaction => {
        const user = users.find(u => u.id === transaction.userId);
        const requestItem = document.createElement('div');
        requestItem.className = 'admin-request-item';
        requestItem.innerHTML = `
            <div>
                <div class="user">${user ? user.name : 'Unknown'}</div>
                <div class="amount">${formatCurrency(transaction.amount)}</div>
                <div class="date">${new Date(transaction.date).toLocaleDateString()}</div>
            </div>
            <div class="actions">
                <button class="approve-btn" onclick="approveTransaction(${transaction.id})">Approve</button>
                <button class="reject-btn" onclick="rejectTransaction(${transaction.id})">Reject</button>
            </div>
        `;
        withdrawalRequestsList.appendChild(requestItem);
    });
}

function loadUsersAdmin() {
    usersList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'admin-user-item';
        userItem.innerHTML = `
            <div>
                <div class="user">${user.name}</div>
                <div class="balance">Balance: ${formatCurrency(user.balance)}</div>
                <div class="earnings">Total Earnings: ${formatCurrency(user.totalEarnings)}</div>
            </div>
            <div class="actions">
                <input type="number" class="balance-input" id="admin-balance-${user.id}" value="${user.balance}" min="0" step="0.01">
                <button class="update-btn" onclick="updateUserBalance(${user.id})">Update</button>
            </div>
        `;
        usersList.appendChild(userItem);
    });
}

function approveTransaction(transactionId) {
    const transactionIndex = transactions.findIndex(t => t.id === transactionId);
    if (transactionIndex !== -1) {
        const transaction = transactions[transactionIndex];
        const userIndex = users.findIndex(u => u.id === transaction.userId);

        if (userIndex !== -1) {
            if (transaction.type === 'Deposit') {
                users[userIndex].balance += transaction.amount;
                users[userIndex].totalEarnings += transaction.amount;
            } else if (transaction.type === 'Withdraw') {
                users[userIndex].balance -= transaction.amount;
            }

            localStorage.setItem('users', JSON.stringify(users));

            // Update current user if it's the logged-in user
            if (currentUser && currentUser.id === transaction.userId) {
                currentUser.balance = users[userIndex].balance;
                currentUser.totalEarnings = users[userIndex].totalEarnings;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateDashboard();
            }
        }

        transactions[transactionIndex].status = 'approved';
        localStorage.setItem('transactions', JSON.stringify(transactions));
        loadTransactionHistory();
        loadAdminData();
        showAlert('Transaction approved successfully!', 'success');
    }
}

function rejectTransaction(transactionId) {
    const transactionIndex = transactions.findIndex(t => t.id === transactionId);
    if (transactionIndex !== -1) {
        transactions[transactionIndex].status = 'rejected';
        localStorage.setItem('transactions', JSON.stringify(transactions));
        loadTransactionHistory();
        loadAdminData();
        showAlert('Transaction rejected', 'error');
    }
}

function updateUserBalance(userId) {
    const newBalance = parseFloat(document.getElementById(`admin-balance-${userId}`).value);
    if (isNaN(newBalance) || newBalance < 0) {
        showAlert('Please enter a valid balance', 'error');
        return;
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].balance = newBalance;
        localStorage.setItem('users', JSON.stringify(users));

        // Update current user if it's the logged-in user
        if (currentUser && currentUser.id === userId) {
            currentUser.balance = newBalance;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateDashboard();
        }

        loadUsersAdmin();
        loadTransactionHistory();
        showAlert('User balance updated successfully!', 'success');
    }
}

function switchAdminTab(tabName) {
    adminTabs.forEach(tab => tab.classList.remove('active'));
    adminTabContents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-admin-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-admin-tab`).classList.add('active');
}

// Help Functions
function submitMessage() {
    const message = helpMessage.value.trim();
    if (!message) {
        showAlert('Please enter a message', 'error');
        return;
    }

    const newMessage = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        message,
        date: new Date().toISOString(),
        status: 'unread'
    };

    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    helpMessage.value = '';
    showAlert('Message sent successfully!', 'success');
}

// Utility Functions
function updateUserData() {
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function switchSection(sectionId) {
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

function switchTab(tabName) {
    walletTabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Game Functions
function playGame(gameId) {
    const game = missions.find(m => m.id === gameId);
    if (!game) return;

    let reward = 0;
    let gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.innerHTML = `
        <div class="game-modal-content">
            <h3>${game.title}</h3>
            <div id="game-area"></div>
            <div class="game-controls">
                <button id="start-game-btn">Start Game</button>
                <button id="close-game-btn">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(gameModal);

    const gameArea = document.getElementById('game-area');
    const startBtn = document.getElementById('start-game-btn');
    const closeBtn = document.getElementById('close-game-btn');

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(gameModal);
    });

    startBtn.addEventListener('click', () => {
        startGame(gameId, gameArea, gameModal);
    });
}

function startGame(gameId, gameArea, gameModal) {
    switch(gameId) {
        case 6: // Stop the Timer Game
            playStopTimerGame(gameArea, gameModal);
            break;
        case 7: // Click Speed Challenge
            playClickSpeedGame(gameArea, gameModal);
            break;
        case 8: // Memory Card Game
            playMemoryGame(gameArea, gameModal);
            break;
        case 9: // Reaction Test
            playReactionGame(gameArea, gameModal);
            break;
        case 10: // Number Guess Game
            playNumberGuessGame(gameArea, gameModal);
            break;
        case 11: // Quick Math Challenge
            playMathGame(gameArea, gameModal);
            break;
        case 12: // Puzzle Slider Game
            playPuzzleGame(gameArea, gameModal);
            break;
        case 13: // Color Match Challenge
            playColorMatchGame(gameArea, gameModal);
            break;
        case 14: // Word Scramble
            playWordScrambleGame(gameArea, gameModal);
            break;
        case 15: // Shape Recognition
            playShapeRecognitionGame(gameArea, gameModal);
            break;
        case 16: // Sequence Memory
            playSequenceMemoryGame(gameArea, gameModal);
            break;
        case 17: // Typing Speed Test
            playTypingSpeedGame(gameArea, gameModal);
            break;
        case 18: // Pattern Matching
            playPatternMatchingGame(gameArea, gameModal);
            break;
        case 19: // Rhythm Game
            playRhythmGame(gameArea, gameModal);
            break;
    }
}

function playStopTimerGame(gameArea, gameModal) {
    let startTime, timer, targetTime;
    gameArea.innerHTML = `
        <p>Click "Start" and stop the timer as close as possible to 5.00 seconds!</p>
        <div id="timer-display" style="font-size: 48px; font-weight: bold; margin: 20px;">0.00</div>
        <button id="start-timer-btn">Start Timer</button>
        <button id="stop-timer-btn" disabled>Stop Timer</button>
    `;

    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-timer-btn');
    const stopBtn = document.getElementById('stop-timer-btn');

    startBtn.addEventListener('click', () => {
        startTime = Date.now();
        targetTime = 5000; // 5 seconds
        startBtn.disabled = true;
        stopBtn.disabled = false;

        timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            timerDisplay.textContent = (elapsed / 1000).toFixed(2);
        }, 10);
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timer);
        const elapsed = Date.now() - startTime;
        const difference = Math.abs(elapsed - targetTime);
        let reward = 0;

        if (difference <= 200) reward = 50; // Perfect
        else if (difference <= 500) reward = 40;
        else if (difference <= 1000) reward = 30;
        else if (difference <= 2000) reward = 20;
        else reward = 10;

        gameArea.innerHTML = `
            <p>Target: 5.00s</p>
            <p>Your time: ${(elapsed / 1000).toFixed(2)}s</p>
            <p>Difference: ${(difference / 1000).toFixed(2)}s</p>
            <p>Reward: ₹${reward}</p>
            <button onclick="completeGame(6, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
        `;
    });
}

function playClickSpeedGame(gameArea, gameModal) {
    let clicks = 0;
    let timeLeft = 10;
    let gameTimer;

    gameArea.innerHTML = `
        <p>Click the button as many times as possible in 10 seconds!</p>
        <div id="click-count" style="font-size: 48px; font-weight: bold;">0</div>
        <div id="time-left" style="font-size: 24px;">Time: 10s</div>
        <button id="click-btn" style="padding: 20px; font-size: 20px;">CLICK ME!</button>
    `;

    const clickCount = document.getElementById('click-count');
    const timeDisplay = document.getElementById('time-left');
    const clickBtn = document.getElementById('click-btn');

    clickBtn.addEventListener('click', () => {
        if (timeLeft > 0) {
            clicks++;
            clickCount.textContent = clicks;
        }
    });

    gameTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            let reward = 0;
            if (clicks >= 41) reward = 50;
            else if (clicks >= 21) reward = 25;
            else reward = 10;

            gameArea.innerHTML = `
                <p>Total Clicks: ${clicks}</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(7, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
        }
    }, 1000);
}

function playMemoryGame(gameArea, gameModal) {
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let shuffledCards = cards.sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;
    let turns = 0;

    gameArea.innerHTML = `
        <p>Find all matching pairs!</p>
        <div id="memory-board" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 300px;"></div>
        <p>Turns: <span id="turns">0</span></p>
    `;

    const board = document.getElementById('memory-board');
    const turnsDisplay = document.getElementById('turns');

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.style.cssText = `
            width: 60px; height: 60px; background: #2196f3; color: white;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; font-weight: bold; cursor: pointer;
            border-radius: 8px; transition: transform 0.3s;
        `;
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;

        cardElement.addEventListener('click', () => flipCard(cardElement));
        board.appendChild(cardElement);
    });

    function flipCard(card) {
        if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.textContent = card.dataset.value;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            turns++;
            turnsDisplay.textContent = turns;

            setTimeout(() => {
                if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
                    flippedCards.forEach(c => {
                        c.classList.add('matched');
                        c.style.background = '#4caf50';
                    });
                    matchedPairs++;
                } else {
                    flippedCards.forEach(c => {
                        c.textContent = '';
                        c.classList.remove('flipped');
                    });
                }
                flippedCards = [];

                if (matchedPairs === 4) {
                    let reward = 0;
                    if (turns <= 8) reward = 50;
                    else if (turns <= 12) reward = 35;
                    else if (turns <= 16) reward = 25;
                    else reward = 15;

                    gameArea.innerHTML = `
                        <p>Completed in ${turns} turns!</p>
                        <p>Reward: ₹${reward}</p>
                        <button onclick="completeGame(8, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
                    `;
                }
            }, 1000);
        }
    }
}

function playReactionGame(gameArea, gameModal) {
    gameArea.innerHTML = `
        <p>Wait for the screen to turn green, then click as fast as possible!</p>
        <div id="reaction-area" style="width: 300px; height: 200px; background: red; margin: 20px auto; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; border-radius: 10px;">Wait...</div>
    `;

    const reactionArea = document.getElementById('reaction-area');
    let startTime, reactionTime;

    setTimeout(() => {
        reactionArea.style.background = 'green';
        reactionArea.textContent = 'CLICK NOW!';
        startTime = Date.now();

        reactionArea.addEventListener('click', () => {
            if (!reactionTime) {
                reactionTime = Date.now() - startTime;
                let reward = 0;

                if (reactionTime <= 200) reward = 50;
                else if (reactionTime <= 300) reward = 40;
                else if (reactionTime <= 400) reward = 30;
                else if (reactionTime <= 500) reward = 20;
                else if (reactionTime <= 800) reward = 10;
                else reward = 5;

                gameArea.innerHTML = `
                    <p>Reaction Time: ${reactionTime}ms</p>
                    <p>Reward: ₹${reward}</p>
                    <button onclick="completeGame(9, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
                `;
            }
        });
    }, Math.random() * 3000 + 2000); // Random delay between 2-5 seconds
}

function playNumberGuessGame(gameArea, gameModal) {
    const targetNumber = Math.floor(Math.random() * 50) + 1;
    let guessesLeft = 5;
    let guesses = [];

    gameArea.innerHTML = `
        <p>I'm thinking of a number between 1 and 50. You have 5 guesses!</p>
        <input type="number" id="guess-input" min="1" max="50" placeholder="Enter your guess">
        <button id="guess-btn">Guess</button>
        <div id="guess-feedback"></div>
        <div id="previous-guesses"></div>
    `;

    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const feedback = document.getElementById('guess-feedback');
    const previousGuesses = document.getElementById('previous-guesses');

    guessBtn.addEventListener('click', () => {
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 50) {
            feedback.textContent = 'Please enter a number between 1 and 50.';
            return;
        }

        guesses.push(guess);
        guessesLeft--;

        if (guess === targetNumber) {
            let reward = 0;
            if (guesses.length === 1) reward = 50;
            else if (guesses.length === 2) reward = 40;
            else if (guesses.length === 3) reward = 30;
            else if (guesses.length === 4) reward = 20;
            else reward = 10;

            gameArea.innerHTML = `
                <p>Correct! The number was ${targetNumber}</p>
                <p>Guesses used: ${guesses.length}</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(10, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
        } else {
            const hint = guess < targetNumber ? 'Too low!' : 'Too high!';
            feedback.textContent = `${hint} ${guessesLeft} guesses left.`;
            previousGuesses.textContent = `Previous guesses: ${guesses.join(', ')}`;

            if (guessesLeft === 0) {
                gameArea.innerHTML = `
                    <p>Game over! The number was ${targetNumber}</p>
                    <p>Reward: ₹5</p>
                    <button onclick="completeGame(10, 5, '${gameModal.outerHTML}')">Claim Reward</button>
                `;
            }
        }

        guessInput.value = '';
    });
}

function playMathGame(gameArea, gameModal) {
    const questions = [];
    for (let i = 0; i < 5; i++) {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const op = Math.random() < 0.5 ? '+' : '-';
        const answer = op === '+' ? a + b : a - b;
        questions.push({ question: `${a} ${op} ${b}`, answer });
    }

    let currentQuestion = 0;
    let correctAnswers = 0;
    let timeLeft = 20;
    let gameTimer;

    function showQuestion() {
        if (currentQuestion >= questions.length) {
            clearInterval(gameTimer);
            const reward = correctAnswers * 10;
            gameArea.innerHTML = `
                <p>Time's up! Correct answers: ${correctAnswers}/5</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(11, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
            return;
        }

        gameArea.innerHTML = `
            <p>Time left: <span id="math-time">${timeLeft}</span>s</p>
            <p>Solve: <span id="math-question">${questions[currentQuestion].question}</span> = ?</p>
            <input type="number" id="math-answer" placeholder="Your answer">
            <button id="submit-answer">Submit</button>
            <p>Question ${currentQuestion + 1} of 5</p>
        `;

        const answerInput = document.getElementById('math-answer');
        const submitBtn = document.getElementById('submit-answer');

        submitBtn.addEventListener('click', () => {
            const userAnswer = parseInt(answerInput.value);
            if (userAnswer === questions[currentQuestion].answer) {
                correctAnswers++;
            }
            currentQuestion++;
            showQuestion();
        });
    }

    gameTimer = setInterval(() => {
        timeLeft--;
        const timeDisplay = document.getElementById('math-time');
        if (timeDisplay) timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            const reward = correctAnswers * 10;
            gameArea.innerHTML = `
                <p>Time's up! Correct answers: ${correctAnswers}/5</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(11, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
        }
    }, 1000);

    showQuestion();
}

function playPuzzleGame(gameArea, gameModal) {
    const size = 3;
    const tiles = [];
    let emptyPos = 8;
    let startTime;

    // Create solved state
    for (let i = 0; i < size * size - 1; i++) {
        tiles.push(i + 1);
    }
    tiles.push(null); // Empty space

    // Shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    emptyPos = tiles.indexOf(null);

    gameArea.innerHTML = `
        <p>Slide tiles to arrange numbers 1-8 in order!</p>
        <div id="puzzle-board" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; max-width: 200px; margin: 20px auto;"></div>
        <div id="puzzle-time">Time: 0.00s</div>
    `;

    const board = document.getElementById('puzzle-board');
    const timeDisplay = document.getElementById('puzzle-time');
    startTime = Date.now();

    function renderBoard() {
        board.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'puzzle-tile';
            tileElement.style.cssText = `
                width: 60px; height: 60px; background: ${tile ? '#2196f3' : 'transparent'};
                color: white; display: flex; align-items: center; justify-content: center;
                font-size: 24px; font-weight: bold; cursor: pointer; border-radius: 5px;
                border: ${tile ? '2px solid #1976d2' : 'none'};
            `;
            tileElement.textContent = tile || '';
            tileElement.dataset.index = index;

            if (tile) {
                tileElement.addEventListener('click', () => moveTile(index));
            }
            board.appendChild(tileElement);
        });

        const elapsed = (Date.now() - startTime) / 1000;
        timeDisplay.textContent = `Time: ${elapsed.toFixed(2)}s`;
    }

    function moveTile(index) {
        const row = Math.floor(index / size);
        const col = index % size;
        const emptyRow = Math.floor(emptyPos / size);
        const emptyCol = emptyPos % size;

        if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
            [tiles[index], tiles[emptyPos]] = [tiles[emptyPos], tiles[index]];
            emptyPos = index;
            renderBoard();

            // Check if solved
            const isSolved = tiles.slice(0, -1).every((tile, i) => tile === i + 1);
            if (isSolved) {
                const elapsed = (Date.now() - startTime) / 1000;
                let reward = 0;
                if (elapsed <= 30) reward = 50;
                else if (elapsed <= 60) reward = 40;
                else if (elapsed <= 120) reward = 30;
                else if (elapsed <= 180) reward = 20;
                else reward = 10;

                gameArea.innerHTML = `
                    <p>Puzzle solved in ${elapsed.toFixed(2)} seconds!</p>
                    <p>Reward: ₹${reward}</p>
                    <button onclick="completeGame(12, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
                `;
            }
        }
    }

    renderBoard();
}

function completeGame(gameId, reward, modalHTML) {
    // Remove modal
    const modal = document.querySelector('.game-modal');
    if (modal) document.body.removeChild(modal);

    // Award reward
    currentUser.balance += reward;
    currentUser.totalEarnings += reward;

    // Update mission completion
    const today = getCurrentDate();
    if (!currentUser.missionsCompleted[today]) {
        currentUser.missionsCompleted[today] = {};
    }
    currentUser.missionsCompleted[today][gameId] = (currentUser.missionsCompleted[today][gameId] || 0) + 1;
    currentUser.missionsCompleted[today][`${gameId}_last`] = Date.now();

    updateUserData();
    updateDashboard();
    loadMissions();
    showAlert(`Game completed! Earned ₹${reward}`, 'success');
}

function playColorMatchGame(gameArea, gameModal) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    let targetColor = colors[Math.floor(Math.random() * colors.length)];
    let options = [targetColor];
    while (options.length < 4) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (!options.includes(randomColor)) {
            options.push(randomColor);
        }
    }
    options = options.sort(() => Math.random() - 0.5);

    gameArea.innerHTML = `
        <p>Click the button that matches this color:</p>
        <div style="width: 100px; height: 100px; background: ${targetColor}; margin: 20px auto; border-radius: 10px;"></div>
        <div id="color-options" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 200px; margin: 20px auto;"></div>
    `;

    const optionsContainer = document.getElementById('color-options');
    let startTime = Date.now();

    options.forEach(color => {
        const button = document.createElement('button');
        button.style.cssText = `
            width: 80px; height: 80px; background: ${color}; border: none; border-radius: 10px;
            cursor: pointer; margin: 5px;
        `;
        button.addEventListener('click', () => {
            const reactionTime = Date.now() - startTime;
            let reward = 0;
            if (color === targetColor) {
                if (reactionTime <= 1000) reward = 45;
                else if (reactionTime <= 2000) reward = 35;
                else if (reactionTime <= 3000) reward = 25;
                else reward = 15;
            } else {
                reward = 5; // Wrong answer
            }

            gameArea.innerHTML = `
                <p>${color === targetColor ? 'Correct!' : 'Wrong!'}</p>
                <p>Reaction Time: ${reactionTime}ms</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(13, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
        });
        optionsContainer.appendChild(button);
    });
}

function playWordScrambleGame(gameArea, gameModal) {
    const words = ['JAVASCRIPT', 'PROGRAMMING', 'COMPUTER', 'INTERNET', 'DEVELOPER'];
    const originalWord = words[Math.floor(Math.random() * words.length)];
    const scrambledWord = originalWord.split('').sort(() => Math.random() - 0.5).join('');

    gameArea.innerHTML = `
        <p>Unscramble this word:</p>
        <div style="font-size: 32px; font-weight: bold; margin: 20px; letter-spacing: 5px;">${scrambledWord}</div>
        <input type="text" id="word-input" placeholder="Your answer" style="padding: 10px; font-size: 18px; text-align: center;">
        <button id="submit-word">Submit</button>
    `;

    const input = document.getElementById('word-input');
    const submitBtn = document.getElementById('submit-word');
    let startTime = Date.now();

    submitBtn.addEventListener('click', () => {
        const userAnswer = input.value.toUpperCase().trim();
        const timeTaken = Date.now() - startTime;
        let reward = 0;

        if (userAnswer === originalWord) {
            if (timeTaken <= 10000) reward = 40;
            else if (timeTaken <= 20000) reward = 30;
            else if (timeTaken <= 30000) reward = 20;
            else reward = 10;
        } else {
            reward = 5; // Wrong answer
        }

        gameArea.innerHTML = `
            <p>Original word: ${originalWord}</p>
            <p>Your answer: ${userAnswer}</p>
            <p>Time taken: ${(timeTaken / 1000).toFixed(1)}s</p>
            <p>Reward: ₹${reward}</p>
            <button onclick="completeGame(14, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
        `;
    });
}

function playShapeRecognitionGame(gameArea, gameModal) {
    const shapes = ['circle', 'square', 'triangle', 'star', 'diamond'];
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    let options = [targetShape];
    while (options.length < 4) {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        if (!options.includes(randomShape)) {
            options.push(randomShape);
        }
    }
    options = options.sort(() => Math.random() - 0.5);

    gameArea.innerHTML = `
        <p>Click the button that matches this shape:</p>
        <div style="width: 80px; height: 80px; margin: 20px auto; background: #2196f3; clip-path: ${getShapeClipPath(targetShape)};"></div>
        <div id="shape-options" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 200px; margin: 20px auto;"></div>
    `;

    const optionsContainer = document.getElementById('shape-options');
    let startTime = Date.now();

    options.forEach(shape => {
        const button = document.createElement('button');
        button.style.cssText = `
            width: 80px; height: 80px; background: #2196f3; border: none; cursor: pointer;
            clip-path: ${getShapeClipPath(shape)}; margin: 5px;
        `;
        button.addEventListener('click', () => {
            const reactionTime = Date.now() - startTime;
            let reward = 0;
            if (shape === targetShape) {
                if (reactionTime <= 1500) reward = 35;
                else if (reactionTime <= 2500) reward = 25;
                else if (reactionTime <= 3500) reward = 15;
                else reward = 10;
            } else {
                reward = 5; // Wrong answer
            }

            gameArea.innerHTML = `
                <p>${shape === targetShape ? 'Correct!' : 'Wrong!'}</p>
                <p>Reaction Time: ${reactionTime}ms</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(15, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
        });
        optionsContainer.appendChild(button);
    });
}

function getShapeClipPath(shape) {
    switch(shape) {
        case 'circle': return 'circle(50%)';
        case 'square': return 'none';
        case 'triangle': return 'polygon(50% 0%, 0% 100%, 100% 100%)';
        case 'star': return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        case 'diamond': return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        default: return 'none';
    }
}

function playSequenceMemoryGame(gameArea, gameModal) {
    let sequence = [];
    let playerSequence = [];
    let level = 1;
    let showingSequence = false;

    function generateSequence() {
        sequence.push(Math.floor(Math.random() * 4));
    }

    function showSequence() {
        showingSequence = true;
        let index = 0;
        const colors = ['red', 'blue', 'green', 'yellow'];

        const interval = setInterval(() => {
            if (index < sequence.length) {
                const colorIndex = sequence[index];
                flashButton(colorIndex);
                index++;
            } else {
                clearInterval(interval);
                showingSequence = false;
                gameArea.innerHTML += '<p>Your turn! Click the buttons in the correct order.</p>';
            }
        }, 800);
    }

    function flashButton(colorIndex) {
        const buttons = document.querySelectorAll('.sequence-btn');
        buttons[colorIndex].style.opacity = '1';
        setTimeout(() => {
            buttons[colorIndex].style.opacity = '0.5';
        }, 400);
    }

    function createButtons() {
        gameArea.innerHTML = `
            <p>Level ${level}</p>
            <div id="sequence-buttons" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 200px; margin: 20px auto;"></div>
        `;

        const buttonContainer = document.getElementById('sequence-buttons');
        const colors = ['red', 'blue', 'green', 'yellow'];

        colors.forEach((color, index) => {
            const button = document.createElement('button');
            button.className = 'sequence-btn';
            button.style.cssText = `
                width: 80px; height: 80px; background: ${color}; border: none; border-radius: 10px;
                opacity: 0.5; cursor: pointer; transition: opacity 0.3s;
            `;
            button.addEventListener('click', () => handleButtonClick(index));
            buttonContainer.appendChild(button);
        });
    }

    function handleButtonClick(colorIndex) {
        if (showingSequence) return;

        playerSequence.push(colorIndex);
        flashButton(colorIndex);

        if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
            // Wrong sequence
            const reward = Math.max(5, level * 5);
            gameArea.innerHTML = `
                <p>Wrong sequence! Game over.</p>
                <p>Level reached: ${level}</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(16, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
            return;
        }

        if (playerSequence.length === sequence.length) {
            // Level complete
            level++;
            playerSequence = [];
            setTimeout(() => {
                generateSequence();
                createButtons();
                showSequence();
            }, 1000);
        }
    }

    generateSequence();
    createButtons();
    setTimeout(() => showSequence(), 1000);
}

function playTypingSpeedGame(gameArea, gameModal) {
    const sentences = [
        "The quick brown fox jumps over the lazy dog.",
        "JavaScript is a versatile programming language.",
        "Mobile-first design ensures great user experience.",
        "Local storage helps persist data in web applications."
    ];
    const targetText = sentences[Math.floor(Math.random() * sentences.length)];

    gameArea.innerHTML = `
        <p>Type this text as fast as you can:</p>
        <div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin: 20px 0; font-size: 16px;">${targetText}</div>
        <textarea id="typing-input" placeholder="Start typing here..." style="width: 100%; height: 100px; padding: 10px; font-size: 16px;"></textarea>
        <div id="typing-stats" style="margin-top: 10px;"></div>
        <button id="finish-typing">Finish</button>
    `;

    const input = document.getElementById('typing-input');
    const stats = document.getElementById('typing-stats');
    const finishBtn = document.getElementById('finish-typing');
    let startTime = Date.now();
    let timer;

    input.addEventListener('input', () => {
        if (!timer) {
            startTime = Date.now();
            timer = setInterval(updateStats, 100);
        }
        updateStats();
    });

    function updateStats() {
        const typed = input.value;
        const timeElapsed = (Date.now() - startTime) / 1000;
        const wordsTyped = typed.split(' ').length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60) || 0;
        const accuracy = Math.round((typed.length / targetText.length) * 100);

        stats.innerHTML = `WPM: ${wpm} | Accuracy: ${accuracy}% | Time: ${timeElapsed.toFixed(1)}s`;
    }

    finishBtn.addEventListener('click', () => {
        clearInterval(timer);
        const typed = input.value;
        const timeElapsed = (Date.now() - startTime) / 1000;
        const wordsTyped = typed.split(' ').length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60) || 0;
        const accuracy = Math.round((typed.length / targetText.length) * 100);

        let reward = 0;
        if (wpm >= 40 && accuracy >= 95) reward = 30;
        else if (wpm >= 30 && accuracy >= 90) reward = 25;
        else if (wpm >= 20 && accuracy >= 80) reward = 20;
        else if (wpm >= 15 && accuracy >= 70) reward = 15;
        else reward = 10;

        gameArea.innerHTML = `
            <p>WPM: ${wpm}</p>
            <p>Accuracy: ${accuracy}%</p>
            <p>Time: ${timeElapsed.toFixed(1)}s</p>
            <p>Reward: ₹${reward}</p>
            <button onclick="completeGame(17, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
        `;
    });
}

function playPatternMatchingGame(gameArea, gameModal) {
    const patterns = [
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1]
    ];
    const targetPattern = patterns[Math.floor(Math.random() * patterns.length)];
    let options = [targetPattern];
    while (options.length < 3) {
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        if (!options.some(p => JSON.stringify(p) === JSON.stringify(randomPattern))) {
            options.push(randomPattern);
        }
    }
    options = options.sort(() => Math.random() - 0.5);

    gameArea.innerHTML = `
        <p>Click the pattern that matches:</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; max-width: 120px; margin: 20px auto;">${targetPattern.map(cell => `<div style="width: 30px; height: 30px; background: ${cell ? '#2196f3' : '#ddd'}; border-radius: 5px;"></div>`).join('')}</div>
        <div id="pattern-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 400px; margin: 20px auto;"></div>
    `;

    const optionsContainer = document.getElementById('pattern-options');
    let startTime = Date.now();

    options.forEach((pattern, index) => {
        const patternDiv = document.createElement('div');
        patternDiv.style.cssText = 'cursor: pointer;';
        patternDiv.innerHTML = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;">${pattern.map(cell => `<div style="width: 25px; height: 25px; background: ${cell ? '#2196f3' : '#ddd'}; border-radius: 3px;"></div>`).join('')}</div>`;
        patternDiv.addEventListener('click', () => {
            const reactionTime = Date.now() - startTime;
            let reward = 0;
            if (JSON.stringify(pattern) === JSON.stringify(targetPattern)) {
                if (reactionTime <= 2000) reward = 45;
                else if (reactionTime <= 4000) reward = 35;
                else if (reactionTime <= 6000) reward = 25;
                else reward = 15;
            } else {
                reward = 5; // Wrong answer
            }

            gameArea.innerHTML = `
                <p>${JSON.stringify(pattern) === JSON.stringify(targetPattern) ? 'Correct!' : 'Wrong!'}</p>
                <p>Reaction Time: ${reactionTime}ms</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(18, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
        });
        optionsContainer.appendChild(patternDiv);
    });
}

function playRhythmGame(gameArea, gameModal) {
    const sequence = [1, 1, 0, 1, 0, 1, 1, 0];
    let playerSequence = [];
    let currentBeat = 0;
    let score = 0;

    gameArea.innerHTML = `
        <p>Tap the button in rhythm with the beats!</p>
        <div id="rhythm-button" style="width: 120px; height: 120px; background: #2196f3; border-radius: 50%; margin: 30px auto; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; user-select: none;">TAP</div>
        <div id="rhythm-score">Score: 0</div>
        <div id="rhythm-feedback"></div>
    `;

    const button = document.getElementById('rhythm-button');
    const scoreDisplay = document.getElementById('rhythm-score');
    const feedback = document.getElementById('rhythm-feedback');

    let beatInterval = setInterval(() => {
        if (currentBeat >= sequence.length) {
            clearInterval(beatInterval);
            const reward = Math.max(10, Math.min(40, score * 5));
            gameArea.innerHTML = `
                <p>Game complete!</p>
                <p>Final Score: ${score}/${sequence.length}</p>
                <p>Reward: ₹${reward}</p>
                <button onclick="completeGame(19, ${reward}, '${gameModal.outerHTML}')">Claim Reward</button>
            `;
            return;
        }

        const shouldTap = sequence[currentBeat];
        button.style.background = shouldTap ? '#4caf50' : '#2196f3';
        button.textContent = shouldTap ? 'TAP!' : 'WAIT';

        setTimeout(() => {
            button.style.background = '#2196f3';
            button.textContent = 'TAP';
        }, 300);

        currentBeat++;
    }, 600);

    button.addEventListener('click', () => {
        const expectedTap = sequence[currentBeat - 1];
        if (expectedTap) {
            score++;
            feedback.textContent = 'Good!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = 'Miss!';
            feedback.style.color = 'red';
        }
        scoreDisplay.textContent = `Score: ${score}`;
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initAuth);

// Auth Event Listeners
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);

loginMobile.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

loginPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

registerMobile.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') register();
});

registerPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') register();
});

// App Event Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        switchSection(sectionId);
    });
});

logoutBtn.addEventListener('click', logout);

// Wallet Event Listeners
walletTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
    });
});

depositBtn.addEventListener('click', requestDeposit);
withdrawBtn.addEventListener('click', requestWithdraw);

// Admin Event Listeners
adminUnlockBtn.addEventListener('click', unlockAdmin);

adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-admin-tab');
        switchAdminTab(tabName);
    });
});

// Help Event Listeners
submitHelp.addEventListener('click', submitMessage);

// Modal Event Listeners
acceptDisclaimer.addEventListener('click', () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    disclaimerModal.style.display = 'none';
});

closePopup.addEventListener('click', () => {
    popupModal.style.display = 'none';
});

// Add CSS for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
