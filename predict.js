const readline = require("readline");
const { query } = require("./api");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function _doWork() {
  rl.question(">> What do you need help with?\n>>", async function (text) {
    console.log(">> You entered: ", text);

    try {
      const r = await query(text);
      console.log(">> Server Response");
      console.log(JSON.stringify(r.data, null, 2));
      console.log("===============================================");
    } catch (err) {
      console.log(">> Query Failed", err);
    }
  });
}

_doWork();
