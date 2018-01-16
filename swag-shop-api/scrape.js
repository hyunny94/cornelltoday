var request = require('request');
var cheerio = require('cheerio');
var jsonfile = require('jsonfile');

var array = []; 

request('https://registrar.cornell.edu/calendar/2017-2018', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('div.calendar-title').each(function(i, element){
      var a = $(this);
      
      var title = a.clone().children().remove().end().text();
      var alldate = a.children().text();

      var isThereBar = (alldate.indexOf("-") === -1) ? false : true;

      var oneevent = alldate.split(" "); 
      var year = pickYear(oneevent[1]);

      function ChangeMonth(month) {
        var intmonth = month == "Jan" ? 1 : (month == "Feb" ? 2 : (month == "Mar" ? 3 : (month == "Apr" ? 4 : (month == "May" ? 5 : (month == "Jun" ? 6 : (month == "Jul" ? 7 : (month == "Aug" ? 8 : (month == "Sep" ? 9 : (month == "Oct" ? 10 : (month == "Nov" ? 11 : 12))))))))));
        return intmonth;
      }

      function pickYear(month) {
        var m = ChangeMonth(month);
        if (7 <= m && 12 >= m) return 2017;
        else return 2018;
      }
    

      if (!isThereBar) {
        var fromMonth = ChangeMonth(oneevent[1]); 
        var fromDate =  parseInt(oneevent[2]); 
        var fromTime = oneevent[3]; 
        var fromAmPm = oneevent[4].substring(0,2);
        var toMonth = ChangeMonth(oneevent[1]); 
        var toDate =  parseInt(oneevent[2]); 
        var toTime = oneevent[3]; 
        var toAmPm = oneevent[4].substring(0,2); 
      } else {
        var fromMonth = ChangeMonth(oneevent[1]) ; 
        var fromDate =  parseInt(oneevent[2]); 
        var fromTime = oneevent[3]; 
        var fromAmPm = oneevent[4].substring(0,2); 
        var toMonth = ChangeMonth(oneevent[7]) ; 
        var toDate =  parseInt(oneevent[8]); 
        var toTime = oneevent[9]; 
        var toAmPm = oneevent[10].substring(0,2); 
      }
      
      var event = {
        "title" : title, 
        "year" : year,
        "fromMonth": fromMonth, 
        "toMonth": toMonth,
        "fromDate": fromDate, 
        "toDate": toDate,
        "fromTime": fromTime, 
        "toTime": toTime,
        "fromAmPm": fromAmPm,  
        "toAmPm": toAmPm
        }  

        
      // var metadata = {
      //   event : event
      // };

      //array.push(event); 
      
      console.log(JSON.stringify(event));


      //console.log(alldate); 
    });
              //console.log(array);

  }
});
