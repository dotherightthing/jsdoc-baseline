/*
    Copyright 2014 Google Inc. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
'use strict';

/** @module lib/symboltracker */

var _ = require('underscore-contrib');

var CATEGORIES = require('./enums').CATEGORIES;
var hasOwnProp = Object.prototype.hasOwnProperty;

// Tracks ALL doclets by category (similar, but not identical, to their "kind")
var SymbolTracker = module.exports = function SymbolTracker() {
    var category;
    var categories = Object.keys(CATEGORIES);

    for (var i = 0, l = categories.length; i < l; i++) {
        category = CATEGORIES[categories[i]];
        this[category] = [];
    }

    this.longnames = {};
};

SymbolTracker.prototype._addLongname = function _addLongname(doclet) {
    if (!hasOwnProp.call(this.longnames, doclet.longname)) {
        this.longnames[doclet.longname] = [];
    }

    this.longnames[doclet.longname].push(doclet);

    return this;
};

SymbolTracker.prototype.add = function add(doclet, category) {
    if (hasOwnProp.call(this, category)) {
        this[category].push(doclet);
    }

    this._addLongname(doclet);

    return this;
};

SymbolTracker.prototype.remove = function remove(doclet, category) {
    var idx;
    var removed = [];

    if (hasOwnProp.call(this, category)) {
        idx = this[category].indexOf(doclet);
        if (idx !== -1) {
            removed = this[category].splice(idx, 1);
        }
    }

    return removed;
};

SymbolTracker.prototype.get = function get(category, options) {
    var categories = category ? [category] : _.values(CATEGORIES);
    var current;
    var doclets;

    options = _.defaults(options || {}, {
        categorize: false
    });

    doclets = options.categorize ? {} : [];

    for (var i = 0, l = categories.length; i < l; i++) {
        current = categories[i];
        if (hasOwnProp.call(this, current) && this[current].length) {
            if (options.categorize) {
                doclets[current] = this[current].slice(0);
            }
            else {
                doclets = doclets.concat(this[current]);
            }
        }
    }

    return doclets;
};

SymbolTracker.prototype.getAllLongnames = function getAllLongnames() {
    return this.longnames;
};

SymbolTracker.prototype.getLongname = function getLongname(longname) {
    if (!hasOwnProp.call(this.longnames, longname)) {
        return [];
    }

    return this.longnames[longname].slice(0);
};

SymbolTracker.prototype.hasDoclets = function hasDoclets(category) {
    var current;

    var categories = category ? [category] : Object.keys(CATEGORIES);
    var result = false;

    for (var i = 0, l = categories.length; i < l; i++) {
        current = CATEGORIES[categories[i]];

        if (current && this[current].length) {
            result = true;
            break;
        }
    }

    return result;
};
