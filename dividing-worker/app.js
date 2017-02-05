document.querySelector('button').addEventListener('click', runTest)

function runTest() {
  const TOTAL_NUMBERS = 1024 * 1024 * 10
  const NUM_WORKERS = 4
  var numbersToCheck = TOTAL_NUMBERS, primesFound = 0
  var buffer = new ArrayBuffer(numbersToCheck) // reserves 10 MB
  var view = new Uint8Array(buffer) // view the buffer as bytes

  performance.mark('testStart')
  var offset = 0
  performance.mark('launchWorkerStart')
  while(numbersToCheck) {
    var blockLen = Math.min(numbersToCheck, TOTAL_NUMBERS / NUM_WORKERS)
    var worker = new Worker('prime-worker.js')
    worker.onmessage = function(msg) {
      performance.mark('workerResponseStart')
      view.set(new Uint8Array(msg.data.buffer), msg.data.offset)
      primesFound += msg.data.numPrimes

      if(msg.data.offset + msg.data.length === buffer.byteLength) {
        performance.mark('testEnd')
        performance.measure('runTest', 'testStart', 'testEnd')
        var timeTaken = performance.getEntriesByName('runTest')[0].duration
        alert(`Done. Found ${primesFound} primes in ${timeTaken} ms`)
        console.log(primesFound, view)
      }
      performance.mark('workerResponseEnd')
      performance.measure('workerResponse', 'workerResponseStart', 'workerResponseEnd')
    }
    
    worker.postMessage({
      offset: offset,
      length: blockLen
    })
    
    numbersToCheck -= blockLen
    offset += blockLen
    performance.mark('launchWorkerEnd')
    performance.measure('launchWorker', 'launchWorkerStart', 'launchWorkerEnd')
  }
}