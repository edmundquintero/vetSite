$(function(){

  $('.deleter').click(function(){
      $.ajax({
        url: '/product/527c7c7ab1037c68bb000007',
        type: 'DELETE',
        success: function(result) {
        // Do something with the result
        }
      });
  });
});