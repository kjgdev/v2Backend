const pool = require('@configs/database');
const schedule = require('node-schedule');
import fetch from 'node-fetch';

const setTimeRunAgain = (day) => {
    let query = `UPDATE settings SET step = ? WHERE id = 1`

    return new Promise((reslove, reject) => {
        pool.query(query, [day], (err, results) => {
            if (err) reject(err)

            reslove(results)
        })
    })
}

const timeRunAgain = () => {
    let query = `SELECT * FROM settings WHERE id = 1`

    pool.query(query, (err, results) => {
        var date = new Date(results[0].day_run_again);
        console.log(date)
        const job = schedule.scheduleJob(date, function () {
            date.setDate(date.getDate() + results[0].step);
            
            fetch('http://45.32.111.38:5001/');

            updateDateRunAgain(date)
        });
    })
}

const updateDateRunAgain = (date) => {
    let query = `UPDATE settings SET day_run_again = ? WHERE id = 1`

    return new Promise((reslove, reject) => {
        pool.query(query, [date], (err, results) => {
            if (err) reject(err)

            reslove(results)
        })
    })
}

module.exports = {
    setTimeRunAgain,
    timeRunAgain
}