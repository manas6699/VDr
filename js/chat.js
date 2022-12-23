// Collapsible by manas baroi (start)
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "How's it going?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Doctor I need Help!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});



//code by manas baroi (end)
function displayMessage(type){
  var initialMessages = ["Hi How are you ?", "Please let me know your sufferings", "Do you have fever"]
  var responseMessages = ["Hi How are you ?", "Please let me know your sufferings", "Do you have fever"]

  
  var newDiv = document.createElement("div");
  newDiv.className = "chat-bubble";
  var newImg = document.createElement("img");
  newImg.className = "bot image";
  var newP = document.createElement("p");
  newP.innerHTML =  type == "initial" ? initialMessages[Math.floor(Math.random() * Math.floor(initialMessages.length))] : responseMessages[Math.floor(Math.random() * Math.floor(responseMessages.length))];
  newDiv.appendChild(newImg)
  newDiv.appendChild(newP);
  
  
  var messages = document.getElementById("chat-contents");
  messages.appendChild(newDiv);
}

function arrowSubmit(){
  console.log("here")
  button = document.getElementById("submit-chat");
  text = document.getElementById("chat-message-value");
  if( text.value != ""){
    button.classList = "active";
  }else{
    button.classList.remove("active");
  }
}

function submitMessage(){
  var text = document.getElementById("chat-message-value").value;
  if(text == ""){
    return
  }
  document.getElementById("chat-message-value").value = "";
  
  var newDiv = document.createElement("div");
  newDiv.className = "chat-bubble";
  var newImg = document.createElement("img");
  newImg.className = "user image";
  var newP = document.createElement("p");
  newP.innerHTML = text;
  newDiv.appendChild(newImg);
  newDiv.appendChild(newP);
  
  var messages = document.getElementById("chat-contents");
  messages.appendChild(newDiv);
  document.getElementById("submit-chat").classList.remove("active");
  setTimeout(function(){displayMessage("response")}, 3000);

}

function addHandlers(){
  document.getElementById("submit-chat").addEventListener("click", submitMessage);
  document.onkeypress = function (e){
    if( e.keyCode == 13 ){
      document.getElementById("submit-chat").click();
    }
  };
  setTimeout(function(){displayMessage("initial")}, 1500);
  document.getElementById("chat-message-value").addEventListener("input", arrowSubmit);
}

window.addEventListener("load", addHandlers);