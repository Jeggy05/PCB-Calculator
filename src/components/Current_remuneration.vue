<template>
  <div class="container">
    <div style="margin-top: 10px">
      <h6><b-button disabled class="m-1">Current Month Remuneration</b-button></h6>
      <div style="margin-left: 10px">
        <div>
          <p>Current Month Remuneration: <input type="text" v-model="cur_rem" v-on:input="send_currentRem"></p>
        </div>
        <div>
          <p>Current Month EPF & Other Approved Funds<i>[not exceeding RM4000 per year]</i>: <input type="text" v-model="cur_epf"  v-on:input="send_currentRem"></p>
        </div>
        <div>
          <p>Total net current Month Remuneration: {{ show_currentMonthNet }}</p>
        </div>
        <div>
          <p><strong>Benefits In Kind</strong>: <input type="text" v-model="cur_bik" v-on:input="send_currentRem"></p>
        </div>
        <div>
          <p><strong>Value of Living Accomodation (VOLA)</strong>: <input type="text" v-model="cur_vola" v-on:input="send_currentRem"></p>
        </div>
        <div>
          <p>Zakat or Fitrah: <input type="text" v-model="cur_zkt" v-on:input="send_currentRem"></p>
        </div>
      </div>
      {{ callMakeItZero }}
    </div>
  </div>
</template>



<script>
export default{
  props: ['zero_rize'],
  data: function() {
    return {
      cur_rem: 0,
      cur_epf: 0,
      cur_net: 0,
      cur_bik: 0,
      cur_vola: 0,
      cur_zkt: 0,
      total: 0
    }
  },
  methods:{
    num: function(val){
      if(!(isNaN(val))){
        return true;
      }else{
        return false;
      }
    },
    calculate_net: function(){
      if(this.num(this.cur_rem) && this.num(this.cur_epf)){
        this.cur_net = this.cur_rem - this.cur_epf;
      } else {
        this.cur_net = 0;
      }
    },
    currentMonthFigure: function(){
      this.total = (this.checkNaN(this.cur_rem) + this.checkNaN(this.cur_bik) + this.checkNaN(this.cur_vola)) - this.checkNaN(this.cur_epf);
    },
    send_currentRem: function(){
      this.currentMonthFigure();
      this.$emit('currentRem', {
        total : this.total,
        basicpay: this.cur_rem,
        epf: this.cur_epf,
        zakat: this.cur_zkt,
        bik: this.cur_bik,
        vola: this.cur_vola
      });
    },
    checkNaN: function(param){
      var val = parseFloat(param);
      if(Number.isNaN(val)){
        val = 0;
        return val;
      } else {
        return val;
      }
    },
    makeItZero: function(){
      if(this.zero_rize){
        this.cur_rem = 0;
        this.cur_bik = 0;
        this.cur_vola = 0;
        this.cur_epf = 0;
        //this.zero_rize = false;
      }
    }
  },
  computed: {
    show_currentMonthNet: function(){
      this.calculate_net();
      return this.cur_net;
    },
    callMakeItZero: function(){
      return this.makeItZero();
    }
  }
}
</script>
