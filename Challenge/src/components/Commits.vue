<template>
  <div class="container-fluid">
    <h2>Latest Commits</h2>
    <div class="commitList">
  
      <ul>
        <template v-for="{ html_url, sha, author, commit } in commits" :key="html_url">
          <li>
            <a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a>
            by <i class="fa fa-fw fa-user"></i><span class="author"> <a :href="author.html_url" target="_blank">{{ commit.author.name }}</a></span>
            at <span class="font-weight-bold">{{ formatDate(commit.author.date) }}</span>
            <br>
            <span class='message'>
              {{ commit.message.split('\n')[0] }}
            </span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>



<script>

import moment from "moment";
export default {
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  props: {},
  data: function () {
    return {
      API_URL:
        "https://api.github.com/repos/vuejs/core/commits?per_page=10&sha=main",
      commits: null,
    };
  },
  computed: {},
  watch: {},
  beforeCreate: function () {},
  created: function () {
    this.fetchData();
  },
  beforeMount: function () {},
  mounted: function () {},
  beforeUpdate: function () {},
  updated: function () {},
  activated: function () {},
  deactivated: function () {},
  beforeDestroy: function () {},
  destroyed: function () {},
  methods: {
    fetchData: async function () {
      this.commits = await (await fetch(this.API_URL)).json();
    },
    truncate: function (text) {
      const newlineIdx = text.indexOf("\n");
      return newlineIdx > 0 ? text.slice(0, newlineIdx) : text;
    },
    formatDate: function (date) {
      return moment(date);
    },
  },
};
</script>
<style lang="scss" scoped>
.container-fluid {
  background-color: black;
}

.commitList {
  z-index: 1;
  background-color: white;
  border-radius: 3px;
}

h2 {
  color: #259D3D;
}

ul {
  list-style-type: none;
  padding: 0px;
  margin-bottom: 10px;
}

li {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

.commit {
  font-weight: bold;
}

.author {
  font-weight: bold;
}

.commit,
.author {
  margin-bottom: 5px;
  font-weight: bold;
  color: #259D3D;
}
</style>