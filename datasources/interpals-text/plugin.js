const registerEventsHandler = function(mc, body) {
  let textarea = body.getElementById("message");
  let sendButton = body.getElementById("msg_submit");

  sendButton.addEventListener("click", function(event) {
    sendDatapoint(textarea.innerHTML, mc)
  });
}

const sendDatapoint = function(message, mc) {
  let datapoint = {};
  datapoint['message'] = message;
  datapoint['timestamp'] = Date.now();
  console.log(datapoint);

  mc.sendDatapoint(datapoint);
}

function initDataSource(metroClient) {
  registerEventsHandler(document.body, metroClient);
  console.log("Loaded Interpals-Text DataSource");
}
