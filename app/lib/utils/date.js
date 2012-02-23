DateUtil = {
  difference: function (laterdate, earlierdate) {

    var result = {},        
        difference = laterdate.getTime() - earlierdate.getTime();
        
    result.months = Math.floor(difference/1000/60/60/24/30);
    difference -= result.months*1000*60*60*24*30;

    result.days = Math.floor(difference/1000/60/60/24);
    difference -= result.days*1000*60*60*24;

    result.hours = Math.floor(difference/1000/60/60);
    difference -= result.hours*1000*60*60;

    result.minutes = Math.floor(difference/1000/60);
    difference -= result.minutes*1000*60;

    result.seconds = Math.floor(difference/1000);

    return result;
  }
};