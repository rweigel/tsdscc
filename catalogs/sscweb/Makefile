CAT=SSCWeb

all: 
	make clean
	make catalog

catalog: $(CAT)-tsds.xml

src/txtcatalog.class: src/txtcatalog.java 
	cd src; javac -cp ../jar/jaxws-rt-2.0EA3.jar:../jar/sscWS-client.jar txtcatalog.java

src/xmlcatalog.class: src/xmlcatalog.java
	cd src; javac xmlcatalog.java

$(CAT).raw: src/txtcatalog.class
	java -cp jar/jaxws-rt-2.0EA3.jar:jar/sscWS-client.jar:src txtcatalog > $(CAT).raw

$(CAT)-tsds.xml: $(CAT).raw src/xmlcatalog.class template.xml
	java -cp src xmlcatalog $(CAT).raw > $(CAT)-tsds.xml

clean:
	- mv SSCWeb-tsds.xml archive/SSCWeb-tsds-`/bin/date +\%Y\%m\%d`.xml
	- rm -f *.raw
	- rm -f $(CAT)*.xml*

distclean:
	- rm -f src/*.class
