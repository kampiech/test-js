# Styleguide

## JS
We're using eslint setup from plugin [eslint-plugin-kansas](../linters/eslint-plugin-kansas/README.md)
    

## Git commits
### Convention - [based on eslint contributing](https://eslint.org/docs/1.0.0/developer-guide/contributing#step-2-make-your-changes)
Make the changes to the code and tests and then commit to your branch. Be sure to follow the commit message conventions.

Commit message summaries must follow this basic format:

```
Tag: Message (fixes #1234)
```

`Tag` should not be confused with git tag.
`Message` should not be confused with git commit message.

The `Tag` is one of the following:

* `Fix` - for a bug fix.
* `Update` - for a backwards-compatible enhancement.
* `Breaking` - for a backwards-incompatible enhancement.
* `Docs` - changes to documentation only.
* `Build` - changes to build process only.
* `New` - implemented a new feature.
* `Upgrade` - for a dependency upgrade.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end. * The commit message should say "(fixes #1234)" at the end of the description if it closes out an existing issue (replace 1234 with the issue number). If the commit doesn't completely fix the issue, then use `(refs #1234)` instead of `(fixes #1234)`.

Here are some good commit message summary examples:

```
Build: Update Travis to only test Node 0.10 (refs #734)
Fix: Semi rule incorrectly flagging extra semicolon (fixes #840)
Upgrade: Esprima to 1.2, switch to using Esprima comment attachment (fixes #730)
```

The commit message format is important because these messages are used to create a changelog for each release. The tag and issue number help to create more consistent and useful changelogs.

### 7 Golden Rules - [based on ChrisBeams post](https://chris.beams.io/posts/git-commit/)
- Separate subject from body with a blank line
- Limit the subject line to 50 characters
- Capitalize the subject line
- Do not end the subject line with a period
- Use the imperative mood in the subject line
- Wrap the body at 72 characters
- Use the body to explain what and why vs. how

## Naming branches 
- `update` - When something just need to be updated (ex. copy)
- `bug` - Code changes linked to a known issue.
- `feature` - New feature.
- `fix` - Quick fixes to the codebase.
- `junk` - Experiments (will never be merged).

  Branch should have an ID of task from JIRA (ex. fix/dropdown-PRAC-13532) or ID of issue from repository.
