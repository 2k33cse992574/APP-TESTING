function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("active");
    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);
}

function navigateTo(screen) {
    state.currentScreen = screen;
    saveState();
    renderApp();
}

/**
 * Common event delegation for action buttons
 */
function bindGlobalActions() {
    document.body.addEventListener("click", (event) => {
        const button = event.target.closest("[data-screen]");
        if (button) {
            navigateTo(button.dataset.screen);
        }
    });
}
