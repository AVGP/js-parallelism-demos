self.onmessage = function(msg) {
  var view = new Uint8Array(msg.data.length),
      numPrimes = 0
  for(var i=0; i<msg.data.length;i++) {
    var primeCandidate = i+msg.data.offset+2 // 2 is the smalles prime number
    var result = isPrime(primeCandidate)
    if(result) numPrimes++
    view[i] = result
  }
  self.postMessage({
    buffer: view.buffer,
    numPrimes: numPrimes,
    offset: msg.data.offset,
    length: msg.data.length
  }, [view.buffer])
}

function isPrime(candidate) {
  for(var n=2; n < Math.floor(Math.sqrt(candidate)); n++) {
    if(candidate % n === 0) return false
  }
  return true
}