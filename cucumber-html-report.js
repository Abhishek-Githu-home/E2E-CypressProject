var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonDir: './cypress/cucumberReports',
        output: './cypress/cucumber_htmlReports.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "Author" : "Abhishek",
            "Browser": "Chrome-138.0.9",
            "Platform": "Windows 11",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        },
        failedSummaryReport: true,
    };

    reporter.generate(options);
    

    //more info on `metadata` is available in `options` section below.

    //to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.