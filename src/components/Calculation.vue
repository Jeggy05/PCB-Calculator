<template>
    <div class="container">
      <div>
        <p>Month:
        <select v-model="month" v-on:click="changeMonth">
          <option v-for ="mon in listOfMonths" v-bind:key="mon.time" v-bind:value="mon.n">{{ mon.month }}</option>
        </select></p>
      </div>
      <div>
        Status:
        <select v-model="status">
          <option>Resident</option>
        </select>
      </div>
      <br />
      <div v-on:change="changeRelief" class="metod">
        <label class="lbl">Maritial Status:</label>
        <input type="radio" id="single" value="0" v-model="m_status" name="metod">
        <label for="single" class="radio">Single</label>
        <input type="radio" id="mwnw" value="1" v-model="m_status" name="metod">
        <label for="mwnw" class="radio">Married Wife Not Working</label>
        <input type="radio" id="mww" value="2" v-model="m_status" name="metod">
        <label for="mww" class="radio">Married Wife Working</label>
      </div>
      <div id="reliefs">
        <table v-on:change="changeRelief">
          <tr>
            <input type="checkbox" id="dis_ind" v-model="disabledInd" name="test">
            <label for="dis_ind">Disabled Individual</label><br>
          </tr>
          <tr>
            <input type="checkbox" id="dis_spo" v-model="disabledSpo" v-bind:disabled="spouse()" name="test">
            <label for="dis_spo">Disabled Spouse</label>
          </tr>
        </table>
      </div>
      <div>
        <table v-on:change="changeRelief">
          <tr style="width: 20%">
            <th style="width: 1%"></th>
            <th style="width: 10%">Chidren Types</th>
            <th style="width: 5%">Number of children</th>
            <th style="width: 4%">50%?</th>
          </tr>
          <tr style="width: 20%">
            <td style="width: 1%">1</td>
            <td style="width: 10%">Under the age of 18 years</td>
            <td style="width: 5%"><input type="number" v-model="childcatone" v-bind:disabled="spouse()"></td>
            <td style="width: 4%"><input type="checkbox" v-model="childcatonecheck" v-bind:disabled="spouse()"></td>
          </tr>
          <tr style="width: 20%">
            <td style="width: 1%">2</td>
            <td style="width: 10%">18 years & above studying(included Certificate/Marticulation)</td>
            <td style="width: 5%"><input type="number" v-model="childcattwo" v-bind:disabled="spouse()"></td>
            <td style="width: 4%"><input type="checkbox" v-model="childcattwocheck" v-bind:disabled="spouse()"></td>
          </tr>
          <tr style="width: 20%">
            <td style="width: 1%">3</td>
            <td style="width: 10%">Above 18 years & studying fulltime in diploma/degree level onwards</td>
            <td style="width: 5%"><input type="number" v-model="childcatthree" v-bind:disabled="spouse()"></td>
            <td style="width: 4%"><input type="checkbox" v-model="childcatthreecheck" v-bind:disabled="spouse()"></td>
          </tr>
          <tr style="width: 20%">
            <td style="width: 1%">4</td>
            <td style="width: 10%">Disabled Child</td>
            <td style="width: 5%"><input type="number" v-model="childcatfour" v-bind:disabled="spouse()"></td>
            <td style="width: 4%"><input type="checkbox" v-model="childcatfourcheck" v-bind:disabled="spouse()"></td>
          </tr>
          <tr style="width: 20%">
            <td style="width: 1%">5</td>
            <td style="width: 10%">Disabled Child studying diploma/higher level/degree or its equivalent</td>
            <td style="width: 5%"><input type="number" v-model="childcatfive" v-bind:disabled="spouse()"></td>
            <td style="width: 4%"><input type="checkbox" v-model="childcatfivecheck" v-bind:disabled="spouse()"></td>
          </tr>
        </table>
      </div>
      <div class="row justify-content-end">
        <p>Total Child relief : {{ totalchildrelief }}</p>
      </div>
      {{ update }}
    </div>
</template>


<script>

