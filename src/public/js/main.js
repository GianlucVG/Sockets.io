$(function() {
    const socket = io();

    var nick = '';
    var typing = false;
    var lastTypingTime;

    //Accedemos a los elementos del DOM

    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');
    const writing = $('#writing');

    const nickForm = $("#nick-form");
    const nickError = $("#nick-error");
    const nickName = $("#nick-name");

    const userNames = $("#usernames");
    

    
    //Eventos

    //Enviamos un mensaje al servidor
    messageForm.submit( e => {
        e.preventDefault();
        socket.emit('enviar mensaje',messageBox.val());
        messageBox.val('');
        socket.emit('stop typing');
        typing = false;
    });

    //Obtener respuesta del server

    socket.on('nuevo mensaje',function(datos){
        //console.log(datos);
        chat.append(`<div class="msg-area mb-2" > <b>${datos.username}</b>  <p class="msg">${datos.msg} </p></div>`);
        if (typing) {
            typing = false;
            writing.html('');
        }
    });

    //Nuevo usuario;

    nickForm.submit( e => {
        e.preventDefault();
        socket.emit('nuevo usuario', nickName.val(), datos =>{
            if (datos){
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickError.html('<div class="alert alert-danger">El Usuario ya existe</div>');
            }
            nickName.val('');
        });
    });

    //Usuarios Conectados
    socket.on('nombre usuario', datos =>{
        let html ='';
        let color = '';
        let salir ='';
        
        for (let i = 0; i < datos.length; i++) {
            if(nick == datos[i]){
                color = "#027f43";
                salir = '<a class="enlace-salir" href="/">Salir</a>';
            }else{
                color = "#000";
                salir = '';
            }
            html += `<p style="color: ${color}">${datos[i]} ${salir}</p>`;
        }
        userNames.html(html);
    });   
//
// Escuchando eventos de estado de escritura
messageBox.on('keydown', () => {
    socket.emit('escribiendo');
  });
  
  messageBox.on('keyup', () => {
    socket.emit('no escribiendo');
  });
  socket.on('escribiendo', (typingUsers) => {
    let typingUsernames = Object.keys(typingUsers);
    if (typingUsernames.length > 0) {
      let typingMsg = typingUsernames.join(' and ') + ' está escribiendo...';
      writing.html(`<p><em>${typingMsg}</em></p>`);
    }
  });
  socket.on('no escribiendo', (typingUsers) => {
    let typingUsernames = Object.keys(typingUsers);
    if (typingUsernames.length > 0) {
      let typingMsg = typingUsernames.join(' and ') + ' está escribiendo...';
      writing.html(`<p><em>${typingMsg}</em></p>`);
    } else {
      writing.html('');
    }
  });
  
  
//
});