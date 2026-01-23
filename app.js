// ===== APP STATE & STORAGE =====
const appState = {
    user: null,
    balance: 0,
    missionEarnings: 0,
    gameEarnings: 0,
    referralEarnings: 0,
    bonusEarnings: 0,
    activePackage: null,
    packageCost: 0,
    missionsCompleted: 0,
    gamesPlayed: 0,
    referralCount: 0,
    referralCode: '',
    transactions: [],
    
    // ===== DAILY TRACKING =====
    dailyStats: {
        date: getCurrentDate(),
        missionsCompletedToday: 0,
        gamesPlayedToday: 0,
        lastMissionTime: 0,
        bonusEarningsToday: 0,
        earningsToday: 0, // Track total daily earnings
        tasksCompletedByType: {}, // Track by task type
    },
    
    // ===== ADVANCED TASK SYSTEM =====
    tasks: {
        available: [], // Available tasks for today
        completed: [], // Completed task IDs
        cooldownTimestamps: {}, // Task type -> last completed time
    },
    
    // ===== REFERRAL TRACKING =====
    referralData: {
        code: '',
        referredUsers: [], // Array of referred user IDs
        totalReferralBonus: 0, // Total bonus earned from referrals
        referralHistory: [], // Detailed history of each referral activation
    },
    
    // ===== SECURITY & PERSISTENCE =====
    sessionData: {
        loginTime: 0,
        lastActivityTime: 0,
        dataVersionHash: '', // For detecting tampering
    },
    
    // ===== DEPOSIT & WITHDRAWAL SYSTEM =====
    deposits: [], // Array of deposit requests
    withdrawals: [], // Array of withdrawal requests
    hasDepositedAtLeastOnce: false, // Track if user has made a deposit
};

// NEW: Helper function to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const now = new Date();
    return now.getFullYear() + '-' + 
           String(now.getMonth() + 1).padStart(2, '0') + '-' + 
           String(now.getDate()).padStart(2, '0');
}

