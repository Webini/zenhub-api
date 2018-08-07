const ZenHub = require('../src/index.js');
const nock = require('nock');
const assert = require('assert');
const url = require('url');

const PUBLIC_API_ENDPOINT = 'https://api.zenhub.io';

var conf;
try {
  conf = require('./config.json');
} catch (err) {
  conf = {
    nockOnly: true,
    apiKey: 'test',
    repoId: 1,
    issueNumber: 2,
    epicIssueNumber: 3,
    pipelineId: 4,
    releaseId: 5,
    secondRepoId: 6,
    releaseTitle: 'Release Title',
    releaseDescription: 'Release Description'
  }
}

describe('ZenHub public API with nock', () => {
  addMethodTests();
});
describe('ZenHub enterprise API with nock', () => {
  addMethodTests('https://zenhub.enterprise');
});
var public_connect = conf.nockOnly ? describe.skip : describe;
public_connect('ZenHub public API', () => {
  before(() => {
    nock.restore();
  });
  addMethodTests();
  after(() => {
    nock.activate();
    nock.cleanAll();
  });
});

function addMethodTests(apiUrl) {
  const api = new ZenHub(conf.apiKey, apiUrl);
  const nockHeaders = {
    reqheaders: {
      'x-authentication-token': conf.apiKey,
      'accept': 'application/json'
    }
  }

  if (apiUrl === undefined) {
    apiUrl = PUBLIC_API_ENDPOINT;
  }
  let apiUrlParts = url.parse(apiUrl);
  let apiHostname = `${apiUrlParts.protocol}//${apiUrlParts.host}`;
  let apiPath = apiUrlParts.pathname;

  it('should get issue data', function() {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/repositories/${conf.repoId}/issues/${conf.issueNumber}`))
      .reply(200);
    return api.getIssueData({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber
    });
  });

  it('should get issue events', function() {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/repositories/${conf.repoId}/issues/${conf.issueNumber}/events`))
      .reply(200);
    return api.getIssueEvents({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber
    });
  });

  it('should get board', function() {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/repositories/${conf.repoId}/board`))
      .reply(200);
    return api.getBoard({
      repo_id: conf.repoId
    });
  });

  it('should get epic data', function() {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/repositories/${conf.repoId}/epics/${conf.epicIssueNumber}`))
      .reply(200);
    return api.getEpicData({
      repo_id: conf.repoId,
      epic_id: conf.epicIssueNumber
    });
  });

  it('should change pipeline', function() {
    let body = { pipeline_id: conf.pipelineId, position: 'top' };
    nock(apiHostname, nockHeaders)
      .post(
        url.resolve(apiPath, `p1/repositories/${conf.repoId}/issues/${conf.issueNumber}/moves`),
        body
      )
      .reply(200);
    return api.changePipeline({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
      body: body
    });
  });

  it('should set estimate', function() {
    let body = { estimate: 15 };
    nock(apiHostname, nockHeaders)
      .put(
        url.resolve(apiPath, `p1/repositories/${conf.repoId}/issues/${conf.issueNumber}/estimate`),
        body
      )
      .reply(200);
    return api.setEstimate({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
      body: body
    });
  });

  it('should convert issue to epic', function() {
    nock(apiHostname, nockHeaders)
      .post(url.resolve(apiPath, `p1/repositories/${conf.repoId}/issues/${conf.issueNumber}/convert_to_epic`))
      .reply(200);
    return api.convertToEpic({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
    });
  });

  it('should convert epic to issue', function() {
    nock(apiHostname, nockHeaders)
      .post(url.resolve(apiPath, `p1/repositories/${conf.repoId}/epics/${conf.issueNumber}/convert_to_issue`))
      .reply(200);
    return api.convertToIssue({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
    });
  });

  it('should add issue to epic', function() {
    let body = {
      add_issues: [
        {
          repo_id: parseInt(conf.repoId), //zenhub validators check field type, it must be numeric
          issue_number: parseInt(conf.issueNumber) //zenhub validators check field type, it must be numeric
        }
      ]
    }
    nock(apiHostname, nockHeaders)
      .post(
        url.resolve(apiPath, `p1/repositories/${conf.repoId}/epics/${conf.epicIssueNumber}/update_issues`),
        body
      )
      .reply(200);
    return api.addOrRemoveToEpic({
      repo_id: conf.repoId,
      issue_number: conf.epicIssueNumber,
      body: body
    });
  });

  it('should remove issue from epic', function() {
    let body = {
      remove_issues: [
        {
          repo_id: parseInt(conf.repoId), //zenhub validators check field type, it must be numeric
          issue_number: parseInt(conf.issueNumber) //zenhub validators check field type, it must be numeric
        }
      ]
    }
    nock(apiHostname, nockHeaders)
      .post(
        url.resolve(apiPath, `p1/repositories/${conf.repoId}/epics/${conf.epicIssueNumber}/update_issues`),
        body
      )
      .reply(200);
    return api.addOrRemoveToEpic({
      repo_id: conf.repoId,
      issue_number: conf.epicIssueNumber,
      body: body
    });
  });

  it('should create release report', function () {
    let body = {
      title: conf.releaseTitle
    };
    nock(apiHostname, nockHeaders)
      .post(
        url.resolve(apiPath, `p1/repositories/${conf.repoId}/reports/release`),
        body
      )
      .reply(200);
    return api.createReleaseReport({
      repo_id: conf.repoId,
      body: body
    });
  });

  it('should get release report', function () {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/reports/release/${conf.releaseId}`))
      .reply(200);
    return api.getReleaseReport({
      release_id: conf.releaseId
    });
  });

  it('should get release reports for repo', function () {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/repositories/${conf.repoId}/reports/releases`))
      .reply(200);
    return api.getReleaseReportsForRepo({
      repo_id: conf.repoId
    });
  });

  it('should edit release report', function () {
    let body = {
      description: conf.releaseDescription
    }
    nock(apiHostname, nockHeaders)
      .patch(
        url.resolve(apiPath, `p1/reports/release/${conf.releaseId}`),
        body
      )
      .reply(200);
    return api.editReleaseReport({
      release_id: conf.releaseId,
      body: body
    });
  });

  it('should add to release report', function () {
    let body = {
      add_issues: [
        { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.issueNumber)},
        { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.epicIssueNumber)}
      ],
      remove_issues: []
    }
    nock(apiHostname, nockHeaders)
      .patch(
        url.resolve(apiPath, `p1/reports/release/${conf.releaseId}/issues`),
        body
      )
      .reply(200);
    return api.addOrRemoveToReleaseReport({
      release_id: conf.releaseId,
      body: body
    });
  });

  it('should get release report issues', function () {
    nock(apiHostname, nockHeaders)
      .get(url.resolve(apiPath, `p1/reports/release/${conf.releaseId}/issues`))
      .reply(200);
    return api.getReleaseReportIssues({
      release_id: conf.releaseId
    });
  });

  it('should remove from release report', function () {
    let body = {
      add_issues: [],
      remove_issues: [
        { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.issueNumber)},
        { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.epicIssueNumber)}
      ]
    }
    nock(apiHostname, nockHeaders)
      .patch(
        url.resolve(apiPath, `p1/reports/release/${conf.releaseId}/issues`),
        body
      )
      .reply(200);
    return api.addOrRemoveToReleaseReport({
      release_id: conf.releaseId,
      body: body
    });
  });

  it('should add workspace to release report', function () {
    let body = {
      repositories: [
        conf.secondRepoId
      ]
    }
    nock(apiHostname, nockHeaders)
      .patch(
        url.resolve(apiPath, `p1/reports/release/${conf.releaseId}/workspaces/add`),
        body
      )
      .reply(200);
    return api.addWorkspaceToReleaseReport({
      release_id: conf.releaseId,
      body: body
    });
  });

  it('should remove workspace from release report', function () {
    let body = {
      repositories: [
        conf.secondRepoId
      ]
    }
    nock(apiHostname, nockHeaders)
      .patch(
        url.resolve(apiPath, `p1/reports/release/${conf.releaseId}/workspaces/remove`),
        body
      )
      .reply(200);
    return api.removeWorkspaceFromReleaseReport({
      release_id: conf.releaseId,
      body: body
    });
  });
}
