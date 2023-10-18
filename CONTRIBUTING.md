# Contributing to s-jwt

## How to contribute

### 1. Fork the repository

Before you do anything else, login/signup on GitHub and fork s-jwt from the [GitHub repository](https://github.com/ahmeducf/s-jwt).

### 2. Clone your fork locally

```bash

git clone git@github.com:<my-github-name>/s-jwt.git

```

### 3. Install dependencies

```bash

npm install

```

### 4. Select an issue to work on

The list of outstanding s-jwt feature requests and bugs can be found on our on our GitHub [issue tracker](https://github.com/ahmeducf/s-jwt/issues). Pick an unassigned issue that you think you can accomplish, add a comment that you are attempting to do it, and shortly your own personal label matching your GitHub ID will be assigned to that issue.

Feel free to propose issues that aren’t described!

### 5. Create a topic branch

In git it is best to isolate each topic or feature into a “topic branch”. While individual commits allow you control over how small individual changes are made to the code, branches are a great way to group a set of commits all related to one feature together, or to isolate different efforts when you might be working on multiple topics at the same time.

```bash

git checkout -b <branch-name>

```

You should use a verbose enough name for your branch so it is clear what it is about. For example, if you are fixing issue #123, a good branch name would be `123-fix-something`.

### 6. Commit changes

Now you can commit your changes and regularly merge in the upstream master as described below. When you are ready to commit your changes, make sure to include a descriptive commit message that describes the changes you have made.

```bash

git commit -m "commit message"

```

### 7. Push changes to your fork

When you are ready to generate a pull request, either for preliminary review, or for consideration of merging into the project you must first push your local topic branch back up to GitHub.

```bash

git push origin <branch-name>

```

> [!IMPORTANT]
>
> ### Pull latest changes from upstream into your fork regularly
>
> It is critical that you pull upstream changes from master into your fork on a regular basis. Nothing is worse than putting in a days of hard work into a pull request only to have it rejected because it has diverged too far from upstream.

### 8. Pull latest changes from upstream into your fork

You can do this at any time to update your fork with the latest changes from the master branch of the upstream repository. This is especially important before you generate a pull request.

```bash

git remote add upstream https://github.com/ahmeducf/s-jwt.git
git fetch upstream

```

Check the log to be sure that you actually want the changes, before merging:

```bash

git log upstream/master

```

Then merge the changes that you fetched:

```bash

git merge upstream/master

```

### 9. Create a pull request

Go to your fork on GitHub and click the green pull request button. Make sure you give a descriptive title and description for your pull request. Include the issue number if you are fixing a bug or implementing a feature request.

## How to get your pull request accepted

### Run the tests

Before you submit a pull request, please run the entire s-jwt test suite

```bash

npm run test

```

### If you add code you need to add tests

If your pull request reduces our test coverage because it lacks tests then it will be **rejected**.

```bash

npm run test:coverage

```

### Keep your pull requests limited to a single issue

If you want to fix two different things, submit two different pull requests.
