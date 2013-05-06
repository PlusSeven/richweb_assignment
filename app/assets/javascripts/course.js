// This JavaScript file is used to add or update notes when learning courses
  $(document).ready(function() {
    $(document).on('click','.notes', function(){
      $('#notice').html("");
      var content = $('.content').val();
      var note_id = $(this).attr('id');
      var course_id = $('.course').attr('id');

      if (note_id == "")
      {
        //create
        $.ajax({
          url: '/notes',
          type: 'POST',
          data: {'note[content]':content,'note[course_id]':course_id}
        })
        .done(function(object) {
            $('#notice').html(object["msg"]);
            $('.notes').attr('id',object["note_id"]);
        })
        .fail(function(msg) {
            $('#notice').html(msg);
        });

      }
      else
      {
        //update 
        $.ajax({
          url: '/notes/'+note_id,
          type: 'PUT',
          data: {'note[content]':content}
        
        })
        .done(function(msg) {
            $('#notice').html(msg);
            console.log(msg);
          })
          .fail(function(msg) {
            $('#notice').html(msg);
          });
        }
    });
  });

