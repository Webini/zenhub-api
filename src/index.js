const request = require('request-promise-native');
const debug   = require('debug')('ZenHub');
const url     = require('url');

const PUBLIC_API_ENDPOINT = 'https://api.zenhub.io';

const API_ENDPOINTS = {
  getIssueData: {
    method: 'GET',
    path: 'p1/repositories/:repo_id/issues/:issue_number',
  },
  getIssueEvents: {
    method: 'GET',
    path: 'p1/repositories/:repo_id/issues/:issue_number/events',
  },
  getBoard: {
    method: 'GET',
    path: 'p1/repositories/:repo_id/board',
  },
  getEpics: {
    method: 'GET',
    path: 'p1/repositories/:repo_id/epics',
  },
  getEpicData: {
    method: 'GET',
    path: 'p1/repositories/:repo_id/epics/:epic_id',
  },
  changePipeline: {
    method: 'POST',
    path: 'p1/repositories/:repo_id/issues/:issue_number/moves',
  },
  setEstimate: {
    method: 'PUT',
    path: 'p1/repositories/:repo_id/issues/:issue_number/estimate'
  },
  convertToEpic: {
    method: 'POST',
    path: 'p1/repositories/:repo_id/issues/:issue_number/convert_to_epic',
  },
  convertToIssue: {
    method: 'POST',
    path: 'p1/repositories/:repo_id/epics/:issue_number/convert_to_issue',
  },
  addOrRemoveToEpic: {
    method: 'POST',
    path: 'p1/repositories/:repo_id/epics/:issue_number/update_issues'
  },
  createReleaseReport: {
    method: 'POST',
    path: 'p1/repositories/:repo_id/reports/release'
  },
  getReleaseReport: {
    method: 'GET',
    path: 'p1/reports/release/:release_id'
  },
  getReleaseReportsForRepo: {
    method: 'GET',
    path: 'p1/repositories/:repo_id/reports/releases'
  },
  editReleaseReport: {
    method: 'PATCH',
    path: 'p1/reports/release/:release_id'
  },
  addWorkspaceToReleaseReport: {
    method: 'PATCH',
    path: 'p1/reports/release/:release_id/workspaces/add'
  },
  removeWorkspaceFromReleaseReport: {
    method: 'PATCH',
    path: 'p1/reports/release/:release_id/workspaces/remove'
  },
  getReleaseReportIssues: {
    method: 'GET',
    path: 'p1/reports/release/:release_id/issues'
  },
  addOrRemoveToReleaseReport: {
    method: 'PATCH',
    path: 'p1/reports/release/:release_id/issues'
  }
};

function callServer(apiKey, apiUrl, params, endpoint) {
  const uri = url.resolve(apiUrl, endpoint.path
    .replace(':repo_id', params.repo_id)
    .replace(':issue_number', params.issue_number)
    .replace(':epic_id', params.epic_id)
    .replace(':release_id', params.release_id)
  );

  debug('%s %s with %o', endpoint.method, uri, params);

  return request({
      headers: {
        'x-authentication-token': apiKey
      },
      uri: uri,
      json: true,
      method: endpoint.method,
      body: params.body,
  });
}

function ZenHub(apiKey, apiUrl = PUBLIC_API_ENDPOINT) {
  this.apiKey = apiKey;
  this.apiUrl = apiUrl;
};

Object.keys(API_ENDPOINTS).forEach(function(value) {
  ZenHub.prototype[value] = function(params) {
    return callServer(this.apiKey, this.apiUrl, params, API_ENDPOINTS[value]);
  };
});

module.exports = ZenHub;
