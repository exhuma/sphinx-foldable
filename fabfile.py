import fabric.api as fab


@fab.task
def develop():
    fab.local('[ -d dev ] || mkdir dev')
    fab.local('[ -f dev/plovr-81ed862.jar ] || wget -O dev/plovr-81ed862.jar '
              'https://plovr.googlecode.com/files/plovr-81ed862.jar')
    fab.local('[ -d env ] || virtualenv env')
    fab.local('./env/bin/pip install sphinx')
