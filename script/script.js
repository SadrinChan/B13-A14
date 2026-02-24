// ===== DOM REFERENCES =====
const total = document.getElementById("total");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const availableJobs = document.getElementById("availableJobs");

const allTab = document.getElementById("allTab");
const interviewTab = document.getElementById("interviewTab");
const rejectedTab = document.getElementById("rejectedTab");

const allCards = document.getElementById("allCards");

// ===== CURRENT ACTIVE TAB =====
let currentStatus = "all";

// ===== CALCULATE & UPDATE COUNTS =====
function calculateCount() {
  const allCardElements = document.querySelectorAll(".card");
  const interviewCards = document.querySelectorAll('[data-status="interview"]');
  const rejectedCards = document.querySelectorAll('[data-status="rejected"]');

  total.innerText = allCardElements.length;
  interviewCount.innerText = interviewCards.length;
  rejectedCount.innerText = rejectedCards.length;

  // Available jobs count changes based on active tab
  if (currentStatus === "all") {
    availableJobs.innerText = allCardElements.length;
  } else if (currentStatus === "interview") {
    availableJobs.innerText = interviewCards.length;
  } else if (currentStatus === "rejected") {
    availableJobs.innerText = rejectedCards.length;
  }
}

// Run on page load to show correct initial count
document.addEventListener("DOMContentLoaded", function () {
  calculateCount();
});

// ===== TAB STYLE TOGGLE =====
function toggleStyle(id) {
  // Reset all tabs to default style
  const defaultClass =
    "bg-white border border-[#F1F2F4] px-3 py-2 text-[#64748B] font-semibold text-[12px] w-20 rounded-sm cursor-pointer";
  const activeClass =
    "bg-[#3B82F6] px-3 py-2 text-white font-semibold text-[12px] w-20 rounded-sm cursor-pointer";

  allTab.className = defaultClass;
  interviewTab.className = defaultClass;
  rejectedTab.className = defaultClass;

  // Set clicked tab as active
  document.getElementById(id).className = activeClass;

  // Update current status
  if (id === "allTab") currentStatus = "all";
  if (id === "interviewTab") currentStatus = "interview";
  if (id === "rejectedTab") currentStatus = "rejected";

  applyFilter();
}

// ===== FILTER CARDS BY TAB =====
function applyFilter() {
  const cards = document.querySelectorAll(".card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const status = card.getAttribute("data-status");

    if (currentStatus === "all") {
      card.style.display = "block";
      visibleCount++;
    } else if (status === currentStatus) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  showEmptyState(visibleCount);
  calculateCount();
}

// ===== SHOW EMPTY STATE MESSAGE =====
function showEmptyState(count) {
  // Remove existing empty state if present
  const existing = document.querySelector(".empty-state");
  if (existing) existing.remove();

  if (count === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className =
      "empty-state text-center py-16 bg-white border border-[#F1F2F4] rounded-lg space-y-4";
    emptyDiv.innerHTML = `
      <img src="jobs.png" class="w-24 mx-auto opacity-60" alt="No jobs" />
      <div class="space-y-1">
        <h2 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h2>
        <p class="text-[#64748B]">Check back soon for new job opportunities</p>
      </div>
    `;
    allCards.appendChild(emptyDiv);
  }
}

// ===== EVENT DELEGATION ON MAIN =====
// Handles Interview, Rejected, and Delete button clicks
document.querySelector("main").addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  // ----- INTERVIEW BUTTON -----
  if (event.target.classList.contains("interviewBtn")) {
    card.setAttribute("data-status", "interview");

    const statusBtn = card.querySelector(".status");
    statusBtn.innerText = "INTERVIEW";
    statusBtn.className =
      "status bg-[#DCFCE7] text-[#16A34A] px-3 py-2 font-medium text-[14px]";

    applyFilter();
  }

  // ----- REJECTED BUTTON -----
  if (event.target.classList.contains("rejectedBtn")) {
    card.setAttribute("data-status", "rejected");

    const statusBtn = card.querySelector(".status");
    statusBtn.innerText = "REJECTED";
    statusBtn.className =
      "status bg-[#FEE2E2] text-[#DC2626] px-3 py-2 font-medium text-[14px]";

    applyFilter();
  }

  // ----- DELETE BUTTON -----
  if (event.target.closest(".deleteBtn")) {
    card.remove();
    applyFilter();
  }
});