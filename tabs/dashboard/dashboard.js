function renderDashboard() {
    const walletBalance = document.getElementById("walletBalance");
    const walletBalanceLarge = document.getElementById("walletBalanceLarge");
    const activeGigsCount = document.getElementById("activeGigs");
    const profileScore = document.getElementById("profileScore");
    const pendingServices = document.getElementById("pendingServices");
    const skillCount = document.getElementById("skillCount");
    const projectCount = document.getElementById("projectCount");
    const ratingValue = document.getElementById("ratingValue");

    if (walletBalance) walletBalance.textContent = state.user.wallet;
    if (walletBalanceLarge) walletBalanceLarge.textContent = state.user.wallet;
    if (activeGigsCount) activeGigsCount.textContent = state.gigs.filter((gig) => gig.status === "open" || gig.status === "applied").length;
    if (profileScore) profileScore.textContent = state.user.profileScore;
    if (pendingServices) pendingServices.textContent = state.services.filter((service) => service.status === "ready").length;
    if (skillCount) skillCount.textContent = state.user.skills.length;
    if (projectCount) projectCount.textContent = state.user.projects.length;
    if (ratingValue) ratingValue.textContent = state.user.rating.toFixed(1);
}

// Any dashboard-specific event handlers
const dashboardActions = {
    "quick-gig": () => navigateTo("gigs"),
    "start-new-gig": () => navigateTo("gigs")
};
