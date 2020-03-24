$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__main__message">
         <div class="main-chat__main__message__upper">
           <div class="main-chat__main__message__upper">
             ${message.user_name}
           </div>
           <div class="main-chat__main__message__upper__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__main__message__lower">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img class="lower-message__image" src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
     `<div class="main-chat__main__message">
        <div class="main-chat__main__message__upper">
          <div class="main-chat__main__message__upper">
            ${message.user_name}
          </div>
          <div class="main-chat__main__message__upper__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main-chat__main__message__lower">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
     return html;
   };
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__main').append(html);
      $('form')[0].reset();
      $(".submit").prop('disabled', false);
      $('.main-chat__main').animate({ scrollTop: $('.main-chat__main')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});