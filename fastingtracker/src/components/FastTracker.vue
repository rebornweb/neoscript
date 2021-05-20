<template>
  <div>
    <input type="radio" id="16" value="16" v-model="singleFast" />
    <label for="16">16 Hour fast</label>
    <br />
    <input type="radio" id="20" value="20" v-model="singleFast" />
    <label for="20">20 Hour fast</label>
    <br>
    <span> Chosen Fast: {{ singleFast }} </span>
    <br />
    <span>Time now: {{ output }}</span>

    <br />
    <span>End Fast: {{ endFast }} </span>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      output: "Hello Vue!",
      singleFast: null,
      endFast: null,
    };
  },
  created() {
    this.getNow();
    setInterval(this.getLater, 1000);
    //this.getNow();
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();
      const dateTime = time + " " + date;

      this.output = dateTime;
    },
    getLater: function () {
      /*const today = new Date();
      const year = today.getFullYear();
      const hours = today.getHours();
      const min = today.getMinutes();
      const secs = today.getSeconds();*/
      /*
                function formatD(){
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date +' '+ time;
              }
      const hours20 = this.hours + 20;*/

      if (this.singleFast == 16) {
        const today = new Date();
       today.setHours(today.getHours() + 16); // Need this to process not be a var
        console.log(
          "Chosen fast is: " +
            this.singleFast +
            "<br>" +
            "Time to break fast timestamp: " +
            today
        );
        const date =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const dateTime = time + " " + date;
        this.endFast = dateTime;
      } else if (this.singleFast == 20) {
        const today = new Date();
        today.setHours(today.getHours() + 20); // Need this to process not be a var
        console.log(
          "Chosen fast is: " +
            this.singleFast +
            "<br>" +
            "Time to break fast timestamp " +
            today
        );
        const date =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const dateTime = time + " " + date;
        this.endFast = dateTime;
      }
    },
    //console.log("I am getLater plus 20 sec " + hours20 );
  },
};
</script>
