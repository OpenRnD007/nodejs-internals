const fs = require('fs')
const crypto = require('crypto')
//process.env.UV_THREADPOOL_SIZE = 6

setTimeout(() => console.log('Cycle1:Phase2: setTimeout Top' + "\n"), 0)
setImmediate(() => console.log('Cycle1:Phase4: setImmediate Top as we don`t have any Phase 3:IO before this that is why it get printed first' + "\n"))

const start = Date.now()
fs.readFile('sample.txt', 'utf-8', (res) => {
    console.log('Cycle2:Phase3: I/O filed read!!, All Phase3:IO:Async will be registred for Execution' + "\n")

    setTimeout(() => console.log('Cycle3:Phase2: setTimeout Inner-> As we are already at Phase 3 this will be Skipked in Cycle 2 and Cycle2:Phase4 will be displayed' + "\n"), 0)
    setTimeout(() => console.log('Cycle5:Last Statement Phase:2' + "\n"), 5 * 1000)
    setImmediate(() => console.log('Cycle2:Phase4: setImmediateTimeout, this will be printed after Phase3:IO call' + "\n"));

    // if 4 size then all will run parallel, 
    // if 2 then 2 will run parallel and other 2 has to wait, so timing will be double for last 2
    crypto.pbkdf2('password1', 'salt1', 100000, 1024, 'sha512', () => {
        console.log((Date.now() - start) + 'ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread1')
    })
    crypto.pbkdf2('password2', 'salt1', 100000, 1024, 'sha512', () => {
        console.log((Date.now() - start) + 'ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread2')
    })
    crypto.pbkdf2('password3', 'salt1', 100000, 1024, 'sha512', () => {
        console.log((Date.now() - start) + 'ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread3')
    })
    crypto.pbkdf2('password4', 'salt1', 100000, 1024, 'sha512', () => {
        console.log((Date.now() - start) + 'ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread4')
    })
    crypto.pbkdf2('password5', 'salt1', 100000, 1024, 'sha512', () => {
        console.log((Date.now() - start) + 'ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread5')
    })
    crypto.pbkdf2('password6', 'salt1', 100000, 1024, 'sha512', () => {
        console.log((Date.now() - start) + 'ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread6')
    })
})

new Promise((resolve, _rejected) => resolve('done'))
    .then(resp => console.log('Cycle1:PromisePhase: this will be called between Phases tick for this example it will be called between Phase1 and Phase2' + "\n"))

console.log("Cycle1:Phase1: Top Level Code" + "\n")

/**
 * Phase1: Top Level Code (All top level Code is Executed and top level async will be registered)
 * Phase2: All timeout function will be called
 * Phase3: All IO operation will be called/register
 * Phase4: All setImmediate will be called
 * PhasePromise: Promise we will called between Phases
 * There are many other pahese like internal used by system which we don't have to worry
 * The above 5 phase are something that we need to consider all time
 * 
 * UV_THREADPOOL_SIZE: is always 4 crypto.pbkdf2 will be assigned to first 4 thread and you will see the timing is almost same for first 4
 * Once thread are free 5 and 6 will be called you can see output
 * You can play with threadpool size for better understanding
 */

/**
 * Cycle1:Phase1: Top Level Code
 * Cycle1:PromisePhase: this will be called between Phases tick for this example it will be called between Phase1 and Phase2
 * Cycle1:Phase2: setTimeout Top
 * Cycle1:Phase4: setImmediate Top as we don`t have any Phase 3:IO before this that is why it get printed first
 * Cycle2:Phase3: I/O filed read!!, All Phase3:IO:Async will be registred for Execution
 * Cycle2:Phase4: setImmediateTimeout, this will be printed after Phase3:IO call
 * Cycle3:Phase2: setTimeout Inner-> As we are already at Phase 3 this will be Skipked in Cycle 2 and Cycle2:Phase4 will be displayed 
 * 745ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread1
 * 746ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread2
 * 764ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread4
 * 767ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread3
 * 1460ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread5
 * 1461ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread6
 * Cycle5:Last Statement Phase:2
 */