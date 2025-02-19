//load classes from chrome.storage.local or initialize as an empty array
chrome.storage.local.get(['classes'], function(result) {
  let classes = result.classes || [];

  //render the class list
  function renderClassList() {
    const classList = document.getElementById('classList');
    classList.innerHTML = '';
    classes.forEach((className, index) => {
      const li = document.createElement('li');
      li.textContent = className;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Re-Add';
      deleteBtn.addEventListener('click', function() {
        classes.splice(index, 1);
        chrome.storage.local.set({ classes: classes }, function() { //save to chrome.storage.local
          renderClassList();
          document.getElementById('refreshMessage').style.display = 'block';
        });
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
      chrome.storage.local.set({ classes: classes }, function() { //save to chrome.storage.local
        renderClassList();
        classInput.value = '';
        document.getElementById('refreshMessage').style.display = 'block';
      });
    }
  });

  renderClassList();
});