---
name: deploy
description: Deploy this app to staging. Runs tests (if any exist), builds the production bundle, and pushes to the `staging` git branch. Invoke manually with /deploy; never auto-runs.
user-invocable: true
disable-model-invocation: true
allowed-tools:
  - Bash(npm test:*)
  - Bash(npm run test:*)
  - Bash(npm run build:*)
  - Bash(git:*)
---

Deploy this app to the **staging** git branch. Run the steps below strictly in order. If any step fails, **stop immediately** and report the failure — do not continue to the next step and do not push.

## 1. Run tests (skip if no test runner exists)
- Read `package.json` and look for a `test` entry under `scripts`.
- If a `test` script **exists**: run `npm test`. If it exits non-zero, **STOP** — report the failing tests and do not build or push.
- If there is **no** `test` script: state plainly "No test runner configured — skipping tests." and continue. (This is the expected state for this project today.)

## 2. Build the production bundle
- Run `npm run build`.
- Verify it produced output: confirm `dist/index.html` exists. If the build fails or `dist/` is empty, **STOP** and report the error.

## 3. Push to the `staging` branch
- Run `git status`. If there are uncommitted changes, stage and commit them first with a message like `deploy: build for staging`.
- Ensure a local `staging` branch exists — create it from the current branch if it does not.
- Push to the remote: `git push origin staging` (use `-u` on the first push to set upstream).
- Report the result: the branch pushed, the commit hash, and the remote URL.

## Notes
- `dist/` is gitignored by default, so the `staging` branch carries **source** and the build in step 2 acts as a pre-deploy verification gate (the staging environment / CI rebuilds from source). If the intent is instead to commit the built bundle onto the branch, un-ignore `dist/` in `.gitignore` first and add it in step 3.
- **Never force-push** to `staging` unless explicitly asked.
