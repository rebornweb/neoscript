<template>
  <div>
    <input type="radio" id="16" value="16" v-model="singleFast" />
    <label for="16">16 Hour fast</label>
    <br />
    <input type="radio" id="18" value="18" v-model="singleFast" />
    <label for="20">18 Hour fast</label>
    <br>
    <input type="radio" id="20" value="20" v-model="singleFast" />
    <label for="20">20 Hour fast</label>
    <br>
    <span> Chosen Fast: <b>{{ singleFast }}</b> </span>
    <br />
    <span>Time now: {{ output }}</span>

    <br />
    <span>Before Started Fast Complete At: {{ endFast }} </span>
    <br>
    <div id="example-2">

  <button v-on:click="startedFast">START</button>
</div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      output: "Hello Vue!",
      singleFast: "Choose Your Fast",
      capturedStartedFast: null,
      capturedEndFast: null,
      endFast: null,
    };
  },
  created() {
    setInterval(this.getNow, 1000);
    setInterval(this.getLater, 1000);
  },
  methods: {
    getNow: function () {
      const today = new Date();

      const options = { weekday: 'long', year: 'numeric', month: 'long',
       day: 'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit' };

    this.output = today.toLocaleDateString('en-NZ', options);

    },
    getLater: function () {
      const options = { weekday: 'long', year: 'numeric', month: 'long',
       day: 'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit' };

      if (this.singleFast == 16) {
      //  this.singleFast = this.singleFast + ' Hours';
        const today = new Date();
       today.setHours(today.getHours() + 16); // Need this to process not be a var

        this.endFast = today.toLocaleDateString('en-NZ', options);
      } else if (this.singleFast == 18) {
        const today = new Date();
        today.setHours(today.getHours() + 18); // Need this to process not be a var

        this.endFast = today.toLocaleDateString('en-NZ', options);

      } else if (this.singleFast == 20) {
        const today = new Date();
        today.setHours(today.getHours() + 20); // Need this to process not be a var

        this.endFast = today.toLocaleDateString('en-NZ', options);

      }
    },
    startedFast: function () {
      alert("This function should capture End fast date and time " + this.endFast);

    },

  },
};
</script>
