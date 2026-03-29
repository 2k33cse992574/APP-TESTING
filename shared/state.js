const STORAGE_KEY = "studentos-state-v1";

const defaultState = {
    currentScreen: "onboarding",
    auth: {
        student: {
            phone: "",
            otpAttempts: 0,
            lockedUntil: null
        },
        business: {
            email: "",
            otpAttempts: 0,
            lockedUntil: null
        }
    },
    user: {
        name: "Ananya R.",
        college: "NIT Delhi",
        year: "2nd Year",
        city: "New Delhi",
        primarySkill: "Canva Creators",
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
        // ... we can add others if we want or just keep it simple ...
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
        { id: "service-1", title: "Pickup & delivery", price: 120, status: "ready" },
        { id: "service-2", title: "Storage booking", price: 250, status: "ready" }
    ],
    community: {
        activeFilter: "all",
        searchQuery: "",
        postDraft: {
            type: "flatmate",
            circleId: "circle-college",
            anonymous: false,
            content: "",
            title: "",
            metadata: {
                location: "",
                budgetMin: 5000,
                budgetMax: 9000,
                moveInDate: "",
                preference: "Any",
                purpose: "Hackathon",
                skillsNeeded: ["Canva"],
                deadline: "",
                note: "",
                helpDetail: "",
                winChoice: "gig",
                customWin: ""
            }
        },
        circles: [
            { id: "circle-college", type: "college", name: "NIT Delhi Circle", memberCount: 1420, unread: 5, autoJoin: true },
            { id: "circle-city", type: "city", name: "New Delhi Circle", memberCount: 11600, unread: 3, autoJoin: true },
            { id: "circle-skill", type: "skill", name: "Canva Creators", memberCount: 860, unread: 2, autoJoin: false }
        ],
        feed: [
            {
                id: "post-1",
                type: "flatmate",
                circleId: "circle-city",
                author: "Ananya R.",
                authorCollege: "NIT Delhi",
                authorYear: "2nd Year",
                circle: "New Delhi Circle",
                content: "Looking for a flatmate near GTB Nagar — budget ₹8k, preferably calm and class-friendly. Move-in from next month.",
                time: "2 hours ago",
                helpfulCount: 9,
                replyCount: 3
            },
            {
                id: "post-2",
                type: "teammate",
                circleId: "circle-skill",
                author: "Riya",
                authorCollege: "NIT Delhi",
                authorYear: "2nd Year",
                circle: "Canva Creators",
                content: "Need a teammate for a college project. Looking for Canva and copywriting support for a pitch deck.",
                time: "4 hours ago",
                helpfulCount: 6,
                replyCount: 7
            },
            {
                id: "post-3",
                type: "win",
                circleId: "circle-college",
                author: "Ananya R.",
                authorCollege: "NIT Delhi",
                authorYear: "2nd Year",
                circle: "NIT Delhi Circle",
                content: "Completed a Canva gig for the campus fest design team — earned ₹5k and built my portfolio.",
                time: "8 hours ago",
                helpfulCount: 14,
                replyCount: 5
            }
        ]
    },
    transactions: [
        { id: "txn-1", label: "Gig payout", amount: 2200, date: "Mar 26", type: "credit" },
        { id: "txn-2", label: "Housing subscription", amount: -6500, date: "Mar 24", type: "debit" },
        { id: "txn-3", label: "Wallet top-up", amount: 1500, date: "Mar 20", type: "credit" }
    ]
};

let state = loadState();

function loadState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
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
