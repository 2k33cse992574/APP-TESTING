const STORAGE_KEY = "studentos-state-v1";

const defaultState = {
  currentScreen: "dashboard",
  user: {
    name: "Ananya R.",
    college: "NIT Delhi",
    year: "2nd Year",
    wallet: 1450,
    pendingPayout: 1200,
    profileScore: 82,
    rating: 4.7,
    gigsCompleted: 3,
    projects: [
      "Canva design for local brand",
      "Data entry for MSME inventory",
      "Blog writing for edtech startup"
    ],
    skills: ["Content Writing", "Excel", "Social Media", "Canva", "Basic Coding"],
    premium: false,
    careerPath: "UI/UX Design Path"
  },
  gigs: [
    {
      id: "gig-1",
      title: "Social media post series",
      company: "Campus Brand",
      category: "Design",
      reward: 2200,
      duration: "5 days",
      status: "open",
      description: "Create 6 Instagram posts and captions for a student startup launch."
    },
    {
      id: "gig-2",
      title: "Excel data cleanup",
      company: "Local MSME",
      category: "Data",
      reward: 1800,
      duration: "3 days",
      status: "open",
      description: "Clean and standardize customer and inventory data in an Excel file."
    },
    {
      id: "gig-3",
      title: "Website fix and review",
      company: "Service Hub",
      category: "Basic coding",
      reward: 3000,
      duration: "7 days",
      status: "applied",
      description: "Fix responsive layout issues and update the homepage content."
    }
  ],
  housing: [
    {
      id: "room-1",
      title: "Verified PG near campus",
      location: "Sector 12, West Delhi",
      price: 6500,
      available: true,
      rating: 4.6,
      reviews: 18
    },
    {
      id: "room-2",
      title: "Shared flat with meal plan",
      location: "Near metro station",
      price: 7200,
      available: false,
      rating: 4.8,
      reviews: 32
    }
  ],
  services: [
    {
      id: "service-1",
      title: "Laundry pickup",
      description: "Pickup and deliver your laundry in 24 hours.",
      price: 299,
      status: "ready"
    },
    {
      id: "service-2",
      title: "Document printing & delivery",
      description: "Print and deliver academic documents same day.",
      price: 149,
      status: "ready"
    }
  ],
  transactions: [
    { id: "txn-1", label: "Gig payout", amount: 2200, date: "Mar 26", type: "credit" },
    { id: "txn-2", label: "Housing subscription", amount: -6500, date: "Mar 24", type: "debit" },
    { id: "txn-3", label: "Wallet top-up", amount: 1500, date: "Mar 20", type: "credit" }
  ]
};

let deferredPrompt = null;
let state = loadState();

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(stored);
    return { ...defaultState, ...parsed };
  } catch (error) {
    console.warn("Failed to parse saved state", error);
    return defaultState;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initApp() {
  bindNavigation();
  bindActions();
  bindInstallActions();
  registerServiceWorker();
  renderApp();
}

function bindNavigation() {
  const navButtons = document.querySelectorAll("[data-screen]");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navigateTo(button.dataset.screen);
    });
  });
}

function bindActions() {
  const gigsList = document.getElementById("gigsList");
  const housingList = document.getElementById("housingList");
  const panel = document.querySelector(".app-main");

  panel.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    const id = event.target.dataset.id;

    if (!action) return;

    if (action === "topup") {
      handleTopUp();
    }
    if (action === "quick-gig") {
      navigateTo("gigs");
    }
    if (action === "new-gig") {
      showToast("A new gig lead is being sourced for you.");
    }
    if (action === "find-room") {
      navigateTo("housing");
    }
    if (action === "request-pickup") {
      orderService("service-1");
    }
    if (action === "order-storage") {
      orderService("service-2");
    }
    if (action === "new-gig") {
      handleNewGig();
    }
    if (action === "upgrade") {
      togglePremium();
    }
    if (action === "apply-gig") {
      applyToGig(id);
    }
    if (action === "submit-gig") {
      submitGig(id);
    }
    if (action === "book-room") {
      bookHousing(id);
    }
    if (action === "request-service") {
      orderService(id);
    }
  });

  document.getElementById("premiumToggle").addEventListener("click", togglePremium);
}

function navigateTo(screen) {
  state.currentScreen = screen;
  saveState();
  renderApp();
}

function renderApp() {
  renderScreens();
  renderDashboard();
  renderGigs();
  renderHousing();
  renderWallet();
  renderProfile();
  updatePremiumUI();
}

function renderScreens() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === state.currentScreen);
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === state.currentScreen);
  });
}

