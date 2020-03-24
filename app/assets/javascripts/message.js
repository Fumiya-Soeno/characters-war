$(function(){
  function buildHTML(message){
  image = (message.image) ? `<img class= "main-chat__message-list__message__main__image" src=${message.image} >` : "";
  var html =
  `<div class="main-chat__main__message data-message-id=${message.id}">
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
    ${image}
  </div>`
    return html;
  }
  var reloadMessages = function() {
    var last_message_id = $(".main-chat__main__message:last").data("message-id");
    if (last_message_id === undefined){
      last_message_id = 0;
    }
    $.ajax({
      type: 'GET',
      url: 'api/messages',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML += buildHTML(message);
          $('.main-chat__main').append(insertHTML);
        })
      }
      $('.main-chat__main').animate({ scrollTop: $('.main-chat__main')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    });
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__main').append(html);
      $('.main-chat__main').animate({ scrollTop: $('.main-chat__main')[0].scrollHeight});
      $('.submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert('error');
    })
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});