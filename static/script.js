// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ===== Airports Suggestions =====
  const airports = [
    "JFK - New York",
    "LAX - Los Angeles",
    "ORD - Chicago",
    "MIA - Miami",
    "ATL - Atlanta",
    "DFW - Dallas/Fort Worth",
    "SFO - San Francisco",
    "SEA - Seattle"
  ];

  const datalist = document.getElementById("airports");
  airports.forEach(airport => {
    const option = document.createElement("option");
    option.value = airport;
    datalist.appendChild(option);
  });

  // ===== Flatpickr Date Pickers =====
  const returnPicker = flatpickr("#return", {
    dateFormat: "Y-m-d",
    minDate: "today"
  });

  flatpickr("#departure", {
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: function(selectedDates, dateStr) {
      // Ensure return date is after departure
      returnPicker.set("minDate", dateStr);
    }
  });

  // ===== Booking Nav (One-way / Round-trip) =====
  const bookingNav = document.querySelectorAll(".booking_nav span");
  const returnGroup = document.getElementById("return-group");

  bookingNav.forEach(span => {
    span.addEventListener("click", () => {
      bookingNav.forEach(s => s.classList.remove("active"));
      span.classList.add("active");

      if (span.textContent === "One Way") {
        returnGroup.style.display = "none";
      } else {
        returnGroup.style.display = "block";
      }
    });
  });

  // Initialize return date hidden for One-way
  returnGroup.style.display = "none";

  // ===== Travelers Counter =====
  const travelersInput = document.getElementById("travelers");
  const panel = document.querySelector(".travelers_panel");

  // Only declare travelers once
  let travelers = { adults: 1, children: 0, infants: 0 };

  function updateTravelersInput() {
    const parts = [];
    if (travelers.adults) parts.push(`${travelers.adults} Adult${travelers.adults > 1 ? 's' : ''}`);
    if (travelers.children) parts.push(`${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`);
    if (travelers.infants) parts.push(`${travelers.infants} Infant${travelers.infants !== 1 ? 's' : ''}`);
    travelersInput.value = parts.join(', ') || '1 Adult';
  }

  // Show/hide panel on click
  travelersInput.addEventListener("click", () => {
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });

  // Increment/decrement buttons
  document.querySelectorAll(".traveler-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent panel from closing
      const type = btn.dataset.type;
      if (btn.dataset.action === "increment") travelers[type]++;
      else if (btn.dataset.action === "decrement" && travelers[type] > 0) travelers[type]--;

      // Update the counter inside the dropdown
      let idMap = { adults: "adult-count", children: "children-count", infants: "infants-count" };
      const counterSpan = document.getElementById(idMap[type]);
      if (counterSpan) counterSpan.textContent = travelers[type];
  

      // Update the input field
      updateTravelersInput();
    });
  });

  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && e.target !== travelersInput) {
      panel.style.display = "none";
    }
  });

  updateTravelersInput(); // initialize

  // ===== Mobile Burger Menu =====
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".nav_menu");

  burger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});