function renderDashboard() {
  document.getElementById("walletBalance").textContent = state.user.wallet;
  document.getElementById("walletBalanceLarge").textContent = state.user.wallet;
  document.getElementById("activeGigs").textContent = state.gigs.filter((gig) => gig.status === "open" || gig.status === "applied").length;
  document.getElementById("profileScore").textContent = state.user.profileScore;
  document.getElementById("pendingServices").textContent = state.services.filter((service) => service.status === "ready").length;
  document.getElementById("skillCount").textContent = state.user.skills.length;
  document.getElementById("projectCount").textContent = state.user.projects.length;
  document.getElementById("ratingValue").textContent = state.user.rating.toFixed(1);
}

function renderGigs() {
  const gigsList = document.getElementById("gigsList");
  gigsList.innerHTML = state.gigs
    .map((gig) => {
      const actionLabel = gig.status === "open" ? "Apply" : gig.status === "applied" ? "Submit work" : "Completed";
      const actionClass = gig.status === "completed" ? "button-disabled" : gig.status === "applied" ? "button button-solid" : "button button-solid";
      return `
        <article class="list-card">
          <div class="list-card-top">
            <div>
              <p class="tag status">${gig.category}</p>
              <h3>${gig.title}</h3>
              <p class="list-meta">${gig.company} • ${gig.duration}</p>
            </div>
            <span class="reward">₹${gig.reward}</span>
          </div>
          <p class="list-copy">${gig.description}</p>
          <div class="card-actions">
            <button class="${actionClass}" data-action="${gig.status === "open" ? "apply-gig" : gig.status === "applied" ? "submit-gig" : "completed"}" data-id="${gig.id}" ${gig.status === "completed" ? "disabled" : ""}>
              ${actionLabel}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function applyToGig(gigId) {
  const gig = state.gigs.find((item) => item.id === gigId);
  if (!gig || gig.status !== "open") {
    showToast("This gig cannot be applied to right now.");
    return;
  }

  gig.status = "applied";
  saveState();
  renderApp();
  showToast(`Applied for ${gig.title} and waiting for task confirmation.`);
}

function submitGig(gigId) {
  const gig = state.gigs.find((item) => item.id === gigId);
  if (!gig || gig.status !== "applied") {
    showToast("This gig is not ready for submission.");
    return;
  }

  gig.status = "completed";
  state.user.wallet += Math.round(gig.reward * 0.88);
  state.user.pendingPayout = Math.max(0, state.user.pendingPayout - gig.reward);
  state.transactions.unshift({
    id: `txn-${Date.now()}`,
    label: `${gig.title} payout`,
    amount: gig.reward,
    date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    type: "credit"
  });

  if (!state.user.projects.includes(gig.title)) {
    state.user.projects.unshift(gig.title);
  }

  saveState();
  renderApp();
  showToast("Task submitted. Escrow released and wallet updated.");
}

function renderHousing() {
  const housingList = document.getElementById("housingList");
  housingList.innerHTML = state.housing
    .map((room) => {
      const status = room.available ? "Available" : "Full";
      const button = room.available ? `<button class="button button-solid" data-action="book-room" data-id="${room.id}">Book room</button>` : `<button class="button button-disabled" disabled>Unavailable</button>`;
      return `
        <article class="list-card">
          <div class="list-card-top">
            <div>
              <p class="tag status">Housing</p>
              <h3>${room.title}</h3>
              <p class="list-meta">${room.location}</p>
            </div>
            <span class="reward">₹${room.price}/mo</span>
          </div>
          <p class="list-copy">Rating ${room.rating} • ${room.reviews} reviews • ${status}</p>
          <div class="card-actions">
            ${button}
          </div>
        </article>
      `;
    })
    .join("");
}

function bookHousing(roomId) {
  const room = state.housing.find((item) => item.id === roomId);
  if (!room || !room.available) {
    showToast("This room is not available.");
    return;
  }

  if (!canAfford(room.price)) {
    showToast("Insufficient wallet balance to book this room.");
    return;
  }

  room.available = false;
  state.user.wallet -= room.price;
  state.transactions.unshift({
    id: `txn-${Date.now()}`,
    label: `${room.title} booking`,
    amount: -room.price,
    date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    type: "debit"
  });

  saveState();
  renderApp();
  showToast(`Booked ${room.title}. Rent payment recorded.`);
}

function orderService(serviceId) {
  const service = state.services.find((item) => item.id === serviceId);
  if (!service) {
    showToast("Service not found.");
    return;
  }

  if (!canAfford(service.price)) {
    showToast("Insufficient funds for this service.");
    return;
  }

  state.user.wallet -= service.price;
  service.status = "ordered";
  state.transactions.unshift({
    id: `txn-${Date.now()}`,
    label: `${service.title} order`,
    amount: -service.price,
    date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    type: "debit"
  });

  saveState();
  renderApp();
  showToast(`${service.title} ordered successfully.`);
}

function renderWallet() {
  document.getElementById("walletBalanceLarge").textContent = state.user.wallet;
  document.getElementById("walletBalance").textContent = state.user.wallet;
  document.getElementById("pendingPayout").textContent = state.user.pendingPayout;

  const transactionList = document.getElementById("transactionList");
  transactionList.innerHTML = state.transactions
    .slice(0, 6)
    .map((txn) => `
      <article class="transaction-card ${txn.type}">
        <div>
          <strong>${txn.label}</strong>
          <p>${txn.date}</p>
        </div>
        <span>${txn.type === "debit" ? "-" : "+"}₹${Math.abs(txn.amount)}</span>
      </article>
    `)
    .join("");
}

function renderProfile() {
  document.getElementById("profileName").textContent = state.user.name;
  document.getElementById("profileCollege").textContent = `${state.user.college} • ${state.user.year}`;
  document.getElementById("ratingValueProfile").textContent = state.user.rating.toFixed(1);
  document.getElementById("ratingValue").textContent = state.user.rating.toFixed(1);
  document.getElementById("skillCount").textContent = state.user.skills.length;
  document.getElementById("projectCount").textContent = state.user.projects.length;
  document.getElementById("careerPath").textContent = state.user.careerPath;

  document.getElementById("skillTags").innerHTML = state.user.skills
    .map((skill) => `<span class="tag skill-tag">${skill}</span>`)
    .join("");

  document.getElementById("projectList").innerHTML = state.user.projects
    .slice(0, 5)
    .map((project) => `<li>${project}</li>`)
    .join("");
}

function togglePremium() {
  state.user.premium = !state.user.premium;
  if (state.user.premium) {
    state.user.profileScore = Math.min(100, state.user.profileScore + 2);
    showToast("Premium plan activated: faster gigs and better leads.");
  } else {
    showToast("Premium plan deactivated.");
  }
  saveState();
  updatePremiumUI();
}

function handleNewGig() {
  const title = prompt("Describe the kind of gig you want to request:", "Instagram carousel design");
  if (!title) {
    showToast("Gig request canceled.");
    return;
  }

  const category = prompt("Category (Design, Data, Writing, Support):", "Design") || "Design";
  const reward = Math.round(Math.random() * 5000) + 1500;
  const newGig = {
    id: `gig-${Date.now()}`,
    title: title.trim(),
    company: "StudentOS Lead",
    category: category.trim(),
    reward,
    duration: "4 days",
    status: "open",
    description: `Custom task requested by you in ${category} for ₹${reward}.`
  };

  state.gigs.unshift(newGig);
  saveState();
  renderApp();
  showToast("New gig lead added to your dashboard.");
}

function canAfford(amount) {
  return state.user.wallet >= amount;
}

function bindInstallActions() {
  const installButton = document.getElementById("installButton");
  const dismissInstall = document.getElementById("dismissInstall");

  installButton.addEventListener("click", promptInstall);
  dismissInstall.addEventListener("click", hideInstallBanner);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallBanner();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideInstallBanner();
    showToast("StudentOS installed successfully.");
  });
}

function showInstallBanner() {
  const banner = document.getElementById("installBanner");
  if (!banner) return;
  banner.classList.remove("hidden");
}

function hideInstallBanner() {
  const banner = document.getElementById("installBanner");
  if (!banner) return;
  banner.classList.add("hidden");
}

function promptInstall() {
  if (!deferredPrompt) {
    showToast("Installation is not available right now.");
    return;
  }

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      showToast("Thanks for installing StudentOS.");
    } else {
      showToast("Installation dismissed. You can install later from the banner.");
    }
    deferredPrompt = null;
    hideInstallBanner();
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service worker registered."))
    .catch((error) => console.warn("Service worker registration failed.", error));
}

function updatePremiumUI() {
  const premiumToggle = document.getElementById("premiumToggle");
  premiumToggle.textContent = state.user.premium ? "Premium" : "Free";
  premiumToggle.classList.toggle("active", state.user.premium);
}

function handleTopUp() {
  const amountString = prompt("Add funds to your wallet (₹)", "1000");
  const amount = parseInt(amountString, 10);
  if (!amount || amount <= 0) {
    showToast("Top-up canceled or invalid amount.");
    return;
  }

  state.user.wallet += amount;
  state.transactions.unshift({
    id: `txn-${Date.now()}`,
    label: "Wallet top-up",
    amount,
    date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    type: "credit"
  });
  saveState();
  renderApp();
  showToast(`₹${amount} added to your wallet.`);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toast.timeoutId);
  toast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}

window.addEventListener("DOMContentLoaded", initApp);
