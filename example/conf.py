extensions = []
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'
project = u'example'
copyright = u'2013, me'
version = '1.0'
release = '1.0'
exclude_patterns = ['_build']
pygments_style = 'sphinx'
html_theme = 'colorhead'
html_theme_path = [".."]
html_static_path = ['_static']
htmlhelp_basename = 'exampledoc'
latex_elements = {
}
latex_documents = [
  ('index', 'example.tex', u'example Documentation',
   u'me', 'manual'),
]
man_pages = [
    ('index', 'example', u'example Documentation',
     [u'me'], 1)
]
texinfo_documents = [
  ('index', 'example', u'example Documentation',
   u'me', 'example', 'One line description of project.',
   'Miscellaneous'),
]
