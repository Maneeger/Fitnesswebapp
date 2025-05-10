let totaltasks = 5;
let completedtasks = 0;

const progressBar1 = document.getElementById('progress-bar-1');
const label1Element = document.getElementById('label-1');
const progressBar2 = document.getElementById('progress-bar-2');
const label2Element = document.getElementById('label-2');
const progressBar3 = document.getElementById('progress-bar-3');
const label3Element = document.getElementById('label-3');

function updateProgressBar(progressBar, label,progress) {
   
    console.log(progressBar, label);
    const calculatedProgress = (completedtasks / totaltasks) * 100;
    console.log(calculatedProgress);

    // Remove previous progress classes
    progressBar.className = progressBar.className.replace(/progress-\d+/g, '');

    // Add the new progress class
    progressBar.classList.add(`progress-${calculatedProgress}`);


    // Update the label text
    label.innerHTML = `${calculatedProgress}<span class="smaller">%</span>`;
}

function updateUserProgress(newProgressValues) {
    updateProgressBar(progressBar1, label1Element, newProgressValues[0]);
    updateProgressBar(progressBar2, label2Element, newProgressValues[1]);
    updateProgressBar(progressBar3, label3Element, newProgressValues[2]);
}

// Example: Updating the progress bars with new values
updateUserProgress([14, 35, 90]);