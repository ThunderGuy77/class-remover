function removeSpecificDashboardCards() {
  document.querySelectorAll('.ic-DashboardCard').forEach(card => {
    const innerDiv = card.querySelector('.ic-DashboardCard__header-subtitle');
    if (innerDiv && innerDiv.textContent.includes("2024FA-CIS")) {
      card.parentNode.removeChild(card);
    }
  });
}

//create a mutation observer to wait for the divs to appear
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      removeSpecificDashboardCards();
    }
  });
});

//observe the entire document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

//additional log to check if the script reaches this point
console.log("Removed extra dashboard cards");