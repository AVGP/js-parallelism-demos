document.querySelector('button').addEventListener('click', runTest)

function runTest() {
  var buffer = new ArrayBuffer(1024 * 1024 * 10) // reserves 10 MB
  var view = new Uint8Array(buffer) // view the buffer as bytes

  performance.mark('testStart')
  var worker = new Worker('prime-worker.js')
  worker.onmessage = function(msg) {
    performance.mark('testEnd')
    performance.measure('runTest', 'testStart', 'testEnd')
    var timeTaken = performance.getEntriesByName('runTest')[0].duration
    view.set(new Uint8Array(buffer), 0)
    alert(`Done. Found ${msg.data.numPrimes} primes in ${timeTaken} ms`)
    console.log(msg.data.numPrimes, view)
  }
  worker.postMessage(buffer)
  
}