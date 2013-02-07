goog.provide('SphinxFolding');

goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Console');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');


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
  goog.debug.Console.autoInstall();

  var classes = goog.dom.getElementsByTagNameAndClass('dt');
  goog.array.forEach(classes, function(obj){
    var container = goog.dom.getNextElementSibling(obj);
    if (goog.isDefAndNotNull(container)) {
      goog.style.showElement(container, false);
    }
    goog.events.listen(obj, goog.events.EventType.CLICK, function(evt) {
      SphinxFolding.toggleVisibility(this);
    });
  });
};


SphinxFolding.toggleVisibility = function(obj) {
  SphinxFolding.LOG.finer("Toggling visibility of sibling of " + obj.tagName);
  var container = goog.dom.getNextElementSibling(obj);
  SphinxFolding.LOG.fine("Sibling is " + container);
  goog.style.showElement(container, !goog.style.isElementShown(container));
};


/**
 * The class logger
 */
SphinxFolding.LOG = goog.debug.Logger.getLogger('SphinxFolding');


goog.exportSymbol('SphinxFolding', SphinxFolding);
