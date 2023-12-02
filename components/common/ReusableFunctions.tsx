import moment from "moment-timezone";
import uuid from 'react-uuid'
import sendMessage from "./SnackBar";
import {useSnackbar} from "notistack";

export const overlap = (dateRanges) => {
    let sortedRanges = dateRanges.sort((previous, current) => {

        // get the start date from previous and current
        let previousTime = new Date(previous.start).getTime();
        let currentTime = new Date(current.start).getTime();

        // if the previous is earlier than the current
        if (previousTime < currentTime) {
            return -1;
        }

        // if the previous time is the same as the current time
        if (previousTime === currentTime) {
            return 0;
        }

        // if the previous time is later than the current time
        return 1;
    });
    // return the final results
    return sortedRanges.reduce((result, current, index, dates) => {
        // get the previous range
        if (index === 0) {
            return result;
        }
        let previous = dates[index - 1];

        // check for any overlap
        let previousEnd = new Date(previous.end).getTime();
        let currentStart = new Date(current.start).getTime();
        let overlap = (previousEnd >= currentStart);

        // store the result
        if (overlap) {
            // yes, there is overlap
            result.overlap = true;
            // store the specific ranges that overlap
            result.ranges.push({
                previous: previous,
                current: current
            })
        }

        return result;

        // seed reduce
    }, {overlap: false, ranges: []});


}
export const getGroupNamesSelected = (allGroups, selected) => {
    let names = []
    allGroups?.forEach((item) => {
        selected?.forEach((groupId) => {
            if (item["id"] === groupId)
                names.push(item["displayName"])
        })
    });
    return names;
}

export const getGroupIDs = (all_groups, selected) => {
    let ids = []
    all_groups?.forEach((item) => {
        selected?.forEach((groupName) => {
            if (item["displayName"] === groupName)
                ids.push(item["id"])
        })
    });
    return ids;
}
export const compareDates = (start, end) => {
    return start.getHours() === end.getHours() && start.getMinutes() === end.getMinutes()
        && start.getDate() === end.getDate() && start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

}
export const resultFilter = async (groups, selectedGroups) => {
    return groups.filter(
        group => !selectedGroups.some(
            selected => group.displayName === selected
        )
    );
}
export const buildTimezoneOption = (timeString) => {

    const splitString = timeString.replace("_", " ").split("/")
    const shortTimeString = splitString[splitString.length - 1]
    return shortTimeString + ' UTC' + moment(new Date()).tz(timeString).format('Z') + " (" + moment(new Date()).tz(timeString).format('z') + ')'

}
export const savingsScore = (calendarString, transition) => {
    let percentOff, hoursOff, transitions, prevHour, currentHour, percentEffective, effectivenessScore;
    if (calendarString?.match(/0/gi) == null) {
        percentOff = 0;
        percentEffective = 0;
    } else {

        hoursOff = calendarString?.match(/0/gi).length;
        percentOff = ((hoursOff / calendarString.length) * 100).toFixed(0)
        transitions = 0
        if (hoursOff < calendarString.length && transition) {

            prevHour = calendarString[calendarString.length - 1]
            for (let i = 0; i < calendarString.length; ++i) {
                currentHour = calendarString[i]
                if (prevHour != currentHour) {
                    ++transitions;
                }
                prevHour = currentHour;
            }
        }
        percentEffective = transition ? (transitions / calendarString.length) * 100 : 100;

    }

    effectivenessScore = ((percentOff * percentEffective) / 100).toFixed(0)
    return effectivenessScore;
}
export const objectToString = (arr) => {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i].LambdaARN)
    }

    return temp;

}
export const stringtoObj = (arr) => {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        temp.push({id: uuid(), LambdaARN: arr[i]})
    }

    return temp;
}
export const  addId=(arr)=>{
    let temp=[];
    for(let i=0;i<arr.length;i++)
    {
        temp.push({
            id:uuid(),
           ...arr[i]
        })
    }
    return temp;
}
export const validateOrderedGroups = (orderedGroups) => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    let StartDelays = [], StopDelays = [], sendOrderedGroups = [];
    for (let item of orderedGroups) {
        console.log(item)
        if ((!item.StartDelay) && (parseInt(item.StartDelay) !== 0 && (item.StartDelay != "N/A"))) {
            sendMessage(enqueueSnackbar, "enter start delay value", "error", closeSnackbar);
            return;
        }
        if ((!item.StopDelay) && (parseInt(item.StopDelay) !== 0 && (item.StopDelay != "N/A"))) {
            sendMessage(enqueueSnackbar, "enter stop delay value", "error", closeSnackbar);
            return;
        }
        StartDelays.push(item.StartDelay);
        StopDelays.push(item.StopDelay)
    }
    if (StartDelays.slice(1).reduce((a, b) => {
        return a + parseInt(b);
    }, 0) > (29 * 60)) {
        sendMessage(enqueueSnackbar, 'Resource Group Startup Delays total greater than 29 minutes', "error", closeSnackbar)
        return;
    }
    if (StopDelays.slice(0, -1).reduce((a, b) => {
        return a + parseInt(b);
    }, 0) > (29 * 60)) {
        sendMessage(enqueueSnackbar, 'Resource Group Shutdown Delays total greater than 29 minutes', "error", closeSnackbar)
        return;
    }
    StartDelays.slice(1).map((item, index) => {
        let obj = {
            StartDelay: parseInt(item),
            StopDelay: parseInt(StopDelays[index])
        }
        sendOrderedGroups.push(obj)
    })
    return sendOrderedGroups;
}