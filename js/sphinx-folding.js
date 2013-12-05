goog.provide('SphinxFolding');

goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.ui.AnimatedZippy');


/**
 * @constructor
 */
SphinxFolding = function() {
  this.setupLogging();
  this.collapseDefterms([
      'class',
      'method',
      'exception',
      'function']);
  this.makeTargetedVisible();
};


/**
 * configure the logging framework.
 */
SphinxFolding.prototype.setupLogging = function() {
  goog.require('goog.debug.FancyWindow');
  if (goog.DEBUG) {
    var debugWindow = new goog.debug.FancyWindow('main');
    debugWindow.setEnabled(true);
    debugWindow.init();
  }
  goog.debug.Console.autoInstall();
};


/**
 * Loop through all DT elements and collapse those which contain specific class
 * names.
 *
 * @param {Array.<string>} collapsedClasses A list of classes. If a DT element
 *    contains any of these classes it will become collapsible.
 */
SphinxFolding.prototype.collapseDefterms = function(collapsedClasses) {
  var hasClass = goog.dom.classes.has;
  var defterms = goog.dom.getElementsByTagNameAndClass('dt');
  var self = this;
  this.zippies = {};
  goog.array.forEach(defterms, function(defterm) {
    var defList = defterm.parentNode;
    if (goog.array.some(collapsedClasses, function(el) {
          return hasClass(defList, el)})) {
      var container = goog.dom.getNextElementSibling(defterm);
      if (goog.isDefAndNotNull(container) && goog.isDefAndNotNull(defterm.id)) {
        var zippy = new goog.ui.AnimatedZippy(defterm, container, false);
        zippy.animationDuration = 100;
        self.zippies[defterm.id] = zippy;
      }
    }
  });
};


/**
 * Open the given zippy and all "parent" zippies in which this one is contained
 * in, so it's visible on screen.
 *
 * @param {goog.ui.AnimatedZippy} zippy The targeted zippy.
 */
SphinxFolding.prototype.ensureVisible = function(zippy) {
  var self = this;

  if (!goog.isDefAndNotNull(zippy)) {
    SphinxFolding.LOG.warning('Zippy ' + zippy + ' not found!');
    return;
  }

  var deflists = goog.dom.getElementsByTagNameAndClass('dl');
  goog.array.forEach(deflists, function(element) {
    if (goog.dom.contains(element, zippy.elHeader_)) {
      var firstElement = goog.dom.getFirstElementChild(element);
      if (self.zippies.hasOwnProperty(firstElement.id)) {
        self.zippies[firstElement.id].setExpanded(true);
      }
    }
  });

};


/**
 * If the page is accessed with an URI fragment, make sure that element is
 * visible by opening that definition list and all definition lists which may
 * contain it.
 */
SphinxFolding.prototype.makeTargetedVisible = function() {
  var thisUri = new goog.Uri(location.href);
  var targetedZippy = this.zippies[thisUri.getFragment()];
  if (goog.isDefAndNotNull(targetedZippy)) {
    this.ensureVisible(targetedZippy);
  }
};


/**
 * The class logger
 */
SphinxFolding.LOG = goog.debug.Logger.getLogger('SphinxFolding');


goog.exportSymbol('SphinxFolding', SphinxFolding);
