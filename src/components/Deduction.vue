<template>
  <div class="container">
    <h6><b-button v-b-toggle.collapse-2 class="m-1">Deduction</b-button></h6>
    <b-collapse id="collapse-2">
      <b-card>
        <div>
          <div>
            <table style="width: 100%">
              <tr>
                <td style="width: 10%">1(a)</td>
                <td style="width: 70%">Medical expenses for own parents, special needs, and parent care <i>[limited to RM5000 per year]</i></td>
                <td style="width: 20%"><input type="text" v-model="deduction_1a" v-bind:disabled="disabledDeductiona" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>1(b)</td>
                <td>(i) Father Relief <i>[limited to RM1500 per year]</i> <br> (ii) Mother Relief <i>[limited to RM1500 per year]</i></td>
                <td><input type="text" v-model="deduction_1b" v-bind:disabled="disabledDeductionb" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Basic supporting equipment for disabled self, spouse, child or parent <i>[limited to RM6000 per year]</i></td>
                <td><input type="text" v-model="deduction_2" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Education Fees <i>[limited to RM7000 per year]</i></td>
                <td><input type="text" v-model="deduction_3" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Medical Expenses on serious diseases for self, spouse or child <i>[limited to RM6000 per year]</i></td>
                <td><input type="text" v-model="deduction_4" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>5</td>
                <td>Complete medical examination for self, spouse or child <i>[limited to RM500 per year]</i></td>
                <td><input type="text" v-model="deduction_5" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td></td>
                <td>Total 4 + 5 <i>[limited to RM6000 per year]</i></td>
                <td>{{ deduction_4plus5 }}</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Net Deposit in Skim Simpanan Pendidikan Nasional (SSPN) <i>[limited to RM8000 per year]</i></td>
                <td><input type="text" v-model="deduction_6" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>7</td>
                <td>Payment of alimony to former wife <i>[limited to RM4000 per year]</i></td>
                <td><input type="text" v-model="deduction_7" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>8(a)</td>
                <td>Life insurance premium for Retired Civil Servant <i>[limited to RM7000 per year]</i></td>
                <td><input type="text" v-model="deduction_8a" v-bind:disabled="disabledDeduction8a" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>8(b)</td>
                <td>Life insurance premium for Other than Retired Civil Servant <i>[limited to RM3000 per year]</i></td>
                <td><input type="text" v-model="deduction_8b" v-bind:disabled="disabledDeduction8b" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>9</td>
                <td>Education and medical insurance premium <i>[limited to RM3000 per year]</i></td>
                <td><input type="text" v-model="deduction_9" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>10</td>
                <td>Deffered annuity premium or contribution to Private Retirement Scheme <i>[limited to RM3000 per year]</i></td>
                <td><input type="text" v-model="deduction_10" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>11</td>
                <td>Socso Contribution <i>[limited to RM250 per year]</i></td>
                <td><input type="text" v-model="deduction_11" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>12</td>
                <td>Purchase of readings, computer, smartphone, tablet, sport equipment, gymnasium membership and subscription of broadband internet <i>[limited to RM2500 per year]</i></td>
                <td><input type="text" v-model="deduction_12" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>13</td>
                <td>Purchase of Breastfeeding Equipment(deduction is allowed once every 2 years for women tax payer only) <i>[limited to RM1000 per year]</i></td>
                <td><input type="text" v-model="deduction_13" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td>14</td>
                <td>Fees paid to Child Care Centre and Kindergartens <i>[limited to RM1000 per year]</i></td>
                <td><input type="text" v-model="deduction_14" v-on:input="cur_Deductions"></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><input type="text" v-model="total_deduction" v-on:input="cur_Deductions" disabled></td>
              </tr>
            </table>
          </div>
          {{ makeItZero() }}
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import Current_remuneration from './Current_remuneration.vue'
import Validation from '../mixins/Validation.js'

  export default{
    props: ['totalDeductionValues2', 'zero_rize'],
    mixins: [Validation],
    data: function(){
      return{
        deduction_1a: 0,
        deduction_1b: 0,
        deduction_2: 0,
        deduction_3: 0,
        deduction_4: 0,
        deduction_5: 0,
        deduction_6: 0,
        deduction_7: 0,
        deduction_8a: 0,
        deduction_8b: 0,
        deduction_9: 0,
        deduction_10: 0,
        deduction_11: 0,
        deduction_12: 0,
        deduction_13: 0,
        deduction_14: 0
      }
    },
    methods: {
      conversionNanToZero: function(a){
        if(a == ""){
          a = 0;
          return a;
        } else {
          return parseFloat(a);
        }
      },
      deductions: function(){
        var check = Current_remuneration.methods;

        return check.checkNaN(this.deduction_1a) + check.checkNaN(this.deduction_1b) + check.checkNaN(this.deduction_2) + check.checkNaN(this.deduction_3)
        + this.deduction_4plus5 + check.checkNaN(this.deduction_6)
        + check.checkNaN(this.deduction_7) + check.checkNaN(this.deduction_8a) + check.checkNaN(this.deduction_8b)
        + check.checkNaN(this.deduction_9) + check.checkNaN(this.deduction_10) + check.checkNaN(this.deduction_11)
        + check.checkNaN(this.deduction_12) + check.checkNaN(this.deduction_13) + check.checkNaN(this.deduction_14);
      },
      validation: function(param1, param2){
        if(param1 > param2){
          return true;
        } else {
          return false;
        }
      },
      checkDeductionType: function(){
        if(this.totalDeductionValues2.d1a_flag){
          this.deduction_1a = 0;
          this.totalDeductionValues2.d1a_flag = false;
        }

        if(this.totalDeductionValues2.d1b_flag){
          this.deduction_1b = 0;
          this.totalDeductionValues2.d1b_flag = false;
        }

        if(this.totalDeductionValues2.d2_flag){
          this.deduction_2 = 0;
          this.totalDeductionValues2.d2_flag = false;
        }

        if(this.totalDeductionValues2.d3_flag){
          this.deduction_3 = 0;
          this.totalDeductionValues2.d3_flag = false;
        }

        if(this.totalDeductionValues2.d4_flag){
          this.deduction_4 = 0;
          this.totalDeductionValues2.d4_flag = false;
        }

        if(this.totalDeductionValues2.d5_flag){
          this.deduction_5 = 0;
          this.totalDeductionValues2.d5_flag = false;
        }

        if(this.totalDeductionValues2.d6_flag){
          this.deduction_6 = 0;
          this.totalDeductionValues2.d6_flag = false;
        }

        if(this.totalDeductionValues2.d7_flag){
          this.deduction_7 = 0;
          this.totalDeductionValues2.d7_flag = false;
        }

        if(this.totalDeductionValues2.d8a_flag){
          this.deduction_8a = 0;
          this.totalDeductionValues2.d8a_flag = false;
        }

        if(this.totalDeductionValues2.d8b_flag){
          this.deduction_8b = 0;
          this.totalDeductionValues2.d8b_flag = false;
        }

        if(this.totalDeductionValues2.d9_flag){
          this.deduction_9 = 0;
          this.totalDeductionValues2.d9_flag = false;
        }

        if(this.totalDeductionValues2.d10_flag){
          this.deduction_10 = 0;
          this.totalDeductionValues2.d10_flag = false;
        }

        if(this.totalDeductionValues2.d11_flag){
          this.deduction_11 = 0;
          this.totalDeductionValues2.d11_flag = false;
        }

        if(this.totalDeductionValues2.d12_flag){
          this.deduction_12 = 0;
          this.totalDeductionValues2.d12_flag = false;
        }

        if(this.totalDeductionValues2.d13_flag){
          this.deduction_13 = 0;
          this.totalDeductionValues2.d13_flag = false;
        }

        if(this.totalDeductionValues2.d14_flag){
          this.deduction_14 = 0;
          this.totalDeductionValues2.d14_flag = false;
        }
      },
      recalculateDeduction: function(){
        this.checkDeductionType();

      },
      cur_Deductions: function(){
        this.$emit('curDeductions', {
          total : this.total_deduction,
          d_1a: this.deduction_1a,
          d_1b: this.deduction_1b,
          d_2: this.deduction_2,
          d_3: this.deduction_3,
          d_4: this.deduction_4,
          d_5: this.deduction_5,
          d_6: this.deduction_6,
          d_7: this.deduction_7,
          d_8a: this.deduction_8a,
          d_8b: this.deduction_8b,
          d_9: this.deduction_9,
          d_10: this.deduction_10,
          d_11: this.deduction_11,
          d_12: this.deduction_12,
          d_13: this.deduction_13,
          d_14: this.deduction_14
        });
      },
      makeItZero: function(){
        if(this.zero_rize){
          this.deduction_1a = 0;
          this.deduction_1b = 0;
          this.deduction_2 = 0;
          this.deduction_3 = 0;
          this.deduction_4 = 0;
          this.deduction_5 = 0;
          this.deduction_6 = 0;
          this.deduction_7 = 0;
          this.deduction_8a = 0;
          this.deduction_8b = 0;
          this.deduction_9 = 0;
          this.deduction_10 = 0;
          this.deduction_11 = 0;
          this.deduction_12 = 0;
          this.deduction_13 = 0;
          this.deduction_14 = 0;
        }

        this.cur_Deductions();
      }
    },
    computed: {
      disabledDeductionb: function(){
        if(this.deduction_1a > 0 || this.deduction_1a < 0){
          return true;
        } else {
            return false;
        }
      },
      disabledDeductiona: function(){
        if(this.deduction_1b > 0 || this.deduction_1b < 0){
          return true;
        } else {
          return false;
        }
      },
      deduction_4plus5: function(){
        var deduction4 = this.conversionNanToZero(this.deduction_4);
        var deduction5 = this.conversionNanToZero(this.deduction_5);

        var total_4plus5 = deduction4 + deduction5;

        if(total_4plus5 > 6000){
          return total_4plus5 = 6000;
        } else {
          return total_4plus5;
        }
      },
      disabledDeduction8a: function(){
        if(this.deduction_8b > 0 || this.deduction_8b < 0){
          return true;
        } else {
            return false;
        }
      },
      disabledDeduction8b: function(){
        if(this.deduction_8a > 0 || this.deduction_8a < 0){
          return true;
        } else {
            return false;
        }
      },
      total_deduction: function(){
        this.recalculateDeduction();
        var total = this.deductions();
        return total;
      }
    }
  }
</script>
