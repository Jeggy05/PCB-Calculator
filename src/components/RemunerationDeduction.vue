<template>
  <div>
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
            </div>
          </b-card>
        </b-collapse>
      </div>
    </div><!-- -->
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
      </div>
    </div><!-- -->
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
          </div>
        </b-card>
      </b-collapse>
    </div><!-- -->
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
          </div>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>
