# js-parallelism-demos
Demonstrates how to use Web Workers, transfers and SharedArrayBuffer. 

##  Blog post 

This repository accompanies [this blog post on Javascript parallelism](http://50linesofco.de/post/2017-02-01-javascript-in-parallel-web-workers-transferables-and-sharedarraybuffer). 

## Content 

The blog post illustrates parallelism in JavaScript using a sample application to find prime numbers. 
This repository contains different versions of this application. 

* `/main-thread` contains the simplest version that is blocking the main thread
* `/simple-worker` contains the application using a single worker thread instead of blocking the main thread
* `/dividing-worker` uses multiple workers, cloning the data
* `/transferring-worker` is using multiple workers but transfers data rather than cloning it
* `/shared-buffer-worker` contains a version that uses a `SharedArrayBuffer` to avoid cloning or the downside of transferring data
