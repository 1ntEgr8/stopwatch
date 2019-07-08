const hours = document.getElementById("hours"),
    minutes = document.getElementById("minutes"),
    seconds = document.getElementById("seconds"),
    milliseconds = document.getElementById("milliseconds"),
    startStopButton = document.getElementById("start-stop"),
    resetButton = document.getElementById("reset"),
    lapTimesContainer = document.getElementById("lap-times");   

let started = false,
    initialStarted = false,
    startTime = 0,
    stopTime = 0,
    timeElapsed = 0,
    timeOnWatch,
    timer;

document.body.classList.add("background");
document.body.classList.add("start-background");

startStopButton.addEventListener("click", manageTimer);
document.body.addEventListener("keyup", manageTimer);

resetButton.addEventListener("click", resetTimer);
document.body.addEventListener("keyup", resetTimer);

function manageTimer(e) {
    let flag = true;
    if (e.type == "keyup") {
        if (e.keyCode !== 32) {
            flag = false;
        }
    }

    if (!started && flag) {
        startTimer();
    } else if (flag) {
        stopTimer();
    }
}

function resetTimer(e) {
    let flag = true;
    if (e.type == "keyup") {
        console.log("here")
        if (e.keyCode != 16) {
            flag = false;
        }
    }

    if (!started && flag) {
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
        milliseconds.innerHTML = "000";
        started = false,
        initialStarted = false,
        startTime = 0,
        stopTime = 0,
        timeElapsed = 0;

        lapTimesContainer.innerHTML = "";

        toggleBtnStyles();
    } else if (flag) {
        let {hrs, mins, s, ms} = timeOnWatch;

        let time = document.createElement("p");
        time.innerHTML = `${hrs}:${mins}:${s}:${ms}`;

        lapTimesContainer.appendChild(time);
    }
}

function startTimer(e) {
    started = true;

    toggleBtnStyles();

    if (!initialStarted) {
        startTime = Date.now();
        initialStarted = true;
    } else {
        timeElapsed += (Date.now() - stopTime);
    }
    
    timer = setInterval(updateTimer);
}

function stopTimer() {
    started = false;
    toggleBtnStyles();
    stopTime = Date.now();
    clearInterval(timer);
}

function updateTimer() {
    let currentTime = Date.now() - timeElapsed;
    timeOnWatch = getTime(currentTime - startTime);
    hours.innerHTML = `${timeOnWatch.hrs}`;
    minutes.innerHTML = `${timeOnWatch.mins}`;
    seconds.innerHTML = `${timeOnWatch.s}`;
    milliseconds.innerHTML = `${timeOnWatch.ms}`;
}

function getTime(ms) {
    let hrs = 0,
        mins = 0, 
        s = 0;

    s = ms / 1000;

    hrs = (parseInt(s / 3600)).toString().padStart(2, '0');
    mins = (parseInt(s % 3600 / 60)).toString().padStart(2, '0');
    s = (parseInt(s % 3600 % 60)).toString().padStart(2, '0');
    ms = (parseInt(ms % (3.6 * Math.pow(10, 6)) % (6 * Math.pow(10, 4)) % 1000)).toString().padStart(3, '0');

    return {
        "hrs": hrs, 
        "mins": mins, 
        "s": s, 
        "ms": ms
    }
} 

function toggleBtnStyles() {
    if (started) {
        startStopButton.classList.remove('start');
        startStopButton.classList.add('stop');
        startStopButton.innerHTML = "STOP";

        resetButton.disabled = false;
        resetButton.classList.remove("disabled");
        resetButton.classList.add("lap");
        resetButton.innerHTML = "LAP";

        document.body.classList.remove("start-background");
        document.body.classList.remove("reset-background");
        document.body.classList.add("stop-background");        
    } else {
        startStopButton.classList.remove('stop');
        startStopButton.classList.add('start');
        startStopButton.innerHTML = "START";

        if (initialStarted) {
            resetButton.classList.remove("lap");
            resetButton.classList.add("reset");
            resetButton.innerHTML = "RESET";

            document.body.classList.remove("stop-background");
            document.body.classList.add("reset-background");
        } else {
            resetButton.disabled = true;
            resetButton.classList.add("disabled");
            resetButton.classList.remove("reset");
            resetButton.classList.add("lap");
            resetButton.innerHTML = "LAP";

            document.body.classList.remove("reset-background");
            document.body.classList.add("start-background");
        }
    }
}