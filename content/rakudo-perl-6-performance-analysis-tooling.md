---
title: 'Rakudo Perl 6 Performance Analysis Tooling'
url: '/rakudo-perl-6-performance-analysis-tooling.html'
---

The Grants Committee has received the following proposal for the September/October round. Before the Committee members vote, we would like to solicit feedback from the Perl community on the proposal.  
Review the proposal below and please comment here by September 26th, 2017. The Committee members will start the voting process following that and the conclusion will be announced the first week of October.  

**Name**  
Timo Paulssen  
**Amount Requested**  
7,500 USD  

### Synopsis

Rakudo on MoarVM already comes with two kinds of profilers and multiple kinds of internal logs. There's also a way to get coverage analysis from any given program or set of programs.  
The focus of internals that these tools have in common can make it quite daunting for someone not involved in core development to use these tools and to make sense of the data gathered.  
I will create a new GUI (browser-based) for the instrumented profiler (which takes timings of functions and counts allocations) and the heap snapshot profiler (which records what objects are alive and how they are interconnected) and make invoking the profiling modes simpler.  

Even though there already is a browser-based UI for the instrumented profiler, it quickly becomes unusable as program sizes increase.  
Another shortcoming of the instrumented profiler is that it doesn't work when multiple threads are involved in the user's program.  

### Benefits to the Perl Community

Rewriting the Profile UI for the instrumented profiler to understand multiple threads and our multi-threaded prinitives like react/whenever will allow both our users and our core developers to figure out the performance of multi-threaded programs more easily and precisely than possible so far. On top of that, basing the UI on the SQL output from our profiler rather than the JSON output we had before will improve the responsiveness and memory use of the profiler drastically, even making it possible to get a profile of compiling the Rakudo Perl 6 Core Settings, a single Perl 6 source file of almost 60k lines.  
The Heap Snapshot Analyzer allows users to figure out what objects take up the most memory, how the distribution of object counts and sizes change over the runtime of a program, and why any given Analyzer will allow them to more easily navigate between objects, get graphs of queries, and to have the information more organized than current shell-like interactive UI.   
Another task I want to complete as part of this grant is to have much more end-user oriented documentation for how to use the profiler effectively, including a few example programs.   

### Deliverables and Inchstones

- A blog with progress reports.
- A web fronted for the heap snapshot analyzer
  - Refactor how the analyzer gives data to the shell
  - Draft a concept for how the user will interact with the analyzer
  - UI for Per-Snapshot Summary: total heap size, total object count, …
  - UI for Top Lists for objects sorted by count or memory usage
  - UI for Details of individual objects: size, pointers to other objects
  - UI for the shortest path that keeps an object alive
  - UI for Across-Snapshot comparisons: object counts over time, …
  - UI for Heap Exploration: Find all objects of a specific type, …
  - Functionality for finding paths from one object to all roots that reach it.
  - UI for whole parts of the network, like multiple paths to a single object.
  - If an instrumented profile is also loaded
    - Links from types to routines allocating the type
    - Links from frames (closures for example) to the call graph
    - A new web frontend for the instrumented profiler
  - Communication between the web frontend and a backend for data queries
  - Overview page with at-a-glance metrics for quick feedback for code changes
  - Call Graph explorer
    - Robust forwards/backwards navigation
    - Icicle Graph with acceptable performance
    - Search function for Call Graph Explorer
  - Routines List
    - Sortable by every sensible column
    - Groupable by filename
    - Expand a routine to see its callers or callees
    - … with links directly to the call graph explorer
  - Allocation explorer
    - Show what routines allocate a given class
    - Expand a routine to see which of its callers is responsible for what amount of allocations
    - Link to the heap snapshot explorer for any given type
  - OSR and Deopt explorer
    - Show routines that have been OSR'd (On-Stack-Replaced by the optimizer)
    - Again, allowing to expand routines to see their callers
    - Expose a lot more information about deopts - which types are involved, for example
    - Explain in clear terms what OSR and Deopt mean
  - ○ GC explorer
    - Figure out a good way to present information from multi-threaded programs here
    - Expose time-of-collection info to profiler
    - Show the time and duration of collections, how much data was kept, promoted to the old generation, or deleted, and whether the collection was a minor or major one
    - Filterable to show major collections only
    - Compactly graph collection times and kept/promoted/deleted amounts
    - User-facing documentation on using the profiling facilities and interpreting the data
    - Build a bunch of examples that show different performance issues and describe how to figure them out
  - Using an unoptimized built-in
  - Accidentally keeping objects alive
  - Code using native ints but inadvertently causing lots of boxing
  - Using mixing on a hot path causing lots of depot

### Project Details and a Proposal Schedule

