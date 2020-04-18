<template>
  <div class="container">
    <div>
      <h6><b-button v-b-toggle="'collapse-1'" class="m-1">Accumulated Remuneration for Current Year(from Previous Employer)</b-button></h6>
      <b-collapse id="collapse-1">
        <b-card>
          <div>
            <div>
              <p>Accumulated Remuneration/Benefits-In-Kind/Value of Living Accomodation(VOLA): <input type="text" v-model="pre_rem" v-on:input="send_previousRem"></p>
            </div>
            <div>
              <p>Accumulated EPF and Other Approved Funds <i>[not exceeding RM4000 per]: </i> <input type="text" v-model="pre_epf" v-on:input="send_previousRem"></p>
            </div>
            <div>
              <p>Net Accumulated Remuneration: {{ netAccumulatedRem() }}</p>
            </div>
            <div>
              <p>Accumulated MTD paid (including MTD on additional remuneration): <input type="text" v-model="pre_mtd" v-on:input="send_previousRem"></p>
            </div>
            <div>
              <p>Total accumulated zakat paid: <input type="text" v-model="pre_zakat" v-on:input="send_previousRem"></p>
            </div>
            <div>
              <div v-if="open">
                <p>Other accumulated deductions <button v-on:click="OpenDeduction()">Close</button></p>
              </div>
              <div v-else>
                <p>Other accumulated deductions <button v-on:click="OpenDeduction()">Open</button></p>
              </div>
              <table v-if="open">
                <tr>
                  <td style="width: 10%">1(a)</td>
                  <td style="width: 70%">Medical expenses for own parents, special needs, and parent care <i>[limited to RM5000 per year]</i></td>
                  <td style="width: 20%"><input type="text" v-model="d1a" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>1(b)</td>
                  <td>(i) Father Relief <i>[limited to RM1500 per year]</i> <br> (ii) Mother Relief <i>[limited to RM1500 per year]</i></td>
                  <td><input type="text" v-model="d1b" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Basic supporting equipment for disabled self, spouse, child or parent <i>[limited to RM6000 per year]</i></td>
                  <td><input type="text" v-model="d2" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Education Fees <i>[limited to RM7000 per year]</i></td>
                  <td><input type="text" v-model="d3" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Medical Expenses on serious diseases for self, spouse or child <i>[limited to RM6000 per year]</i></td>
                  <td><input type="text" v-model="d4" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Complete medical examination for self, spouse or child <i>[limited to RM500 per year]</i></td>
                  <td><input type="text" v-model="d5" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Total 4 + 5 <i>[limited to RM6000 per year]</i></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Net Deposit in Skim Simpanan Pendidikan Nasional (SSPN) <i>[limited to RM8000 per year]</i></td>
                  <td><input type="text" v-model="d6" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Payment of alimony to former wife <i>[limited to RM4000 per year]</i></td>
                  <td><input type="text" v-model="d7" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>8(a)</td>
                  <td>Life insurance premium for Retired Civil Servant <i>[limited to RM7000 per year]</i></td>
                  <td><input type="text" v-model="d8a" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>8(b)</td>
                  <td>Life insurance premium for Other than Retired Civil Servant <i>[limited to RM3000 per year]</i></td>
                  <td><input type="text" v-model="d8b" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Education and medical insurance premium <i>[limited to RM3000 per year]</i></td>
                  <td><input type="text" v-model="d9" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Deffered annuity premium or contribution to Private Retirement Scheme <i>[limited to RM3000 per year]</i></td>
                  <td><input type="text" v-model="d10" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Socso Contribution <i>[limited to RM250 per year]</i></td>
                  <td><input type="text" v-model="d11" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Purchase of readings, computer, smartphone, tablet, sport equipment, gymnasium membership and subscription of broadband internet <i>[limited to RM2500 per year]</i></td>
                  <td><input type="text" v-model="d12" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Purchase of Breastfeeding Equipment(deduction is allowed once every 2 years for women tax payer only) <i>[limited to RM1000 per year]</i></td>
                  <td><input type="text" v-model="d13" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Fees paid to Child Care Centre and Kindergartens <i>[limited to RM1000 per year]</i></td>
                  <td><input type="text" v-model="d14" v-on:input="send_previousDeduction"></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><input type="text" v-model="totalDeduction" disabled></td>
                </tr>
              </table>
            </div>
            {{ update }}
          </div>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>


