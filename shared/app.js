/**
 * Main App Controller
 */

function initApp() {
    bindNavigation();
    bindActions();
    initOnboardingCarousel();
    renderApp();
}

function bindNavigation() {
    const navButtons = document.querySelectorAll("[data-screen]");
    navButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const screen = button.dataset.screen;
            if (screen) navigateTo(screen);
        });
    });
}

function bindActions() {
    const panel = document.querySelector(".app-main");
    if (!panel) return;

    panel.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) return;

        const action = button.dataset.action;
        const id = button.dataset.id;

        if (action === "topup") handleTopUp();
        if (action === "quick-gig") navigateTo("gigs");
        if (action === "find-room") navigateTo("housing");
        if (action === "request-pickup") orderService("service-1");
        if (action === "order-storage") orderService("service-2");
        if (action === "new-gig") showToast("Requesting a new lead... ⚡");
        if (action === "upgrade") togglePremium();
        if (action === "apply-gig") applyToGig(id);
        if (action === "submit-gig") submitGig(id);
        if (action === "book-room") bookHousing(id);
        if (action === "skip-onboarding") navigateTo("dashboard");
        if (action === "community-search") {
            const input = document.getElementById("communitySearchInput");
            state.community.searchQuery = input ? input.value : "";
            saveState();
            renderCommunityHome();
        }
        if (action === "new-community-post") openCommunityComposer();
        if (action === "community-back") navigateTo("community");
        if (action === "community-submit-post") submitCommunityPost();
        if (action === "community-shortcut") {
            state.community.activeFilter = button.dataset.filter || "all";
            saveState();
            renderCommunityHome();
        }
        if (action === "student-send-otp") sendStudentOtp();
        if (action === "student-verify-otp") verifyStudentOtp();
    });

    const premiumToggle = document.getElementById("premiumToggle");
    if (premiumToggle) premiumToggle.addEventListener("click", togglePremium);
}

function renderApp() {
    renderScreens();
    renderDashboard();
    renderGigs();
    renderCommunityHome();
    renderHousing();
    renderWallet();
    renderProfile();
    updatePremiumUI();
}

function renderScreens() {
    const topbar = document.querySelector(".app-topbar");
    const authScreens = ["onboarding", "student-auth", "business-auth"];

    if (topbar) {
        topbar.classList.toggle("screen-light", authScreens.includes(state.currentScreen));
    }

    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.toggle("active", screen.id === state.currentScreen);
    });

    document.querySelectorAll(".nav-item").forEach((button) => {
        button.classList.toggle("active", button.dataset.screen === state.currentScreen);
    });
}

// Global initialization
window.addEventListener("DOMContentLoaded", initApp);
