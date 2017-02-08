document.querySelector('button').addEventListener('click', runTest)

function runTest() {
  const TOTAL_NUMBERS = 1024 * 1024 * 10
  const NUM_WORKERS = 4
  var numbersToCheck = TOTAL_NUMBERS, primesFound = 0
  var buffer = new SharedArrayBuffer(numbersToCheck) // reserves 10 MB
  var view = new Uint8Array(buffer) // view the buffer as bytes

  performance.mark('testStart')
  var offset = 0
  while(numbersToCheck) {
    var blockLen = Math.min(numbersToCheck, TOTAL_NUMBERS / NUM_WORKERS)
    var worker = new Worker('prime-worker.js')
    worker.onmessage = function(msg) {
      primesFound += msg.data.numPrimes

      if(msg.data.offset + msg.data.length === buffer.byteLength) {
        performance.mark('testEnd')
        performance.measure('runTest', 'testStart', 'testEnd')
        var timeTaken = performance.getEntriesByName('runTest')[0].duration
        alert(`Done. Found ${primesFound} primes in ${timeTaken} ms`)
        console.log(primesFound, view)
      }
    }
    
    worker.postMessage({
      buffer: buffer,
      offset: offset,
      length: blockLen
    })
    
    numbersToCheck -= blockLen
    offset += blockLen
  }
}
