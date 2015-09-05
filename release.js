#!/usr/bin/env node

'use strict';

require('shelljs/global');

function isDirectoryClean() {
  var fatalState = config.fatal;
  config.fatal = false;
  var isUnstagedChanges = exec('git diff --exit-code', {silent:true}).code;
  var isStagedChanged =
    exec('git diff --cached --exit-code', {silent:true}).code;
  config.fatal = fatalState;

  return !(isUnstagedChanges || isStagedChanged);
}

function prerelease() {
  if (!isDirectoryClean()) {
    echo('RELEASE ERROR: Working directory must be clean to push release!');
    exit(1);
  }
}

function bump(version) {
  return exec('npm --no-git-tag-version version ' + version, {silent: true})
    .output.replace(/\n$/g, '');
}

function execOrExit(cmd) {
  var code = exec(cmd).code;
  if (code !== 0) {
    exit(code);
  }
}

function changelog(releaseVersion, fileName) {
  var changelogFileName = fileName || 'CHANGELOG.md';
  execOrExit('touch ' + changelogFileName);
  execOrExit('node ./bin/changelog.js ' + releaseVersion + ' CHANGELOG.tmp');
  cat('CHANGELOG.tmp', changelogFileName).to('CHANGELOG.md.tmp');
  rm('CHANGELOG.tmp');
  rm(changelogFileName);
  mv('CHANGELOG.md.tmp', changelogFileName);
}

function commit(releaseVersion) {
  execOrExit('git add -A');
  execOrExit('git commit -m "chore(release): ' + releaseVersion + '"');
  execOrExit('git tag -f ' + releaseVersion);
  execOrExit('git push origin HEAD --tags');
}

function release(version, fileName) {
  prerelease();
  var releaseVersion = bump(version);
  changelog(releaseVersion, fileName);
  commit(releaseVersion);
}

release(process.argv[2], process.argv[3]);
