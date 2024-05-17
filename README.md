# Node.js Internals

This repository is dedicated to exploring and understanding the internal mechanisms of Node.js. It serves as a resource for those looking to dive deep into the core functionalities and architecture of Node.js.

## Overview

`nodejs-internals` provides an in-depth analysis of Node.js features, including the event loop, asynchronous operations, modules, and the Node.js runtime environment. The goal is to offer insights that can help developers optimize their applications and contribute to the Node.js ecosystem.

# Nodejs Internal Working (Lecture)

 * Phase 1: Initial Code Execution (All code at the top level is executed, and asynchronous tasks at the top level are scheduled.)
 * Phase 2: Execution of all setTimeout functions.
 * Phase 3: Execution and/or registration of all I/O operations.
 * Phase 4: Invocation of all setImmediate callbacks.
 * Phase Promise: Promises are executed in between the phases.

 * There are additional phases, such as internal ones utilized by the system, which we don't need to concern ourselves with. The aforementioned five phases are crucial and should always be taken into account.

 * The UV_THREADPOOL_SIZE is set to 4 by default, meaning that functions like crypto.pbkdf2 will be allocated to the first four threads, resulting in similar execution times for these threads. Once threads become available, the fifth and sixth tasks will be executed, which can be observed in the output.

 * For a deeper understanding, you can experiment with the thread pool size.


## Lessons

### Run Code

```bash
  node index.js
```

### [index.js](https://github.com/OpenRnD007/nodejs-internals/tree/main/index.js)

#### o/p
```bash
 Cycle1:Phase1: Top Level Code
 Cycle1:PromisePhase: this will be called between Phases tick for this example it will be called between Phase1 and Phase2
 Cycle1:Phase2: setTimeout Top
 Cycle1:Phase4: setImmediate Top as we don`t have any Phase 3:IO before this that is why it get printed first
 Cycle2:Phase3: I/O filed read!!, All Phase3:IO:Async will be registred for Execution
 Cycle2:Phase4: setImmediateTimeout, this will be printed after Phase3:IO call
 Cycle3:Phase2: setTimeout Inner-> As we are already at Phase 3 this will be Skipked in Cycle 2 and Cycle2:Phase4 will be displayed 
 745ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread1
 746ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread2
 764ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread4
 767ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread3
 1460ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread5
 1461ms Registered at Cycle2 called at Cycle4:Phase3:Async Thread6
 Cycle5:Last Statement Phase:2
```

## Authors
- [@openrnd007](https://www.github.com/openrnd007)
