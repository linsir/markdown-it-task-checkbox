/* globals before, describe, it */

var fs = require('fs');
var assert = require('assert');
var md = require('markdown-it');
var cheerio = require('cheerio');
var taskLists = require('..');

describe('markdown-it-task-lists', function() {
    var fixtures = {}, rendered = {}, $ = {}, parser;

    before(function() {
        var files = {
            bullet: 'bullet.md',
            ordered: 'ordered.md',
            mixedNested: 'mixed-nested.md',
            dirty: 'dirty.md'
        };

        parser = md().use(taskLists);

        for (var key in files) {
            fixtures[key] = fs.readFileSync(__dirname + '/fixtures/' + files[key]).toString();
            rendered[key] = parser.render(fixtures[key]);
            $[key] = cheerio.load(rendered[key]);
        }
    });

    it('renders tab-indented code differently than default markdown-it', function() {
        var parserDefault = md();
        var parserWithPlugin = md().use(taskLists);
        assert.notEqual(parserDefault.render(fixtures.bullet), parserWithPlugin.render(fixtures.bullet));
    });

    it('adds input.task-list-item-checkbox in items', function () {
        assert(~$.bullet('input.task-list-item-checkbox').length);
    });

    it('renders items marked up as [ ] as unchecked', function () {
        var shouldBeUnchecked = (fixtures.ordered.match(/[\.\*\+-]\s+\[[ \u00A0]\]/g) || []).length;
        assert.equal($.ordered('input[type=checkbox]:not(:checked)').length, shouldBeUnchecked);
    });

    it('renders items marked up as [x] as checked', function () {
        var shouldBeChecked = (fixtures.ordered.match(/[\.\*\+-]\s+\[[Xx]\]/g) || []).length;
        assert.equal(shouldBeChecked, $.ordered('input[type=checkbox]:checked').length);
    });

    it('disables the rendered checkboxes', function () {
        assert(!$.bullet('input[type=checkbox].task-list-item-checkbox:not([disabled])').length);
    });

    it('enables the rendered checkboxes when options.disabled is falsy', function () {
        var enabledParser = md().use(taskLists, {disabled: false});
        var $$ = cheerio.load(enabledParser.render(fixtures.ordered));
        assert($$('input[type=checkbox]:not([disabled])').length > 0);
    });

    it("gives the rendered list items a <label> element", function () {
        var labeledParser = md().use(taskLists);
        var $$ = cheerio.load(labeledParser.render(fixtures.ordered));
        assert($$('.task-list-item > label').length > 0);
    });

    it('does NOT render [  ], "[ ]" (no space after closing bracket), [ x], [x ], or [ x ] as checkboxes', function () {
        var html = $.dirty.html();
        assert(~html.indexOf('<li>[  ]'));
        assert(~html.indexOf('<li>[ ]</li>'));
        assert(~html.indexOf('<li>[x ]'));
        assert(~html.indexOf('<li>[ x]'));
        assert(~html.indexOf('<li>[ x ]'));
        assert(~html.indexOf('<li>[&#xA0; ]'));
        assert(~html.indexOf('<li>[ &#xA0;]'));
        assert(~html.indexOf('<li>[&#xA0;&#xA0;]'));
        assert(~html.indexOf('<li>[&#xA0;]</li>'));
        assert(~html.indexOf('<li>[x&#xA0;]'));
        assert(~html.indexOf('<li>[&#xA0;x]'));
        assert(~html.indexOf('<li>[&#xA0;x ]'));
        assert(~html.indexOf('<li>[&#xA0;x&#xA0;]'));
        assert(~html.indexOf('<li>[ x&#xA0;]'));
    });

    it('adds class .task-list-item to parent <li>', function () {
        assert(~$.bullet('li.task-list-item').length);
    });

    it('adds class .task-list to lists', function () {
        assert(~$.bullet('ol.task-list, ul.task-list').length);
    });

    it('only adds .task-list to most immediate parent list', function () {
        assert($.mixedNested('ol:not(.task-list) ul.task-list').length);
    });
});
