$(() => {
    let id = window.location.search.split('=')[1];
    var author_ids;
    $.get(`http://localhost:3000/books/edit?id=${id}`)
        .done((result) => {
            let book = result[0];
            $('.title').val(book.title);
            $('.genre').val(book.genre);
            $('.cover_url').val(book.cover_url);
            $('.description').val(book.description);
            author_ids = book.authors.map(author => {
                return author.author_id;
            });
        }).then(() => {
            $.get('http://localhost:3000/books/new')
                .done((authors) => {
                    let selected = [];
                    authors.forEach(author => {
                        author_ids.forEach((id) => {
                            if ((id == author.id) && (!(selected.includes(id)))) {
                                selected.push(id);
                            }
                        });
                    });
                    authors.forEach((author) => {
                        if (selected.includes(author.id)) {
                            $('#author_list').append(`<option value="${author.id}"selected>${author.first_name} ${author.last_name}</option>`);
                        } else $('#author_list').append(`<option value="${author.id}">${author.first_name} ${author.last_name}</option>`);
                    });
                    $('#author_list').material_select();
                });

        });

        $('.edit-submit').click(event=>{
          event.preventDefault();
          $.ajax({
            url: `http://localhost:3000/books/edit?id=${id}`,
            method: "PUT"
          }).done((result)=>{
            console.log(result)
          })
        });
});
