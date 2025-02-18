//load classes from localStorage or initialize as an empty array
let classes = JSON.parse(localStorage.getItem('classes')) || [];

//render the class list
function renderClassList() {
    const classList = document.getElementById('classList');
    classList.innerHTML = '';
    classes.forEach((className, index) => {
        const li = document.createElement('li');
        li.textContent = className;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            classes.splice(index, 1);
            localStorage.setItem('classes', JSON.stringify(classes)); //save to localStorage
            renderClassList();
            document.getElementById('refreshMessage').style.display = 'block';
        });
        li.appendChild(deleteBtn);
        classList.appendChild(li);
    });
}

//add class to the list
document.getElementById('addClassBtn').addEventListener('click', function() {
    const classInput = document.getElementById('classInput');
    const className = classInput.value.trim();
    if (className) {
        classes.push(className);
        localStorage.setItem('classes', JSON.stringify(classes)); //save to localStorage
        renderClassList();

        removeSpecificDashboardCards(className);
        console.log(className);

        classInput.value = '';
    }
    window.alert("when the imposter is sus");
});

//remove the divs that have the class names in the classes array
function removeSpecificDashboardCards(className) {
    document.querySelectorAll('.ic-DashboardCard').forEach(card => {
      const innerDiv = card.querySelector('.ic-DashboardCard__header-subtitle');
      if (innerDiv && innerDiv.textContent.includes(className)) {
        card.parentNode.removeChild(card);
      }
    });
  }

renderClassList();