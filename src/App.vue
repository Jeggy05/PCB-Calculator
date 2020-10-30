<template>
  <div id="app"><!--
    <div>
      <div class="w-80 p-3" style="background-color: #eee;">
        <b-img src="https://www.visiblethread.com/wp-content/uploads/Content-Tax-1.jpg" fluid alt="Responsive image" style="height: 300px; width:1500px"></b-img>
      </div>
    </div>
    <Calculator></Calculator>
    {{ test }}
  --></div>
</template>


<script>
import Calculation from './components/Calculation.vue'

export default {
  name: 'app',
  components: {

  },
  data: function(){
    return {

    }
  },
  methods: {
    nextMonth: function(){
      var a = Calculation.data().month;
      a = a + 1
      return a;
    }
  }
}
</script>