// ===== PACKAGES CONFIGURATION (ADVANCED 20+ METAL SYSTEM) =====
// Premium, tiered packages with metal-based naming
// Each package has specific earning potential, daily limits, and task types
const packages = {
    // ===== TIER 1: STARTER METALS =====
    copper: {
        id: 'copper',
        name: 'Copper',
        tier: 1,
        price: 49,
        validity: 7,
        dailyEarningCap: 150,
        missionsPerDay: 3,
        earningPerMission: 15,
        gamesPerDay: 2,
        gamesPerSession: 2,
        tasksAvailable: ['watch_ads'],
        color: '#B87333',
        gradient: 'linear-gradient(135deg, #B87333 0%, #8B5A00 100%)',
        powerLevel: 1,
        unlockedGames: ['click'],
    },
    bronze: {
        id: 'bronze',
        name: 'Bronze',
        tier: 1,
        price: 99,
        validity: 7,
        dailyEarningCap: 350,
        missionsPerDay: 5,
        earningPerMission: 25,
        gamesPerDay: 3,
        gamesPerSession: 3,
        tasksAvailable: ['watch_ads', 'video_tasks'],
        color: '#CD7F32',
        gradient: 'linear-gradient(135deg, #CD7F32 0%, #8B5A00 100%)',
        powerLevel: 2,
        unlockedGames: ['click'],
    },
    silver: {
        id: 'silver',
        name: 'Silver',
        tier: 2,
        price: 199,
        validity: 14,
        dailyEarningCap: 600,
        missionsPerDay: 10,
        earningPerMission: 40,
        gamesPerDay: 4,
        gamesPerSession: 4,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys'],
        color: '#C0C0C0',
        gradient: 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)',
        powerLevel: 3,
        unlockedGames: ['click', 'timer'],
    },
    gold: {
        id: 'gold',
        name: 'Gold',
        tier: 2,
        price: 399,
        validity: 14,
        dailyEarningCap: 1000,
        missionsPerDay: 15,
        earningPerMission: 55,
        gamesPerDay: 5,
        gamesPerSession: 5,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement'],
        color: '#FFD700',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        powerLevel: 4,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    platinum: {
        id: 'platinum',
        name: 'Platinum',
        tier: 3,
        price: 699,
        validity: 30,
        dailyEarningCap: 1500,
        missionsPerDay: 25,
        earningPerMission: 75,
        gamesPerDay: 6,
        gamesPerSession: 6,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special'],
        color: '#E5E4E2',
        gradient: 'linear-gradient(135deg, #E5E4E2 0%, #D3D3D3 100%)',
        powerLevel: 5,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    
    // ===== TIER 3-4: ADVANCED METALS =====
    titanium: {
        id: 'titanium',
        name: 'Titanium',
        tier: 3,
        price: 999,
        validity: 30,
        dailyEarningCap: 2000,
        missionsPerDay: 35,
        earningPerMission: 100,
        gamesPerDay: 8,
        gamesPerSession: 8,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#878681',
        gradient: 'linear-gradient(135deg, #878681 0%, #5D5D5D 100%)',
        powerLevel: 6,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    diamond: {
        id: 'diamond',
        name: 'Diamond',
        tier: 4,
        price: 1499,
        validity: 30,
        dailyEarningCap: 2500,
        missionsPerDay: 50,
        earningPerMission: 125,
        gamesPerDay: 10,
        gamesPerSession: 10,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#B9F2FF',
        gradient: 'linear-gradient(135deg, #B9F2FF 0%, #87CEEB 100%)',
        powerLevel: 7,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    ruby: {
        id: 'ruby',
        name: 'Ruby',
        tier: 4,
        price: 1999,
        validity: 30,
        dailyEarningCap: 3000,
        missionsPerDay: 60,
        earningPerMission: 150,
        gamesPerDay: 12,
        gamesPerSession: 12,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#E0115F',
        gradient: 'linear-gradient(135deg, #E0115F 0%, #C41E3A 100%)',
        powerLevel: 8,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    sapphire: {
        id: 'sapphire',
        name: 'Sapphire',
        tier: 4,
        price: 2499,
        validity: 30,
        dailyEarningCap: 3500,
        missionsPerDay: 70,
        earningPerMission: 175,
        gamesPerDay: 14,
        gamesPerSession: 14,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#0F52BA',
        gradient: 'linear-gradient(135deg, #0F52BA 0%, #0047AB 100%)',
        powerLevel: 9,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    
    // ===== TIER 5: PREMIUM ELITE METALS =====
    emerald: {
        id: 'emerald',
        name: 'Emerald',
        tier: 5,
        price: 2999,
        validity: 30,
        dailyEarningCap: 4000,
        missionsPerDay: 80,
        earningPerMission: 200,
        gamesPerDay: 16,
        gamesPerSession: 16,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#50C878',
        gradient: 'linear-gradient(135deg, #50C878 0%, #228B22 100%)',
        powerLevel: 10,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    onyx: {
        id: 'onyx',
        name: 'Onyx',
        tier: 5,
        price: 3499,
        validity: 30,
        dailyEarningCap: 4500,
        missionsPerDay: 90,
        earningPerMission: 225,
        gamesPerDay: 18,
        gamesPerSession: 18,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#353935',
        gradient: 'linear-gradient(135deg, #353935 0%, #1C1C1C 100%)',
        powerLevel: 11,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    obsidian: {
        id: 'obsidian',
        name: 'Obsidian',
        tier: 5,
        price: 3999,
        validity: 30,
        dailyEarningCap: 5000,
        missionsPerDay: 100,
        earningPerMission: 250,
        gamesPerDay: 20,
        gamesPerSession: 20,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#0B1215',
        gradient: 'linear-gradient(135deg, #0B1215 0%, #000000 100%)',
        powerLevel: 12,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    
    // ===== TIER 6: ULTRA-RARE METALS =====
    iridium: {
        id: 'iridium',
        name: 'Iridium',
        tier: 6,
        price: 4999,
        validity: 30,
        dailyEarningCap: 5500,
        missionsPerDay: 120,
        earningPerMission: 275,
        gamesPerDay: 25,
        gamesPerSession: 25,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#3E3E3E',
        gradient: 'linear-gradient(135deg, #3E3E3E 0%, #4D7EA8 100%)',
        powerLevel: 13,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    palladium: {
        id: 'palladium',
        name: 'Palladium',
        tier: 6,
        price: 5999,
        validity: 30,
        dailyEarningCap: 6000,
        missionsPerDay: 140,
        earningPerMission: 300,
        gamesPerDay: 30,
        gamesPerSession: 30,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#4D5D6C',
        gradient: 'linear-gradient(135deg, #4D5D6C 0%, #6E8898 100%)',
        powerLevel: 14,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    rhodium: {
        id: 'rhodium',
        name: 'Rhodium',
        tier: 6,
        price: 7499,
        validity: 30,
        dailyEarningCap: 7000,
        missionsPerDay: 160,
        earningPerMission: 350,
        gamesPerDay: 35,
        gamesPerSession: 35,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#D7D7D7',
        gradient: 'linear-gradient(135deg, #D7D7D7 0%, #A9A9A9 100%)',
        powerLevel: 15,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    osmium: {
        id: 'osmium',
        name: 'Osmium',
        tier: 6,
        price: 8999,
        validity: 30,
        dailyEarningCap: 8000,
        missionsPerDay: 180,
        earningPerMission: 400,
        gamesPerDay: 40,
        gamesPerSession: 40,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#2C3E50',
        gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        powerLevel: 16,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    
    // ===== TIER 7: MYTHICAL METALS =====
    graphene: {
        id: 'graphene',
        name: 'Graphene',
        tier: 7,
        price: 9999,
        validity: 30,
        dailyEarningCap: 9000,
        missionsPerDay: 200,
        earningPerMission: 450,
        gamesPerDay: 50,
        gamesPerSession: 50,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#36454F',
        gradient: 'linear-gradient(135deg, #36454F 0%, #1F3A3F 100%)',
        powerLevel: 17,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    neutronium: {
        id: 'neutronium',
        name: 'Neutronium',
        tier: 7,
        price: 11999,
        validity: 30,
        dailyEarningCap: 10000,
        missionsPerDay: 250,
        earningPerMission: 500,
        gamesPerDay: 999,
        gamesPerSession: 999,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#1A1A1A',
        gradient: 'linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)',
        powerLevel: 18,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    quantum: {
        id: 'quantum',
        name: 'Quantum',
        tier: 7,
        price: 14999,
        validity: 30,
        dailyEarningCap: 12000,
        missionsPerDay: 999,
        earningPerMission: 600,
        gamesPerDay: 999,
        gamesPerSession: 999,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#FF1493',
        gradient: 'linear-gradient(135deg, #FF1493 0%, #8B008B 100%)',
        powerLevel: 19,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
    infinity: {
        id: 'infinity',
        name: 'Infinity',
        tier: 7,
        price: 19999,
        validity: 30,
        dailyEarningCap: 15000,
        missionsPerDay: 999,
        earningPerMission: 750,
        gamesPerDay: 999,
        gamesPerSession: 999,
        tasksAvailable: ['watch_ads', 'video_tasks', 'surveys', 'app_engagement', 'daily_special', 'referral'],
        color: '#FFD700',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        powerLevel: 20,
        unlockedGames: ['click', 'timer', 'quiz'],
    },
};

// Quiz questions data
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correct: 1
    },
    {
        question: "Which planet is closest to the sun?",
        options: ["Venus", "Mercury", "Mars", "Earth"],
        correct: 1
    },
    {
        question: "What is 5 × 6?",
        options: ["25", "30", "35", "40"],
        correct: 1
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: ["Mark Twain", "Shakespeare", "Jane Austen", "Charles Dickens"],
        correct: 1
    },
    {
        question: "What is the largest ocean?",
        options: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correct: 2
    }
];

// ===== ADVANCED TASK SYSTEM (MULTIPLE TASK TYPES) =====
// Task templates for different task types
const taskTemplates = {
    watch_ads: {
        id: 'watch_ads',
        name: 'Watch Ads',
        description: 'Watch advertisements and earn instantly',
        duration: 30, // seconds
        baseReward: 20,
        cooldown: 120, // 2 minutes between tasks
        icon: '📺',
        maxPerDay: 'unlimited',
    },
    video_tasks: {
        id: 'video_tasks',
        name: 'Video Tasks',
        description: 'Complete short video tasks',
        duration: 60, // seconds
        baseReward: 35,
        cooldown: 180, // 3 minutes
        icon: '🎬',
        maxPerDay: 'unlimited',
    },
    surveys: {
        id: 'surveys',
        name: 'Survey Tasks',
        description: 'Complete quick surveys',
        duration: 120, // seconds
        baseReward: 50,
        cooldown: 300, // 5 minutes
        icon: '📋',
        maxPerDay: 'unlimited',
    },
    app_engagement: {
        id: 'app_engagement',
        name: 'App Engagement',
        description: 'Install and engage with partner apps',
        duration: 180, // seconds
        baseReward: 75,
        cooldown: 600, // 10 minutes
        icon: '📱',
        maxPerDay: 'unlimited',
    },
    daily_special: {
        id: 'daily_special',
        name: 'Daily Special',
        description: 'Complete daily special tasks for bonus earnings',
        duration: 240, // seconds
        baseReward: 100,
        cooldown: 86400, // 24 hours (once per day)
        icon: '⭐',
        maxPerDay: 1,
    },
    referral: {
        id: 'referral',
        name: 'Referral Task',
        description: 'Invite friends and earn commission',
        duration: 0,
        baseReward: 250, // Only when referred user activates package
        cooldown: 0,
        icon: '👥',
        maxPerDay: 'unlimited',
    },
};

// Generate daily tasks based on package capabilities
function generateDailyTasks() {
    if (!appState.activePackage) return;
    
    const pkg = packages[appState.activePackage];
    const now = new Date();
    const taskKey = 'dailyTasks_' + getCurrentDate();
    
    // Check if tasks already generated for today
    const storedTasks = localStorage.getItem(taskKey);
    if (storedTasks) {
        appState.tasks.available = JSON.parse(storedTasks);
        return;
    }
    
    // Generate new tasks based on package
    const availableTasks = [];
    let taskId = 1;
    
    for (const taskType of pkg.tasksAvailable) {
        const template = taskTemplates[taskType];
        if (!template) continue;
        
        // Create 2-4 instances of each task type (vary randomly)
        const instances = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < instances; i++) {
            availableTasks.push({
                id: 'task_' + taskId++,
                type: taskType,
                name: template.name + ' #' + (i + 1),
                description: template.description,
                duration: template.duration,
                reward: calculateTaskReward(template.baseReward, pkg),
                icon: template.icon,
                completed: false,
                completedTime: 0,
            });
        }
    }
    
    appState.tasks.available = availableTasks;
    localStorage.setItem(taskKey, JSON.stringify(availableTasks));
    saveAppState();
}

// Calculate task reward based on package multiplier
function calculateTaskReward(baseReward, pkg) {
    if (!pkg) return baseReward;
    
    // Higher tier packages get slightly higher rewards
    const multiplier = 0.8 + (pkg.powerLevel * 0.1);
    return Math.round(baseReward * multiplier);
}

// Check if task cooldown is active
function isTaskCooldownActive(taskType) {
    if (!appState.tasks.cooldownTimestamps[taskType]) {
        return false;
    }
    
    const template = taskTemplates[taskType];
    if (!template) return false;
    
    const timeSinceLastTask = Date.now() - appState.tasks.cooldownTimestamps[taskType];
    return timeSinceLastTask < (template.cooldown * 1000);
}

// Get remaining cooldown time in seconds
function getTaskCooldownRemaining(taskType) {
    if (!appState.tasks.cooldownTimestamps[taskType]) {
        return 0;
    }
    
    const template = taskTemplates[taskType];
    if (!template) return 0;
    
    const timeSinceLastTask = Date.now() - appState.tasks.cooldownTimestamps[taskType];
    const remaining = (template.cooldown * 1000) - timeSinceLastTask;
    
    return Math.max(0, Math.ceil(remaining / 1000));
}

// ===== COMPREHENSIVE MISSIONS SYSTEM (20-30 MISSIONS PER PACKAGE) =====

// Mission template library with all mission types
const missionTemplates = {
    // Watch Ad Missions
    watch_ads: [
        { type: 'watch_ad', title: 'Watch Travel Ad', duration: 30, icon: '🌍' },
        { type: 'watch_ad', title: 'Watch Tech Ad', duration: 35, icon: '💻' },
        { type: 'watch_ad', title: 'Watch Fashion Ad', duration: 40, icon: '👗' },
        { type: 'watch_ad', title: 'Watch Gaming Ad', duration: 30, icon: '🎮' },
        { type: 'watch_ad', title: 'Quick Promotional Ad', duration: 25, icon: '📢' },
        { type: 'watch_ad', title: 'Watch Movie Trailer', duration: 45, icon: '🎬' },
    ],
    
    // Long Video Missions
    video_tasks: [
        { type: 'video', title: 'Learn Business Tips', duration: 60, icon: '💼' },
        { type: 'video', title: 'Watch Educational Content', duration: 90, icon: '📚' },
        { type: 'video', title: 'Productivity Video Tutorial', duration: 75, icon: '⚡' },
        { type: 'video', title: 'Fitness Training Video', duration: 120, icon: '💪' },
        { type: 'video', title: 'Cooking Tutorial', duration: 60, icon: '🍳' },
    ],
    
    // Survey Missions
    surveys: [
        { type: 'survey', title: 'Quick Survey (5 questions)', duration: 60, icon: '📊' },
        { type: 'survey', title: 'Shopping Preference Survey', duration: 90, icon: '🛍️' },
        { type: 'survey', title: 'Lifestyle Survey', duration: 120, icon: '🏠' },
        { type: 'survey', title: 'Product Feedback Survey', duration: 75, icon: '⭐' },
        { type: 'survey', title: 'Entertainment Survey', duration: 60, icon: '🎭' },
    ],
    
    // App Engagement Missions
    app_engagement: [
        { type: 'app', title: 'Install & Review App', duration: 120, icon: '📱' },
        { type: 'app', title: 'App Registration Task', duration: 90, icon: '✍️' },
        { type: 'app', title: 'Mobile Game Demo', duration: 150, icon: '🕹️' },
        { type: 'app', title: 'App Feature Exploration', duration: 120, icon: '🔍' },
    ],
    
    // Social Tasks
    social: [
        { type: 'social', title: 'Follow Social Account', duration: 30, icon: '👥' },
        { type: 'social', title: 'Like & Share Post', duration: 20, icon: '👍' },
        { type: 'social', title: 'Subscribe to Channel', duration: 15, icon: '🔔' },
        { type: 'social', title: 'Write Comment', duration: 45, icon: '💬' },
    ],
    
    // Daily Bonus Missions
    daily_bonus: [
        { type: 'bonus', title: 'Daily Login Bonus', duration: 0, icon: '🎁' },
        { type: 'bonus', title: 'Morning Streak Bonus', duration: 0, icon: '🌅' },
        { type: 'bonus', title: 'Achievement Milestone', duration: 0, icon: '🏆' },
    ],
    
    // High-Value Missions (limited)
    high_value: [
        { type: 'high_value', title: 'Premium Video Watch', duration: 180, icon: '💎' },
        { type: 'high_value', title: 'Exclusive Survey', duration: 150, icon: '🎯' },
        { type: 'high_value', title: 'VIP App Engagement', duration: 200, icon: '👑' },
    ],
    
    // Referral Missions
    referral: [
        { type: 'referral', title: 'Refer Friend - Gold Package', duration: 0, icon: '🤝' },
        { type: 'referral', title: 'Refer Friend - Any Package', duration: 0, icon: '📣' },
    ],
};

// Generate daily missions for active package
function generateDailyMissions() {
    if (!appState.activePackage) return;
    
    const pkg = packages[appState.activePackage];
    const missionKey = 'dailyMissions_' + getCurrentDate();
    
    // Check if already generated
    const stored = localStorage.getItem(missionKey);
    if (stored) {
        appState.missions = appState.missions || {};
        appState.missions.available = JSON.parse(stored);
        return;
    }
    
    // Initialize missions structure
    if (!appState.missions) {
        appState.missions = {
            available: [],
            completed: [],
            cooldownTimestamps: {}
        };
    }
    
    // Create mission pool (20-30 missions based on package)
    const missionPool = [];
    let missionId = 1;
    
    // Add different mission types based on package tier
    const addMissionsOfType = (templates, count) => {
        for (let i = 0; i < count; i++) {
            const template = templates[i % templates.length];
            missionPool.push({
                id: 'mission_' + missionId++,
                ...template,
                reward: Math.round(pkg.earningPerMission * (0.8 + Math.random() * 0.4)),
                completed: false,
                completedTime: 0,
                cooldown: 180, // 3-minute cooldown per mission
            });
        }
    };
    
    // Generate based on package tier (higher tiers = more missions)
    if (pkg.tier >= 1) {
        addMissionsOfType(missionTemplates.watch_ads, 4);
        addMissionsOfType(missionTemplates.social, 3);
    }
    if (pkg.tier >= 2) {
        addMissionsOfType(missionTemplates.video_tasks, 4);
        addMissionsOfType(missionTemplates.surveys, 4);
        addMissionsOfType(missionTemplates.daily_bonus, 2);
    }
    if (pkg.tier >= 3) {
        addMissionsOfType(missionTemplates.app_engagement, 3);
        addMissionsOfType(missionTemplates.high_value, 2);
    }
    if (pkg.tier >= 4) {
        addMissionsOfType(missionTemplates.surveys, 3);
        addMissionsOfType(missionTemplates.high_value, 3);
    }
    if (pkg.tier >= 5) {
        addMissionsOfType(missionTemplates.referral, 2);
        addMissionsOfType(missionTemplates.high_value, 2);
    }
    
    // Always ensure at least 20 missions
    while (missionPool.length < 20) {
        const templates = missionTemplates.watch_ads;
        const template = templates[Math.floor(Math.random() * templates.length)];
        missionPool.push({
            id: 'mission_' + missionId++,
            ...template,
            reward: Math.round(pkg.earningPerMission * (0.8 + Math.random() * 0.4)),
            completed: false,
            completedTime: 0,
            cooldown: 180,
        });
    }
    
    // Shuffle missions
    missionPool.sort(() => Math.random() - 0.5);
    
    appState.missions.available = missionPool;
    localStorage.setItem(missionKey, JSON.stringify(missionPool));
    saveAppState();
}

// ===== COMPREHENSIVE GAMES SYSTEM (20+ GAMES PER PACKAGE) =====

const gameLibrary = {
    // Tier 1: Starter Games
    click_game: {
        id: 'click_game',
        name: 'Click Master',
        description: 'Click as fast as possible',
        icon: '🖱️',
        difficulty: 1,
        baseReward: 25,
        timer: 10,
        minTier: 1,
    },
    tap_game: {
        id: 'tap_game',
        name: 'Tap Mania',
        description: 'Tap the targets',
        icon: '👆',
        difficulty: 1,
        baseReward: 30,
        timer: 15,
        minTier: 1,
    },
    
    // Tier 2: Medium Games
    quiz_game: {
        id: 'quiz_game',
        name: 'Quick Quiz',
        description: 'Answer trivia questions',
        icon: '🧠',
        difficulty: 2,
        baseReward: 40,
        timer: 30,
        minTier: 2,
    },
    spin_wheel: {
        id: 'spin_wheel',
        name: 'Spin & Win',
        description: 'Spin the lucky wheel',
        icon: '🎡',
        difficulty: 1,
        baseReward: 35,
        timer: 5,
        minTier: 2,
    },
    color_tap: {
        id: 'color_tap',
        name: 'Color Tap',
        description: 'Tap matching colors',
        icon: '🎨',
        difficulty: 2,
        baseReward: 35,
        timer: 20,
        minTier: 2,
    },
    memory_match: {
        id: 'memory_match',
        name: 'Memory Match',
        description: 'Match pairs of cards',
        icon: '🧩',
        difficulty: 2,
        baseReward: 45,
        timer: 60,
        minTier: 2,
    },
    
    // Tier 3: Advanced Games
    guess_number: {
        id: 'guess_number',
        name: 'Guess the Number',
        description: 'Guess a number correctly',
        icon: '🎲',
        difficulty: 2,
        baseReward: 40,
        timer: 30,
        minTier: 3,
    },
    reaction_game: {
        id: 'reaction_game',
        name: 'Fast Reaction',
        description: 'Test your reaction time',
        icon: '⚡',
        difficulty: 3,
        baseReward: 50,
        timer: 15,
        minTier: 3,
    },
    scratch_card: {
        id: 'scratch_card',
        name: 'Scratch Card',
        description: 'Scratch to reveal prize',
        icon: '🎫',
        difficulty: 1,
        baseReward: 30,
        timer: 5,
        minTier: 3,
    },
    puzzle_game: {
        id: 'puzzle_game',
        name: 'Puzzle Challenge',
        description: 'Solve the puzzle',
        icon: '🧩',
        difficulty: 3,
        baseReward: 55,
        timer: 60,
        minTier: 3,
    },
    
    // Tier 4: Premium Games
    word_game: {
        id: 'word_game',
        name: 'Word Master',
        description: 'Form words from letters',
        icon: '📝',
        difficulty: 3,
        baseReward: 60,
        timer: 45,
        minTier: 4,
    },
    math_challenge: {
        id: 'math_challenge',
        name: 'Math Challenge',
        description: 'Solve math problems quickly',
        icon: '🧮',
        difficulty: 3,
        baseReward: 65,
        timer: 30,
        minTier: 4,
    },
    pattern_game: {
        id: 'pattern_game',
        name: 'Pattern Finder',
        description: 'Find the pattern sequence',
        icon: '🔗',
        difficulty: 3,
        baseReward: 50,
        timer: 45,
        minTier: 4,
    },
    ball_bounce: {
        id: 'ball_bounce',
        name: 'Ball Bounce',
        description: 'Keep the ball bouncing',
        icon: '🏀',
        difficulty: 2,
        baseReward: 45,
        timer: 20,
        minTier: 4,
    },
    
    // Tier 5: Elite Games
    trivia_pro: {
        id: 'trivia_pro',
        name: 'Trivia Pro',
        description: 'Advanced trivia questions',
        icon: '🎓',
        difficulty: 4,
        baseReward: 80,
        timer: 60,
        minTier: 5,
    },
    speed_typing: {
        id: 'speed_typing',
        name: 'Speed Typing',
        description: 'Type words as fast as you can',
        icon: '⌨️',
        difficulty: 3,
        baseReward: 70,
        timer: 30,
        minTier: 5,
    },
    shape_match: {
        id: 'shape_match',
        name: 'Shape Master',
        description: 'Match rotating shapes',
        icon: '✨',
        difficulty: 3,
        baseReward: 65,
        timer: 40,
        minTier: 5,
    },
    card_flip: {
        id: 'card_flip',
        name: 'Card Flip Gamble',
        description: 'Flip cards and win',
        icon: '🎰',
        difficulty: 1,
        baseReward: 50,
        timer: 10,
        minTier: 5,
    },
    
    // Tier 6: Exclusive Games
    skill_shot: {
        id: 'skill_shot',
        name: 'Skill Shot',
        description: 'Hit targets with precision',
        icon: '🎯',
        difficulty: 3,
        baseReward: 85,
        timer: 45,
        minTier: 6,
    },
    logic_puzzle: {
        id: 'logic_puzzle',
        name: 'Logic Puzzle',
        description: 'Solve logic challenges',
        icon: '💭',
        difficulty: 4,
        baseReward: 90,
        timer: 60,
        minTier: 6,
    },
    infinity_game: {
        id: 'infinity_game',
        name: 'Infinity Challenge',
        description: 'The ultimate game (VIP)',
        icon: '∞',
        difficulty: 4,
        baseReward: 150,
        timer: 120,
        minTier: 7,
    },
};

// Generate unlocked games based on package
function getUnlockedGames() {
    if (!appState.activePackage) return [];
    
    const pkg = packages[appState.activePackage];
    return Object.values(gameLibrary).filter(game => game.minTier <= pkg.tier);
}

// Check if game is unlocked for current package
function isGameUnlocked(gameId) {
    if (!appState.activePackage) return false;
    const game = gameLibrary[gameId];
    const pkg = packages[appState.activePackage];
    return game && game.minTier <= pkg.tier;
}

// ===== AUTOMATIC QR VISIBILITY ENFORCEMENT =====
function ensureQRVisible() {
    const qrSection = document.getElementById('qrCodeSection');
    if (qrSection) {
        // Force visibility with !important inline styles
        qrSection.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; z-index: 10;';
        
        const qrImage = qrSection.querySelector('img.qr-code-image');
        if (qrImage) {
            qrImage.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; margin: 20px auto !important; max-width: 250px !important; width: 100% !important; height: auto !important; border-radius: 12px !important; z-index: 10;';
        }
        
        const qrInstruction = qrSection.querySelector('p');
        if (qrInstruction) {
            qrInstruction.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important;';
        }
        
        console.log('✓ QR visibility enforced');
        return true;
    }
    return false;
}

// ===== SETUP QR OBSERVER =====
function setupQRObserver() {
    const depositTab = document.getElementById('depositTab');
    if (!depositTab) return;
    
    // Watch for changes to the deposit tab
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes') {
                // If tab becomes visible, ensure QR is visible
                if (depositTab.classList.contains('active')) {
                    ensureQRVisible();
                }
            }
        });
    });
    
    observer.observe(depositTab, { attributes: true });
    console.log('✓ QR observer setup complete');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Content Loaded - Starting initialization');
    ensureQRVisible();       // Ensure QR is visible immediately
    setupQRObserver();       // Setup observer for dynamic changes
    initializeApp();
    setupEventListeners();
    
    // Final verification
    setTimeout(function() {
        console.log('🔍 Final QR verification...');
        ensureQRVisible();
        
        // Log QR status
        const qrSection = document.getElementById('qrCodeSection');
        const qrImage = qrSection ? qrSection.querySelector('img') : null;
        if (qrImage) {
            console.log('✓ QR IMAGE READY - src:', qrImage.src, 'visible:', qrSection.style.display !== 'none');
        }
    }, 1000);
});

function initializeApp() {
    // ===== AUTO-LOGIN: Check if user is already logged in =====
    console.log('🚀 EarnHub Initializing...');
    console.log('📍 Checking for existing session...');
    
    const currentUserId = localStorage.getItem('earnhubCurrentUserId');
    console.log('Current User ID from localStorage:', currentUserId);
    
    if (currentUserId) {
        // User is already logged in - load their data
        console.log('✓ Found active session for user:', currentUserId);
        const user = getUserById(currentUserId);
        
        if (user) {
            console.log('✓ User found in users array:', user.name, '(' + user.userId + ')');
            appState.user = user;
            loadUserData();
            showApp();
            updateAllUI();
            console.log('✓ User auto-logged in successfully');
        } else {
            // User ID invalid - clear and show auth
            console.warn('⚠️ User ID not found in users array - clearing session');
            localStorage.removeItem('earnhubCurrentUserId');
            showAuth();
        }
    } else {
        // No logged-in user - show auth screen
        console.log('📌 No active session - showing login/register screen');
        showAuth();
    }
}

function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // ===== LOGIN BUTTON =====
    // Since we're using divs (not form elements), we need to attach click listeners to buttons
    const loginBtn = document.querySelector('#loginForm button');
    if (loginBtn) {
        console.log('✓ Found Login button - attaching click listener');
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📌 Login button clicked');
            console.log('Login button clicked');
            handleLogin();
        });
    } else {
        console.warn('⚠️ Login button not found');
    }

    // ===== REGISTER BUTTON =====
    // CRITICAL: This is the main fix for the register button
    const registerBtn = document.querySelector('#registerForm button');
    if (registerBtn) {
        console.log('✓ Found Register button - attaching click listener');
        registerBtn.addEventListener('click', function(e) {
            // Prevent any default behavior
            e.preventDefault();
            e.stopPropagation();
            console.log('📌 Register button clicked - Calling handleRegister()');
            console.log('Register button clicked');
            console.log('⏱️ Timestamp:', new Date().toLocaleTimeString());
            handleRegister();
        });
    } else {
        console.error('❌ CRITICAL: Register button not found!');
        console.log('Trying alternative selector...');
        // Fallback: Try finding any button in registerForm
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            const buttons = registerForm.querySelectorAll('button');
            console.log('Found ' + buttons.length + ' button(s) in registerForm');
            buttons.forEach((btn, index) => {
                console.log('Attaching listener to button ' + (index + 1));
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('📌 Register button #' + (index + 1) + ' clicked');
                    console.log('Register button clicked');
                    handleRegister();
                });
            });
        }
    }

    console.log('✓ Event listeners setup complete');
}

