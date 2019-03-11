# Express Authentication

Express authentication template using Passport + flash messages + custom middleware

## Getting Started

#### Scaffold w/tests (see `master` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database

#### Finished version (see `brian-finished` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Run `createdb express_auth_development` to create the development database
  * Run `createdb express_auth_test` to create the test database
  * Run `sequelize db:migrate` to run migrations

# ReadIt
# Overview
-   ReadIt is a full-stack news app, bringing you headlines from the US', and the world's, biggest stories.  The build was primarily conducted using Express and Node.js.

# Development
-   As is often the case, ReadIt began as something completely different.  Developed for an assignment, the parameters which required to be met stated a full-stack app, which called upon an API and had full CRUD routes was to be built.  Initially, I began working on a different app, and then another, before finally setting my sights on ReadIt as a feasible idea.
-   The first two days were lost time in development, although while no product was produced from the first two iterations of the product, I was able to further familiarize myself with the code being used.  This meant that while I was, ultimately, left with less time to complete my project, I had the additional experience of learning from my previous mistakes.
-   The decision was taken to use the newsapi.org API as it appeared to be one of the most robust available free APIs out there.
-   I began development by planning out my models, before moving onto writing my CRUD routes.  I made the decision to *create a list of articles to read later, *delete said articles once consumed and to *update username (i.e. personal information). *Read routes were used for each page in order to meet requirements and to ensure the app was fully developed.

# Problems faced
-   Writing routes is fun, is something nobody will ever say. Getting to grips with my routes was ultimately the most challenging aspect of the project and I'm glad I was able to overcome these issues.
-   I attempted to include additional search functionality into the app, however this was a late addition after MVP had been achieved and it was causing some sort of conflict with other aspects of the app.  This being the case, I decided not to include it.

# Future additions
-   Search functionality based on publications, country and/or category would be an excellent addition once I've worked out the nuances. Additional lists for different search terms would also be a desirable addition.