$(function(){

// DELETE

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

// ADD

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

// EDIT

  $('.edit-item').click(function(){
    var url = '/api'+$(this).attr('ref');
    $('#item-table').slideUp(function(){
       $.get(url, function(result){
        $('#item-edit form input[name="id"]').val(result._id);
        $('#item-edit form input[name="type"]').val(result.type);
        $('#item-edit form input[name="name"]').val(result.name);
        $('#item-edit form textarea[name="description"]').val(result.description);
       });
      $('#item-edit').slideDown();
    });
  });

  $('#edit-cancel').click(function(){
    $('#item-edit').slideUp(function(){
      $('#item-table').slideDown();
    });
  });

  $('#edit-submit').click(function(){
    var url = '/'+ $('#item-edit form input[name="type"]').val() +'/' + $('#item-edit form input[name="id"]').val();
    $('#item-edit form').attr('action', url);
    $('#item-edit').slideUp(function(){
      $('#item-table').slideDown();
      $('#edit-hidden-submit').click();
    });
  });

// --------------------

  


});