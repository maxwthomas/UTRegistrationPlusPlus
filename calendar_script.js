scheduler.init('scheduler_here', new Date(), "month");

var events = [
    {id:1, text:"Meeting",   start_date:"07/11/2020 14:00",end_date:"07/11/2020 17:00"},
    {id:2, text:"Conference",start_date:"07/15/2020 12:00",end_date:"07/18/2020 19:00"},
    {id:3, text:"Interview", start_date:"07/24/2020 09:00",end_date:"07/24/2020 10:00"}
 ];
  
 scheduler.parse(events, "json");