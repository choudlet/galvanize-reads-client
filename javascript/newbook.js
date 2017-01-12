$(() => {

    $('select').material_select();
    $.get('https://galvanize-reads-cdh.herokuapp.com/books/new')
    .done((authors)=>{
      authors.forEach(author=>{
        $('#author_list').append(`<option value="${author.id}">${author.first_name} ${author.last_name}</option>`)
      });
      $('#author_list').material_select();
    });
    $('.book-submit').click((event)=>{
      event.preventDefault();
      let data = {
        title: $('.title').val(),
        genre: $('.genre').val(),
        cover_url :$('.cover_url').val(),
        description: $('.description').val(),
        author_id: $('#author_list').val()
      };
      console.log(data)
      $.post('https://galvanize-reads-cdh.herokuapp.com/books/new', data,(response)=>{
        Materialize.toast(response.status, 4000)
        if(response.success == true) {
          $('.book-form').trigger('reset');
        }
      })
    })
});
