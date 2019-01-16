// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// connection.on("ReceiveMessage", function (user, message) {
//     var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
//     var encodedMsg = user + " says " + msg;
//     var li = document.createElement("li");
//     li.textContent = encodedMsg;
//     document.getElementById("messagesList").appendChild(li);
// });

// connection.start().catch(function (err) {
//     return console.error(err.toString());
// });

var app = new Vue({
    el: '#app',
    data: {
        messageList: [],
    },
    methods: {
        sendMessage: function () {
            var user = document.getElementById("userInput").value;
            var message = document.getElementById("messageInput").value;
            this.connection.invoke("SendMessage", user, message).catch(function (err) {
                return console.error(err.toString());
            });
            event.preventDefault();
        }
    },
    created: function () {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    },
    mounted: function () {
        this.connection.start();

        this.connection.on("ReceiveMessage", (user, message) => {
            var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var encodedMsg = user + " says " + msg;
            this.messageList.push(encodedMsg);
        });
    }
})