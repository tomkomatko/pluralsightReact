import moment from 'moment';
// import Expo from 'expo';

const {manifest} = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(':').shift().concat(':3000')
    : 'productionurl.com'

// const url = 'http://${api}/events';
const url = 'http://localhost:3000/events';

export function getEvents() {
    return fetch(url)
        .then(response => response.json())
        .then(events => events.map(e => ({...e,date: new Date(e.date)})))
        .catch(function (error) {
            console.log(error.message);
        });

}

export function formatDateTime(dateString){
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()){
        return dateString;
    }
    return parsed.format('H A on D MMM YYYY');
}

export function formatDate(dateString){
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()){
        return dateString;
    }
    return parsed.format('D MM YYYY');
}

export function getCountdownParts(eventDate) {
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
    return{
        days: parseInt(duration.as('days')),
        hours: duration.get('hours'),
        minutes: duration.get('minutes'),
        seconds: duration.get('seconds'),
    };
}