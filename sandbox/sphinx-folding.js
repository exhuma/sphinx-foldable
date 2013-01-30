goog.provide('SphinxFolding');

goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.debug.Logger');
goog.require('goog.dom');


/**
 * @constructor
 */
SphinxFolding = function() {
  // empty constructor
};


SphinxFolding.prototype.init = function() {
  goog.require('goog.debug.FancyWindow');
  var debugWindow = new goog.debug.FancyWindow('main');
  debugWindow.setEnabled(true);
  debugWindow.init();

  var classes = goog.dom.getElementsByTagNameAndClass('dl', 'class');
  SphinxFolding.LOG.info(goog.debug.expose(classes));
};


/**
 * The class logger
 */
SphinxFolding.LOG = goog.debug.Logger.getLogger('SphinxFolding');


goog.exportSymbol('SphinxFolding', SphinxFolding);
