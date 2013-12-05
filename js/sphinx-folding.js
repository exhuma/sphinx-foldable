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
  goog.require('goog.debug.FancyWindow');
  if (goog.DEBUG) {
    var debugWindow = new goog.debug.FancyWindow('main');
    debugWindow.setEnabled(true);
    debugWindow.init();
  }
  goog.debug.Console.autoInstall();

  var hasClass = goog.dom.classes.has;
  var defterms = goog.dom.getElementsByTagNameAndClass('dt');
  var self = this;
  this.zippies = {};
  goog.array.forEach(defterms, function(defterm){
    var defList = defterm.parentNode;
    if (hasClass(defList, 'class') ||
        hasClass(defList, 'method') ||
        hasClass(defList, 'exception') ||
        hasClass(defList, 'function')) {
      var container = goog.dom.getNextElementSibling(defterm);
      if (goog.isDefAndNotNull(container) && goog.isDefAndNotNull(defterm.id)) {
        var zippy = new goog.ui.AnimatedZippy(defterm, container, false);
        zippy.animationDuration = 100;
        self.zippies[defterm.id] = zippy;
      }
    }
  });
  var thisUri = new goog.Uri(location.href);
  var targetedZippy = this.zippies[thisUri.getFragment()];
  if (goog.isDefAndNotNull(targetedZippy)) {
    this.ensureVisible(targetedZippy);
  }
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
    window['console']['log']('Zippy ' + zippy + ' not found!');
    return;
  }

  var deflists = goog.dom.getElementsByTagNameAndClass('dl');
  goog.array.forEach(deflists, function(element) {
    if (goog.dom.contains(element, zippy.elHeader_)) {
      var firstElement = goog.dom.getFirstElementChild(element);
      if (self.zippies.hasOwnProperty(firstElement.id)){
        self.zippies[firstElement.id].setExpanded(true);
      }
    }
  });

};


/**
 * The class logger
 */
SphinxFolding.LOG = goog.debug.Logger.getLogger('SphinxFolding');


goog.exportSymbol('SphinxFolding', SphinxFolding);
