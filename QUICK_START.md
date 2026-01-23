================================================================================
                        QUICK START GUIDE - NEW FEATURES
================================================================================

For End Users: Everything works like before, just with better controls!
For Developers: Amazing new functions to extend the app easily!

================================================================================
                        END USER GUIDE
================================================================================

WHAT CHANGED FOR USERS?
─────────────────────────

✓ More Packages (6 instead of 3)
  - Budget option: Bronze (₹149)
  - New middle tier: Silver, Gold, Platinum
  - Premium: Titanium & Diamond

✓ Clearer Limits
  - You can now see exactly how many missions you can do TODAY
  - Counter shows: "Daily: 2/10 | Remaining: 8"
  - Helps you plan your time better

✓ Smart Cooldown
  - 30-second wait between missions (prevents accidents)
  - Friendly warning shows how long to wait
  - Protects your account from abuse

✓ Bonus Money
  - Separate "bonus" category in wallet
  - App admin can award you bonuses anytime
  - Tracked separately from regular earnings

✓ Everything Else
  - Login/Register works same
  - Games work same
  - Wallet shows all earnings
  - Withdrawal works same


HOW TO USE - STEP BY STEP
────────────────────────────

1. Login to Your Account
   └─ Email & Password (or use Demo)

2. Go to "Packages"
   └─ Now shows 6 options instead of 3
   └─ Pick the one that fits your budget

3. Click "Buy Now"
   └─ Money is deducted from balance
   └─ Daily limits reset to 0
   └─ You're ready to earn!

4. Go to "Missions"
   └─ See how many you can do today
   └─ Top shows: "Daily: 0/20 | Remaining: 20"
   └─ Do missions, counter updates

5. Go to "Games"
   └─ Same thing - daily limits
   └─ After 30 seconds, you can do next mission

6. Check Your Wallet
   └─ See breakdown: Missions, Games, Bonuses, Referrals
   └─ All your money in one place


IMPORTANT NOTES
────────────────

⏰ Daily Reset
   └─ Counters reset at 12:00 AM (midnight)
   └─ Refresh page anytime - data is saved
   └─ No need to log out

💰 Switching Packages
   └─ If you buy a NEW package, limits reset
   └─ You get a fresh start with new limits
   └─ Can't exploit the system!

⏱️  Cooldown Timer
   └─ 30 seconds between missions
   └─ System shows countdown
   └─ This prevents clicking too fast

🎁 Bonus Money
   └─ App admin can give you bonus money
   └─ Shows in wallet as separate "Bonus" category
   └─ Same as money you earned!


================================================================================
                        DEVELOPER GUIDE
================================================================================

FOR DEVELOPERS: Use These New Functions!

IMPORT & EXTEND EASIEST:
────────────────────────

1. Award Daily Login Bonus
   ───────────────────────
   function checkDailyLogin() {
       const lastLogin = localStorage.getItem('lastLogin');
       if (lastLogin !== getCurrentDate()) {
           awardBonusEarnings(50, "Daily Login Bonus");
           localStorage.setItem('lastLogin', getCurrentDate());
       }
   }
   
   // Call this after login:
   checkDailyLogin();


2. Check If User Can Do Mission
   ────────────────────────────
   function canDoMission() {
       if (!appState.activePackage) {
           showAlert("Error", "Buy a package first");
           return false;
       }
       if (getRemainingMissions() <= 0) {
           showAlert("Limit", "No missions left today");
           return false;
       }
       if (isMissionCooldownActive()) {
           showAlert("Wait", "30-second cooldown active");
           return false;
       }
       return true;
   }


3. Show Remaining Count
   ────────────────────
   function updateMissionStatus() {
       const remaining = getRemainingMissions();
       const total = packages[appState.activePackage].missionsPerDay;
       document.getElementById('status').innerText = 
           `${remaining}/${total} missions left`;
   }


