/*
[1] Use Sweet alert if input is empty 
[2] check if task is exist
[3] create delete all tasks button 
[4] create finished all tasks button 
*/

// Setting up variables
let theInput = document.querySelector('.add-task input')
let theAddButton = document.querySelector('.add-task .plus')
let tasksContainer = document.querySelector('.tasks-constent')

let tasksCount = document.querySelector('.tasks-count span')
let tasksCompleted = document.querySelector('.tasks-completed span')


// Focus in input field 
window.onload = function () {
    theInput.focus();
}

// Adding the task
theAddButton.onclick = function () {
    
    // If input is empty 
    if (theInput.value == '') {
        swal({
            title: "Wrong ",
            text: "Can't Be Empty ",
            icon: "error",
            button: "Yes",
            className:"Alert",
});

        } else {
            if (!localStorage.getItem(theInput.value)) {

            // set in local storage
            localStorage.setItem(theInput.value,theInput.value)
            // set nonoTasksMsg
            let noTasksMsg = document.querySelector('.no-tasks-message')
            // Remove no tasks Message )
                
            // Check if span with class name => (no-tasks-message) is exist
                if (document.body.contains(document.querySelector('.no-tasks-message'))) {
                    noTasksMsg.remove();
                    // Create main span 
                }

            let mainSpan = document.createElement('span')
            // Creat text to add to main span 
            let mainSpanText = document.createTextNode(theInput.value);
            // Append text to main span 
            mainSpan.appendChild(mainSpanText);
            // add class name to main span 
            mainSpan.className = 'task-box'
            // Create delete button
            let deleteButton = document.createElement('span')
            // crate text to add to delete button 
            let deleteButtonText = document.createTextNode('Delete')
            // append text to delete button 
            deleteButton.appendChild(deleteButtonText);
            // add class name to delete button 
            deleteButton.className = 'delete'
            // Append delete button to main span 
            mainSpan.appendChild(deleteButton)
            // append main span to task container
            tasksContainer.appendChild(mainSpan);
            // Empty the input value
            theInput.value = '';
            // Focus on the input
            theInput.focus();  
            // calculate tasks
            calculateTasks();
                
            } else {
            swal({
            title: "ًWarning",
            text: "This Message Exist Before",
            icon: "info",
            button: "Yes",
            className:"Alert",
});
            }
    }
}
document.addEventListener('click', function (e) {
    
    // delete the task
    if (e.target.className == 'delete') {
        // parentNode =>  ( delete حذف العنصر الاب الذي يحتوي علي العنصر )
        e.target.parentNode.remove();

        if (tasksContainer.childElementCount == 0) {
            noTasks();
        }
        // calculate tasks
        calculateTasks();
    }
    if (e.target.classList.contains('task-box')) {
        /*toggle => if the element has class name => (finished) toggle will delete it
        and if the element do not has class name =>(finished) toggle will add 
        class name =>(finished) to it 
        */
        e.target.classList.toggle('finished');
    }
        // calculate tasks
    calculateTasks();
    // Delete all tasks
    if (e.target.className == 'remove-all') {
        document.querySelectorAll('.tasks-constent .task-box').forEach(function (e) {
            e.remove();
            calculateTasks();
        })
    } 
        if (e.target.className == 'remove-all-finished') {
            document.querySelectorAll('.tasks-constent .finished').forEach(function (e) {
                e.remove();
                calculateTasks();
            })
    }
}
)

// functin No tasks to show
function noTasks() {
    // Create main span 
    let theSpan = document.createElement('span')

    // Create text span 
    let theSpanText = document.createTextNode('No tasks to show ')

    // Append theSpanText to main span 
    theSpan.appendChild(theSpanText)
    
    // add class list to the span 
    theSpan.className = 'no-tasks-message';

    // Append theSpan to tasks container
    tasksContainer.appendChild(theSpan);
}
noTasks();

// fuction calculate tasks
function calculateTasks() {
    // calculate tasks count 
    tasksCount.innerHTML = document.querySelectorAll('.tasks-constent .task-box').length;
    // calculate tasks completed
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-constent .finished').length;
}
