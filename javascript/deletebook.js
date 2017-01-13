$(() => {
    let id = window.location.search.split('=')[1];
    $.get(`http://localhost:3000/books/delete?id=${id}`)
        .done((result) => {
            let book = result[0];
            console.log(result);
            $('.book-delete-title').append(` ${book.title}?`);
            $('.delete-title').append(book.title);
            $('.delete-image').attr("src", book.cover_url)
            $('.delete-genre').append(book.genre);
            $('.delete-description').append(book.description)
            book.authors.forEach(author => {
                $('.delete-author').append(`${author.first_name} ${author.last_name} `)
            });
            $('.total-info').fadeIn('slow');
        })

        $('.book-delete').click((event)=>{
          $.get(`http://localhost:3000/books/delete/confirm?id=${id}`)
          .done(response=>{
            window.location = '/books.html';
            console.log('Yes')
          })
        })
})