// ===== USER MANAGEMENT HELPER FUNCTIONS =====
/**
 * Get all users from localStorage
 */
function getAllUsers() {
    const usersData = localStorage.getItem('earnhubUsers');
    const users = usersData ? JSON.parse(usersData) : [];
    return users;
}

/**
 * Save users array to localStorage
 */
function saveAllUsers(users) {
    localStorage.setItem('earnhubUsers', JSON.stringify(users));
    console.log('💾 Saved users to localStorage - Count:', users.length);
}

/**
 * Get user by ID from localStorage
 */
function getUserById(userId) {
    const users = getAllUsers();
    const user = users.find(u => u.userId === userId) || null;
    if (user) {
        console.log('🔍 Found user by ID:', userId, '-', user.name);
    } else {
        console.warn('⚠️ User not found by ID:', userId);
    }
    return user;
}

/**
 * Get user by mobile number
 */
function getUserByMobile(mobile) {
    const users = getAllUsers();
    const user = users.find(u => u.mobile === mobile) || null;
    if (user) {
        console.log('🔍 Found user by mobile:', mobile, '-', user.name, '(' + user.userId + ')');
    }
    return user;
}

/**
 * Generate next unique User ID (EH + auto-increment number)
 */
function generateNextUserId() {
    const users = getAllUsers();
    let maxNum = 0;
    
    // Find the highest number in existing User IDs
    users.forEach(user => {
        const match = user.userId.match(/EH(\d+)/);
        if (match) {
            const num = parseInt(match[1]);
            maxNum = Math.max(maxNum, num);
        }
    });
    
    // Return next ID (EH + next number with 5-digit padding)
    const nextId = 'EH' + String(maxNum + 1).padStart(5, '0');
    console.log('🎫 Generated User ID:', nextId);
    return nextId;
}

/**
 * Save current user data to localStorage and update appState
 */
function saveCurrentUser() {
    if (!appState.user) return;
    
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.userId === appState.user.userId);
    
    if (userIndex !== -1) {
        // Update existing user
        users[userIndex] = appState.user;
        console.log('✏️ Updated existing user:', appState.user.userId);
    } else {
        // Add new user
        users.push(appState.user);
        console.log('➕ Added new user to array:', appState.user.userId);
    }
    
    saveAllUsers(users);
}

/**
 * Update current logged-in user (merge data)
 */
function updateCurrentUser(data) {
    if (!appState.user) return;
    
    Object.assign(appState.user, data);
    console.log('🔄 Updated current user:', appState.user.userId);
    saveCurrentUser();
}

/**
 * DEBUG: Log all users and current session to console
 */
function debugAuthSystem() {
    console.log('\n========== 🔍 AUTH SYSTEM DEBUG ==========');
    console.log('Current User ID (session):', localStorage.getItem('earnhubCurrentUserId'));
    console.log('All Users in localStorage:', getAllUsers());
    console.log('Current appState.user:', appState.user);
    console.log('=========================================\n');
}

// ===== AUTHENTICATION =====
function toggleAuthForm(event) {
    event.preventDefault();
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.classList.toggle('active');
    registerForm.classList.toggle('active');
    
    // Clear all form inputs
    document.getElementById('loginMobile').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('regName').value = '';
    document.getElementById('regMobile').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirm').value = '';
}

function handleLogin() {
    const mobile = document.getElementById('loginMobile').value.trim();
    const password = document.getElementById('loginPassword').value;

    console.log('🔐 Login attempt with mobile:', mobile);

    // Validate inputs
    if (!mobile || !password) {
        console.warn('⚠️ Login validation failed: missing fields');
        showAlert('Error', 'Please enter mobile number and password');
        return;
    }

    // Check if user exists with this mobile number
    const user = getUserByMobile(mobile);
    
    if (!user) {
        console.warn('⚠️ Login failed: mobile number not registered -', mobile);
        showAlert('Error', 'Mobile number not registered. Please register first.');
        return;
    }

    // Verify password
    if (user.password !== password) {
        console.warn('⚠️ Login failed: invalid password for user -', user.userId);
        showAlert('Error', 'Invalid password. Please try again.');
        return;
    }

    // SUCCESS: Login successful
    console.log('✓ Login successful for user:', user.name, '(' + user.userId + ')');
    appState.user = user;
    
    // Set current user session
    localStorage.setItem('earnhubCurrentUserId', user.userId);
    console.log('✓ Session saved - currentUserId:', user.userId);
    console.log('User logged in:', user.userId);
    
    // Load user's data
    loadUserData();
    showApp();
    showSuccess('Welcome back, ' + user.name + '!');
    
    // Clear form
    document.getElementById('loginMobile').value = '';
    document.getElementById('loginPassword').value = '';
    
    console.log('✓ Login complete - App loaded');
}

function handleRegister() {
    // ===== STEP 1: Get form values =====
    const name = document.getElementById('regName').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    console.log('📝 ===== REGISTRATION ATTEMPT STARTED =====');
    console.log('📝 Name:', name);
    console.log('📝 Mobile:', mobile);
    console.log('📝 Password: ' + (password ? '***' : 'EMPTY'));
    console.log('📝 Confirm: ' + (confirm ? '***' : 'EMPTY'));

    // ===== STEP 2: Validate - All fields filled =====
    if (!name || !mobile || !password || !confirm) {
        console.warn('⚠️ VALIDATION FAILED: Missing fields');
        console.warn('   Name:', !name ? 'MISSING' : 'OK');
        console.warn('   Mobile:', !mobile ? 'MISSING' : 'OK');
        console.warn('   Password:', !password ? 'MISSING' : 'OK');
        console.warn('   Confirm:', !confirm ? 'MISSING' : 'OK');
        showAlert('Error', 'Please fill all fields');
        return;
    }

    // ===== STEP 3: Validate - Mobile number format (10 digits) =====
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        console.warn('⚠️ VALIDATION FAILED: Invalid mobile format');
        console.warn('   Expected: 10 digits, Got:', mobile, '(length: ' + mobile.length + ')');
        showAlert('Error', 'Please enter a valid 10-digit mobile number');
        return;
    }
    console.log('✓ Mobile format validated');

    // ===== STEP 4: Check if mobile already registered =====
    const existingUser = getUserByMobile(mobile);
    if (existingUser) {
        console.warn('⚠️ VALIDATION FAILED: Mobile already registered');
        console.warn('   Mobile:', mobile, '- Already belongs to user:', existingUser.userId);
        showAlert('Error', 'This mobile number is already registered. Please login.');
        return;
    }
    console.log('✓ Mobile is unique (not registered before)');

    // ===== STEP 5: Validate - Passwords match =====
    if (password !== confirm) {
        console.warn('⚠️ VALIDATION FAILED: Passwords do not match');
        showAlert('Error', 'Passwords do not match');
        return;
    }
    console.log('✓ Passwords match');

    // ===== STEP 6: Validate - Password length =====
    if (password.length < 6) {
        console.warn('⚠️ VALIDATION FAILED: Password too short');
        console.warn('   Length:', password.length, '- Minimum required: 6');
        showAlert('Error', 'Password must be at least 6 characters');
        return;
    }
    console.log('✓ Password length validated (length: ' + password.length + ')');

    console.log('✓ ALL VALIDATIONS PASSED - Proceeding with user creation');

    // ===== STEP 7: Create new user ID =====
    const userId = generateNextUserId();
    console.log('✓ Generated new User ID:', userId);

    // ===== STEP 8: Create new user object =====
    const newUser = {
        // Identity & Authentication
        userId,              // Unique auto-generated ID (EH00001, EH00002, etc.)
        name,
        mobile,
        password,            // In production, this would be hashed
        referralCode: generateReferralCode(),
        
        // Financial Data
        walletBalance: 0,
        missionEarnings: 0,
        gameEarnings: 0,
        referralEarnings: 0,
        bonusEarnings: 0,
        packageCost: 0,
        
        // Package & Activity Data
        activePackage: null,
        purchasedPackages: [],
        missionsCompleted: 0,
        gamesPlayed: 0,
        referralCount: 0,
        
        // System Data
        tasksCompleted: [],
        referrals: [],
        deposits: [],        // Deposit requests
        withdrawals: [],     // Withdrawal requests
        hasDepositedAtLeastOnce: false,
        
        // Timestamps
        createdAt: new Date().toLocaleString(),
        joinDate: new Date().toLocaleDateString(),
    };

    console.log('✓ New user object created');
    console.log('  Fields: userId, name, mobile, walletBalance=0, activePackage=null');

    // ===== STEP 9: Save user to localStorage users array =====
    const users = getAllUsers();
    console.log('📊 Users in system BEFORE save:', users.length);
    
    users.push(newUser);
    saveAllUsers(users);
    
    console.log('📊 Users in system AFTER save:', users.length);
    console.log('✓ User saved to localStorage earnhubUsers array');

    // ===== STEP 10: Create session (set as current user) =====
    appState.user = newUser;
    localStorage.setItem('earnhubCurrentUserId', userId);
    console.log('✓ Session created - earnhubCurrentUserId set to:', userId);
    console.log('✓ appState.user set to:', newUser.name);

    // ===== STEP 11: Initialize user data in app state =====
    initializeUserData();
    console.log('✓ User data initialized in appState');

    // ===== STEP 12: Show app and success message =====
    showApp();
    showSuccess('🎉 Account created successfully!\n\nYour User ID: ' + userId + '\n\nYou are now logged in!');
    console.log('✓ App displayed and success message shown');

    // ===== STEP 13: Clear form inputs =====
    document.getElementById('regName').value = '';
    document.getElementById('regMobile').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirm').value = '';
    console.log('✓ Form inputs cleared');

    // ===== STEP 14: Verify persistence =====
    console.log('✓ VERIFICATION: Data saved in localStorage');
    console.log('  - earnhubCurrentUserId:', localStorage.getItem('earnhubCurrentUserId'));
    console.log('  - Total users in earnhubUsers:', JSON.parse(localStorage.getItem('earnhubUsers')).length);
    
    console.log('User registered:', userId);
    console.log('✅ ===== REGISTRATION COMPLETE =====');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session (but keep user data in localStorage for future login)
        localStorage.removeItem('earnhubCurrentUserId');
        appState.user = null;
        appState.balance = 0;
        appState.activePackage = null;
        
        showAuth();
        
        // Clear form inputs
        document.getElementById('loginMobile').value = '';
        document.getElementById('loginPassword').value = '';
    }
}

