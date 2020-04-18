<template>
  <div>
    <div style='margin-top: 10px'>
      <span class="d-block p-2 bg-dark text-white"><div class="d-flex justify-content-around">Total Tax Calculated : {{finalTax}}</div></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['finalTaxAmt', 'zero_rize'],
    data: function(){
      return {
        message: "Hello World",
        taxamount: "0.00"
      }
    },
    methods: {
      negativetozero: function(){
        var tax = this.finalTaxAmt;
        if(tax > 0){
          tax = this.rounding(tax);
          this.taxamount = tax.toString();
        }
      },
      rounding: function(param){
        return Math.ceil(param * 20)/20;
      },
      finalTaxAmount: function(){
        if(this.zero_rize){
          this.taxamount = "0.00";
        } else {
          this.negativetozero();
        }
      }
    },
    computed: {
      finalTax: function(){
        //this.negativetozero();
        this.finalTaxAmount();
        return this.taxamount;
      }
    }
  }
</script>
