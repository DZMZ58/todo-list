document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Set start date to today by default
    startDateInput.valueAsDate = new Date();

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    searchBtn.addEventListener('click', searchTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        if (taskText !== '' && startDate && endDate) {
            let dateGroup = document.querySelector(`[data-date="${startDate}"]`);
            if (!dateGroup) {
                dateGroup = document.createElement('li');
                dateGroup.dataset.date = startDate;
                dateGroup.innerHTML = `<h3>${startDate}</h3><ul></ul>`;
                taskList.appendChild(dateGroup);
            }

            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <span class="date" data-start="${startDate}" data-end="${endDate}">${startDate} - ${endDate}</span>
                <button class="delete-btn">Delete</button>
            `;
            dateGroup.querySelector('ul').appendChild(taskItem);

            taskInput.value = '';
        }
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.parentElement;
            li.classList.toggle('completed');
        } else if (e.target.tagName === 'SPAN' && !e.target.classList.contains('date')) {
            e.target.parentElement.classList.toggle('completed');
        } else if (e.target.classList.contains('date')) {
            const dateSpan = e.target;
            const startDate = dateSpan.dataset.start;
            const endDate = dateSpan.dataset.end;
            const newStartDate = prompt('Enter new start date:', startDate);
            const newEndDate = prompt('Enter new end date:', endDate);
            if (newStartDate && newEndDate) {
                dateSpan.dataset.start = newStartDate;
                dateSpan.dataset.end = newEndDate;
                dateSpan.textContent = `${newStartDate} - ${newEndDate}`;
            }
        }
    }

    function searchTasks() {
        const searchDate = searchInput.value;
        const dateGroups = document.querySelectorAll('#taskList > li');
        dateGroups.forEach(group => {
            if (searchDate === '' || group.dataset.date === searchDate) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });
    }
});