const request = require('request-promise-native');
const debug   = require('debug')('ZenHub');

const API_URL = 'https://api.zenhub.io/p1';

const API_ENDPOINTS = {
  getIssueData: {
    method: 'GET',
    path: '/repositories/:repo_id/issues/:issue_number',
  },
  getIssueEvents: {
    method: 'GET',
    path: '/repositories/:repo_id/issues/:issue_number/events',
  },
  getBoard: {
    method: 'GET',
    path: '/repositories/:repo_id/board',
  },
  getEpics: {
    method: 'GET',
    path: '/repositories/:repo_id/epics',
  },
  getEpicData: {
    method: 'GET',
    path: '/repositories/:repo_id/epics/:epic_id',
  },
  changePipeline: {
    method: 'POST',
    path: '/repositories/:repo_id/issues/:issue_number/moves',
  },
  setEstimate: {
    method: 'PUT',
    path: '/repositories/:repo_id/issues/:issue_number/estimate'
  },
  convertToEpic: {
    method: 'POST',
    path: '/repositories/:repo_id/issues/:issue_number/convert_to_epic',
  },
  convertToIssue: {
    method: 'POST',
    path: '/repositories/:repo_id/epics/:issue_number/convert_to_issue',
  },
  addOrRemoveToEpic: {
    method: 'POST',
    path: '/repositories/:repo_id/epics/:issue_number/update_issues'
  }
};

function callServer(apiKey, params, endpoint) {
  const uri = API_URL + endpoint.path
    .replace(':repo_id', params.repo_id)
    .replace(':issue_number', params.issue_number)
    .replace(':epic_id', params.epic_id)
  ;

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

function ZenHub(apiKey) {
  this.apiKey = apiKey;
};

Object.keys(API_ENDPOINTS).forEach(function(value) {
  ZenHub.prototype[value] = function(params) {
    return callServer(this.apiKey, params, API_ENDPOINTS[value]);
  };
});

module.exports = ZenHub;