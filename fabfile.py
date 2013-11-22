from os.path import join
import fabric.api as fab


PLOVR_FILE = 'plovr-eba786b34df9.jar'
PLOVR_PATH = join('dev', PLOVR_FILE)


@fab.task
def develop():
    """
    Sets up a development environment.
    """
    fab.local('[ -d dev ] || mkdir dev')
    fab.local('[ -f {1} ] || wget -O {1} '
              'https://plovr.googlecode.com/files/{0}'.format(
                  PLOVR_FILE, PLOVR_PATH))
    fab.local('[ -d env ] || virtualenv env')
    fab.local('./env/bin/pip install sphinx')


@fab.task
def js():
    """
    Compile the JS source into the target JS file.
    """
    fab.local('java -jar {0} build plovr-config.js'.format(PLOVR_PATH))


@fab.task
def html():
    """
    Compile the example document.
    """
    with fab.lcd('example'):
        fab.local('make html')


@fab.task
def all():
    """
    Compile both JS and HTML
    """
    fab.execute(js)
    fab.execute(html)


@fab.task
def clean():
    """
    Remove compiled files
    """
    fab.local('rm -rf example/_build')
    fab.local('rm -rf foldable/static/foldable.js')
