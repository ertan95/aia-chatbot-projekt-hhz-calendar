const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//Prüfungsanmeldezeitraum
function searchForExamRegistrationPeriod(events, subject) {
    dateList = []
    for (i = 0; i < events.length; i++) {
        //if event summary is "Prüfungsanmeldung"
        if (events[i].summary == subject ) {
            start_date = convertDate(events[i].start)
            start = 'Der Prüfungsanmeldezeitraum beginnt am : '+ start_date

            end_date = convertDate(events[i].end)
            end = 'und endet am : '+ end_date

            dateList.push(start)
            dateList.push(end)
        }
    }
    return formatResponse(dateList)
}

//Rückmeldezeitraum
function searchForReregistrationPeriod(events, subject) {
    dateList = []
    for (i = 0; i < events.length; i++) {
        //if summary includes "Rückmeldezeitraum"
        if (events[i].summary.includes(subject)) {
            //Return description of this event. It contains Information about Rückmeldezeitraum
            dateList.push(events[i].description)
        }
    }
    return formatResponse(dateList)
}

function searchForElectiveLectures(events, subject) {
    dateList = []
    for (i = 0; i < events.length; i++) {
        if (events[i].summary.includes(subject) && events[i].summary.includes("Elective") ) {
            date = convertDate(events[i].start)
            exam = isExam(events[i].summary)
            if (exam) {
                dateList.push(date + '- Prüfung')
            } else{
                dateList.push(date)
            }
        }
    }
    return formatResponse(dateList)
}

function searchForLectures(events, subject) {
    dateList = []
    for (i = 0; i < events.length; i++) {
        if (events[i].summary.includes(subject)) {
            date = convertDate(events[i].start)
            exam = isExam(events[i].summary)
            if (exam) {
                dateList.push(date + '- Prüfung')
            } else{
                dateList.push(date)
            }
        }
    }
    return formatResponse(dateList)
}

function isExam(summary) {
    if (summary.includes('Prüfung')) {
        return true
    } else {
        return false
    }
}

function searchForLectures(events, subject) {
    dateList = []
    for (i = 0; i < events.length; i++) {
        if (events[i].summary.includes(subject)) {
            date = convertDate(events[i].start)
            exam = isExam(events[i].summary)

            if (exam) {
                dateList.push(date + '- Prüfung')
            } else{
                dateList.push(date)
            }

        }
    }
    return formatResponse(dateList)
}

function formatResponse(list) {
    if (list.length > 0) {
        response = 'Folgende Termine habe ich im Kalender gefunden:' + '\n'
        for (i = 0; i < list.length; i++) {
            response = response + list[i] + '\n'
        }
    } else {
        response = 'Ich konnte keine Termine im Kalender finden'
    }
    console.log(response)
    return response
}

function convertDate(date) {
    var strArray = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}

exports.searchForLectures = searchForLectures;
exports.searchForExamRegistrationPeriod = searchForExamRegistrationPeriod;
exports.searchForReregistrationPeriod = searchForReregistrationPeriod;
exports.searchForElectiveLectures = searchForElectiveLectures;