// ===== UI NAVIGATION =====
function showAuth() {
    document.getElementById('authSection').style.display = 'flex';
    document.getElementById('appSection').style.display = 'none';
}

function showApp() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('appSection').style.display = 'block';
    navigateTo('home');
}

function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const page = document.getElementById(pageId + 'Page');
    if (page) {
        page.classList.add('active');
        updatePageData(pageId);
    }
}

function updatePageData(pageId) {
    switch(pageId) {
        case 'home':
            updateHomePage();
            break;
        case 'packages':
            updatePackagesPage();
            break;
        case 'missions':
            updateMissionsPage();
            break;
        case 'games':
            updateGamesPage();
            break;
        case 'deposit':
            updateDepositPage();
            break;
        case 'wallet':
            updateWalletPage();
            break;
        case 'rewards':
            updateRewardsPage();
            break;
        case 'account':
            updateAccountPage();
            break;
    }
}

// ===== DATA MANAGEMENT =====
function initializeUserData() {
    appState.referralCode = appState.user.referralCode;
    appState.balance = 0;
    appState.missionEarnings = 0;
    appState.gameEarnings = 0;
    appState.referralEarnings = 0;
    appState.bonusEarnings = 0; // NEW: Initialize bonus earnings
    appState.activePackage = null;
    appState.packageCost = 0;
    appState.missionsCompleted = 0;
    appState.gamesPlayed = 0;
    appState.referralCount = 0;
    appState.transactions = [];
    
    // NEW: Initialize daily tracking
    appState.dailyStats = {
        date: getCurrentDate(),
        missionsCompletedToday: 0,
        gamesPlayedToday: 0,
        lastMissionTime: 0,
        bonusEarningsToday: 0,
    };
    
    // NEW: Initialize deposit & withdrawal system
    appState.deposits = [];
    appState.withdrawals = [];
    appState.hasDepositedAtLeastOnce = false; // Track if user has made a deposit
    
    saveAppState();
}

function loadUserData() {
    if (!appState.user || !appState.user.userId) {
        console.warn('⚠️ User object missing, skipping data load');
        return;
    }
    console.log('📂 Loading user data for:', appState.user.userId, '(' + appState.user.name + ')');
    
    // Load from appState first (session data)
    const saved = localStorage.getItem('earnhubAppState');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(appState, data);
        console.log('✓ Loaded appState from localStorage');
    } else {
        // Initialize user data if not already done
        console.log('📌 No saved appState - initializing new data');
        initializeUserData();
    }
    
    // IMPORTANT: Load all user-specific data from the user object
    // This ensures data persists across sessions and page refreshes
    if (appState.user && appState.user.userId) {
        console.log('📂 Loading user-specific data from user object...');
        
        // Financial data
        appState.balance = appState.user.walletBalance || 0;
        appState.missionEarnings = appState.user.missionEarnings || 0;
        appState.gameEarnings = appState.user.gameEarnings || 0;
        appState.referralEarnings = appState.user.referralEarnings || 0;
        appState.bonusEarnings = appState.user.bonusEarnings || 0;
        appState.packageCost = appState.user.packageCost || 0;
        
        // Package & activity data
        appState.activePackage = appState.user.activePackage || null;
        appState.missionsCompleted = appState.user.missionsCompleted || 0;
        appState.gamesPlayed = appState.user.gamesPlayed || 0;
        appState.referralCount = appState.user.referralCount || 0;
        
        // Deposit/withdrawal data
        appState.deposits = appState.user.deposits || [];
        appState.withdrawals = appState.user.withdrawals || [];
        appState.hasDepositedAtLeastOnce = appState.user.hasDepositedAtLeastOnce || false;
        
        // Other data
        appState.referralCode = appState.user.referralCode || '';
        
        console.log('✓ User data loaded - Balance:', appState.balance, ', Package:', appState.activePackage);
    }
    
    // NEW: Check and reset daily stats if date changed
    checkAndResetDailyStats();
    
    // NEW: Initialize deposit/withdrawal data
    initializeDepositData();
    
    // NEW: Validate session and detect tampering
    validateSessionIntegrity();
    
    // NEW: Generate daily tasks if not already generated
    generateDailyTasks();
    
    // NEW: Generate daily missions if package is active and not already generated
    if (appState.activePackage && !localStorage.getItem('dailyMissions_' + getCurrentDate())) {
        generateDailyMissions();
    }
    
    console.log('✓ User data fully loaded and ready');
    updateAllUI();
}

// NEW: Validate session integrity - prevent data tampering via console
function validateSessionIntegrity() {
    const now = Date.now();
    
    // Initialize session data if not present
    if (!appState.sessionData) {
        appState.sessionData = {
            loginTime: now,
            lastActivityTime: now,
            dataVersionHash: '',
        };
    }
    
    // Update last activity time
    appState.sessionData.lastActivityTime = now;
    
    // Detect suspicious balance changes (console tampering)
    if (!appState.sessionData.lastKnownBalance) {
        appState.sessionData.lastKnownBalance = appState.balance;
    } else {
        // Check if balance changed unreasonably (jumped by large amount instantly)
        const balanceDiff = appState.balance - appState.sessionData.lastKnownBalance;
        if (balanceDiff > 10000) { // More than ₹10k in one session
            console.warn('⚠️ Suspicious balance change detected:', balanceDiff);
            // In real app, this would trigger warning or rollback
        }
    }
    
    saveAppState();
}

// NEW: Reset daily stats if a new day started (prevents refresh abuse)
function checkAndResetDailyStats() {
    const currentDate = getCurrentDate();
    
    // If date changed, reset daily counters
    if (!appState.dailyStats) {
        appState.dailyStats = {
            date: currentDate,
            missionsCompletedToday: 0,
            gamesPlayedToday: 0,
            lastMissionTime: 0,
            bonusEarningsToday: 0,
            earningsToday: 0,
            tasksCompletedByType: {},
        };
    } else if (appState.dailyStats.date !== currentDate) {
        // Date changed - reset daily stats (new day)
        appState.dailyStats = {
            date: currentDate,
            missionsCompletedToday: 0,
            gamesPlayedToday: 0,
            lastMissionTime: 0,
            bonusEarningsToday: 0,
            earningsToday: 0,
            tasksCompletedByType: {},
        };
        
        // Clear today's tasks from localStorage
        const taskKey = 'dailyTasks_' + currentDate;
        localStorage.removeItem(taskKey);
        
        // Regenerate tasks for new day
        appState.tasks.available = [];
        appState.tasks.cooldownTimestamps = {};
        
        addTransaction('Daily stats reset - New day started', 0, 'system');
    } else {
        // Same day - ensure fields exist for backward compatibility
        if (!appState.dailyStats.earningsToday) appState.dailyStats.earningsToday = 0;
        if (!appState.dailyStats.tasksCompletedByType) appState.dailyStats.tasksCompletedByType = {};
    }
    
    saveAppState();
}

// Initialize deposit/withdrawal data if needed
function initializeDepositData() {
    if (!appState.deposits) {
        appState.deposits = [];
    }
    if (!appState.withdrawals) {
        appState.withdrawals = [];
    }
    if (appState.hasDepositedAtLeastOnce === undefined) {
        appState.hasDepositedAtLeastOnce = false;
    }
}

function saveAppState() {
    // Save app state to localStorage
    localStorage.setItem('earnhubAppState', JSON.stringify(appState));
    console.log('💾 Saved appState to localStorage - Balance:', appState.balance, ', Package:', appState.activePackage);
    
    // IMPORTANT: Also update the user object in the users array with current app state
    // This ensures user data persists even when switching users or refreshing
    if (appState.user && appState.user.userId) {
        // Update all financial data
        appState.user.walletBalance = appState.balance;
        appState.user.missionEarnings = appState.missionEarnings;
        appState.user.gameEarnings = appState.gameEarnings;
        appState.user.referralEarnings = appState.referralEarnings;
        appState.user.bonusEarnings = appState.bonusEarnings;
        appState.user.packageCost = appState.packageCost;
        
        // Update package & activity data
        appState.user.activePackage = appState.activePackage;
        appState.user.missionsCompleted = appState.missionsCompleted;
        appState.user.gamesPlayed = appState.gamesPlayed;
        appState.user.referralCount = appState.referralCount;
        
        // Update deposit/withdrawal data
        appState.user.deposits = appState.deposits;
        appState.user.withdrawals = appState.withdrawals;
        appState.user.hasDepositedAtLeastOnce = appState.hasDepositedAtLeastOnce;
        
        // Save updated user to users array
        saveCurrentUser();
        console.log('✓ User data synced with users array');
    }
}

// ===== ADVANCED REFERRAL SYSTEM =====
// Generate unique User ID for each user
function generateUniqueUserId() {
    const randomNum = Math.floor(Math.random() * 900000) + 100000; // 6-digit number
    return `EH-USER-${randomNum}`;
}

function generateReferralCode() {
    if (!appState.referralData.code) {
        // Generate unique code based on user ID + random suffix
        if (!appState.user || !appState.user.userId) {
            console.warn('⚠️ User object missing for referral code, using default');
            appState.referralData.code = 'DEFAULT' + Math.random().toString(36).substr(2, 6).toUpperCase();
        } else {
            const userIdPart = appState.user.userId.substring(2, 5).toUpperCase();
            const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
            appState.referralData.code = userIdPart + randomPart;
        }
        saveAppState();
    }
    return appState.referralData.code;
}

// Process referral when referred user activates a package
function processReferralBonus(referrerCode, referredUserId) {
    if (!referrerCode) return false;
    
    // Find the referrer
    // In real backend, this would query the database
    // For now, we'll track locally
    
    const bonusAmount = 250; // ₹250 referral bonus
    
    // Add to referral history
    appState.referralData.referralHistory.push({
        referredUserId,
        activationDate: new Date().toISOString(),
        bonusAmount,
        referrerCode,
    });
    
    // This would be used when showing which users are your referrals
    appState.referralData.referredUsers.push(referredUserId);
    appState.referralData.totalReferralBonus += bonusAmount;
    appState.referralEarnings += bonusAmount;
    appState.balance += bonusAmount;
    
    addTransaction('Referral Bonus - User Activation', bonusAmount, 'referral');
    saveAppState();
    
    return true;
}

// Track referral when shared
function recordReferralShare() {
    const code = generateReferralCode();
    addTransaction('Referral Code Shared', 0, 'referral_share');
    return code;
}

