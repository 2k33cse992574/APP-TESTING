function renderGigs() {
    const gigsList = document.getElementById("gigsList");
    if (!gigsList) return;

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
    showToast(`Applied for ${gig.title} and waiting for confirmation. ⚡`);
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
    showToast("Task submitted. Wallet updated! 💸");
}