I can start working on this grant immediately. Over the last weeks I've implemented a new data format for the Heap Snapshot Profiler itself, and started improving the Heap Analyzer's Shell and Model in preparation for a new Frontend.  
This grant is likely to take at least 160 hours, which at 40 euros per hour is about 7,500 dollars. Therefore, I'd like to request 7,500 USD for this work. Any left-over hours at the end of the grant can easily be spent improving the whole result, though typically a project will take more time than estimated, not less.  
I'm planning to spend at least 15 hours per week on this, with a few weeks of break near the end of January in order to move apartments.  

### Completeness Criteria

There will be changes to MoarVM to expose more information to profiler output. In the case of the Instrumenting Profiler, there will be minor changes to NQP to transfer the extra information into the output formats.  
Most of the work will live in a new repository, with a sizable chunk living in the existing Heap Analyzer in jnthn's github repository.  
At the end of the project there will be a Perl 6 program that you can use to run your code with profilers enabled and then introspect all the information. It will be interacted with using a web browser.  

### BIO

I came to the Perl 6 project in March 2012 after having made a few minor contributions to PyPy. Initially I worked on error messages, then Rakudo's Optimizer, Rakudo's Grammar, and later also contributed bits and pieces to Parrot. When the Rakudo JVM Port began, I contributed little pieces to that, and finally when MoarVM became public I concentrated my efforts on that. I also participate in discussion and support on the IRC and on the perl6-users mailing list.  
In total, I've added 779 commits to Moarvm, 318 to NQP, and 359 to Rakudo, excluding commits in branches that have not been merged. Those commits range from single-line patches to bigger chunks of work.  
I've also contributed pieces to the heap snapshot analyzer, helped fellow contributor MasterDuke17 implement an SQL output mode for the profiler, and in general spent a sizable portion of my time and energy on optimization-related work.  
I also just merged a new output format and API for the heap snapshot profiler.  

### Categories: [Grants](grants.html)

### Comments

Master Duke \| September 20, 2017 2:03am  
+1 for me, Timo has done great work before and what he proposes will be useful to both regular users and core devs alike.  

Wendy van Dijk \| September 20, 2017 11:18am  
I am a big proponent of this grant. Money will be well spent: Timo is a serious Perl 6 core developer who has proven his worth over and over again. This work is needed and will improve Perl 6 greatly, and it will help other Perl 6 developers to work on Perl 6 even better than before.  

JimmyZ \| September 20, 2017 2:38pm  
+1 from me too. profiler is very important  

[Zoffix Znet](https://web.archive.org/web/20191015042111/http://rakudo.party/) \| September 20, 2017 6:07pm  
+1  
Most importantly, this tooling will let other core devs find and fix performance issued in the compiler, so the money spend will go along further than the work outlined in this grant.  
timotimo++ knows the codebase well enough to deliver on this grant.  

[Shomi Fish](http://www.shlomifish.org/) \| September 20, 2017 6:46pm  
Sounds good to me. +1.  

Chris Jack \| September 21, 2017 7:37am  
This sounds extremely useful. I'm definitely in favour.  

perlpilot \| September 21, 2017 3:25pm  
One of the continual gripes about Perl 6 is that it isn't as fast as some would like. Timo's work will greatly improve everyone's ability to make code faster. +1 for sure!  

Solomon Foster \| September 21, 2017 5:43pm  
+1 from me--easier profiling tools would be great for those of us using Perl 6.  

[Jonathan Worthington](http://www.jnthn.net/) \| September 22, 2017 4:09pm  
I'd very much like to see this work happen.  
It's possible to obtain plenty of data on how time and memory are being spent in Perl 6 programs now, and how they are being treated by the optimizer. However, much of the tooling has been written primarily to cater to the immediate needs of those who built it. The memory heap snapshot mechanism is a case in point: I was hunting a nasty managed leak and it was quicker to put together a heap snapshot tool than it would have been to find the problems without it. The instrumented profiler UI is a similar case: it was built rapidly to help us understand the performance of small benchmark programs and give a high level idea of how the optimizer was doing with them, but the UI is too slow for larger programs and it doesn't know how to aggregate data from multiple threads and present that.  
Perl 6 language users need better tools to understand performance, and the completion of the work proposed in this grant would be a big step forward. As others have noted, core developers will benefit from the improved tooling also.  
Last but not least, Timo is a good person to fund to do this work. He's in the handful of people who have contributed to the MoarVM specializer and JIT, along with many other areas of the VM, and so knows the kinds of things that impact upon the performance of Perl 6 programs. This will be valuable knowledge for delivering useful tools to help others understand program performance.  

Bradley Anderson \| September 26, 2017 11:45am  
+1  
-elohmrow (sorry, lost my login details)
