const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

let port;

function initSerial(portPath, baudRate = 9600) {
  port = new SerialPort(portPath, { baudRate });
  const parser = port.pipe(new Readline({ delimiter: "\n" }));

  port.on("open", () => {
    console.log(`Serial port opened at ${portPath} with baudRate ${baudRate}`);
  });

  parser.on("data", (data) => {
    console.log("Received data from serial:", data);
    // TODO: 필요한 로직 구현
  });

  port.on("error", (err) => {
    console.error("Serial port error:", err.message);
  });
}

function sendData(data) {
  if (port && port.isOpen) {
    port.write(data + "\n", (err) => {
      if (err) {
        console.error("Error writing to serial port:", err.message);
      }
    });
  } else {
    console.error("Serial port is not open");
  }
}

module.exports = {
  initSerial,
  sendData,
};
