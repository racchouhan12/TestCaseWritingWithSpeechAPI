function hideWelcomeUser() {
    document.getElementById('nameOfUser').style.visibility = 'hidden';
    document.getElementById('captureColumnNames').style.visibility = 'visible';
}

function hideColumnNames() {
    document.getElementById('captureColumnNames').style.visibility = 'hidden';
    document.getElementById('button').style.visibility = 'hidden';
}

function unHideButtons() {
    document.getElementById('captureColumnNames').style.visibility = 'hidden';
    document.getElementById('button').style.visibility = 'visible';
}