self.onmessage = function(msg) {
  var view = new Uint8Array(msg.data.buffer, msg.data.offset, msg.data.length),
      numPrimes = 0
      
  console.log('start', msg.data.offset+2, 'before', msg.data.offset+2+msg.data.length)
  for(var i=0; i<msg.data.length;i++) {
    var primeCandidate = i+msg.data.offset+2 // 2 is the smalles prime number
    var result = isPrime(primeCandidate)
    if(result) numPrimes++
    view[i] = result
  }
  self.postMessage({
    numPrimes: numPrimes,
    offset: msg.data.offset,
    length: msg.data.length
  })
}

function isPrime(candidate) {
  for(var n=2; n < Math.floor(Math.sqrt(candidate)); n++) {
    if(candidate % n === 0) return false
  }
  return true
}