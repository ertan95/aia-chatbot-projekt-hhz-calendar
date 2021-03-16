const util = require('util');
const helper = require('./search');
var PublicGoogleCalendar = require('public-google-calendar');

const hhz_calendarID = '9fbtqhp79a3oqvq6v0ur434j2s@group.calendar.google.com'
const stgt_calendarID = "613gcpa0qfleg0oen02rcrcmq4@group.calendar.google.com"

const cal_hhz = new PublicGoogleCalendar({ calendarId: hhz_calendarID });
const cal_stgt = new PublicGoogleCalendar({ calendarId: stgt_calendarID });

const today = new Date().toISOString();
//var today = new Date();
//today.setMonth(today.getMonth() - 3)
//today = today.toISOString() //Convert to ISO String

function main(params) {
  //params = {}               //for local testing. Comment out before committing to IBM cloud
  //params.calendar = "stgt"  //for local testing. Comment out before committing to IBM cloud
  //params.elective = 'Diskrete Optimierung'  //for local testing. Comment out before committing to IBM cloud


  return new Promise((resolve, reject) => {
    var cal = cal_hhz //set default calendar to hhz calendar
    if (params.calendar == "stgt") {
      cal = cal_stgt //change to stgt cal if necessary
    }

    cal.getEvents({ earliestFirst: true }, (err, events) => {
      if (err) {
        reject(err);
      }
      // events is now array of all calendar events.
      resolve(events);
    });
  })
    .then(events => {
      events = events.filter(event => event.start.toISOString() > today)  //filter past events
      if (params.elective) { //if this variable has a value it means electives
        dates = helper.searchForElectiveLectures(events, params.elective)
      }
      else { //else it is a regular subject or specific cal events like Prüfungsanmeldung, Rückmeldezeitraum
        if (params.subject == "Prüfungsanmeldung") {
          console.log('Suche nach Prüfungsanmeldung')
          dates = helper.searchForExamRegistrationPeriod(events, params.subject)
          console.log(dates)
        }
        else if (params.subject == "Rückmeldezeitraum") {
          console.log('Suche nach Rückmeldezeitraum')
          dates = helper.searchForReregistrationPeriod(events, params.subject)
          console.log(dates)
        }
        else {
          dates = helper.searchForLectures(events, params.subject)
          console.log(dates)
        }
      }
      return { message: dates }
    })
    .catch(err => {
      console.log(err);
    });
}

//main() //for local testing. Comment out before committing to IBM cloud

exports.main = main;