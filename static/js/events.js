$(function(){

  $('.delete-item').click(function(){
      $.ajax({
        url: $(this).attr('ref'),
        type: 'DELETE',
        success: function(result) {
          var hook = '#'+result.id;
          $(hook).hide();
        }
      });
  });

  $('#add-new').click(function(){
    $('#item-table').slideUp(function(){
      $('#item-new').slideDown();
    });
  });

  $('#add-cancel').click(function(){
    $('#item-new').slideUp(function(){
      $('#item-table').slideDown();
    });
  });

  $('.edit-item').click(function(){
    var url = '/api/'+$(this).attr('ref');
    $('#item-table').slideUp(function(){
       $.get(url, function(result){
        $('#product-edit form input[name="id"]').val(result._id);
        $('#product-edit form input[name="name"]').val(result.name);
        $('#product-edit form textarea[name="description"]').val(result.description);
       });
      $('#product-edit').slideDown();
    });
  });

  $('#edit-cancel').click(function(){
    $('#product-edit').slideUp(function(){
      $('#item-table').slideDown();
    });
  });

  $('#edit-submit').click(function(){
    var url = '/product/' + $('#product-edit form input[name="id"]').val();
    $('#product-edit form').attr('action', url);
    $('#product-edit').slideUp(function(){
      $('#item-table').slideDown();
      $('#edit-hidden-submit').click();
    });
  });

});