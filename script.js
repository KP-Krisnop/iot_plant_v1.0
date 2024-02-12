const connectButton = document.querySelector('.connect_button');
const ipAddressInput = document.querySelector('#ipaAddress');

const lightValueOutput = document.querySelector('#lightValue');
const soilMoistValueOutput = document.querySelector('#soilMoistValue');
const soilTempValueOutput = document.querySelector('#soilTempValue');
const airHumidValueOutput = document.querySelector('#airHumidValue');
const airTempValueOutput = document.querySelector('#airTempValue');

let ipAddress = '';
let socket;
let messages = [];

connectButton.addEventListener('click', () => {
  if (ipAddressInput.value !== '') {
    ipAddress = 'ws://' + ipAddressInput.value + ':81';
    console.log(ipAddress);
    webSocket(ipAddress);
  }
});

function webSocket(ipAddress) {
  // //connect to websocket server
  socket = new WebSocket(ipAddress);

  socket.addEventListener('open', function (event) {
    console.log('WebSocket connected');
  }); // Connection opened

  socket.addEventListener('message', function (event) {
    let message = event.data;
    messages = message.split(',');
    console.log(messages);
    displayValue();
  }); // Listen for messages
}

function displayValue() {
  lightValueOutput.innerText = 'Light Level: ' + messages[0];
  soilMoistValueOutput.innerText = 'Soil Moisture Level: ' + messages[1];
  soilTempValueOutput.innerText = 'Soil Temperature Level: ' + messages[2];
  airHumidValueOutput.innerText = 'Air Humidity Level: ' + messages[3];
  airTempValueOutput.innerText = 'Air Temperature Level: ' + messages[4];
}
