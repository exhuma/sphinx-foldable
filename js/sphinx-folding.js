goog.provide('SphinxFolding');

goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.ui.AnimatedZippy');


/**
 * @constructor
 */
SphinxFolding = function() {
  // empty constructor
};


SphinxFolding.prototype.init = function() {
  goog.require('goog.debug.FancyWindow');
  if (goog.DEBUG) {
    var debugWindow = new goog.debug.FancyWindow('main');
    debugWindow.setEnabled(true);
    debugWindow.init();
  }
  goog.debug.Console.autoInstall();

  var classes = goog.dom.getElementsByTagNameAndClass('dt');
  goog.array.forEach(classes, function(obj){
    var container = goog.dom.getNextElementSibling(obj);
    if (goog.isDefAndNotNull(container)) {
      var zippy = new goog.ui.AnimatedZippy(obj, container, false);
      zippy.animationDuration = 100;
    }
  });
};


/**
 * The class logger
 */
SphinxFolding.LOG = goog.debug.Logger.getLogger('SphinxFolding');


goog.exportSymbol('SphinxFolding', SphinxFolding);
