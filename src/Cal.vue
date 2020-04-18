<template>
  <vue-router>
    <div id="cal">
      <Calculator></Calculator>
      <Calculation v-on:changeMonth="month" v-on:changeRelief="totalRelief" :parent="change"></Calculation>
      <Previous_remuneration v-on:previousRem="previous_Remuneration" v-on:previousDeduct="previous_Deduction" :parenttwo="currentToPrevious" :totalDeductionValues ="deductionZero"></Previous_remuneration>
      <Current_remuneration v-on:currentRem="current_Remuneration" :zero_rize="zero_rize"></Current_remuneration>
      <Deduction v-on:curDeductions="current_Deductions" :totalDeductionValues2 ="deductionZero" :zero_rize="zero_rize"></Deduction>
      <Additional_remuneration v-on:netAddWages="current_additionalWages" :zero_rize="zero_rize"></Additional_remuneration>
      <tax :finalTaxAmt="tax" :zero_rize="zero_rize"></tax>
      <div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary" style="margin:10px" v-on:click="refresh()">Refresh</button>
          <button class="btn btn-primary" style="margin:10px" v-on:click="totaltax2()" v-if="flag">Calculate</button><!-- {{ tax }} -->
          <button class="btn btn-primary" style="margin:10px" v-on:click="next()" v-if="last_month">Next</button>
        </div>
      </div>
      {{ hideNextBtn() }}
    </div>
  </vue-router>
</template>


<script>
import Calculator from './components/Calculator.vue'
import Calculation from './components/Calculation.vue'
import Current_remuneration from './components/Current_remuneration.vue'
import Deduction from './components/Deduction.vue'
import Additional_remuneration from './components/Additional_remuneration.vue'
import Tax from './components/Tax.vue'
import Previous_remuneration from './components/Previous_remuneration.vue'
import Validation from './mixins/Validation.js'

