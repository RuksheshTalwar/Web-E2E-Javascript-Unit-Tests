# ChallengeTrivago
#Initiate the git on local:
git init

#Generate package json file:
npm init

#Generate wdio conf file:
./node_modules/.bin/wdio

#To install the dependencies mentioned in package json file:
npm install

#To run the tests:
npm test

#To generate allure report
allure generate ./reports/allure-results/

#To open allure report
allure open