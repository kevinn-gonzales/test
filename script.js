//function to create clock and update to current time

function updateClock() {
    //store html element in javascript const variable
    //store current date in const variable
    const clock = document.getElementById("clock");
    const currentTime = new Date();

    //take hour, minutes and seconds from currentTime and then store in variables
    let hours = currentTime.getHours().toString().padStart(2, "0");
    let minutes = currentTime.getMinutes().toString().padStart(2, "0");
    let seconds = currentTime.getSeconds().toString().padStart(2, "0");

    //render in html element
    clock.textContent = `${hours}:${minutes}:${seconds}`
}

setInterval(updateClock, 1000);
updateClock();