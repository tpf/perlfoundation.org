---
title: 'Complete YAML::PP Report #1'
url: '/complete-yamlpp-report-1.html'
---

By Mark A Jensen  
September 30, 2017  

Tinita has already achieved much in a short time on her grant to [Complete YAML::PP](complete-yamlpp.html). She has provided full details at [blogs.perl.org](http://blogs.perl.org/users/tinita/2017/09/yamlpp-grant-report-augustseptember-2017.html). Some highlights:

- Produced YAML::PP::Lexer, ::Parser, ::Dumper, ::Emitter, ::Reader, ::Highlight
- Continued work towards full YAML 1.2 compliance
- Allows Unicode chars
- Bugfixes, refactors and miscellaneous doodads

Code is on [github](https://github.com/perlpunk/YAML-PP-p5).  
You're wondering "What's so cool about this?" Check out [Tinita's talk](https://perlpunk.github.io/slides.tpcia2017/the-state-of-the-yaml) where you can learn all about the secret features of YAML that few parsers get right.  
You're asking "How can I help?". Tina sez:  
"If you have YAML data that you think should be valid, but YAML::PP can't parse it (or the other way around), please create an issue or send it to me (of course, you have to take into account the features not implemented yet).  
You can simply do:  

```
% yamlpp5-highlight < file.yaml
# ANSI colored YAML
% yamlpp5-load < file.yaml
# Data::Dumper output
% yamlpp5-load-dump < file.yaml
# Load and Dump back into YAML
% yamlpp5-events < file.yaml
# Show parsing events in yaml-test-suite format
```


I'm happy to receive suggestions and comments on the API."  
MAJ  

### Categories: [Grants](grants.html)
