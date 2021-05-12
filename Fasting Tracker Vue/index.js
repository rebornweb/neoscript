var appDate = new Vue({
    el: '#app',
    data: {
        output: 'Hello Vue!',
        singleFast: null,
        endFast: null
    },
    created() {
          this.getNow();
            setInterval(this.getLater, 1000);
            //this.getNow();
          },
    methods: {
                getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.output = dateTime;

                },
                getLater: function () {
                const today = new Date();
                const year = today.getFullYear();
                const hours = today.getHours();
                const min = today.getMinutes();
                const secs = today.getSeconds();
/*
                function formatD(){
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date +' '+ time;
              }
*/
                const hours20 = this.hours + 20;

                if (this.singleFast == 16 ) {
                  const today = new Date();
                  const hours16 = today.setHours( today.getHours() +16) ;
                  console.log("Chosen fast is: " + this.singleFast + "<br>"
                   + "Time to break fast timestamp: " + today);
                   const date = today.getDate()+'-'+ (today.getMonth()+1) +'-'+ today.getFullYear();
                   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                   const dateTime = time +' '+ date;
                   this.endFast = dateTime;
                 }
                  else if (this.singleFast == 20) {
                    const today = new Date();
                    const hours20 = today.setHours( today.getHours() +20) ;
                    console.log("Chosen fast is: " + this.singleFast + "<br>"
                     + "Time to break fast timestamp " + today);
                     const date = today.getDate()+'-'+ (today.getMonth()+1) +'-'+ today.getFullYear();
                     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     const dateTime = time +' '+ date;
                     this.endFast = dateTime;
                  }

                }
                  //console.log("I am getLater plus 20 sec " + hours20 );
            }

});


/*
function todaysDate () {
tD = new Date();
alert(this.tD.hour);
};
todaysDate();

app.output = tD;


console.log(tD);
*/
