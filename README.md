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
Can be foud [here](https://github.com/ZenHubIO/API)


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