export default {
  methods: {
    displayMessage: function(){
      return 'Now printing from a mixins function';
    },
    validate: function(param1, param2){
      if(param1 > param2){
        return true;
      } else {
        return false;
      }
    }
  }
}


//created: function() {
//  console.log('Printing from the mixins');
//},
