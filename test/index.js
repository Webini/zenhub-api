const conf = require('./config.json');
const ZenHub = require('../src/index.js');
const assert = require('assert');

describe('ZenHub', function() {
  const api = new ZenHub(conf.apiKey);

  it('should get issue data', function() {
    return api.getIssueData({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber
    });
  });

  it('should get issue events', function() {
    return api.getIssueEvents({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber
    });
  });

  it('should get board', function() {
    return api.getBoard({
      repo_id: conf.repoId
    });
  });

  it('should get epic data', function() {
    return api.getEpicData({
      repo_id: conf.repoId,
      epic_id: conf.epicIssueNumber
    });
  });

  it('change pipeline', function() {
    return api.changePipeline({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
      body: {
        pipeline_id: conf.pipelineId,
        position: 'top'
      }
    });
  });

  it('set estimate', function() {
    return api.setEstimate({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
      body: {
        estimate: 15
      }
    });
  });

  it('convert to epic', function() {
    return api.convertToEpic({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
    });
  });

  it('convert to issue', function() {
    return api.convertToIssue({
      repo_id: conf.repoId,
      issue_number: conf.issueNumber,
    });
  });

  it('add to epic', function() {
    return api.addOrRemoveToEpic({
      repo_id: conf.repoId,
      issue_number: conf.epicIssueNumber,
      body: {
        add_issues: [
          {
            repo_id: parseInt(conf.repoId), //zenhub validators check field type, it must be numeric
            issue_number: parseInt(conf.issueNumber) //zenhub validators check field type, it must be numeric
          }
        ]
      }
    });
  });

  it('remove from epic', function() {
    return api.addOrRemoveToEpic({
      repo_id: conf.repoId,
      issue_number: conf.epicIssueNumber,
      body: {
        remove_issues: [
          {
            repo_id: parseInt(conf.repoId), //zenhub validators check field type, it must be numeric
            issue_number: parseInt(conf.issueNumber) //zenhub validators check field type, it must be numeric
          }
        ]
      }
    });
  });

  it('create release report', function () {
    return api.createReleaseReport({
      repo_id: conf.repoId,
      body: {
        title: conf.releaseTitle
      }
    });
  });

  it('get release report', function () {
    return api.getReleaseReport({
      release_id: conf.releaseId
    });
  });

  it('get release reports for repo', function () {
    return api.getReleaseReportsForRepo({
      repo_id: conf.repoId
    });
  });

  it('edit release report', function () {
    return api.editReleaseReport({
      release_id: conf.releaseId,
      body: {
        description: conf.releaseDescription
      }
    });
  });

  it('add to release report', function () {
    return api.addOrRemoveToReleaseReport({
      release_id: conf.releaseId,
      body: {
        add_issues: [
          { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.issueNumber)},
          { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.epicIssueNumber)}
        ],
        remove_issues: []
      }
    });
  });

  it('get release report issues', function () {
    return api.getReleaseReportIssues({
      release_id: conf.releaseId
    });
  });

  it('remove from release report', function () {
    return api.addOrRemoveToReleaseReport({
      release_id: conf.releaseId,
      body: {
        add_issues: [],
        remove_issues: [
          { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.issueNumber)},
          { repo_id: parseInt(conf.repoId), issue_number: parseInt(conf.epicIssueNumber)}
        ]
      }
    });
  });

  it('add workspace to release report', function () {
    return api.addWorkspaceToReleaseReport({
      release_id: conf.releaseId,
      body: {
        repositories: [
          conf.secondRepoId
        ]
      }
    });
  });

  it('remove workspace from release report', function () {
    return api.removeWorkspaceFromReleaseReport({
      release_id: conf.releaseId,
      body: {
        repositories: [
          conf.secondRepoId
        ]
      }
    });
  });
});
