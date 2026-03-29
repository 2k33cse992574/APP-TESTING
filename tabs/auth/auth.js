function initOnboardingCarousel() {
    const carousel = document.getElementById("onboardingCarousel");
    if (!carousel) return;

    const cards = carousel.querySelectorAll(".onboarding-card");
    let currentIndex = 0;
    let onboardingInterval = null;

    function advance() {
        currentIndex = (currentIndex + 1) % cards.length;
        carousel.scrollTo({ left: cards[currentIndex].offsetLeft, behavior: "smooth" });
    }

    onboardingInterval = window.setInterval(advance, 3000);
    carousel.addEventListener("touchstart", () => {
        if (onboardingInterval) window.clearInterval(onboardingInterval);
    });
}

function sendStudentOtp() {
    const phoneInput = document.getElementById("studentPhone");
    const phone = phoneInput.value.trim();
    if (!/^[0-9]{10}$/.test(phone)) {
        showToast("Sahi number daalo yaar! 📱");
        return;
    }
    state.auth.student.phone = phone;
    saveState();

    const display = document.getElementById("studentPhoneDisplay");
    if (display) display.textContent = phone;

    showStudentAuthStep(2);
    showToast("OTP sent. Use 1234 for testing. 🔒");
}

function verifyStudentOtp() {
    const code = [1, 2, 3, 4].map(i => document.getElementById(`studentOtp${i}`).value).join("");
    if (code !== "1234") {
        showToast("Wrong OTP. Try 1234. ❌");
        return;
    }
    showToast("Verified! Welcome to StudentOS. 🎊");
    navigateTo("dashboard");
}

function showStudentAuthStep(step) {
    const step1 = document.getElementById("student-auth-step1");
    const step2 = document.getElementById("student-auth-step2");
    if (step1) step1.classList.toggle("hidden", step !== 1);
    if (step2) step2.classList.toggle("hidden", step !== 2);

    document.querySelectorAll("#student-auth .auth-step-indicator").forEach((indicator, index) => {
        indicator.classList.toggle("active", index === step - 1);
    });
}
