var appDate = new Vue({
    el: '#app',
    data: {
        output: 'Hello Vue!'
    },
    created() {
            setInterval(this.getNow, 1000);
            //this.getNow();
          },
    methods: {
                getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.output = dateTime;
                }
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
