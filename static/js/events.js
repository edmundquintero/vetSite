$(function(){

  $('.delete-product').click(function(){
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
    $('#new-product').slideDown(function(){
      window.scrollTo(0,document.body.scrollHeight);
    });
  });

  $('#add-cancel').click(function(){
    $('#new-product').slideUp();
  });

  $('.edit-product').click(function(){
    var url = '/api/product/'+$(this).attr('ref');
    $('#product-table').slideUp(function(){
       $.get(url, function(result){
        $('#product-edit form input[name="name"]').val(result.name);
        $('#product-edit form textarea[name="description"]').val(result.description);
       });
      $('#product-edit').slideDown();
    });
  });

  $('#edit-cancel').click(function(){
    $('#product-edit').slideUp(function(){
      $('#product-table').slideDown();
    });
  });

});