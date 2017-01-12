$(()=>{
  $.get('https://galvanize-reads-cdh.herokuapp.com/')
  .done((books)=>{
  let source = $('#book-template').html();
  let template = Handlebars.compile(source);
  let context = {books};
  let html = template(context);
  $('.books').html(html);
  });
});
