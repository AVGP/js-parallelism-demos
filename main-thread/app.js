document.querySelector('button').addEventListener('click', runTest)

function runTest() {
  var buffer = new ArrayBuffer(1024 * 1024 * 10) // reserves 10 MB
  var view = new Uint8Array(buffer) // view the buffer as bytes
  var numPrimes = 0

  performance.mark('testStart')
  for(var i=0; i<view.length;i++) {
    var primeCandidate = i+2 // 2 is the smalles prime number
    var result = isPrime(primeCandidate)
    if(result) numPrimes++
    view[i] = result
  }
  performance.mark('testEnd')
  performance.measure('runTest', 'testStart', 'testEnd')
  var timeTaken = performance.getEntriesByName('runTest')[0].duration

  alert(`Done. Found ${numPrimes} primes in ${timeTaken} ms`)
  console.log(numPrimes, view)
}

function isPrime(candidate) {
  for(var n=2; n < Math.floor(Math.sqrt(candidate)); n++) {
    if(candidate % n === 0) return false
  }
  return true
}