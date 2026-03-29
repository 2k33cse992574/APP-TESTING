function renderCommunityHome() {
    const heading = document.getElementById("communityHeading");
    const subhead = document.getElementById("communitySubhead");
    const searchInput = document.getElementById("communitySearchInput");
    if (heading) heading.textContent = `${state.user.city} + ${state.user.college}`;
    if (searchInput) searchInput.value = state.community.searchQuery || "";
    if (subhead) {
        subhead.textContent = state.community.searchQuery
            ? `Showing results for "${state.community.searchQuery}" in your network.`
            : "Campus updates, study groups, project partners, and local support.";
    }

    const circlesContainer = document.getElementById("communityCircles");
    if (circlesContainer) {
        const circleMap = { college: "🏫", city: "🏙️", skill: "🎯" };
        circlesContainer.innerHTML = state.community.circles
            .map((circle) => `
        <button class="circle-pill ${circle.autoJoin ? "auto-join" : ""}" type="button" data-action="community-open-post" data-circle-id="${circle.id}">
          <span class="circle-emoji">${circleMap[circle.type] || "🔹"}</span>
          <div>
            <strong>${circle.name}</strong>
            <span>${circle.memberCount} students</span>
          </div>
          ${circle.unread ? '<span class="circle-dot"></span>' : ""}
        </button>
      `)
            .join("") + `<button class="circle-pill circle-more" data-action="community-open-post">+ More Circles →</button>`;
    }

    const feed = document.getElementById("communityFeed");
    if (feed) {
        const typeMeta = {
            flatmate: { icon: "🏠", label: "Flatmate" },
            teammate: { icon: "👥", label: "Teammate" },
            help: { icon: "❓", label: "Help" },
            win: { icon: "🎉", label: "Win" }
        };

        const posts = state.community.feed.filter((post) => {
            const filter = state.community.activeFilter;
            const matchesType = filter === "all" || post.type === filter;
            const query = state.community.searchQuery.toLowerCase();
            const matchesSearch = !query || [post.content, post.author, post.circle].some((v) => v.toLowerCase().includes(query));
            return matchesType && matchesSearch;
        });

        document.querySelectorAll('.community-shortcuts [data-filter]').forEach((button) => {
            button.classList.toggle('active', button.dataset.filter === state.community.activeFilter);
        });

        if (!posts.length) {
            feed.innerHTML = `<div class="community-empty"><h3>No matching posts found.</h3></div>`;
            return;
        }

        feed.innerHTML = posts.map((post) => {
            const meta = typeMeta[post.type] || { icon: "🔹", label: "Post" };
            return `
        <article class="post-card">
          <div class="post-card-top">
            <span class="post-type-tag">${meta.icon} ${meta.label}</span>
            <span class="post-time">${post.time}</span>
          </div>
          <p class="post-author">${post.author} • ${post.authorCollege}</p>
          <p class="post-content">${post.content}</p>
          <div class="post-meta-row">
            <span class="post-chip">${post.circle}</span>
            <span>${post.helpfulCount} helpful</span>
          </div>
        </article>`;
        }).join("");
    }
}

function openCommunityComposer(type = "flatmate", circleId = null) {
    const defaultCircle = state.community.circles.find(c => c.id === circleId) || state.community.circles[0];
    state.community.postDraft = {
        ...state.community.postDraft,
        type,
        circleId: defaultCircle.id
    };
    saveState();
    navigateTo("community-post");
}

function submitCommunityPost() {
    const draft = state.community.postDraft;
    if (!draft.content.trim()) {
        showToast("Content daalo yaar! ✍️");
        return;
    }
    const newPost = {
        id: `post-${Date.now()}`,
        type: draft.type,
        author: state.user.name,
        authorCollege: state.user.college,
        circle: state.community.circles.find(c => c.id === draft.circleId)?.name || "General",
        content: draft.content,
        time: "Just now",
        helpfulCount: 0,
        replyCount: 0
    };
    state.community.feed.unshift(newPost);
    state.community.postDraft.content = "";
    saveState();
    navigateTo("community");
    showToast("Post submitted successfully! 🚀");
}
