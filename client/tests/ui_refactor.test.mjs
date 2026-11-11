import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  filterTopicsByQuery,
  getTopicInitials,
  shouldShowMobileWorkspaceNotice,
} from '../src/utils/uiHelpers.js';

test('filterTopicsByQuery filters topics case-insensitively across title and description', () => {
  const topics = [
    { _id: '1', title: 'Dynamic Programming', description: 'Memoization and tabulation patterns' },
    { _id: '2', title: 'Graphs & BFS/DFS', description: 'Shortest path and topological sort' },
  ];
  assert.equal(filterTopicsByQuery(topics, '').length, 2);
  assert.equal(filterTopicsByQuery(topics, 'memoization').length, 1);
  assert.equal(filterTopicsByQuery(topics, 'graphs')[0]._id, '2');
  assert.equal(filterTopicsByQuery(topics, 'nonexistent').length, 0);
});

test('shouldShowMobileWorkspaceNotice allows responsive public and discovery screens on mobile', () => {
  assert.equal(shouldShowMobileWorkspaceNotice('/', 375), false);
  assert.equal(shouldShowMobileWorkspaceNotice('/login', 375), false);
  assert.equal(shouldShowMobileWorkspaceNotice('/home', 768), false);
  assert.equal(shouldShowMobileWorkspaceNotice('/curve/123', 480), true);
  assert.equal(shouldShowMobileWorkspaceNotice('/curve/123', 1024), false);
});

test('getTopicInitials and main.jsx StrictMode root render syntax check', () => {
  assert.equal(getTopicInitials('Binary Search'), 'BS');
  assert.equal(getTopicInitials('Arrays'), 'AR');

  const mainJsx = fs.readFileSync(
    path.resolve('client/src/main.jsx'),
    'utf-8'
  );
  assert.ok(!mainJsx.includes('{/* </StrictMode> */}'), 'Removed invalid JSX comment argument inside render()');
});
