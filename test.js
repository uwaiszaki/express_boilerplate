const fs = require('fs');
const axios = require('axios');

function main() {
  //   setTimeout(() => console.log('Timer 1'), 0);
  //   setImmediate(() => console.log('Immediate 1'));

  setTimeout(() => console.log('Timer 0'), 50);
  //   setTimeout(() => console.log('Timer 1'), 50);
  //   process.nextTick(() => console.log('Next Tick 1'));
  //   setImmediate(() => console.log('Immediate'));
  //   process.nextTick(() => console.log('Next Tick 2'));
  //   process.nextTick(() => console.log('Next tick 0'));
  fs.readFile('text-file.txt', () => {
    setTimeout(() => console.log('Timer 1'), 100);
    setTimeout(() => console.log('Timer -1'), 0);
    setImmediate(() => console.log('Immediate'));
    process.nextTick(() => console.log('Next tick 1'));
  });
}

const x = async () => {
  const data = await axios.get(`https://dog.ceo/api/breeds/image/random`);
  console.log(data);
};
main();

x();