function addTransaction(description, amount, type) {
    const transaction = {
        description,
        amount,
        type,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    appState.transactions.unshift(transaction);
    saveAppState();
}

// ===== PACKAGE SYSTEM =====
function purchasePackage(packageId, price) {
    if (appState.activePackage === packageId) {
        showAlert('Info', 'You already have this package active');
        return;
    }

    // NEW: Check if user has made a deposit
    if (!appState.hasDepositedAtLeastOnce) {
        showAlert('Deposit Required', 'You must make a deposit before purchasing packages.\n\nPlease go to the Deposit page and make a deposit first.');
        navigateTo('deposit');
        return;
    }

    if (appState.balance < price) {
        showAlert('Insufficient Balance', `You need ₹${price} but only have ₹${appState.balance}\n\nPlease make a deposit to purchase this package.`);
        return;
    }

    if (confirm(`Purchase ${packages[packageId].name} package for ₹${price}?`)) {
        appState.activePackage = packageId;
        appState.packageCost += price;
        appState.balance -= price;
        
        if (appState.balance < 0) {
            appState.balance = 0;
        }
        
        // NEW: Reset daily mission and game counters when package changes
        appState.dailyStats.missionsCompletedToday = 0;
        appState.dailyStats.gamesPlayedToday = 0;
        appState.dailyStats.lastMissionTime = 0;

        addTransaction(`Purchased ${packages[packageId].name} package`, price, 'expense');
        saveAppState();
        updateAllUI();
        showSuccess(`${packages[packageId].name} package purchased! Daily limits reset.`);
    }
}

function changePackage() {
    navigateTo('packages');
}

function updatePackagesPage() {
    if (appState.activePackage) {
        const pkg = packages[appState.activePackage];
        document.getElementById('activePackageInfo').style.display = 'block';
        document.getElementById('activePackageDetails').innerHTML = `
            <strong>${pkg.name}</strong> - ₹${pkg.price}<br>
            ${pkg.missionsPerDay === 999 ? 'Unlimited' : pkg.missionsPerDay} missions per day<br>
            ₹${pkg.earningPerMission} per mission
        `;
    } else {
        document.getElementById('activePackageInfo').style.display = 'none';
    }
}

// ===== MISSIONS SYSTEM =====
function completeMission(type, typeName) {
    if (!appState.activePackage) {
        showAlert('Error', 'Please purchase a package first');
        navigateTo('packages');
        return;
    }

    const pkg = packages[appState.activePackage];
    
    // NEW: Check daily limit (using daily counter, not total)
    if (appState.dailyStats.missionsCompletedToday >= pkg.missionsPerDay) {
        showAlert('Daily Limit Reached', `You've completed your daily mission limit of ${pkg.missionsPerDay}. Come back tomorrow!`);
        return;
    }
    
    // NEW: Check mission cooldown (30-60 seconds between missions)
    const now = Date.now();
    const missionCooldown = 30000; // 30 seconds minimum
    const timeSinceLastMission = now - appState.dailyStats.lastMissionTime;
    
    if (appState.dailyStats.lastMissionTime > 0 && timeSinceLastMission < missionCooldown) {
        const waitSeconds = Math.ceil((missionCooldown - timeSinceLastMission) / 1000);
        showAlert('Cooldown Active', `Please wait ${waitSeconds} seconds before starting another mission`);
        return;
    }

    // Show mission modal
    simulateMission(type, typeName, pkg.earningPerMission);
}

function simulateMission(type, typeName, reward) {
    let duration = 5;
    
    if (type === 'watch') {
        simulateAdWatching(duration, reward);
    } else if (type === 'survey') {
        simulateSurvey(reward);
    } else if (type === 'video') {
        simulateVideoWatch(duration, reward);
    }
}

function simulateAdWatching(duration, reward) {
    showAlert('Mission', `Watching ad for ${duration} seconds...`);
    let remaining = duration;
    
    const timer = setInterval(() => {
        remaining--;
        if (remaining === 0) {
            clearInterval(timer);
            completeMissionReward(reward, 'Ad Watched');
        }
    }, 1000);
}

function simulateSurvey(reward) {
    const confirmed = confirm('Complete the survey?\n\nAnswer 5 quick questions to earn ₹' + reward);
    if (confirmed) {
        completeMissionReward(reward, 'Survey Completed');
    }
}

function simulateVideoWatch(duration, reward) {
    showAlert('Mission', `Watching video for ${duration} seconds...`);
    let remaining = duration;
    
    const timer = setInterval(() => {
        remaining--;
        if (remaining === 0) {
            clearInterval(timer);
            completeMissionReward(reward, 'Video Watched');
        }
    }, 1000);
}

function completeMissionReward(amount, missionName) {
    appState.balance += amount;
    appState.missionEarnings += amount;
    appState.missionsCompleted++;
    
    // NEW: Update daily mission counter and last mission time
    appState.dailyStats.missionsCompletedToday++;
    appState.dailyStats.lastMissionTime = Date.now();
    appState.dailyStats.earningsToday += amount;
    
    addTransaction(missionName, amount, 'income');
    saveAppState();
    updateAllUI();
    showSuccess(`Mission completed! +₹${amount}`);
}

// ===== ADVANCED TASK COMPLETION SYSTEM =====
// Complete a specific task with reward tracking
function completeTask(taskId, taskType) {
    if (!appState.activePackage) {
        showAlert('Error', 'Please purchase a package first');
        return false;
    }
    
    // Find the task
    const task = appState.tasks.available.find(t => t.id === taskId);
    if (!task) {
        showAlert('Error', 'Task not found');
        return false;
    }
    
    // Check if already completed
    if (task.completed) {
        showAlert('Info', 'This task is already completed');
        return false;
    }
    
    // Check cooldown
    if (isTaskCooldownActive(taskType)) {
        const remaining = getTaskCooldownRemaining(taskType);
        showAlert('Cooldown Active', `Please wait ${remaining} seconds before starting another ${taskType} task`);
        return false;
    }
    
    // Check daily earning cap
    const pkg = packages[appState.activePackage];
    if (appState.dailyStats.earningsToday >= pkg.dailyEarningCap) {
        showAlert('Daily Limit Reached', `You've reached your daily earning cap of ₹${pkg.dailyEarningCap}. Come back tomorrow!`);
        return false;
    }
    
    // Process reward
    const reward = task.reward;
    
    // Award the task reward
    appState.balance += reward;
    appState.missionEarnings += reward;
    appState.missionsCompleted++;
    appState.dailyStats.earningsToday += reward;
    
    // Track by task type
    if (!appState.dailyStats.tasksCompletedByType[taskType]) {
        appState.dailyStats.tasksCompletedByType[taskType] = 0;
    }
    appState.dailyStats.tasksCompletedByType[taskType]++;
    
    // Update cooldown
    appState.tasks.cooldownTimestamps[taskType] = Date.now();
    
    // Mark task as completed
    task.completed = true;
    task.completedTime = Date.now();
    
    // Save to localStorage for today's tasks
    const taskKey = 'dailyTasks_' + getCurrentDate();
    localStorage.setItem(taskKey, JSON.stringify(appState.tasks.available));
    
    addTransaction(`${task.name} - ${taskTemplates[taskType].name}`, reward, 'task');
    saveAppState();
    updateAllUI();
    showSuccess(`${task.name} completed! +₹${reward}`);
    
    return true;
}

// Get tasks summary for display
function getTasksSummary() {
    if (!appState.activePackage) {
        return {
            total: 0,
            completed: 0,
            available: [],
            remaining: 0
        };
    }
    
    const completed = appState.tasks.available.filter(t => t.completed).length;
    const remaining = appState.tasks.available.filter(t => !t.completed).length;
    
    return {
        total: appState.tasks.available.length,
        completed,
        available: appState.tasks.available.filter(t => !t.completed),
        remaining
    };
}

// Check if daily earning cap reached
function isDailyEarningCapReached() {
    if (!appState.activePackage) return false;
    
    const pkg = packages[appState.activePackage];
    return appState.dailyStats.earningsToday >= pkg.dailyEarningCap;
}

// Get remaining daily earnings capacity
function getRemainingDailyCapacity() {
    if (!appState.activePackage) return 0;
    
    const pkg = packages[appState.activePackage];
    return Math.max(0, pkg.dailyEarningCap - appState.dailyStats.earningsToday);
}

function updateMissionsPage() {
    // Check if user has active package
    const hasActivePackage = checkPackageStatus();
    
    if (!hasActivePackage) {
        // User has no active package - show locked preview
        document.getElementById('missionsContent').innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Please purchase a package to unlock missions</p>';
        applyLockedView('missions');
        return;
    }

    // User has package - unlock content
    unlockContent('missions');

    const pkg = packages[appState.activePackage];
    
    // UPDATED: Show daily progress instead of total
    const missionsRemaining = pkg.missionsPerDay - (appState.dailyStats.missionsCompletedToday || 0);
    const statusColor = missionsRemaining <= 0 ? '#e74c3c' : '#27ae60';
    document.getElementById('missionsWarning').innerHTML = 
        `<span style="color: ${statusColor}; font-weight: 600;">Daily: ${appState.dailyStats.missionsCompletedToday || 0}/${pkg.missionsPerDay} | Remaining: ${Math.max(0, missionsRemaining)}</span>`;

    // Generate daily missions if not exists for today
    if (!localStorage.getItem('dailyMissions_' + getCurrentDate())) {
        generateDailyMissions();
    }

    // Get daily missions from localStorage
    const dailyMissionsKey = 'dailyMissions_' + getCurrentDate();
    const dailyMissions = JSON.parse(localStorage.getItem(dailyMissionsKey)) || [];

    // Render missions as cards
    if (dailyMissions.length === 0) {
        document.getElementById('missionsContent').innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No missions available</p>';
        return;
    }

    const missionsHTML = dailyMissions.map(mission => {
        const isCompleted = mission.completed;
        const typeIcon = missionTypeIcons[mission.type] || '✓';
        const buttonText = isCompleted ? 'Completed ✓' : 'Start';
        const buttonClass = isCompleted ? 'btn-disabled' : 'btn-primary';
        const cardClass = isCompleted ? 'completed' : '';
        
        return `
            <div class="mission-card ${cardClass}">
                <div class="mission-header">
                    <span class="mission-icon">${typeIcon}</span>
                    <span class="mission-type">${missionTemplates[mission.type]?.name || mission.type}</span>
                </div>
                <h3>${mission.name}</h3>
                <p class="mission-desc">${mission.description}</p>
                <div class="mission-footer">
                    <span class="mission-reward">₹${mission.reward}</span>
                    <span class="mission-duration">${mission.timer}s</span>
                </div>
                <button class="mission-btn ${buttonClass}" ${isCompleted ? 'disabled' : `onclick="startMissionTimer('${mission.id}')"`}>${buttonText}</button>
            </div>
        `;
    }).join('');

    document.getElementById('missionsContent').innerHTML = `<div class="missions-grid">${missionsHTML}</div>`;
}

// Mission type icons for display
const missionTypeIcons = {
    watch_ads: '📺',
    video_tasks: '🎬',
    surveys: '📋',
    app_engagement: '📱',
    social: '👥',
    daily_bonus: '🎁',
    high_value: '💎',
    referral: '🔗'
};

// ===== NEW MISSIONS COMPLETION SYSTEM =====
function startMissionTimer(missionId) {
    if (!appState.activePackage) {
        showAlert('Error', 'Please purchase a package first');
        return;
    }

    const pkg = packages[appState.activePackage];
    
    // Initialize missions if not exists
    if (!appState.missions) {
        appState.missions = {
            available: [],
            completed: [],
            cooldownTimestamps: {}
        };
    }

    // Generate daily missions if not exists for today
    if (!localStorage.getItem('dailyMissions_' + getCurrentDate())) {
        generateDailyMissions();
    }

    // Get daily missions
    const dailyMissionsKey = 'dailyMissions_' + getCurrentDate();
    let dailyMissions = JSON.parse(localStorage.getItem(dailyMissionsKey)) || [];
    
    // Find the mission
    const mission = dailyMissions.find(m => m.id === missionId);
    if (!mission) {
        showAlert('Error', 'Mission not found');
        return;
    }

    // Check if already completed
    if (mission.completed) {
        showAlert('Info', 'This mission is already completed');
        return;
    }

    // Check cooldown
    const cooldownKey = 'missionCooldown_' + missionId;
    const lastCompletedTime = appState.missions.cooldownTimestamps[cooldownKey] || 0;
    const missionCooldown = (missionTemplates[mission.type]?.cooldown || 180) * 1000; // in milliseconds
    
    if (Date.now() - lastCompletedTime < missionCooldown) {
        const remaining = Math.ceil((missionCooldown - (Date.now() - lastCompletedTime)) / 1000);
        showAlert('Cooldown Active', `Please wait ${remaining} seconds before completing this mission again`);
        return;
    }

    // Check daily earning cap
    if (appState.dailyStats.earningsToday >= pkg.dailyEarningCap) {
        showAlert('Daily Limit Reached', `You've reached your daily earning cap of ₹${pkg.dailyEarningCap}. Come back tomorrow!`);
        return;
    }

    // Check daily mission count
    if (appState.dailyStats.missionsCompletedToday >= pkg.missionsPerDay) {
        showAlert('Daily Limit Reached', `You've completed your daily mission limit of ${pkg.missionsPerDay}. Come back tomorrow!`);
        return;
    }

    // Start mission timer based on mission duration
    const duration = mission.timer || 10;
    let timeLeft = duration;
    
    // Show timer modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'missionTimerModal_' + missionId;
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <h2>${mission.name}</h2>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">${mission.description}</p>
            <div id="missionTimerDisplay_${missionId}" style="font-size: 48px; font-weight: bold; color: #3498db; margin: 30px 0;">
                ${timeLeft}s
            </div>
            <p style="color: #999; margin-bottom: 20px;">Complete this mission to earn ₹${mission.reward}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn btn-secondary" onclick="document.getElementById('missionTimerModal_${missionId}').remove()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const timerInterval = setInterval(() => {
        timeLeft--;
        const display = document.getElementById('missionTimerDisplay_' + missionId);
        if (display) {
            display.innerText = timeLeft + 's';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (modal) modal.remove();
            completeMissionByType(missionId, mission);
        }
    }, 1000);
}

function completeMissionByType(missionId, mission) {
    if (!appState.activePackage) {
        showAlert('Error', 'Please purchase a package first');
        return;
    }

    const pkg = packages[appState.activePackage];
    
    // Initialize missions if not exists
    if (!appState.missions) {
        appState.missions = {
            available: [],
            completed: [],
            cooldownTimestamps: {}
        };
    }

    // Check daily earning cap
    if (appState.dailyStats.earningsToday >= pkg.dailyEarningCap) {
        showAlert('Daily Limit Reached', `You've reached your daily earning cap of ₹${pkg.dailyEarningCap}. Come back tomorrow!`);
        return;
    }

    // Check daily mission count
    if (appState.dailyStats.missionsCompletedToday >= pkg.missionsPerDay) {
        showAlert('Daily Limit Reached', `You've completed your daily mission limit of ${pkg.missionsPerDay}. Come back tomorrow!`);
        return;
    }

    // Process reward
    const reward = mission.reward;
    
    // Award the mission reward
    appState.balance += reward;
    appState.missionEarnings = (appState.missionEarnings || 0) + reward;
    appState.missionsCompleted = (appState.missionsCompleted || 0) + 1;
    appState.dailyStats.earningsToday += reward;
    appState.dailyStats.missionsCompletedToday = (appState.dailyStats.missionsCompletedToday || 0) + 1;

    // Update cooldown timestamp
    const cooldownKey = 'missionCooldown_' + missionId;
    appState.missions.cooldownTimestamps[cooldownKey] = Date.now();

    // Mark mission as completed in localStorage
    const dailyMissionsKey = 'dailyMissions_' + getCurrentDate();
    const dailyMissions = JSON.parse(localStorage.getItem(dailyMissionsKey)) || [];
    const missionIndex = dailyMissions.findIndex(m => m.id === missionId);
    if (missionIndex !== -1) {
        dailyMissions[missionIndex].completed = true;
        dailyMissions[missionIndex].completedTime = Date.now();
        localStorage.setItem(dailyMissionsKey, JSON.stringify(dailyMissions));
    }

    addTransaction(`${mission.name}`, reward, 'mission');
    saveAppState();
    updateAllUI();
    showSuccess(`🎉 ${mission.name} completed! +₹${reward}`);
}

// ===== LOCKED PREVIEW SYSTEM =====
/**
 * Check if user has an active package
 * @returns {boolean} True if user has active package, false otherwise
 */
function checkPackageStatus() {
    return appState.activePackage !== null && appState.activePackage !== undefined && appState.activePackage !== 'FREE';
}

/**
 * Apply locked preview to games/missions content
 * @param {string} pageType - 'games' or 'missions'
 */
function applyLockedView(pageType) {
    const contentId = pageType === 'games' ? 'gamesContent' : 'missionsContent';
    const contentElement = document.getElementById(contentId);
    
    if (!contentElement) return;

    // Wrap content in locked-content class
    contentElement.classList.add('locked-content');
    contentElement.classList.remove('unlocked');

    // Create or update overlay
    let overlay = contentElement.querySelector('.locked-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'locked-overlay';
        overlay.innerHTML = `
            <div class="lock-card">
                <span class="lock-icon">🔒</span>
                <h3>Purchase a package to unlock ${pageType}</h3>
                <p>You can preview content, but access is locked</p>
                <p class="lock-subtext">No real money. Demo mode active.</p>
                <button class="lock-btn" onclick="navigateTo('packages')">Buy Package</button>
            </div>
        `;
        contentElement.appendChild(overlay);
    } else {
        overlay.classList.remove('hidden');
    }

    // Set minimum height for proper display
    if (contentElement.style.minHeight === '') {
        contentElement.style.minHeight = '400px';
    }
}

/**
 * Unlock content when user has active package
 * @param {string} pageType - 'games' or 'missions'
 */
function unlockContent(pageType) {
    const contentId = pageType === 'games' ? 'gamesContent' : 'missionsContent';
    const contentElement = document.getElementById(contentId);
    
    if (!contentElement) return;

    // Remove blur effect
    contentElement.classList.remove('locked-content');
    contentElement.classList.add('unlocked');

    // Hide overlay
    const overlay = contentElement.querySelector('.locked-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }

    // Re-enable interaction
    contentElement.style.pointerEvents = 'auto';
}

/**
 * Apply lock preview effects to individual cards
 * @param {HTMLElement} cardElement - Game or mission card element
 * @param {boolean} isLocked - Whether card should be locked
 */
function applyCardLockEffect(cardElement, isLocked) {
    if (isLocked) {
        cardElement.classList.add('locked-preview');
    } else {
        cardElement.classList.remove('locked-preview');
    }
}

// ===== GAMES SYSTEM =====
let clickCount = 0;
let clickGameActive = false;
let timerStartTime = 0;
let timerRunning = false;
let currentQuizIndex = 0;
let quizCorrect = 0;

function startClickGame() {
    clickCount = 0;
    clickGameActive = true;
    const modal = document.getElementById('clickGameModal');
    modal.classList.add('active');
    document.getElementById('clickResult').style.display = 'none';
    document.getElementById('clickButton').style.display = 'block';
    document.getElementById('clickCount').innerText = 'Clicks: 0';

    let timeLeft = 10;
    const timer = setInterval(() => {
        document.getElementById('clickTimer').innerText = `Time: ${timeLeft}s`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            clickGameActive = false;
            document.getElementById('clickButton').style.display = 'none';
            document.getElementById('clickResult').style.display = 'block';
            
            if (clickCount >= 30) {
                document.getElementById('clickResultText').innerText = `🎉 You Won! ${clickCount} clicks!`;
                completeGameReward(20, 'Click Master');
            } else {
                document.getElementById('clickResultText').innerText = `Game Over! ${clickCount} clicks`;
            }
        }
    }, 1000);
}

function incrementClicks() {
    if (clickGameActive) {
        clickCount++;
        document.getElementById('clickCount').innerText = `Clicks: ${clickCount}`;
    }
}

function startTimerGame() {
    const modal = document.getElementById('timerGameModal');
    modal.classList.add('active');
    document.getElementById('timerResult').style.display = 'none';
    document.getElementById('startTimerBtn').style.display = 'block';
    document.getElementById('stopTimerBtn').style.display = 'none';
    document.getElementById('timerDisplay').innerText = '0.0s';
}

function startTimer() {
    timerStartTime = Date.now();
    timerRunning = true;
    document.getElementById('startTimerBtn').style.display = 'none';
    document.getElementById('stopTimerBtn').style.display = 'block';

    const updateTimer = setInterval(() => {
        if (!timerRunning) {
            clearInterval(updateTimer);
            return;
        }
        const elapsed = (Date.now() - timerStartTime) / 1000;
        document.getElementById('timerDisplay').innerText = elapsed.toFixed(1) + 's';
    }, 100);
}

function stopTimer() {
    timerRunning = false;
    const elapsed = (Date.now() - timerStartTime) / 1000;
    document.getElementById('stopTimerBtn').style.display = 'none';
    document.getElementById('timerResult').style.display = 'block';

    const diff = Math.abs(elapsed - 5);
    if (diff < 0.2) {
        document.getElementById('timerResultText').innerText = `🎉 Perfect! ${elapsed.toFixed(2)}s`;
        completeGameReward(15, 'Timer Challenge');
    } else {
        document.getElementById('timerResultText').innerText = `Game Over! ${elapsed.toFixed(2)}s (Target: 5s)`;
    }
}

function startQuizGame() {
    const modal = document.getElementById('quizGameModal');
    modal.classList.add('active');
    currentQuizIndex = 0;
    quizCorrect = 0;
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }

    const question = quizQuestions[currentQuizIndex];
    document.getElementById('quizQuestion').innerText = question.question;
    
    const optionsHtml = question.options.map((opt, idx) => 
        `<div class="quiz-option" onclick="answerQuiz(${idx})">${opt}</div>`
    ).join('');
    document.getElementById('quizOptions').innerHTML = optionsHtml;
}

