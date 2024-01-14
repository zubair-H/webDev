document.addEventListener('DOMContentLoaded', function () {
    let [minutes, seconds] = [25, 0];
    let timeRef = document.querySelector(".timer-display");
    let int = null;

    document.getElementById("start-timer").addEventListener("click", () => {
        if (int === null) {
            int = setInterval(displayTimer, 1000);
        }
    });

    document.getElementById("pause-timer").addEventListener("click", () => {
        clearInterval(int);
        int = null;
    });

    document.getElementById("reset-timer").addEventListener("click", () => {
        clearInterval(int);
        int = null;
        [minutes, seconds] = [25, 1];
        displayTimer();
    });

    function displayTimer() {
        if (minutes > 0 || seconds > 0) {
            if (seconds === 0) {
                seconds = 59;
                minutes--;
            } else {
                seconds--;
            }

            let m = minutes < 10 ? "0" + minutes : minutes;
            let s = seconds < 10 ? "0" + seconds : seconds;

            timeRef.innerHTML = `${m} : ${s}`;
        } else {
            clearInterval(int);
            int = null;
        }
    }
});


window.addEventListener('load', () => {
    const form = document.querySelector("#book-marks");
    const input = document.querySelector("#new-task-input2");
    const list_el = document.querySelector("#tasks2");

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTaskListItem(task));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        createTaskListItem(task);

        // Save tasks to localStorage
        const tasks = Array.from(list_el.querySelectorAll('.text')).map(task => task.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        input.value = '';
    });

    function createTaskListItem(task) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);

            // Save tasks to localStorage after deletion
            const tasks = Array.from(list_el.querySelectorAll('.text')).map(task => task.value);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.myImage');
    const audios = document.querySelectorAll('.myAudio');

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            const audio = audios[index];
            toggleAudio(audio);
        });
    });

    function toggleAudio(clickedAudio) {
        audios.forEach(audio => {
            if (audio !== clickedAudio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        if (clickedAudio.paused || clickedAudio.ended) {
            clickedAudio.play();
            clickedAudio.loop = true;
        } else {
            clickedAudio.pause();
            clickedAudio.currentTime = 0;
        }
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const classesForm = document.getElementById("classes-form");
    const classNameInput = document.getElementById("class-name-input");
    const timeInput = document.getElementById("time-input");
    const locationInput = document.getElementById("location-input");
    const addClassButton = document.getElementById("add-class");
    const classesList = document.getElementById("classes-list");

    // Load existing classes from localStorage on page load
    loadClasses();

    addClassButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Get values from input fields
        const className = classNameInput.value;
        const time = timeInput.value;
        const location = locationInput.value;

        // Validate input
        if (className && time && location) {
            // Create a new list item with delete button
            const listItem = document.createElement("li");
            listItem.textContent = `${className} - ${time} - ${location}`;

            // Check if a delete button already exists for this item
            if (!listItem.querySelector("button")) {
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function () {
                    // Remove the clicked item from the list
                    listItem.remove();
                    // Save classes to localStorage
                    saveClasses();
                });
                listItem.appendChild(deleteButton);
            }

            // Append the new list item to the classes list
            classesList.appendChild(listItem);

            // Save classes to localStorage
            saveClasses();

            // Clear input fields
            classNameInput.value = "";
            timeInput.value = "";
            locationInput.value = "";
        } else {
            alert("Please fill in all the fields.");
        }
    });

    // Function to save classes to localStorage
    // Function to save classes to localStorage
    function saveClasses() {
        const classItems = Array.from(classesList.children)
            .filter(item => item.tagName === "LI")
            .map(item => {
                // Get the class information, excluding the "Delete" text
                const classInfo = item.firstChild.textContent;
                return classInfo;
            });
        localStorage.setItem("classes", JSON.stringify(classItems));
    }


    // Function to load classes from localStorage
    // Function to load classes from localStorage
    function loadClasses() {
        const storedClasses = localStorage.getItem("classes");

        if (storedClasses) {
            const classItems = JSON.parse(storedClasses);

            classItems.forEach(itemText => {
                // Create a new list item with text content
                const listItem = document.createElement("li");
                listItem.textContent = itemText;

                // Append the new list item to the classes list
                classesList.appendChild(listItem);

                // Create a delete button for each item
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", function () {
                    // Remove the clicked item from the list
                    listItem.remove();
                    // Save classes to localStorage
                    saveClasses();
                });

                // Append the delete button to the list item
                listItem.appendChild(deleteButton);
            });
        }
    }

});