export default {
  name: 'cal',
  mixins: [Validation],
  components: {
    Calculator,
    Calculation,
    Current_remuneration,
    Deduction,
    Additional_remuneration,
    Tax,
    Previous_remuneration
  },
  data: function(){
    return {
      n : 1,
      relief: 9000,
      previousMonthRem: 0,
      currentMonthRem : 0,
      currentMonthDeductions: 0,
      currentMonthAddWages: 0,
      basicPay: 0,
      k0: 0,
      k1: 0,
      kt: 0,
      p: 0,
      category:"",
      tax: 0,
      pre_tax: 0,
      pre_zakat: 0,
      total_lastDeduction: 0,
      cur_zakat: 0,
      flag: true,
      change: 1,
      currentToPrevious: {
        current_rem: 0,
        epf: 0,
        zakat: 0,
        tax: 0,
        addwages: 0,
        d1a: 0,
        d1b: 0,
        d2: 0,
        d3: 0,
        d4: 0,
        d5: 0,
        d6: 0,
        d7: 0,
        d8: 0,
        d9: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0
      },
      zero_rize: false,
      currentBik: 0,
      currentVola: 0,
      grossAddWages: 0,
      previousdeductionValues: {
        prev_d1a : 0,
        prev_d1b : 0,
        prev_d2 : 0,
        prev_d3 : 0,
        prev_d4 : 0,
        prev_d5 : 0,
        prev_d6 : 0,
        prev_d7 : 0,
        prev_d8a : 0,
        prev_d8b : 0,
        prev_d9 : 0,
        prev_d10 : 0,
        prev_d11 : 0,
        prev_d12 : 0,
        prev_d13 : 0,
        prev_d14 : 0
      },
      currentDeductionValues: {
        cur_d1a: 0,
        cur_d1b: 0,
        cur_d2: 0,
        cur_d3: 0,
        cur_d4: 0,
        cur_d5: 0,
        cur_d6: 0,
        cur_d7: 0,
        cur_d8a: 0,
        cur_d8b: 0,
        cur_d9: 0,
        cur_d10: 0,
        cur_d11: 0,
        cur_d12: 0,
        cur_d13: 0,
        cur_d14: 0
      },
      totalDeductionValues: {
        d1a: 0,
        d1b: 0,
        d2 : 0,
        d3 : 0,
        d4 : 0,
        d5 : 0,
        d6 : 0,
        d7 : 0,
        d8a: 0,
        d8b: 0,
        d9 : 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0
      },
      deductionZero: {
        d1a_flag: false,
        d1b_flag: false,
        d2_flag: false,
        d3_flag: false,
        d4_flag: false,
        d5_flag: false,
        d6_flag: false,
        d7_flag: false,
        d8a_flag: false,
        d8b_flag: false,
        d9_flag: false,
        d10_flag: false,
        d11_flag: false,
        d12_flag: false,
        d13_flag: false,
        d14_flag: false
      },
      last_month: true
    }
  },
  methods:{
    month: function(value){
      this.n = value;
      this.change = this.n;
    },
    totalRelief: function(value){
      this.relief = value.total;
      this.category = value.sts;
    },
    previous_Remuneration: function(value){
      this.previousMonthRem = value.total;
      this.k0 = value.epf;
      this.pre_tax = value.tax;
      this.pre_zakat = value.zakat
    },
    previous_Deduction: function(value){
      this.total_lastDeduction = value.totaldeduction;
      this.previousdeductionValues.prev_d1a = value.d1aDeduction;
      this.previousdeductionValues.prev_d1b = value.d1bDeduction;
      this.previousdeductionValues.prev_d2 = value.d2Deduction;
      this.previousdeductionValues.prev_d3 = value.d3Deduction;
      this.previousdeductionValues.prev_d4 = value.d4Deduction;
      this.previousdeductionValues.prev_d5 = value.d5Deduction;
      this.previousdeductionValues.prev_d6 = value.d6Deduction;
      this.previousdeductionValues.prev_d7 = value.d7Deduction;
      this.previousdeductionValues.prev_d8a = value.d8aDeduction;
      this.previousdeductionValues.prev_d8b = value.d8bDeduction;
      this.previousdeductionValues.prev_d9 = value.d9Deduction;
      this.previousdeductionValues.prev_d10 = value.d10Deduction;
      this.previousdeductionValues.prev_d11 = value.d11Deduction;
      this.previousdeductionValues.prev_d12 = value.d12Deduction;
      this.previousdeductionValues.prev_d13 = value.d13Deduction;
      this.previousdeductionValues.prev_d14 = value.d14Deduction;
      //
      this.add_prev_cur_deductions();
    },
    current_Remuneration: function(value){
      this.currentMonthRem = value.total;
      this.basicPay = value.basicpay;
      this.k1 = value.epf;
      this.cur_zakat = value.zakat;
      this.currentBik = value.bik;
      this.currentVola = value.vola;
      this.zero_rize = false;
    },
    current_Deductions: function(value){
      this.currentMonthDeductions = value.total;
      this.currentDeductionValues.cur_d1a = value.d_1a ;
      this.currentDeductionValues.cur_d1b = value.d_1b ;
      this.currentDeductionValues.cur_d2 = value.d_2;
      this.currentDeductionValues.cur_d3 = value.d_3 ;
      this.currentDeductionValues.cur_d4 = value.d_4 ;
      this.currentDeductionValues.cur_d5 = value.d_5 ;
      this.currentDeductionValues.cur_d6 = value.d_6 ;
      this.currentDeductionValues.cur_d7 = value.d_7 ;
      this.currentDeductionValues.cur_d8a = value.d_8a ;
      this.currentDeductionValues.cur_d8b = value.d_8b ;
      this.currentDeductionValues.cur_d9 = value.d_9 ;
      this.currentDeductionValues.cur_d10 = value.d_10 ;
      this.currentDeductionValues.cur_d11 = value.d_11 ;
      this.currentDeductionValues.cur_d12 = value.d_12 ;
      this.currentDeductionValues.cur_d13 = value.d_13 ;
      this.currentDeductionValues.cur_d14 = value.d_14 ;

      this.add_prev_cur_deductions();
    },
    current_additionalWages: function(value){
      this.currentMonthAddWages = value.addwages;
      this.kt = value.addepf;
      this.grossAddWages = value.gross;
    },
    p_value: function(){
      var check = Current_remuneration.methods;
      var n = 12 - this.n
      var k2 = this.normalk2_value();
      var next = this.currentMonthRem + check.checkNaN(this.k1);
      var p = (this.previousMonthRem + this.currentMonthRem + ((next - k2) * n)) - ( this.total_lastDeduction + this.currentMonthDeductions + this.relief);
      return p;
    },
    normalk2_value: function(){
      var check = Current_remuneration.methods;
      var n = 12 - this.n
      var k2 = (4000 - (check.checkNaN(this.k1) + check.checkNaN(this.k0))) / n

      if(k2 > this.k1){
        return this.k1;
      } else {
        return k2;
      }
    },
    k2_value: function(){
      var check = Current_remuneration.methods;
      var n = 12 - this.n
      var k2 = (4000 - (check.checkNaN(this.k0) + check.checkNaN(this.k1) + check.checkNaN(this.kt))) / n

        if(k2 > this.k1){
          return this.k1;
        } else {
          return k2;
        }
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
    pmr_value: function(param){

      var p = param;
      var obj = {};
      switch(true){
        case (p > 5000) && (p < 20000.01) :
          obj = {
            m: 5000,
            r: 0.01,
            b1: (-400),
            b2: (-800)
          }
        break;
        case (p > 20000) && (p < 35000.01) :
          obj = {
            m: 20000,
            r: 0.03,
            b1: (-250),
            b2: (-650)
          }
        break;
        case (p > 35000) && (p < 50000.01) :
          obj = {
            m: 35000,
            r: 0.08,
            b1: 600,
            b2: 600
          }
        break;
        case (p > 50000) && (p < 70000.01) :
          obj = {
            m: 50000,
            r: 0.14,
            b1: 1800,
            b2: 1800
          }
        break;
        case (p > 70000) && (p < 100000.01) :
          obj = {
            m: 70000,
            r: 0.21,
            b1: 4600,
            b2: 4600
          }
        break;
        case (p > 100000) && (p < 250000.01) :
          obj = {
            m: 100000,
            r: 0.24,
            b1: 10900,
            b2: 10900
          }
        break;
        case (p > 250000) && (p < 400000.01) :
          obj = {
            m: 250000,
            r: 0.245,
            b1: 46900,
            b2: 46900
          }
        break;
        case (p > 400000) && (p < 600000.01) :
          obj = {
            m: 400000,
            r: 0.25,
            b1: 83650,
            b2: 83650
          }
        break;
        case (p > 600000) && (p < 1000000.01) :
          obj = {
            m: 600000,
            r: 0.26,
            b1: 133650,
            b2: 133650
          }
        break;
        case (p > 1000000):
          obj = {
            m: 1000000,
            r: 0.28,
            b1: 237650,
            b2: 237650
          }
        break;
      }
      return obj;
    },
    calculateNormalTax: function(){
      var tax = 0;
      var p = this.p_value();
      var obj = this.pmr_value(p);
      var m = obj.m;
      var r = obj.r;
      var n = 13- this.n;
      var b = 0;
      var z = this.pre_zakat;
      var x = this.pre_tax

      if (this.category == "1"){
        b = obj.b2;
      } else {
        b = obj.b1;
      }

      tax = ((((p - m) * r) + b) - (z + x)) / n;
      if(tax < 10.01){
        tax = 0.00
      }
      return tax;

    },
    totalTaxForWholeYear: function(){
      var check = Current_remuneration.methods;
      var n = 12 - this.n
      var k2 = this.k2_value();
      var next = this.currentMonthRem + check.checkNaN(this.k1);
      var p = (this.previousMonthRem + this.currentMonthRem + ((next - k2) * n) + (this.currentMonthAddWages)) - ( this.total_lastDeduction + this.currentMonthDeductions + this.relief)

      var obj = this.pmr_value(p);

      var m = obj.m;
      var r = obj.r;
      var b = 0;
      var z = this.pre_zakat;
      var x = this.pre_tax

      if (this.category == "1"){
        b = obj.b1;
      } else {
        b = obj.b2;
      }

      var tax = (((p - m) * r) + b) - (z + x) ;

      return tax ;
    },
    calculateAddWagesTax: function(){
      var n = 13 - this.n
      var totalNormalTax = this.calculateNormalTax() * n;
      var totaltax = this.totalTaxForWholeYear();
      var addWagesTax = totaltax - totalNormalTax;

      return addWagesTax;
    },
    totaltax2: function(){
      this.flag = false;
      var check = Current_remuneration.methods;
      var tax =  check.checkNaN(this.calculateNormalTax()) + check.checkNaN(this.calculateAddWagesTax());
      tax = tax - this.cur_zakat;
      this.tax = tax;
    },
    refresh: function(){
      return window.location.reload();
    },
    add_prev_cur_deductions: function(){
      //var check = Current_remuneration.methods;

      //this.totalDeductionValues.d1a = check.checkNaN(this.previousdeductionValues.prev_d1a) + check.checkNaN(this.currentDeductionValues.cur_d1a);
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d1a, this.currentDeductionValues.cur_d1a, 5000, "Deduction 1a");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d1b, this.currentDeductionValues.cur_d1b, 3000, "Deduction 1b");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d2, this.currentDeductionValues.cur_d2, 6000, "Deduction 2");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d3, this.currentDeductionValues.cur_d3, 7000, "Deduction 3");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d4, this.currentDeductionValues.cur_d4, 6000, "Deduction 4");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d5, this.currentDeductionValues.cur_d5, 500, "Deduction 5");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d6, this.currentDeductionValues.cur_d6, 8000, "Deduction 6") ;
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d7, this.currentDeductionValues.cur_d7, 4000, "Deduction 7");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d8a, this.currentDeductionValues.cur_d8a, 7000, "Deduction 8a");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d8b, this.currentDeductionValues.cur_d8b, 3000, "Deduction 8b");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d9, this.currentDeductionValues.cur_d9, 3000, "Deduction 9");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d10, this.currentDeductionValues.cur_d10, 3000, "Deduction 10");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d11, this.currentDeductionValues.cur_d11, 250, "Deduction 11");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d12, this.currentDeductionValues.cur_d12, 2500, "Deduction 12");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d13, this.currentDeductionValues.cur_d13, 1000, "Deduction 13");
      this.checkDeductionExceeds(this.previousdeductionValues.prev_d14, this.currentDeductionValues.cur_d14, 1000, "Deduction 14");
    },
    next: function(){
      var check = Current_remuneration.methods;
      // show next month
      this.change += 1;
      this.n = this.change;
      // add current remuneration to previous remuneration
      this.currentToPrevious.current_rem = check.checkNaN(this.basicPay) + check.checkNaN(this.currentBik) + check.checkNaN(this.currentVola) + check.checkNaN(this.grossAddWages);
      this.currentToPrevious.epf = check.checkNaN(this.k1) + check.checkNaN(this.kt);
      this.currentToPrevious.tax = check.checkNaN(this.tax);
      this.currentToPrevious.d1a = check.checkNaN(this.currentDeductionValues.cur_d1a);
      this.currentToPrevious.d1b = check.checkNaN(this.currentDeductionValues.cur_d1b);
      this.currentToPrevious.d2 = check.checkNaN(this.currentDeductionValues.cur_d2);
      this.currentToPrevious.d3 = check.checkNaN(this.currentDeductionValues.cur_d3);
      this.currentToPrevious.d4 = check.checkNaN(this.currentDeductionValues.cur_d4);
      this.currentToPrevious.d5 = check.checkNaN(this.currentDeductionValues.cur_d5);
      this.currentToPrevious.d6 = check.checkNaN(this.currentDeductionValues.cur_d6);
      this.currentToPrevious.d7 = check.checkNaN(this.currentDeductionValues.cur_d7);
      this.currentToPrevious.d8a = check.checkNaN(this.currentDeductionValues.cur_d8a);
      this.currentToPrevious.d8b = check.checkNaN(this.currentDeductionValues.cur_d8b);
      this.currentToPrevious.d9 = check.checkNaN(this.currentDeductionValues.cur_d9);
      this.currentToPrevious.d10 = check.checkNaN(this.currentDeductionValues.cur_d10);
      this.currentToPrevious.d11 = check.checkNaN(this.currentDeductionValues.cur_d11);
      this.currentToPrevious.d12 = check.checkNaN(this.currentDeductionValues.cur_d12);
      this.currentToPrevious.d13 = check.checkNaN(this.currentDeductionValues.cur_d13);
      this.currentToPrevious.d14 = check.checkNaN(this.currentDeductionValues.cur_d14);

      // zero rise the current remuneration
      this.zero_rize = true;

      //zero rise the value of current deduction
      this.currentDeductionValues.cur_d1a = 0;
      this.currentDeductionValues.cur_d1b = 0;
      this.currentDeductionValues.cur_d2 = 0;
      this.currentDeductionValues.cur_d3 = 0;
      this.currentDeductionValues.cur_d4 = 0;
      this.currentDeductionValues.cur_d5 = 0;
      this.currentDeductionValues.cur_d6 = 0;
      this.currentDeductionValues.cur_d7 = 0;
      this.currentDeductionValues.cur_d8a = 0;
      this.currentDeductionValues.cur_d8b = 0;
      this.currentDeductionValues.cur_d9 = 0;
      this.currentDeductionValues.cur_d10 = 0;
      this.currentDeductionValues.cur_d11 = 0;
      this.currentDeductionValues.cur_d12 = 0;
      this.currentDeductionValues.cur_d13 = 0;
      this.currentDeductionValues.cur_d14 = 0;

      // show the calculate button
      this.flag = true;

      this.tax = 0;

    },
    hideNextBtn: function(){
      if(this.n == 12 || this.flag == true){
        this.last_month = false;
      } else {
        this.last_month = true;
      }
    },
    checkDeductionExceeds: function(param1, param2, param3, param4){
      var check = Current_remuneration.methods;

      var previousDeductionValue = param1;
      var currentDeductionValue = param2;
      var originalValue = check.checkNaN(previousDeductionValue) + check.checkNaN(currentDeductionValue);
      var maxValue = param3;
      var deductionType = param4;
      var flag = this.validate(originalValue, maxValue);
      var message = "The value for " + deductionType +" has exceeded the limit. The amount will be capped to "+ maxValue;

      switch(deductionType){
        case "Deduction 1a":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d1a = 0;
            this.currentDeductionValues.cur_d1a = 0;
            this.deductionZero.d1a_flag = true;
          }
          break;

        case "Deduction 1b":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d1b = 0;
            this.currentDeductionValues.cur_d1b = 0;
            this.deductionZero.d1b_flag = true;
          }
          break;

        case "Deduction 2":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d2 = 0;
            this.currentDeductionValues.cur_d2 = 0;
            this.deductionZero.d2_flag = true;
          }
          break;

        case "Deduction 3":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d3 = 0;
            this.currentDeductionValues.cur_d3 = 0;
            this.deductionZero.d3_flag = true;
          }
          break;

        case "Deduction 4":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d4 = 0;
            this.currentDeductionValues.cur_d4 = 0;
            this.deductionZero.d4_flag = true;
          }
          break;

        case "Deduction 5":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d5 = 0;
            this.currentDeductionValues.cur_d5 = 0;
            this.deductionZero.d5_flag = true;
          }
          break;

        case "Deduction 6":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d6 = 0;
            this.currentDeductionValues.cur_d6 = 0;
            this.deductionZero.d6_flag = true;
          }
          break;

        case "Deduction 7":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d7 = 0;
            this.currentDeductionValues.cur_d7 = 0;
            this.deductionZero.d7_flag = true;
          }
          break;

        case "Deduction 8a":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d8a = 0;
            this.currentDeductionValues.cur_d8a = 0;
            this.deductionZero.d8a_flag = true;
          }
          break;

        case "Deduction 8b":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d8b = 0;
            this.currentDeductionValues.cur_d8b = 0;
            this.deductionZero.d8b_flag = true;
          }
          break;

        case "Deduction 9":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d9 = 0;
            this.currentDeductionValues.cur_d9 = 0;
            this.deductionZero.d9_flag = true;
          }
          break;

        case "Deduction 10":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d10 = 0;
            this.currentDeductionValues.cur_d10 = 0;
            this.deductionZero.d10_flag = true;
          }
          break;

        case "Deduction 11":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d11 = 0;
            this.currentDeductionValues.cur_d11 = 0;
            this.deductionZero.d11_flag = true;
          }
          break;

        case "Deduction 12":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d12 = 0;
            this.currentDeductionValues.cur_d12 = 0;
            this.deductionZero.d12_flag = true;
          }
          break;

        case "Deduction 13":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d13 = 0;
            this.currentDeductionValues.cur_d13 = 0;
            this.deductionZero.d13_flag = true;
          }
          break;

        case "Deduction 14":
          if(flag){
            alert(message)
            originalValue = 0;
            this.previousdeductionValues.prev_d14 = 0;
            this.currentDeductionValues.cur_d14 = 0;
            this.deductionZero.d14_flag = true;
          }
          break;
      }
    },
    setFlagToFalse: function(){
      this.deductionZero.d1a_flag = false;
      this.deductionZero.d1b_flag = false;
      this.deductionZero.d3_flag = false;
      this.deductionZero.d4_flag = false;
      this.deductionZero.d5_flag = false;
      this.deductionZero.d6_flag = false;
      this.deductionZero.d7_flag = false;
      this.deductionZero.d8a_flag = false;
      this.deductionZero.d8b_flag = false;
      this.deductionZero.d9_flag = false;
      this.deductionZero.d10_flag = false;
      this.deductionZero.d11_flag = false;
      this.deductionZero.d12_flag = false;
      this.deductionZero.d13_flag = false;
      this.deductionZero.d14_flag = false;
    }
  },
  computed: {
    testing: function(){
      return this.pmr_value();
    }
  }
}
</script>

<style>
/*
@import url('//fonts.googleapis.com/css?family=Pacifico&text=Pure');
@import url('//fonts.googleapis.com/css?family=Roboto:700&text=css');
@import url('//fonts.googleapis.com/css?family=Kaushan+Script&text=!');

body {
  min-height: 450px;
  height: 100vh;
  margin: 0;
  background: radial-gradient(circle, darken(dodgerblue, 10%), #1f4f96, #1b2949, #000);
}

.stage {
  height: 300px;
  width: 500px;
  margin: auto;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  perspective: 9999px;
  transform-style: preserve-3d;
  background: radial-gradient(circle, darken(dodgerblue, 10%), #1f4f96, #1b2949, #000);
}

 */


#cal {
	background-color: #E3DDE6;
	padding: 15px 30px;
}
</style>
