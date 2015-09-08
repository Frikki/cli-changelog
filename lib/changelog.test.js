#!/usr/bin/env node

'use strict';

process.env['NODE_ENV'] = 'test';

var test = require('tape');
var changelog = require('./changelog.js');

test('makeLinkUrl(null) returns "#"', function(assert) {
  var expected = '#';

  assert.equal(changelog.makeLinkUrl(null), expected,
    'Failed null URL');

  assert.end();
});

test('makeLinkUrl(undefined) returns "#"', function(assert) {
  var expected = '#';

  assert.equal(changelog.makeLinkUrl(void 0), expected,
    'Failed undefined URL');

  assert.end();
});

test('makeLinkUrl("username/repo") returns "https://github.com/username/repo"',
  function(assert) {
    var expected = 'https://github.com/username/repo';

    assert.equal(changelog.makeLinkUrl('username/repo'), expected,
      'Failed username/repo URL');

    assert.end();
  }
);

test('makeLinkUrl("http://example.com/username/repo") returns "http://example.com/username/repo"',
  function(assert) {
    var expected = 'http://example.com/username/repo';

    assert.equal(changelog.makeLinkUrl('http://example.com/username/repo'), expected,
      'Failed http URL');

    assert.end();
  }
);

test('makeLinkUrl("https://example.com/username/repo") returns "https://example.com/username/repo"',
  function(assert) {
    var expected = 'https://example.com/username/repo';

    assert.equal(changelog.makeLinkUrl('https://example.com/username/repo'), expected,
      'Failed https URL');

    assert.end();
  }
);

test('makeLinkUrl("gist:11081aaa281") returns "#"',
  function(assert) {
    var expected = '#';

    assert.equal(changelog.makeLinkUrl('gist:11081aaa281'), expected,
      'Failed gist URL');

    assert.end();
  }
);

test('makeLinkUrl("bitbucket:username/repo") returns "https://bitbucket.org/username/repo"',
  function(assert) {
    var expected = 'https://bitbucket.org/username/repo';

    assert.equal(changelog.makeLinkUrl('bitbucket:username/repo'), expected,
      'Failed bitbucket URL');

    assert.end();
  }
);
