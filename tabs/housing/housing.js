function renderHousing() {
    const housingList = document.getElementById("housingList");
    if (!housingList) return;

    housingList.innerHTML = state.housing
        .map((room) => {
            const status = room.available ? "Available" : "Full";
            const button = room.available
                ? `<button class="button button-solid" data-action="book-room" data-id="${room.id}">Book room</button>`
                : `<button class="button button-disabled" disabled>Unavailable</button>`;

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
        </article>`;
        })
        .join("");
}

function bookHousing(id) {
    const room = state.housing.find((item) => item.id === id);
    if (!room || !room.available) {
        showToast("This room is no longer available.");
        return;
    }
    room.available = false;
    saveState();
    renderApp();
    showToast(`Booking request sent for ${room.title}! 🏠`);
}

function orderService(id) {
    const service = state.services.find((item) => item.id === id);
    if (!service) return;
    showToast(`${service.title} request sent. 🚀`);
}
