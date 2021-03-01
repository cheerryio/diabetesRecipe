// need timestamp
export const pregnantTimeToDay = function (pregnantTime) {
    let d = (new Date()) - pregnantTime;
    return { pregnantWeek: Math.floor(d / 7 / 24 / 3600 / 1000), pregnantDay: Math.floor(d / 24 / 3600 / 1000) % 7 }
}

// return timestamp
export const pregnantDayToTime = function (pregnantWeek, pregnantDay) {
    let date_stamp = Date.now() - pregnantWeek * 7 * 24 * 3600 * 1000 - pregnantDay * 24 * 3600 * 1000;
    let d = new Date(date_stamp);
    return Number(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
}