function answerQuiz(index) {
    const question = quizQuestions[currentQuizIndex];
    if (index === question.correct) {
        quizCorrect++;
    }
    currentQuizIndex++;
    showQuizQuestion();
}

function endQuiz() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    if (quizCorrect >= 4) {
        document.getElementById('quizResultText').innerText = `🎉 Excellent! ${quizCorrect}/5 correct!`;
        completeGameReward(25, 'Quick Quiz');
    } else {
        document.getElementById('quizResultText').innerText = `Game Over! ${quizCorrect}/5 correct`;
    }
}

function completeGameReward(amount, gameName) {
    if (!appState.activePackage) {
        showAlert('Error', 'Please purchase a package first');
        return;
    }

    const pkg = packages[appState.activePackage];
    
    // Check daily earning cap
    if (appState.dailyStats.earningsToday >= pkg.dailyEarningCap) {
        showAlert('Daily Limit Reached', `You've reached your daily earning cap of ₹${pkg.dailyEarningCap}. Come back tomorrow!`);
        return;
    }
    
    // Check daily game limit
    if (appState.dailyStats.gamesPlayedToday >= pkg.gamesPerDay) {
        showAlert('Daily Limit Reached', `You've played your daily game limit of ${pkg.gamesPerDay}. Come back tomorrow!`);
        return;
    }

    appState.balance += amount;
    appState.gameEarnings += amount;
    appState.gamesPlayed++;
    appState.dailyStats.earningsToday += amount;
    
    // Update daily game counter
    appState.dailyStats.gamesPlayedToday++;
    
    addTransaction(gameName, amount, 'game');
    saveAppState();
    updateAllUI();
    showSuccess(`${gameName} completed! +₹${amount}`);
}

// Play a game from the gameLibrary
function playGame(gameId) {
    if (!appState.activePackage) {
        showAlert('Error', 'Please purchase a package first');
        return;
    }

    const pkg = packages[appState.activePackage];
    
    // Check if game is unlocked
    if (!isGameUnlocked(gameId)) {
        showAlert('Locked', 'This game is not available for your current package tier');
        return;
    }

    // Check daily earning cap
    if (appState.dailyStats.earningsToday >= pkg.dailyEarningCap) {
        showAlert('Daily Limit Reached', `You've reached your daily earning cap of ₹${pkg.dailyEarningCap}. Come back tomorrow!`);
        return;
    }

    // Check daily game limit
    if (appState.dailyStats.gamesPlayedToday >= pkg.gamesPerDay) {
        showAlert('Daily Limit Reached', `You've played your daily game limit of ${pkg.gamesPerDay}. Come back tomorrow!`);
        return;
    }

    // Find game in library
    const game = gameLibrary.get(gameId);
    if (!game) {
        showAlert('Error', 'Game not found');
        return;
    }

    // Start game timer
    let timeLeft = game.timer;
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'gameModal_' + gameId;
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <h2>${game.name}</h2>
            <div style="font-size: 64px; margin: 20px 0;">${game.icon}</div>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">${game.description}</p>
            <div id="gameTimer_${gameId}" style="font-size: 48px; font-weight: bold; color: #3498db; margin: 30px 0;">
                ${timeLeft}s
            </div>
            <p style="color: #999; margin-bottom: 20px;">Complete this game to earn ₹${game.baseReward}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn btn-secondary" onclick="document.getElementById('gameModal_${gameId}').remove()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const timerInterval = setInterval(() => {
        timeLeft--;
        const display = document.getElementById('gameTimer_' + gameId);
        if (display) {
            display.innerText = timeLeft + 's';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (modal) modal.remove();
            completeGameReward(game.baseReward, game.name);
        }
    }, 1000);
}

function closeGameModal() {
    document.getElementById('clickGameModal').classList.remove('active');
    document.getElementById('timerGameModal').classList.remove('active');
    document.getElementById('quizGameModal').classList.remove('active');
    clickGameActive = false;
    timerRunning = false;
}

function updateGamesPage() {
    // Check if user has active package
    const hasActivePackage = checkPackageStatus();
    
    if (!hasActivePackage) {
        // User has no active package - show locked preview
        document.getElementById('gamesContent').innerHTML = '<div class="games-grid"><div class="game-card" style="grid-column: 1 / -1;"><p style="text-align: center; color: #999; padding: 40px;">Please purchase a package to unlock games</p></div></div>';
        applyLockedView('games');
        return;
    }

    // User has package - unlock content
    unlockContent('games');

    const pkg = packages[appState.activePackage];
    
    // Show daily progress
    const gamesRemaining = pkg.gamesPerDay - (appState.dailyStats.gamesPlayedToday || 0);
    const statusColor = gamesRemaining <= 0 ? '#e74c3c' : '#27ae60';
    if (document.getElementById('gamesWarning')) {
        document.getElementById('gamesWarning').innerHTML = 
            `<span style="color: ${statusColor}; font-weight: 600;">Daily: ${appState.dailyStats.gamesPlayedToday || 0}/${pkg.gamesPerDay} | Remaining: ${Math.max(0, gamesRemaining)}</span>`;
    }

    // Get unlocked games
    const unlockedGames = getUnlockedGames();
    
    if (unlockedGames.length === 0) {
        document.getElementById('gamesContent').innerHTML = '<div class="games-grid"><div class="game-card" style="grid-column: 1 / -1;"><p style="text-align: center; color: #999; padding: 40px;">No games available for your package tier</p></div></div>';
        return;
    }

    // Render games as grid cards
    const gamesHTML = unlockedGames.map(game => {
        const isLocked = game.minTier > pkg.tier;
        const lockIcon = isLocked ? '🔒' : '';
        const cardClass = isLocked ? 'locked' : '';
        const buttonClass = isLocked ? 'btn-disabled' : 'btn-primary';
        const buttonText = isLocked ? `Unlock at Tier ${game.minTier}` : 'Play';
        
        return `
            <div class="game-card ${cardClass}">
                <div class="game-icon">${game.icon}</div>
                <h3>${game.name} ${lockIcon}</h3>
                <p class="game-difficulty">Difficulty: ${game.difficulty}/4</p>
                <p class="game-desc">${game.description}</p>
                <div class="game-footer">
                    <span class="game-reward">+₹${game.baseReward}</span>
                    <span class="game-timer">${game.timer}s</span>
                </div>
                <button class="game-btn ${buttonClass}" ${isLocked ? 'disabled' : 'onclick="playGame(\'' + game.id + '\')"'}>${buttonText}</button>
            </div>
        `;
    }).join('');

    document.getElementById('gamesContent').innerHTML = `<div class="games-grid">${gamesHTML}</div>`;
}

