const registerEventsHandler = function(mc, doc) {
  let textarea = doc.getElementById("message");
  let sendButton = doc.getElementById("msg_submit");

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
  registerEventsHandler(document, metroClient);
  console.log("Loaded Interpals-Text DataSource");
}
