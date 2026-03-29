function renderWallet() {
    const balanceLarge = document.getElementById("walletBalanceLarge");
    const pendingPayout = document.getElementById("pendingPayout");
    const txnList = document.getElementById("transactionList");

    if (balanceLarge) balanceLarge.textContent = state.user.wallet;
    if (pendingPayout) pendingPayout.textContent = state.user.pendingPayout;

    if (txnList) {
        if (!state.transactions.length) {
            txnList.innerHTML = `<p class="empty-msg">No transactions yet.</p>`;
            return;
        }
        txnList.innerHTML = state.transactions
            .map((txn) => {
                const sign = txn.type === "credit" ? "+" : "-";
                const colorClass = txn.type === "credit" ? "credit" : "debit";
                return `
          <article class="transaction-item">
            <div class="txn-info">
              <h3>${txn.label}</h3>
              <p class="txn-date">${txn.date}</p>
            </div>
            <span class="txn-amount ${colorClass}">${sign}₹${Math.abs(txn.amount)}</span>
          </article>`;
            })
            .join("");
    }
}

function handleTopUp() {
    state.user.wallet += 1000;
    state.transactions.unshift({
        id: `txn-${Date.now()}`,
        label: "Global top-up",
        amount: 1000,
        date: "Just now",
        type: "credit"
    });
    saveState();
    renderApp();
    showToast("₹1,000 top-up successful! 💳");
}