// ===== WALLET PAGE (ADVANCED) =====
function updateWalletPage() {
    document.getElementById('walletBalance').innerText = appState.balance;
    document.getElementById('missionEarnings').innerText = appState.missionEarnings;
    document.getElementById('gameEarnings').innerText = appState.gameEarnings;
    document.getElementById('referralEarnings').innerText = appState.referralEarnings;
    document.getElementById('packageCost').innerText = appState.packageCost;
    
    // NEW: Display bonus earnings if element exists
    const bonusElement = document.getElementById('bonusEarnings');
    if (bonusElement) {
        bonusElement.innerText = appState.bonusEarnings;
    }

    // NEW: Advanced wallet statistics
    if (appState.activePackage) {
        const pkg = packages[appState.activePackage];
        
        // Daily earning stats
        const remainingCapacity = getRemainingDailyCapacity();
        const dailyProgressPercent = (appState.dailyStats.earningsToday / pkg.dailyEarningCap) * 100;
        
        const statsHtml = `
            <div class="wallet-stats" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">
                <h3>📊 Today's Earnings</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div>
                        <p style="font-size: 12px; opacity: 0.9;">Earned Today</p>
                        <p style="font-size: 24px; font-weight: bold;">₹${appState.dailyStats.earningsToday}</p>
                    </div>
                    <div>
                        <p style="font-size: 12px; opacity: 0.9;">Daily Cap</p>
                        <p style="font-size: 24px; font-weight: bold;">₹${pkg.dailyEarningCap}</p>
                    </div>
                </div>
                
                <div style="margin-top: 15px;">
                    <p style="font-size: 12px; margin-bottom: 8px;">Progress: ${dailyProgressPercent.toFixed(1)}%</p>
                    <div style="background: rgba(255,255,255,0.3); border-radius: 10px; height: 8px; overflow: hidden;">
                        <div style="background: #1abc9c; height: 100%; width: ${Math.min(100, dailyProgressPercent)}%; transition: width 0.3s;"></div>
                    </div>
                </div>
                
                <p style="margin-top: 15px; font-size: 14px;"><strong>Remaining Capacity: ₹${remainingCapacity}</strong></p>
            </div>
        `;
        
        const statsContainer = document.getElementById('walletStats');
        if (statsContainer && !statsContainer.innerHTML.includes("Today's Earnings")) {
            statsContainer.innerHTML = statsHtml;
        }
    }

    // Transaction history
    const transactionList = document.getElementById('transactionList');
    if (appState.transactions.length === 0) {
        transactionList.innerHTML = '<p class="no-transactions">No transactions yet</p>';
    } else {
        transactionList.innerHTML = appState.transactions.map(t => {
            let icon = '💰';
            if (t.type === 'expense') icon = '💸';
            if (t.type === 'bonus') icon = '⭐';
            if (t.type === 'referral') icon = '👥';
            if (t.type === 'task') icon = '✓';
            if (t.type === 'system') icon = '⚙️';
            
            return `
            <div class="transaction-item" style="padding: 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span style="margin-right: 10px;">${icon}</span>
                    <span style="font-weight: 500;">${t.description}</span>
                    <br>
                    <span style="font-size: 12px; color: #999;">${t.date} ${t.time}</span>
                </div>
                <span style="color: ${t.type === 'income' || t.type === 'bonus' || t.type === 'referral' ? '#1abc9c' : '#e74c3c'}; font-weight: 600; font-size: 14px;">
                    ${t.type === 'income' || t.type === 'bonus' || t.type === 'referral' || t.type === 'task' ? '+' : '-'}₹${t.amount}
                </span>
            </div>
        `}).join('');
    }
}

// NEW: Award bonus earnings (for daily bonuses, achievement bonuses, etc.)
function awardBonusEarnings(amount, reason) {
    appState.balance += amount;
    appState.bonusEarnings += amount;
    appState.dailyStats.bonusEarningsToday += amount;
    addTransaction(`Bonus: ${reason}`, amount, 'bonus');
    saveAppState();
    updateAllUI();
    showSuccess(`Bonus earned! +₹${amount} (${reason})`);
}

// NEW: Helper function to get remaining missions for today
function getRemainingMissions() {
    if (!appState.activePackage) return 0;
    const pkg = packages[appState.activePackage];
    return Math.max(0, pkg.missionsPerDay - appState.dailyStats.missionsCompletedToday);
}

// NEW: Helper function to get remaining games for today
function getRemainingGames() {
    if (!appState.activePackage) return 0;
    const pkg = packages[appState.activePackage];
    return Math.max(0, pkg.gamesPerDay - appState.dailyStats.gamesPlayedToday);
}

// NEW: Helper function to check if mission cooldown is active
function isMissionCooldownActive() {
    if (appState.dailyStats.lastMissionTime === 0) return false;
    const now = Date.now();
    const cooldown = 30000; // 30 seconds
    return (now - appState.dailyStats.lastMissionTime) < cooldown;
}

// ===== REWARDS & REDEMPTION =====
function redeemReward(method) {
    let amount = 0;
    let accountInfo = '';

    if (method === 'paytm') {
        amount = parseInt(document.getElementById('paytmAmount').value);
        accountInfo = document.getElementById('paytmNumber').value;
        if (!accountInfo) {
            showAlert('Error', 'Please enter Paytm number');
            return;
        }
    } else if (method === 'upi') {
        amount = parseInt(document.getElementById('upiAmount').value);
        accountInfo = document.getElementById('upiId').value;
        if (!accountInfo) {
            showAlert('Error', 'Please enter UPI ID');
            return;
        }
    } else if (method === 'gift') {
        amount = parseInt(document.getElementById('giftAmount').value);
    }

    if (!amount || amount < 50) {
        showAlert('Error', 'Minimum withdrawal amount is ₹50');
        return;
    }

    if (amount > appState.balance) {
        showAlert('Error', 'Insufficient balance');
        return;
    }

    appState.balance -= amount;
    addTransaction(`Redemption via ${method.toUpperCase()}`, amount, 'expense');
    saveAppState();
    updateAllUI();
    showSuccess(`Redemption successful!\n₹${amount} will be transferred to ${accountInfo}`);
    
    // Clear inputs
    if (method === 'paytm') {
        document.getElementById('paytmNumber').value = '';
        document.getElementById('paytmAmount').value = '';
    } else if (method === 'upi') {
        document.getElementById('upiId').value = '';
        document.getElementById('upiAmount').value = '';
    } else {
        document.getElementById('giftAmount').value = '';
    }
}

function updateRewardsPage() {
    document.getElementById('redeemBalance').innerText = appState.balance;
    
    // NEW: Show referral earnings breakdown
    const referralEarningsHtml = `
        <div class="earnings-breakdown" style="margin-top: 20px;">
            <h3>Referral Earnings</h3>
            <p><strong>Total Referral Bonus:</strong> ₹${appState.referralData.totalReferralBonus}</p>
            <p><strong>Referred Users:</strong> ${appState.referralData.referredUsers.length}</p>
            <p><strong>Bonus Per Referral:</strong> ₹250</p>
            <button class="btn" onclick="shareReferralCode()">Share My Code</button>
        </div>
    `;
    const container = document.getElementById('rewardsContainer');
    if (container && !container.innerHTML.includes('Referral Earnings')) {
        container.innerHTML += referralEarningsHtml;
    }
}

// ===== ACCOUNT PAGE =====
function updateAccountPage() {
    if (!appState.user || !appState.user.userId) {
        console.warn('⚠️ User object missing, skipping account page update');
        return;
    }
    document.getElementById('profileName').innerText = appState.user.name;
    document.getElementById('profileEmail').innerText = appState.user.email ? appState.user.email : 'Not registered';
    document.getElementById('profileUserId').innerText = appState.user.userId || 'N/A'; // NEW: Display User ID
    document.getElementById('memberSince').innerText = appState.user.joinDate;

    // NEW: Enhanced referral display
    const referralCode = generateReferralCode();
    document.getElementById('referralCode').innerText = referralCode;
    document.getElementById('referralCount').innerText = `Total Referrals: ${appState.referralData.referredUsers.length} | Bonus: ₹${appState.referralData.totalReferralBonus}`;

    // NEW: Enhanced earnings summary with all sources
    const totalEarned = appState.missionEarnings + appState.gameEarnings + appState.referralEarnings + appState.bonusEarnings;
    document.getElementById('totalEarned').innerText = totalEarned;
    document.getElementById('totalMissions').innerText = appState.missionsCompleted;
    document.getElementById('totalGames').innerText = appState.gamesPlayed;
    document.getElementById('accountBalance').innerText = appState.balance;
    
    // NEW: Show earnings breakdown
    const earningsBreakdownHtml = `
        <div class="earnings-breakdown" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h4>Earnings Breakdown</h4>
            <p>🎯 Missions: ₹${appState.missionEarnings}</p>
            <p>🎮 Games: ₹${appState.gameEarnings}</p>
            <p>👥 Referrals: ₹${appState.referralEarnings}</p>
            <p>⭐ Bonuses: ₹${appState.bonusEarnings}</p>
            <hr>
            <p><strong>Total Earned: ₹${totalEarned}</strong></p>
            <p><strong>Current Balance: ₹${appState.balance}</strong></p>
        </div>
    `;
    
    const breakdownContainer = document.getElementById('accountBreakdown');
    if (breakdownContainer && !breakdownContainer.innerHTML.includes('Earnings Breakdown')) {
        breakdownContainer.innerHTML = earningsBreakdownHtml;
    }
}

function copyReferralCode() {
    const code = generateReferralCode();
    navigator.clipboard.writeText(code);
    recordReferralShare();
    showSuccess('Referral code copied! Share it to earn ₹250 bonus per referral.');
}

