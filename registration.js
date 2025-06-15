const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu.mobile .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Dynamic team member inputs
const teamStrengthSelect = document.getElementById("teamMembersStrength");
const teamMembersSection = document.getElementById("teamMembersSection");
const teamMemberInputs = document.getElementById("teamMemberInputs");

teamStrengthSelect.addEventListener("change", function () {
  const strength = parseInt(this.value);

  if (strength) {
    // Show the team members section
    teamMembersSection.classList.add("show");

    // Clear existing inputs
    teamMemberInputs.innerHTML = "";

    // Create input fields for each team member
    for (let i = 1; i <= strength; i++) {
      const memberDiv = document.createElement("div");
      memberDiv.className = "team-member-input";

      memberDiv.innerHTML = `
                        <label for="teamMember${i}">${
        i === 1 ? "1st" : i === 2 ? "2nd" : i === 3 ? "3rd" : i + "th"
      } Team Member Name *</label>
                        <input type="text" id="teamMember${i}" name="teamMember${i}" required>
                    `;

      teamMemberInputs.appendChild(memberDiv);
    }
  } else {
    // Hide the team members section
    teamMembersSection.classList.remove("show");
    teamMemberInputs.innerHTML = "";
  }
});

// Handle form submission
document
  .querySelector(".registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Registering...";

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Collect team member names
    const strength = parseInt(data.teamMembersStrength);
    const teamMemberNames = [];

    for (let i = 1; i <= strength; i++) {
      const memberName = data[`teamMember${i}`];
      if (memberName && memberName.trim()) {
        teamMemberNames.push(memberName.trim());
      }
    }

    // Replace individual member fields with combined names
    data.teamMemberNames = teamMemberNames.join("\n");

    // Remove individual member fields
    for (let i = 1; i <= 5; i++) {
      delete data[`teamMember${i}`];
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const messageEl = document.getElementById("message");

      if (response.ok) {
        messageEl.textContent =
          "Team registered successfully! Confirmation email sent to team leader.";
        messageEl.className = "message success";
        e.target.reset();
        // Hide team members section
        teamMembersSection.classList.remove("show");
        teamMemberInputs.innerHTML = "";
      } else {
        messageEl.textContent = result.error || "Registration failed";
        messageEl.className = "message error";
      }

      messageEl.classList.remove("hidden");
      setTimeout(() => {
        messageEl.classList.add("hidden");
      }, 7000);
    } catch (error) {
      console.error("Error:", error);
      const messageEl = document.getElementById("message");
      messageEl.textContent = "Network error. Please try again.";
      messageEl.className = "message error";
      messageEl.classList.remove("hidden");
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

// Reset form functionality
document.querySelector(".reset-btn").addEventListener("click", () => {
  teamMembersSection.classList.remove("show");
  teamMemberInputs.innerHTML = "";
});