<script>
import Current_remuneration from './Current_remuneration.vue'
import Tax from './Tax.vue'
import Validation from '../mixins/Validation.js'

  export default {
    props: ['parenttwo', 'totalDeductionValues'],
    mixins: [Validation],
    data: function(){
      return {
        open: false,
        pre_rem: 0,
        pre_epf: 0,
        pre_mtd: 0,
        pre_zakat: 0,
        d1a: 0,
        d1b: 0,
        d2: 0,
        d3: 0,
        d4: 0,
        d5: 0,
        d6: 0,
        d7: 0,
        d8a: 0,
        d8b: 0,
        d9: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        total_deduction: 0
      }
    },
    methods: {
      OpenDeduction: function(){
        if(!this.open){
          this.open = true;
        } else {
          this.open = false;
        }
      },
      netAccumulatedRem: function(){
        var check = Current_remuneration.methods;

        return check.checkNaN(this.pre_rem) - check.checkNaN(this.pre_epf);
      },
      totalDeduction1: function(){
        var check = Current_remuneration.methods;

        this.total_deduction = check.checkNaN(this.d1a) + check.checkNaN(this.d1b) + check.checkNaN(this.d2) + check.checkNaN(this.d3) + check.checkNaN(this.d4) + check.checkNaN(this.d5) + check.checkNaN(this.d6) + check.checkNaN(this.d7) + check.checkNaN(this.d8a)
        + check.checkNaN(this.d8b) + check.checkNaN(this.d9) + check.checkNaN(this.d10) + check.checkNaN(this.d11) + check.checkNaN(this.d12) + check.checkNaN(this.d13) + check.checkNaN(this.d14);
      },
      send_previousRem: function(){
        var check = Current_remuneration.methods;

        this.$emit('previousRem', {
          total: this.netAccumulatedRem(),
          salary: check.checkNaN(this.pre_rem),
          epf: check.checkNaN(this.pre_epf),
          tax: check.checkNaN(this.pre_mtd),
          zakat: check.checkNaN(this.pre_zakat)
        })
      },
      send_previousDeduction: function(){
        this.$emit('previousDeduct', {
          totaldeduction: this.totalDeduction,
          d1aDeduction: this.d1a,
          d1bDeduction: this.d1b,
          d2Deduction: this.d2,
          d3Deduction: this.d3,
          d4Deduction: this.d4,
          d5Deduction: this.d5,
          d6Deduction: this.d6,
          d7Deduction: this.d7,
          d8aDeduction: this.d8a,
          d8bDeduction: this.d8b,
          d9Deduction: this.d9,
          d10Deduction: this.d10,
          d11Deduction: this.d11,
          d12Deduction: this.d12,
          d13Deducction: this.d13,
          d14Deduction: this.d14
        })
      },
      checkDeductionType: function(){
        if(this.totalDeductionValues.d1a_flag){
          this.d1a = 0;
        }

        if(this.totalDeductionValues.d1b_flag){
          this.d1b = 0;
        }

        if(this.totalDeductionValues.d2_flag){
          this.d2 = 0;
        }

        if(this.totalDeductionValues.d3_flag){
          this.d3 = 0;
        }

        if(this.totalDeductionValues.d4_flag){
          this.d4 = 0;
        }

        if(this.totalDeductionValues.d5_flag){
          this.d5 = 0;
        }

        if(this.totalDeductionValues.d6_flag){
          this.d6 = 0;
        }

        if(this.totalDeductionValues.d7_flag){
          this.d7 = 0;
        }

        if(this.totalDeductionValues.d8a_flag){
          this.d8a = 0;
        }

        if(this.totalDeductionValues.d8b_flag){
          this.d8b = 0;
        }

        if(this.totalDeductionValues.d9_flag){
          this.d9 = 0;
        }

        if(this.totalDeductionValues.d10_flag){
          this.d10 = 0;
        }

        if(this.totalDeductionValues.d11_flag){
          this.d11 = 0;
        }

        if(this.totalDeductionValues.d12_flag){
          this.d12 = 0;
        }

        if(this.totalDeductionValues.d13_flag){
          this.d13 = 0;
        }

        if(this.totalDeductionValues.d14_flag){
          this.d14 = 0;
        }
      },
      recalculateDeduction: function(){
        this.checkDeductionType();
      },
      updateRemuneration: function(){
        var check = Current_remuneration.methods;
        // if there is the current remuneration when click next, the amount will be added to previous remuneration
        if(this.parenttwo.current_rem > 0){
          this.pre_rem = check.checkNaN(this.pre_rem) + check.checkNaN(this.parenttwo.current_rem);
          this.pre_epf = check.checkNaN(this.pre_epf) + check.checkNaN(this.parenttwo.epf);
          this.pre_mtd = check.checkNaN(this.pre_mtd) + Tax.methods.rounding(this.parenttwo.tax);
          this.d1a = check.checkNaN(this.d1a) + check.checkNaN(this.parenttwo.d1a);
          this.d1b = check.checkNaN(this.d1b) + check.checkNaN(this.parenttwo.d1b);
          this.d2 = check.checkNaN(this.d2) + check.checkNaN(this.parenttwo.d2);
          this.d3 = check.checkNaN(this.d3) + check.checkNaN(this.parenttwo.d3);
          this.d4 = check.checkNaN(this.d4) + check.checkNaN(this.parenttwo.d4);
          this.d5 = check.checkNaN(this.d5) + check.checkNaN(this.parenttwo.d5);
          this.d6 = check.checkNaN(this.d6) + check.checkNaN(this.parenttwo.d6);
          this.d7 = check.checkNaN(this.d7) + check.checkNaN(this.parenttwo.d7);
          this.d8a = check.checkNaN(this.d8a) + check.checkNaN(this.parenttwo.d8a);
          this.d8b = check.checkNaN(this.d8b) + check.checkNaN(this.parenttwo.d8b);
          this.d9 = check.checkNaN(this.d9) + check.checkNaN(this.parenttwo.d9);
          this.d10 = check.checkNaN(this.d10) + check.checkNaN(this.parenttwo.d10);
          this.d11 = check.checkNaN(this.d11) + check.checkNaN(this.parenttwo.d11);
          this.d12 = check.checkNaN(this.d12) + check.checkNaN(this.parenttwo.d12);
          this.d13 = check.checkNaN(this.d13) + check.checkNaN(this.parenttwo.d13);
          this.d14 = check.checkNaN(this.d14) + check.checkNaN(this.parenttwo.d14);
        }
        // once the amount has been added, set the current remuneration from parent two object to 0
        this.parenttwo.current_rem = 0;
        this.parenttwo.epf = 0;
        this.parenttwo.tax = 0;

        // send the event to parent vue js for new values
        this.send_previousRem();
        this.send_previousDeduction();
      }
    },
    computed: {
      totalDeduction: function(){
        this.recalculateDeduction()
        this.totalDeduction1();
        return this.total_deduction;
      },
      update: function(){
        return this.updateRemuneration();
      }
    }
  }
</script>
