const Readline = require("readline");
const Axios = require("axios");
// ID Telegram = 627731997
const interface = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface.on("line", input => {
  console.log("INPUT : " + input);
  // TODO : Kirim ke telegram
  Axios.post(
    "https://api.telegram.org/bot892413256:AAGP1zROX6HVt37eyGAc7bAib5xfMVNw_aE/sendMessage",
    { chat_id: 627731997, text: input }
  )
    .then(console.log)
    .catch(console.error);
});
var update_log = [];
setInterval(() => {
  Axios.get(
    "https://api.telegram.org/bot892413256:AAGP1zROX6HVt37eyGAc7bAib5xfMVNw_aE/getupdates"
  ).then(resp => {
    var data = resp.data;
    for (var result of data.result) {
      var id = result.update_id;
      if (update_log.indexOf(id) >= 0) {
        // Sudah diproses
        continue;
      }
      var message = result.message.text;
      response(message);
      console.log(message);
      update_log.push(id);
    }
  });
}, 3000);
function response(message) {
  if (message.indexOf("hai") >= 0) {
    send("Apa say?");
    send("Kamu lagi apa?");
  }
  if (message.indexOf("lagi makan") >= 0) {
    send("Ohh enak dong?");
    send("Makan apa kamu?");
  }
  if (message.indexOf("makan nasi") >= 0) {
    send("Yaiyalah nasi atuh, maksudnya pake apaaaa?");
  }
  if (message.indexOf("sama ikan") >= 0) {
    send("Oooh yaudah deh aku belajar dulu yaa");
  }
}
function send(input) {
  Axios.post(
    "https://api.telegram.org/bot892413256:AAGP1zROX6HVt37eyGAc7bAib5xfMVNw_aE/sendMessage",
    { chat_id: 627731997, text: input }
  )
    .then(console.log)
    .catch(console.error);
}
