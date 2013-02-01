#
# Template Makefile. Running ``make`` will:
#
# * Compile the JS file
# * Compile the example template
#

PLOVR=~/work/__libs__/plovr/build/plovr.jar

all:
	(cd js && PLOVR=${PLOVR} make)
	(cd example && make html)
