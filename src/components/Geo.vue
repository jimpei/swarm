<template>
  <div class="geo">
    <div class="p-3 mb-2 bg-light text-dark">
      <div class="v-margin25"></div>
      <div class="container">
        <button class="btn btn-warning" @click="getLocation">Geo</button>
        {{latitude}}、{{longitude}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "chat",
  components: {
  },
  data () {
    return {
      latitude: 0,
      longitude: 0
    }
  },
  filters: {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    debug () {
      console.log('debug start');
      console.log('debug end');
    },
    getLocation () {
      console.log('debug start');
      if (!navigator.geolocation) {
        alert('現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。')
        return
      } else {
        console.log('debug nav');
      }

      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }

      navigator.geolocation.getCurrentPosition(this.success, this.error, options)
    },
    success (position) {
      console.log('debug success');
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      // coords.latitude	　緯度
      // coords.longitude　経度
      // coords.altitude	　高度
      // coords.accuracy	　取得した緯度、経度の精度
      // coords.altitudeAccuracy	取得した高度の精度
      // coords.heading	方角（0が北、90が東、180が南、270が西）
      // coords.speed　　速度（位置情報を追跡する場合に使用）
    },
    error (error) {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert('位置情報の利用が許可されていません')
          break
        case 2: //POSITION_UNAVAILABLE
          alert('現在位置が取得できませんでした')
          break
        case 3: //TIMEOUT
          alert('タイムアウトになりました')
          break
        default:
          alert('現在位置が取得できませんでした')
          break
      }
    }
  }
};
</script>


