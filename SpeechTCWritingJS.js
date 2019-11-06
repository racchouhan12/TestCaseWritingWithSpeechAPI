var body = document.getElementsByTagName('body')[0];
var orderArrayHeader = ["ID", "Test Case name", "Steps", "Expected Result"];
var rowColor = 0;
var tr;
var row = 0;
var columns = 0;
var tbl = document.createElement('table');
tbl.style.width = '100%';
tbl.setAttribute('border-collapse', 'collapse');
tbl.setAttribute('id', 'TestCases');
var tbdy = document.createElement('tbody');
var thead = document.createElement('thead');
thead.style.backgroundColor = "#28B463";
thead.style.color = "#FBFCFC";
tbl.appendChild(thead);
for (var i = 0; i < orderArrayHeader.length; i++) {
    thead.appendChild(document.createElement("th")).
    appendChild(document.createTextNode(orderArrayHeader[i]));
}
var finalText = '';
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = '';
let recognition = new window.SpeechRecognition();

function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-UK';
    u.onend = function() {
        if (callback) {
            callback();
        }
    };

    u.onerror = function(e) {
        if (callback) {
            callback(e);
        }
    };
    speechSynthesis.speak(u);
}

function start() {

    var localText = '';
    finalTranscript = localText;
    document.getElementById('text').innerHTML = '';
    recognition.start();

    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            let transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        document.getElementById('text').innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</>';
        finalText = finalTranscript;

    }

}

function stop(skip) {
    recognition.stop();

    if (row == 0) {
        console.log('Inside row === 0');
        tr = document.createElement('tr');
        tr.style.color = '#000000';
        rowColor = 0;
    }

    if (columns == 4) {
        console.log('Inside col');
        tr = document.createElement('tr');
        tr.style.color = '#000000';
        rowColor = rowColor == 0 ? 1 : 0;
    }
    if (rowColor == 0) {
        tr.style.backgroundColor = '#D7DBDD';
    } else {
        tr.style.backgroundColor = '#F7F9F9';
    }
    var td = document.createElement('td');
    if (skip) {
        td.appendChild(document.createTextNode(""));
    } else {
        td.appendChild(document.createTextNode(finalText));
    }
    tr.appendChild(td)
    tbdy.appendChild(tr);
    tbl.appendChild(tbdy);
    body.appendChild(tbl)

    if (columns == 4) {
        row = 0;
        columns = 0;
    }
    console.log(row + ',' + columns);
    columns++;
    row++;
}

function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '_' + month + '_' + day + ' ' + hour + '_' + minute + '_' + second;
    return dateTime;
}


function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById("TestCases");
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + getDateTime() + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

}