4. Award Achievement Bonus
   ────────────────────────
   function checkAchievements() {
       if (appState.missionsCompleted === 10) {
           awardBonusEarnings(100, "Achievement: 10 Missions");
       }
       if (appState.balance >= 1000) {
           awardBonusEarnings(200, "Achievement: ₹1000 Earned");
       }
   }


5. Disable Buttons During Cooldown
   ──────────────────────────────────
   function updateMissionButton() {
       const btn = document.getElementById('missionBtn');
       if (isMissionCooldownActive()) {
           btn.disabled = true;
           btn.innerText = "Wait 30 seconds...";
       } else {
           btn.disabled = false;
           btn.innerText = "Start Mission";
       }
   }


FUNCTION REFERENCE
──────────────────

🔧 getCurrentDate()
   Returns: String (YYYY-MM-DD format)
   Use: Get today's date safely
   Example: const today = getCurrentDate(); // "2026-01-23"

🔧 checkAndResetDailyStats()
   Returns: void
   Use: Automatically reset counters if new day
   Auto-called on login, you usually don't call this

🔧 getRemainingMissions()
   Returns: Number (0 to package limit)
   Use: Check how many missions user can do TODAY
   Example: const left = getRemainingMissions(); // 8

🔧 getRemainingGames()
   Returns: Number (0 to package limit)
   Use: Check how many games user can do TODAY
   Example: const left = getRemainingGames(); // 5

🔧 isMissionCooldownActive()
   Returns: Boolean
   Use: Check if 30-second cooldown is active
   Example: if (isMissionCooldownActive()) { ... }

🔧 awardBonusEarnings(amount, reason)
   Returns: void
   Params: amount (number), reason (string)
   Use: Give user bonus money safely
   Example: awardBonusEarnings(100, "Referral Bonus")
   Does: Adds money + shows modal + logs transaction


STATE STRUCTURE
────────────────

Important: appState.dailyStats
   ├─ date: "2026-01-23" (current date)
   ├─ missionsCompletedToday: 5 (today only)
   ├─ gamesPlayedToday: 2 (today only)
   ├─ lastMissionTime: 1674384620000 (timestamp)
   └─ bonusEarningsToday: 150 (today only)

These RESET at midnight automatically!


COMMON TASKS
────────────

Task: Show countdown before mission
─────────────────────────────────────
if (isMissionCooldownActive()) {
    const now = Date.now();
    const cooldown = 30000;
    const waited = now - appState.dailyStats.lastMissionTime;
    const remaining = Math.ceil((cooldown - waited) / 1000);
    alert(`Wait ${remaining} seconds`);
}

Task: Disable all missions if limit reached
────────────────────────────────────────────
const missions = document.querySelectorAll('.mission-btn');
missions.forEach(btn => {
    btn.disabled = getRemainingMissions() === 0;
});

Task: Show current day's total
───────────────────────────────
const todayTotal = 
    appState.dailyStats.missionsCompletedToday + 
    appState.dailyStats.gamesPlayedToday;
alert(`You've done ${todayTotal} things today!`);

Task: Check if it's a new day
──────────────────────────────
if (appState.dailyStats.date !== getCurrentDate()) {
    alert("New day started!");
    // Reset counters happens automatically
}


PACKAGE STRUCTURE
──────────────────

Each package in const packages = { ... } has:
   ├─ id: Unique identifier
   ├─ name: Display name
   ├─ price: Cost in rupees
   ├─ missionsPerDay: Daily mission limit
   ├─ earningPerMission: ₹ per mission
   ├─ gamesPerDay: Daily game limit
   ├─ color: Display color (hex)
   └─ unlockedGames: Array of game types

Packages available:
   bronze: ₹149, 5 missions, ₹5 per mission
   silver: ₹299, 10 missions, ₹10 per mission
   gold: ₹599, 20 missions, ₹20 per mission
   platinum: ₹999, 35 missions, ₹30 per mission
   titanium: ₹1999, 60 missions, ₹40 per mission
   diamond: ₹3999, 100 missions, ₹60 per mission


