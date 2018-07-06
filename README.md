Node.js ZenHub Api
==========

## Usage

```js
  const ZenHub = require('zenhub-api');

  const api = new ZenHub(apiKey);
  api
    .getBoard({ repo_id: 01234 })
    .then((data) => {
      console.log('Yheaa some data', data);
    })
    .catch((e) => {
      console.log('Nooo :( errors everywhere', e);
    })
  ;
```
You can find more samples in the test directory.

## Official documentation
Can be found [here](https://github.com/ZenHubIO/API)


## Available methods

- [getIssueData](https://github.com/ZenHubIO/API#get-issue-data)
- [getIssueEvents](https://github.com/ZenHubIO/API#get-issue-events)
- [getBoard](https://github.com/ZenHubIO/API#get-the-zenhub-board-data-for-a-repository)
- [getEpics](https://github.com/ZenHubIO/API#get-epics-for-a-repository)
- [getEpicData](https://github.com/ZenHubIO/API#get-epic-data)
- [changePipeline](https://github.com/ZenHubIO/API#move-issue-between-pipelines)
- [setEstimate](https://github.com/ZenHubIO/API#set-estimate-for-issue)
- [convertToEpic](https://github.com/ZenHubIO/API#convert-issue-to-epic)
- [convertToIssue](https://github.com/ZenHubIO/API#convert-epic-to-issue)
- [addOrRemoveToEpic](https://github.com/ZenHubIO/API#add-or-remove-issues-to-epic)
- [createReleaseReport](https://github.com/ZenHubIO/API#create-a-release-report)
- [getReleaseReport](https://github.com/ZenHubIO/API#get-a-release-report)
- [getReleaseReportsForRepo](https://github.com/ZenHubIO/API#get-release-reports-for-a-repository)
- [editReleaseReport](https://github.com/ZenHubIO/API#edit-a-release-report)
- [addWorkspaceToReleaseReport](https://github.com/ZenHubIO/API#add-workspaces-to-a-release-report)
- [removeWorkspaceFromReleaseReport](https://github.com/ZenHubIO/API#remove-workspaces-from-release-report)
- [getReleaseReportIssues](https://github.com/ZenHubIO/API#get-all-the-issues-for-a-release-report)
- [addOrRemoveToReleaseReport](https://github.com/ZenHubIO/API#add-or-remove-issues-to-or-from-a-release-report)
