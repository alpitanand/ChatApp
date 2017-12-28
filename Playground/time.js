
// Janauary 1st 1970 00:00:00 am
// var time = new Date();
// var today =  time.getSeconds();
// var month = time.getMonth();
// console.log(month);
// console.log(time);
// console.log(today);

var moment = require('moment');
var createdAt = 100000;
var date = moment(someTimeStamp);
console.log(date.format('h:mm a'));

var someTimeStamp = moment().valueOf();