================================================================================
                        TROUBLESHOOTING
================================================================================

Problem: Daily limits not resetting
Solution: Check localStorage for corrupted data
   → Open DevTools > Application > localStorage
   → Look for earnhubAppState
   → Check dailyStats.date matches today

Problem: Cooldown not working
Solution: Check timestamp
   → lastMissionTime should be a valid timestamp
   → Should be ~30 seconds ago
   → Check: Date.now() - lastMissionTime > 30000

Problem: Bonus earnings not showing
Solution: Check wallet page
   → Make sure wallet page calls updateWalletPage()
   → Check bonusEarnings field exists in HTML
   → Verify awardBonusEarnings() was called

Problem: Package not switched
Solution: Check active package
   → Verify purchasePackage() was called
   → Check appState.activePackage changed
   → Verify daily limits reset
   → Check balance was deducted


================================================================================
                        BEST PRACTICES
================================================================================

✅ DO:

1. Always use helper functions
   ✓ getRemainingMissions() not appState.dailyStats.missionsCompletedToday
   ✓ awardBonusEarnings() not appState.balance += amount

2. Check package before allowing actions
   ✓ if (!appState.activePackage) return;
   ✓ Show helpful error message

3. Use daily stats not total
   ✓ appState.dailyStats.gamesPlayedToday
   ✗ appState.gamesPlayed (wrong - total)

4. Call updateAllUI() after changes
   ✓ Changes balance/counters → updateAllUI()
   ✓ Shows updated UI to user

5. Save state after important changes
   ✓ saveAppState()
   ✓ Or updateAllUI() calls it automatically


❌ DON'T:

1. Modify appState directly
   ✗ appState.balance += 100 (avoid)
   ✓ awardBonusEarnings(100, "reason") (use this)

2. Hardcode limits
   ✗ if (missionsCount > 10)
   ✓ if (missionsCount >= packages[pkg].missionsPerDay)

3. Skip validation
   ✗ completeMission() without checking limits
   ✓ Check getRemainingMissions() > 0 first

4. Forget to reset daily on midnight
   ✗ Forget checkAndResetDailyStats()
   ✓ It's auto-called on login


================================================================================
                        EXAMPLE: ADD A FEATURE
================================================================================

Let's Add: Hourly Free Bonus (₹5 every hour)

STEP 1: Create the function
────────────────────────────
function giveHourlyBonus() {
    const lastBonusTime = parseInt(
        localStorage.getItem('lastHourlyBonus') || '0'
    );
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in ms
    
    if (now - lastBonusTime > oneHour) {
        awardBonusEarnings(5, "Hourly Bonus");
        localStorage.setItem('lastHourlyBonus', now.toString());
        return true;
    }
    return false;
}

STEP 2: Call on page load
──────────────────────────
function updateAllUI() {
    giveHourlyBonus(); // Add this line
    // ... rest of updateAllUI()
}

STEP 3: Done!
─────────────
Now users get ₹5 every hour automatically!
Bonus is tracked, shows in wallet, all working!


================================================================================
                        NEED HELP?
================================================================================

📖 READ: UPGRADE_SUMMARY.md
   └─ Complete technical documentation

💻 CHECK: app.js lines 1-100
   └─ All new functions are documented

🔍 DEBUG: Use console
   └─ console.log(appState) to see everything
   └─ console.log(getRemainingMissions()) to check limits

🧪 TEST: Demo account
   └─ Email: demo@test.com
   └─ Password: demo123
   └─ Has sample data loaded


================================================================================
                        FINAL NOTE
================================================================================

This upgrade makes the app:
    ✅ More realistic
    ✅ More secure
    ✅ More controllable
    ✅ Easier to extend
    ✅ Better for users

Everything is backward compatible - old data still works!

Have fun coding! 🚀

================================================================================
