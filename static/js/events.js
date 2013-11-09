$(function(){

  $('.deleter').click(function(){
    var id = $(this).attr('ref');
      $.ajax({
        url: '/product/'+id,
        type: 'DELETE',
        success: function(result) {
          console.log(result);
          var hook = '#'+id;
          console.log($(hook));
          $(hook).hide();
        }
      });
  });

  $('#add-new').click(function(){
    $('#new-product').slideDown();
  });

  $('#add-cancel').click(function(){
    $('#new-product').slideUp();
  });

  // $('#add-submit').click(function(){
  //   $('#new-product').slideUp();
  // });


});