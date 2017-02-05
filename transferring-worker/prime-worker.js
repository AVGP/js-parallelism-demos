self.onmessage = function(msg) {
  var view = new Uint8Array(msg.data),
      numPrimes = 0
  for(var i=0; i<view.length;i++) {
    var primeCandidate = i+2 // 2 is the smalles prime number
    var result = isPrime(primeCandidate)
    if(result) numPrimes++
    view[i] = result
  }
  self.postMessage({
    buffer: view.buffer,
    numPrimes: numPrimes
  }, [view.buffer])
}

function isPrime(candidate) {
  for(var n=2; n < Math.floor(Math.sqrt(candidate)); n++) {
    if(candidate % n === 0) return false
  }
  return true
}