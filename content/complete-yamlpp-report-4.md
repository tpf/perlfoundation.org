---
title: 'Complete YAML::PP Report #4'
url: '/complete-yamlpp-report-4.html'
---

By Mark A Jensen  
January 10, 2018  

More good stuff this month from Tinita on the grant [Complete YAML::PP](complete-yamlpp.html).  
She explains the YAML schema concept and its evolving flavors in this [interesting post](http://blogs.perl.org/users/tinita/2018/01/introduction-to-yaml-schemas-and-tags.html). This lays the foundation for understanding the schema features added to the YAML::PP loader. Tina also fixed a couple of problems in [YAML::XS](https://metacpan.org/pod/distribution/YAML-LibYAML/lib/YAML/XS.pod). An important one security-wise is that now you can turn off loading into Perl objects by default when using !!perl/.. schema statements (by setting \$YAML::XS::LoadBlessed=0).  
Her latest report can be read in full on [her blog](http://blogs.perl.org/users/tinita/2018/01/yamlpp-grant-report-december-2017.html). Code is always fresh at <https://github.com/perlpunk/YAML-PP-p5>.  
MAJ  

### Categories: [Grants](grants.html)
