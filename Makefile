#
# Template Makefile. Running ``make`` will:
#
# * Compile the JS file
# * Compile the example template
#

PLOVR=~/work/__libs__/plovr/build/plovr.jar

.PHONY: js html

all: js html
	echo done

js:
	(cd js && PLOVR=${PLOVR} make)

html:
	(cd example && make html)
