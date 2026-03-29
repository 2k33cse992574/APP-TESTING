function renderProfile() {
    const profileName = document.getElementById("profileName");
    const profileCollege = document.getElementById("profileCollege");
    const ratingValueProfile = document.getElementById("ratingValueProfile");
    const skillTags = document.getElementById("skillTags");
    const projectList = document.getElementById("projectList");
    const careerPath = document.getElementById("careerPath");

    if (profileName) profileName.textContent = state.user.name;
    if (profileCollege) profileCollege.textContent = `${state.user.college} • ${state.user.year}`;
    if (ratingValueProfile) ratingValueProfile.textContent = state.user.rating.toFixed(1);
    if (careerPath) careerPath.textContent = state.user.careerPath;

    if (skillTags) {
        skillTags.innerHTML = state.user.skills
            .map((skill) => `<span class="tag">${skill}</span>`)
            .join("");
    }

    if (projectList) {
        projectList.innerHTML = state.user.projects
            .map((project) => `<li><span class="icon">✅</span> ${project}</li>`)
            .join("");
    }
}

function togglePremium() {
    state.user.premium = !state.user.premium;
    saveState();
    renderApp();
    showToast(state.user.premium ? "Premium plan unlocked! 🌟" : "Back to free plan.");
}

function updatePremiumUI() {
    const premiumToggle = document.getElementById("premiumToggle");
    if (!premiumToggle) return;
    premiumToggle.textContent = state.user.premium ? "PRO" : "Free";
    premiumToggle.classList.toggle("active", state.user.premium);
}
