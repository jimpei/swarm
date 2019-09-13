<template>
  <div class="scroll">
    <div v-for="(item, $index) in list" :key="$index" :data-num="$index + 1">
    <div class="card">
      <div class="card-header">
      </div>
      <div class="card-body">
        <a target="_blank" :href="item.url" v-text="item.title"></a>
      </div>
    </div>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';
const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';

export default {
  name: "scroll",
  components: {
    InfiniteLoading
  },
  data () {
    return {
      page: 1,
      list: [],
    }
  },
  methods: {
      infiniteHandler($state) {
      console.log('debug page:' + this.page)
      axios.get(api, {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        console.log(data);
        console.log('debug data.hits.length:'+ data.hits.length);
        if (data.hits.length) {
          this.page += 1;
          this.list.push(...data.hits);
          console.log('debug loaded.')
          $state.loaded();
        } else {
          console.log('debug complete.')
          $state.complete();
        }
      });
    },
    debug () {
      console.log('debug start');
      console.log(this.user.email);
      console.log(new Date(1568103213*1000));
      console.log('debug end');
    }
  }
};
</script>


