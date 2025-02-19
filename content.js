//get the saved data
chrome.storage.local.get('classes', function (data) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  if (data.classes) {
    removeSpecificDashboardCards(data.classes);
  } else {
    console.log("No classes found in storage. Please add classes in the extension menu.");
  }
});

//function to remove the specific dashboard cards
function removeSpecificDashboardCards(allNames) {
  let allClassNames = allNames.map(name => name.toLowerCase()); //array of class names to remove, converted to lowercase
  document.querySelectorAll('.ic-DashboardCard').forEach(card => {
    const innerDiv = card.querySelector('.ic-DashboardCard__header-subtitle');
    const innerSpan = card.querySelectorAll('span');
    allClassNames.forEach(className => {
      if ((innerDiv && innerDiv.textContent.toLowerCase().includes(className)) || 
          (innerSpan && innerSpan[0] && innerSpan[0].textContent.toLowerCase().includes(className))) {
        card.parentNode.removeChild(card);
      }
    });
  });
}

//create a mutation observer to wait for the divs to appear
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      chrome.storage.local.get('classes', function (data) {
        if (data.classes) {
          removeSpecificDashboardCards(data.classes);
        }
      });
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