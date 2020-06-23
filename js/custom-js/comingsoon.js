
  


const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
      week = day * 7

let countDown = new Date('July 16, 2020 10:21:00').getTime(),
    x = setInterval(function() {    

      let now = new Date().getTime(),
          distance = countDown - now;


      document.getElementById('weeks').innerText = Math.floor(distance / (week)),
    document.getElementById('days').innerText = Math.floor((distance % (week)) / day),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
     
     //When date is reached, do this. 
      if (distance < 0) {
       clearInterval(x);
      //insert text 
      }
    }, second)
