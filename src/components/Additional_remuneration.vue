<template>
  <div class="container">
    <h6 style="margin-top: 10px"><b-button v-b-toggle="'collapse-3'" class="m-1">Additional Remuneration</b-button></h6>
    <b-collapse id="collapse-3">
      <b-card>
        <div>
          <table style="width: 100%">
            <tr>
              <td style="width: 10%">(a)</td>
              <td style="width: 70%">Bonus</td>
              <td style="width: 20%"><input type="text" v-model="bonus" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(b)</td>
              <td>Arrears</td>
              <td><input type="text" v-model="arrears" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(c)</td>
              <td>Commissions (not paid monthly)</td>
              <td><input type="text" v-model="commission" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(d)</td>
              <td>Gratuity</td>
              <td><input type="text" v-model="gratuity" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(e)</td>
              <td>Compensation</td>
              <td><input type="text" v-model="compensation" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(f)</td>
              <td>Director's Fees (not paid monthly)</td>
              <td><input type="text" v-model="director_fees" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(g)</td>
              <td>Income Tax paid by employers on behalf of employees</td>
              <td><input type="text" v-model="income_tax_byemployers" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(h)</td>
              <td>Others</td>
              <td><input type="text" v-model="others" v-on:input="netAddWages"></td>
            </tr>
            <tr>
              <td>(i)</td>
              <td>Total additional remuneration (a) to (h)</td>
              <td>{{ totalAddWages }}</td>
            </tr>
            <tr>
              <td>(j)</td>
              <td>Additional Remuneration's EPF <i>[Not exceeding RM4000 per year]</i> (a) to (h)</td>
              <td><input type="text" v-model="addwages_epf" v-on:input="netAddWages"></td>
            </tr>
          </table>
          <div class="d-flex bd-highlight">
            <div class="p-2 flex-grow-1 bd-highlight">
              Total net Additional Remuneration [(i) - (j)]
            </div>
            <div class="p-2 bd-highlight">
              {{ totalAdditionalWages }}
            </div>
          </div>
          {{ makeItZero() }} <!-- I am calling the function in the dom so that it always get executed -->
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>



<script>
  export default {
    props: ['zero_rize'],
    data: function(){
      return {
        bonus: 0,
        arrears: 0,
        commission: 0,
        gratuity: 0,
        compensation: 0,
        director_fees: 0,
        income_tax_byemployers: 0,
        others: 0,
        addwages_epf: 0
      }
    },
    methods: {
      grossAddWages: function(){
        return this.checkNaN(this.bonus) + this.checkNaN(this.arrears) + this.checkNaN(this.commission)
        + this.checkNaN(this.gratuity) + this.checkNaN(this.compensation) + this.checkNaN(this.director_fees)
        + this.checkNaN(this.income_tax_byemployers) + this.checkNaN(this.others);
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
      netAddWages: function(){
        this.$emit('netAddWages', {
        addwages: this.totalAdditionalWages,
        addepf : this.addwages_epf,
        gross: this.totalAddWages
        });
      },
      makeItZero: function(){
        if(this.zero_rize){
          this.bonus = 0;
          this.arrears = 0;
          this.commission = 0;
          this.gratuity = 0;
          this.compensation = 0;
          this.director_fees = 0;
          this.income_tax_byemployers = 0;
          this.others = 0;
          this.addwages_epf = 0;
        }
        this.netAddWages();
      }
    },
    computed: {
      totalAddWages: function(){
        return this.grossAddWages();
      },
      totalAdditionalWages: function(){
        return this.totalAddWages - this.addwages_epf;
      }
    }
  }
</script>