export default{
  name: 'Calculation',
  props: ['parent'],
  data: function() {
    return {
      month: 1,
      status: "Resident",
      m_status: "0",

      disabledInd: false,
      disabledSpo: false,

      childcatone: 0,
      childcatonecheck: false,

      childcattwo: 0,
      childcattwocheck: false,

      childcatthree: 0,
      childcatthreecheck: false,

      childcatfour: 0,
      childcatfourcheck: false,

      childcatfive: 0,
      childcatfivecheck: false,

      listOfMonths: [
      { month: 'Jan', n: 1},
      { month: 'Feb', n: 2},
      { month: 'Mac', n: 3},
      { month: 'Apr', n: 4},
      { month: 'May', n: 5},
      { month: 'Jun', n: 6},
      { month: 'Jul', n: 7},
      { month: 'Aug', n: 8},
      { month: 'Sep', n: 9},
      { month: 'Oct', n: 10},
      { month: 'Nov', n: 11},
      { month: 'Dec', n: 12}
    ]
   }
  },
  methods: {
    spouse: function(){
      if(this.m_status == 0){
        this.disabledSpo = false;

        this.childcatone = 0;
        this.childcatonecheck = false;

        this.childcattwo = 0;
        this.childcattwocheck = false;

        this.childcatthree = 0;
        this.childcatthreecheck = false;

        this.childcatfour = 0;
        this.childcatfourcheck = false;

        this.childcatfive = 0;
        this.childcatfivecheck = false;

        return true;
      } else {
        return false;
      }
    },
    catonerelief: function(){
      if(this.childcatonecheck){
        return (1000 * this.childcatone);
      } else {
        return (2000 * this.childcatone);
      }
    },
    cattworelief: function(){
      if(this.childcattwocheck){
        return (1000 * this.childcattwo);
      } else {
        return (2000 * this.childcattwo);
      }
    },
    catthreerelief: function(){
      if(this.childcatthreecheck){
        return (4000 * this.childcatthree);
      } else {
        return (8000 * this.childcatthree);
      }
    },
    catfourrelief: function(){
      if(this.childcatfourcheck){
        return (3000 * this.childcatfour);
      } else {
        return (6000 * this.childcatfour);
      }
    },
    catfiverelief: function() {
      if(this.childcatfivecheck){
        return (7000 * this.childcatfive);
      } else {
        return (14000 * this.childcatfive);
      }
    },
    changeMonth: function(){
      this.$emit('changeMonth', this.month);
    },
    checkIndRelief : function(){
      if(this.m_status == 0 || this.m_status == 2){
        return 9000;
      } else {
        return 13000;
      }
    },
    checkDisIndRelief: function(){
      if(this.disabledInd == true){
        return 6000;
      } else {
        return 0;
      }
    },
    checkDisSpoRelief: function(){
      if(this.disabledSpo == true){
        return 3500
      } else {
        return 0;
      }
    },
    changeRelief: function(){
      this.$emit('changeRelief', {
        total: this.totalRelief,
        sts: this.m_status
      });
    },
    updateMonth: function(){
      this.month = this.parent;
    }
  },
  computed:{
    totalchildrelief: function(){
      return this.catonerelief() + this.cattworelief() + this.catthreerelief() + this.catfourrelief() + this.catfiverelief();
    },
    totalRelief: function(){
      return this.checkIndRelief() + this.checkDisIndRelief() + this.checkDisSpoRelief() + this.totalchildrelief;
    },
    update: function(){
      return this.updateMonth();
    }
  }
}
</script>
<style>
.lbl{
  margin-right: 50px;
}
.metod {
  display: flex;
}
input[type=radio] {
  display: none;
}
label.radio {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  text-indent: 32px;
  cursor: pointer;
}
label.radio:before {
  content: "";
  position: absolute;
  top: 1px;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #1c87c9;
}
label.radio:after {
  content: "";
  position: absolute;
  width: 10px;
  height: 7px;
  top: 6px;
  left: 4.5px;
  border-bottom: 3px solid #1c87c9;
  border-left: 3px solid #1c87c9;
  transform: rotate(-45deg);
  opacity: 0;
}
input[type=radio]:checked + label:after {
  opacity: 1;
}

/**************************/

input[name=test] + label {
  display: block;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

input[name=test] {
  display: none;
}

input[name=test] + label:before {
  content: "\2714";
  border: 0.1em solid #000;
  border-radius: 0.3em;
  display: inline-block;
  width: 1.3em;
  height: 1.7em;
  padding-left: 0.2em;
  padding-bottom: 0.3em;
  margin-right: 0.3em;
  vertical-align: bottom;
  color: transparent;
  transition: .2s;
}

input[name=test] + label:active:before {
  transform: scale(0);
}

input[name=test]:checked + label:before {
  background-color: #6F6A69;
  border-color: MediumSeaGreen;
  color: #fff;
}

input[name=test]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}

input[name=test]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}

/**************************/
.month-picker__year {
  background-color: #fff;
}

.month-picker__year button:first-child {
  left: 0px;
  top: 0px;
  bottom: 82%;
  background-color: black;
}

.month-picker__year button:last-child {
  right: 0px;
  top: 0px;
  bottom: 82%;
  background-color: black;
}

.month-picker__year p {
  height: 45px;
}

.month-picker {
  -webkit-box-shadow: unset;
  box-shadow: unset;
  width: 427px;
}
</style>