// NEW: Share referral code function
function shareReferralCode() {
    const code = generateReferralCode();
    const text = `Join EarnHub and start earning! Use my referral code: ${code} and get instant bonus when you activate a package!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'EarnHub - Referral',
            text: text
        });
    } else {
        navigator.clipboard.writeText(code);
        showAlert('Share Code', `Copy and share this code: ${code}\n\nYour friends get bonus when they activate a package!`);
    }
    
    recordReferralShare();
}

// ===== DEPOSIT & WITHDRAWAL SYSTEM =====
function updateDepositPage() {
    if (!appState.user || !appState.user.userId) {
        console.warn('⚠️ User object missing for deposit page');
        return;
    }
    // Update balance display
    document.getElementById('depositPageBalance').innerText = appState.balance;
    
    // Display User ID
    const userIdDisplay = document.getElementById('userIdDisplay');
    if (userIdDisplay && appState.user.userId) {
        userIdDisplay.innerText = appState.user.userId;
    }
    
    // Update deposit history
    updateDepositHistoryDisplay();
    
    // Update withdraw history
    updateWithdrawHistoryDisplay();
    
    // Update admin panel
    updateAdminPanel();
}

// Switch between deposit tabs
function switchDepositTab(tabName, element) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const tabElement = document.getElementById(tabName + 'Tab');
    if (tabElement) {
        tabElement.classList.add('active');
    }
    
    // Mark button as active (use element parameter or event.target)
    if (element) {
        element.classList.add('active');
    } else if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Ensure QR is visible when switching to deposit tab
    if (tabName === 'deposit') {
        console.log('📌 Switching to Deposit tab - ensuring QR visibility');
        ensureQRVisible();       // Ensure QR is visible
        console.log('✓ Deposit tab displayed - QR visible');
    }
}

// Select deposit amount
let selectedDepositAmount = 0;

function selectDepositAmount(amount) {
    selectedDepositAmount = parseInt(amount) || 0;
    
    if (selectedDepositAmount < 50) {
        showAlert('Invalid Amount', 'Minimum deposit amount is ₹50');
        return;
    }
    
    document.getElementById('amountDisplay').innerText = selectedDepositAmount;
    document.getElementById('selectedAmount').style.display = 'block';
    document.getElementById('refIdSection').style.display = 'block';
    // QR section is always visible (no longer hidden by default)
    
    // Clear previous transaction ID
    document.getElementById('transactionRefId').value = '';
}

// Copy User ID
function copyUserId() {
    if (!appState.user || !appState.user.userId) {
        console.warn('⚠️ User object missing, cannot copy user ID');
        showAlert('Error', 'User not logged in');
        return;
    }
    navigator.clipboard.writeText(appState.user.userId);
    showSuccess('User ID copied to clipboard!');
}

// Submit deposit request
function submitDeposit() {
    if (!appState.user || !appState.user.userId) {
        console.warn('⚠️ User object missing for deposit request');
        showAlert('Error', 'User not logged in');
        return;
    }
    const refId = document.getElementById('transactionRefId').value.trim();
    
    if (!selectedDepositAmount || selectedDepositAmount < 50) {
        showAlert('Error', 'Please select a valid deposit amount');
        return;
    }
    
    if (!refId) {
        showAlert('Error', 'Please enter transaction reference ID');
        return;
    }
    
    if (refId.length < 8) {
        showAlert('Error', 'Reference ID must be at least 8 characters');
        return;
    }
    
    // Create deposit request
    const depositRequest = {
        id: 'DEP_' + Date.now(),
        userId: appState.user.userId,
        username: appState.user.name,
        email: appState.user.email ? appState.user.email : 'N/A',
        amount: selectedDepositAmount,
        referenceId: refId,
        status: 'PENDING',
        createdAt: new Date().toLocaleString(),
        approvedAt: null,
        approvedBy: null,
    };
    
    // Store deposit request
    if (!appState.deposits) {
        appState.deposits = [];
    }
    appState.deposits.push(depositRequest);
    saveAppState();
    
    // Reset form
    selectedDepositAmount = 0;
    document.getElementById('transactionRefId').value = '';
    document.getElementById('selectedAmount').style.display = 'none';
    document.getElementById('qrCodeSection').style.display = 'none';
    document.getElementById('refIdSection').style.display = 'none';
    document.getElementById('customAmount').value = '';
    
    // Show success
    showSuccess(`Deposit request created!\nAmount: ₹${depositRequest.amount}\nRef ID: ${refId}\nStatus: PENDING\n\nWaiting for admin approval...`);
    
    // Update displays
    updateDepositPage();
}

// Update deposit history display
function updateDepositHistoryDisplay() {
    const historyList = document.getElementById('depositHistoryList');
    if (!appState.deposits || appState.deposits.length === 0) {
        historyList.innerHTML = '<p style="color: #999;">No deposit requests yet</p>';
        return;
    }
    
    const historyHtml = appState.deposits.map(deposit => {
        let statusClass = 'status-pending';
        let statusIcon = '⏳';
        
        if (deposit.status === 'APPROVED') {
            statusClass = 'status-approved';
            statusIcon = '✓';
        } else if (deposit.status === 'REJECTED') {
            statusClass = 'status-rejected';
            statusIcon = '✗';
        }
        
        return `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-amount">₹${deposit.amount}</span>
                    <span class="history-status ${statusClass}">${statusIcon} ${deposit.status}</span>
                </div>
                <div class="history-details">
                    <p><strong>Ref ID:</strong> ${deposit.referenceId}</p>
                    <p><strong>Created:</strong> ${deposit.createdAt}</p>
                    ${deposit.approvedAt ? `<p><strong>Approved:</strong> ${deposit.approvedAt}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    historyList.innerHTML = historyHtml;
}

// Submit withdrawal request
function submitWithdraw() {
    if (!appState.user || !appState.user.userId) {
        console.warn('⚠️ User object missing for withdrawal request');
        showAlert('Error', 'User not logged in');
        return;
    }
    const amount = parseInt(document.getElementById('withdrawAmount').value) || 0;
    const method = document.getElementById('withdrawMethod').value;
    const details = document.getElementById('withdrawDetails').value.trim();
    
    if (amount < 100) {
        showAlert('Error', 'Minimum withdrawal amount is ₹100');
        return;
    }
    
    if (amount > appState.balance) {
        showAlert('Error', 'Insufficient balance. You only have ₹' + appState.balance);
        return;
    }
    
    if (!method) {
        showAlert('Error', 'Please select withdrawal method');
        return;
    }
    
    if (!details) {
        showAlert('Error', 'Please enter ' + (method === 'UPI' ? 'UPI ID' : 'bank details'));
        return;
    }
    
    // Create withdrawal request
    const withdrawRequest = {
        id: 'WITH_' + Date.now(),
        userId: appState.user.userId,
        username: appState.user.name,
        email: appState.user.email ? appState.user.email : 'N/A',
        amount: amount,
        method: method,
        details: details,
        status: 'PENDING',
        createdAt: new Date().toLocaleString(),
        approvedAt: null,
        approvedBy: null,
    };
    
    // Store withdrawal request
    if (!appState.withdrawals) {
        appState.withdrawals = [];
    }
    appState.withdrawals.push(withdrawRequest);
    saveAppState();
    
    // Reset form
    document.getElementById('withdrawAmount').value = '';
    document.getElementById('withdrawMethod').value = '';
    document.getElementById('withdrawDetails').value = '';
    
    showSuccess(`Withdrawal request submitted!\nAmount: ₹${amount}\nMethod: ${method}\nStatus: PENDING\n\nWaiting for admin approval...`);
    
    updateDepositPage();
}

// Update withdrawal history display
function updateWithdrawHistoryDisplay() {
    const historyList = document.getElementById('withdrawHistoryList');
    if (!appState.withdrawals || appState.withdrawals.length === 0) {
        historyList.innerHTML = '<p style="color: #999;">No withdrawal requests yet</p>';
        return;
    }
    
    const historyHtml = appState.withdrawals.map(withdrawal => {
        let statusClass = 'status-pending';
        let statusIcon = '⏳';
        
        if (withdrawal.status === 'APPROVED') {
            statusClass = 'status-approved';
            statusIcon = '✓';
        } else if (withdrawal.status === 'REJECTED') {
            statusClass = 'status-rejected';
            statusIcon = '✗';
        }
        
        return `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-amount">₹${withdrawal.amount}</span>
                    <span class="history-status ${statusClass}">${statusIcon} ${withdrawal.status}</span>
                </div>
                <div class="history-details">
                    <p><strong>Method:</strong> ${withdrawal.method}</p>
                    <p><strong>Created:</strong> ${withdrawal.createdAt}</p>
                    ${withdrawal.approvedAt ? `<p><strong>Approved:</strong> ${withdrawal.approvedAt}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    historyList.innerHTML = historyHtml;
}

// Update admin panel with pending requests
function updateAdminPanel() {
    // Pending deposits
    const pendingDeposits = (appState.deposits || []).filter(d => d.status === 'PENDING');
    const depositList = document.getElementById('adminDepositList');
    
    if (pendingDeposits.length === 0) {
        depositList.innerHTML = '<p style="color: #999;">No pending deposits</p>';
    } else {
        depositList.innerHTML = pendingDeposits.map(deposit => `
            <div class="admin-request">
                <div class="admin-request-header">
                    <span><strong>${deposit.username}</strong> (${deposit.userId})</span>
                    <span style="font-weight: bold; color: #27ae60;">₹${deposit.amount}</span>
                </div>
                <div class="admin-request-details">
                    <p><strong>Email:</strong> ${deposit.email ? deposit.email : 'N/A'}</p>
                    <p><strong>Ref ID:</strong> ${deposit.referenceId}</p>
                    <p><strong>Created:</strong> ${deposit.createdAt}</p>
                </div>
                <div class="admin-request-actions">
                    <button class="btn btn-approve" onclick="approveDeposit('${deposit.id}')">✓ Approve</button>
                    <button class="btn btn-reject" onclick="rejectDeposit('${deposit.id}')">✗ Reject</button>
                </div>
            </div>
        `).join('');
    }
    
    // Pending withdrawals
    const pendingWithdraws = (appState.withdrawals || []).filter(w => w.status === 'PENDING');
    const withdrawList = document.getElementById('adminWithdrawList');
    
    if (pendingWithdraws.length === 0) {
        withdrawList.innerHTML = '<p style="color: #999;">No pending withdrawals</p>';
    } else {
        withdrawList.innerHTML = pendingWithdraws.map(withdrawal => `
            <div class="admin-request">
                <div class="admin-request-header">
                    <span><strong>${withdrawal.username}</strong> (${withdrawal.userId})</span>
                    <span style="font-weight: bold; color: #e74c3c;">₹${withdrawal.amount}</span>
                </div>
                <div class="admin-request-details">
                    <p><strong>Email:</strong> ${withdrawal.email ? withdrawal.email : 'N/A'}</p>
                    <p><strong>Method:</strong> ${withdrawal.method}</p>
                    <p><strong>Details:</strong> ${withdrawal.details}</p>
                    <p><strong>Created:</strong> ${withdrawal.createdAt}</p>
                </div>
                <div class="admin-request-actions">
                    <button class="btn btn-approve" onclick="approveWithdraw('${withdrawal.id}')">✓ Approve</button>
                    <button class="btn btn-reject" onclick="rejectWithdraw('${withdrawal.id}')">✗ Reject</button>
                </div>
            </div>
        `).join('');
    }
}

// Admin: Approve deposit
function approveDeposit(depositId) {
    if (!confirm('Approve this deposit request?')) return;
    
    const depositIndex = appState.deposits.findIndex(d => d.id === depositId);
    if (depositIndex === -1) return;
    
    const deposit = appState.deposits[depositIndex];
    
    // Update balance
    appState.balance += deposit.amount;
    
    // Update deposit status
    deposit.status = 'APPROVED';
    deposit.approvedAt = new Date().toLocaleString();
    deposit.approvedBy = 'Admin';
    
    // Mark that user has deposited
    appState.hasDepositedAtLeastOnce = true;
    
    // Add transaction
    addTransaction(`Deposit Approved - ₹${deposit.amount}`, deposit.amount, 'deposit');
    
    saveAppState();
    updateDepositPage();
    
    showSuccess(`✓ Deposit approved!\nUser: ${deposit.username}\nAmount: ₹${deposit.amount}\nBalance updated!`);
}

// Admin: Reject deposit
function rejectDeposit(depositId) {
    if (!confirm('Reject this deposit request?')) return;
    
    const depositIndex = appState.deposits.findIndex(d => d.id === depositId);
    if (depositIndex === -1) return;
    
    const deposit = appState.deposits[depositIndex];
    deposit.status = 'REJECTED';
    deposit.rejectedAt = new Date().toLocaleString();
    deposit.rejectedBy = 'Admin';
    
    saveAppState();
    updateDepositPage();
    
    showAlert('Deposit Rejected', `Deposit rejected for ${deposit.username}\nAmount: ₹${deposit.amount}`);
}

// Admin: Approve withdrawal
function approveWithdraw(withdrawId) {
    if (!confirm('Approve this withdrawal request?')) return;
    
    const withdrawIndex = appState.withdrawals.findIndex(w => w.id === withdrawId);
    if (withdrawIndex === -1) return;
    
    const withdrawal = appState.withdrawals[withdrawIndex];
    
    // Check balance
    if (appState.balance < withdrawal.amount) {
        showAlert('Error', 'Insufficient admin balance');
        return;
    }
    
    // Deduct from balance
    appState.balance -= withdrawal.amount;
    
    // Update withdrawal status
    withdrawal.status = 'APPROVED';
    withdrawal.approvedAt = new Date().toLocaleString();
    withdrawal.approvedBy = 'Admin';
    
    // Add transaction
    addTransaction(`Withdrawal Approved - ₹${withdrawal.amount}`, -withdrawal.amount, 'withdrawal');
    
    saveAppState();
    updateDepositPage();
    
    showSuccess(`✓ Withdrawal approved!\nUser: ${withdrawal.username}\nAmount: ₹${withdrawal.amount}\nSent via ${withdrawal.method}`);
}

// Admin: Reject withdrawal
function rejectWithdraw(withdrawId) {
    if (!confirm('Reject this withdrawal request?')) return;
    
    const withdrawIndex = appState.withdrawals.findIndex(w => w.id === withdrawId);
    if (withdrawIndex === -1) return;
    
    const withdrawal = appState.withdrawals[withdrawIndex];
    withdrawal.status = 'REJECTED';
    withdrawal.rejectedAt = new Date().toLocaleString();
    withdrawal.rejectedBy = 'Admin';
    
    saveAppState();
    updateDepositPage();
    
    showAlert('Withdrawal Rejected', `Withdrawal rejected for ${withdrawal.username}\nAmount: ₹${withdrawal.amount}`);
}

// ===== HOME PAGE =====
function updateHomePage() {
    document.getElementById('userName').innerText = appState.user.name;
    document.getElementById('homeBalance').innerText = appState.balance;
    
    // NEW: Show package with power level visualization
    if (appState.activePackage) {
        const pkg = packages[appState.activePackage];
        const powerBars = '⭐'.repeat(pkg.powerLevel);
        document.getElementById('homePackage').innerHTML = 
            `<span style="color: ${pkg.color}; font-weight: 600;">${pkg.name}</span><br><span style="font-size: 12px; color: #666;">${powerBars}</span>`;
    } else {
        document.getElementById('homePackage').innerText = 'None (Upgrade Available)';
    }
    
    document.getElementById('homeMissions').innerText = appState.missionsCompleted;
    document.getElementById('homeReferrals').innerText = appState.referralData.referredUsers.length;
    
    // NEW: Show package earning potential
    if (appState.activePackage) {
        const pkg = packages[appState.activePackage];
        const earningPotentialHtml = `
            <div style="background: linear-gradient(135deg, ${pkg.color}, ${pkg.gradient}); padding: 20px; border-radius: 10px; color: white; margin-top: 20px;">
                <h3>${pkg.name} Package Benefits</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div>
                        <p style="font-size: 12px; opacity: 0.9;">Daily Earning Cap</p>
                        <p style="font-size: 24px; font-weight: bold;">₹${pkg.dailyEarningCap}</p>
                    </div>
                    <div>
                        <p style="font-size: 12px; opacity: 0.9;">Per Mission</p>
                        <p style="font-size: 24px; font-weight: bold;">₹${pkg.earningPerMission}</p>
                    </div>
                </div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3);">
                    <p style="font-size: 14px;">✓ ${pkg.missionsPerDay === 999 ? 'Unlimited' : pkg.missionsPerDay} missions/day</p>
                    <p style="font-size: 14px;">✓ ${pkg.gamesPerDay === 999 ? 'Unlimited' : pkg.gamesPerDay} games/day</p>
                    <p style="font-size: 14px;">✓ ${pkg.tasksAvailable.length} task types available</p>
                </div>
            </div>
        `;
        
        const pkgContainer = document.getElementById('packagePotential');
        if (pkgContainer && !pkgContainer.innerHTML.includes('Daily Earning Cap')) {
            pkgContainer.innerHTML = earningPotentialHtml;
        }
    }
}

// ===== UI UPDATES =====
function updateAllUI() {
    updateHomePage();
    updatePackagesPage();
    updateMissionsPage();
    updateGamesPage();
    updateDepositPage();
    updateWalletPage();
    updateRewardsPage();
    updateAccountPage();
}

// ===== MODALS & ALERTS =====
function showSuccess(message) {
    const modal = document.getElementById('successModal');
    document.getElementById('modalMessage').innerText = message;
    modal.classList.add('active');
}

function showAlert(title, message) {
    const modal = document.getElementById('alertModal');
    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertMessage').innerText = message;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

function closeAlertModal() {
    document.getElementById('alertModal').classList.remove('active');
}

// Close modals on background click
document.addEventListener('click', function(e) {
    const successModal = document.getElementById('successModal');
    const alertModal = document.getElementById('alertModal');
    
    if (e.target === successModal) {
        closeModal();
    }
    if (e.target === alertModal) {
        closeAlertModal();
    }
});
