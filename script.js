
       var socket=io();
       
       const text=document.getElementById("text");
        const typing=document.getElementById("typing");
        const hello=document.getElementById("hello");
        const chat=document.getElementById("chat");

        typing.addEventListener("click", ()=>{
            socket.emit("typing-event",{
                name: text.value
            });
        });

       hello.addEventListener("click", ()=>{
        socket.emit("message-event",{
            name: text.value,
            message: "hello every one"
        });
       });

       socket.on("message-event",(data)=>{
        const nouveau = document.createElement("span");
        nouveau.textContent=data.name + " :: "+data.message+" ! ";
        chat.appendChild(nouveau);
       })