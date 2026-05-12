---
description: Manage GitHub Issues and Projects (V2) via GitHub MCP — search, create, update, close issues, manage project boards (kanban), labels, milestones, and sub-issues. Auto-detects workspace configuration. Use when user says "create a GitHub issue", "update the project board", "check issue status", "move card to done", "search issues", "add to project", or "close this issue". Do NOT use for Jira tasks (use jira-assistant).
name: github-assistant
---

# GitHub Assistant

You are an expert in using GitHub MCP tools to interact with GitHub Issues and GitHub Projects (V2).

## When to Use

Use this skill when the user asks to:

- Search for GitHub issues
- Create new GitHub issues (Bug, Feature, Task, etc.)
- Update existing issues (title, body, labels, assignees, state)
- Close or reopen issues
- Add comments to issues
- Manage labels on issues
- Manage sub-issues (parent/child relationships)
- Add issues to GitHub Projects (V2) boards
- Move items across project board columns (kanban status)
- Update project item fields (status, priority, iteration, custom fields)
- List or query project items with filters
- Manage milestones

## MCP Requirements

**This skill requires the GitHub MCP server** with the following toolsets enabled:

- `issues` — Issue CRUD, comments, sub-issues, search
- `projects` — GitHub Projects V2 board management
- `labels` — Label operations
- `context` — Current user context (strongly recommended)

Ensure these toolsets are active. If using `--toolsets`, include them:

```bash
--toolsets issues,projects,labels,context
```

Or use `GITHUB_TOOLSETS="issues,projects,labels,context"` environment variable.

## Configuration

**Repository Detection Strategy (Automatic):**

1. **Check workspace rules first**: Look for GitHub configuration in `.cursor/rules/github-config.mdc` or `AGENTS.md`
2. **Detect from git remote**: Parse `owner` and `repo` from the current workspace git remote URL
3. **If not found**: Ask user to specify `owner/repo`
4. **Use detected values** for all GitHub operations in this conversation

### Configuration Detection Workflow

When you activate this skill:

1. Check if workspace has `.cursor/rules/github-config.mdc` or `AGENTS.md` with GitHub configuration
2. If found, extract and use: Owner, Repository, Project Number (optional)
3. If not found:
   - Try to detect from git remote URL (`git remote get-url origin`)
   - Extract `owner` and `repo` from the URL
4. If still not found:
   - Use `get_me()` via MCP to get the authenticated user
   - Ask: "Which repository should I use? (e.g., owner/repo)"
5. Store the configuration for this conversation and proceed with operations

**Note for skill users:** To configure this skill for your workspace, create `.cursor/rules/github-config.mdc` with your project details.

## Workflow

### 1. Finding Issues (Always Start Here)

**Use `search_issues`** for general queries:

```
search_issues(
  query="repo:{OWNER}/{REPO} is:issue is:open label:bug"
)
```

- Uses GitHub search syntax (powerful and flexible)
- Supports filters: `is:issue`, `is:open`, `is:closed`, `label:`, `assignee:`, `author:`, `milestone:`
- Returns relevant results quickly
- Replace `{OWNER}/{REPO}` with the detected values from configuration

### 2. Listing Issues with Filters

**Use `list_issues`** when you need structured filtering:

```
list_issues(
  owner="{OWNER}",
  repo="{REPO}",
  state="open",
  labels=["bug", "priority:high"],
  orderBy="CREATED_AT",
  direction="DESC"
)
```

### 3. Getting Issue Details

**Use `issue_read`** to get full issue information:

```
# Get issue details
issue_read(
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  method="get"
)

# Get issue comments
issue_read(
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  method="get_comments"
)

# Get sub-issues
issue_read(
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  method="get_sub_issues"
)

# Get issue labels
issue_read(
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  method="get_labels"
)
```

### 4. Creating Issues

**ALWAYS use the detected `owner` and `repo` from configuration**

```
issue_write(
  method="create",
  owner="{OWNER}",
  repo="{REPO}",
  title="Brief issue description",
  body="## Context\n...",
  labels=["enhancement"],
  assignees=["username"]
)
```

**Available issue fields:**

- `title` (required) — Brief, descriptive title
- `body` (required) — Detailed description using the template below
- `labels` (optional) — Array of label names
- `assignees` (optional) — Array of GitHub usernames
- `milestone` (optional) — Milestone number (not name)
- `type` (optional) — Issue type if organization has types configured

### 5. Updating Issues

#### Edit fields:

```
issue_write(
  method="update",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  title="Updated title",
  body="Updated body...",
  labels=["bug", "priority:high"],
  assignees=["username"]
)
```

#### Close an issue:

```
issue_write(
  method="update",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  state="closed",
  state_reason="completed"
)
```

**State reasons:** `completed`, `not_planned`, `duplicate`

#### Reopen an issue:

```
issue_write(
  method="update",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  state="open"
)
```

#### Add a comment:

```
add_issue_comment(
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=42,
  body="Comment text here..."
)
```

### 6. Managing Sub-Issues

#### Add a sub-issue:

```
sub_issue_write(
  method="add",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=10,
  sub_issue_id=42
)
```

#### Remove a sub-issue:

```
sub_issue_write(
  method="remove",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=10,
  sub_issue_id=42
)
```

#### Reprioritize a sub-issue:

```
sub_issue_write(
  method="reprioritize",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=10,
  sub_issue_id=42,
  after_id=35
)
```

### 7. Managing Labels

#### List labels:

```
list_label(owner="{OWNER}", repo="{REPO}")
```

#### Create a label:

```
label_write(
  method="create",
  owner="{OWNER}",
  repo="{REPO}",
  name="priority:high",
  color="d73a4a",
  description="High priority items"
)
```

#### Update a label:

```
label_write(
  method="update",
  owner="{OWNER}",
  repo="{REPO}",
  name="priority:high",
  new_name="priority:critical",
  color="b60205"
)
```

### 8. GitHub Projects (V2) — Kanban Board Management

GitHub Projects V2 uses a board/table/roadmap layout to organize issues and PRs.

#### List user/org projects:

```
projects_list(
  method="list_projects",
  owner="{OWNER}"
)
```

#### Get project details:

```
projects_get(
  method="get_project",
  owner="{OWNER}",
  project_number={PROJECT_NUMBER}
)
```

#### List project fields (to discover field IDs for status, priority, etc.):

```
projects_list(
  method="list_project_fields",
  owner="{OWNER}",
  project_number={PROJECT_NUMBER}
)
```

#### List project items (with field values):

```
projects_list(
  method="list_project_items",
  owner="{OWNER}",
  project_number={PROJECT_NUMBER},
  fields=["FIELD_ID_1", "FIELD_ID_2"]
)
```

**⚠️ IMPORTANT:** Always pass `fields` parameter when listing project items to get field values. Without it, only titles are returned.

#### Add an issue to a project:

```
projects_write(
  method="add_project_item",
  owner="{OWNER}",
  project_number={PROJECT_NUMBER},
  item_type="issue",
  item_owner="{OWNER}",
  item_repo="{REPO}",
  issue_number=42
)
```

#### Update a project item field (e.g., move kanban column):

```
projects_write(
  method="update_project_item",
  owner="{OWNER}",
  project_number={PROJECT_NUMBER},
  item_id={ITEM_ID},
  updated_field={"id": FIELD_ID, "value": "OPTION_ID_OR_VALUE"}
)
```

**To move an item across kanban columns (change Status field):**

1. First, get the project fields to find the Status field ID and option IDs:
   ```
   projects_list(method="list_project_fields", owner="{OWNER}", project_number={PROJECT_NUMBER})
   ```
2. Find the Status field and its options (e.g., "Todo", "In Progress", "Done")
3. Update the item with the desired status option ID:
   ```
   projects_write(
     method="update_project_item",
     owner="{OWNER}",
     project_number={PROJECT_NUMBER},
     item_id={ITEM_ID},
     updated_field={"id": STATUS_FIELD_ID, "value": "OPTION_ID_FOR_IN_PROGRESS"}
   )
   ```

#### Delete a project item:

```
projects_write(
  method="delete_project_item",
  owner="{OWNER}",
  project_number={PROJECT_NUMBER},
  item_id={ITEM_ID}
)
```

## Default Issue Template

**ALWAYS use this template** in the `body` field when creating issues:

```markdown
## Context

[Brief explanation of the problem or need]

## Objective

[What needs to be accomplished]

## Technical Requirements

[This is high level, it doesn't mention which class or file, but the technical high level objective]

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Acceptance Criteria

- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## Technical Notes

[Don't include file paths as they can change overtime]
[Technical considerations, dependencies, relevant links]

## Estimate

[Time estimate or story points, if applicable]
```

## Best Practices

### ✅ DO

- **Always use the detected owner/repo** in all operations
- **Always use Markdown** in the `body` field
- **Use `search_issues` first** for natural language-like queries
- **Use `list_issues`** for structured filtering
- **Follow the issue template** for consistency
- **Avoid file paths** in descriptions (they change over time)
- **Keep titles brief** and descriptions detailed
- **Discover field IDs first** before updating project items
- **Always pass `fields`** when listing project items

### ⚠️ IMPORTANT

- **Issue Number** is the `#123` visible in the URL (user-facing)
- **Issue ID** is a global node ID (used internally for sub-issues and projects)
- **Project Number** is visible in the project URL (e.g., `/projects/1`)
- **Item ID** is the project-specific item identifier (different from issue number)
- **Field ID** is the project field identifier (discover via `list_project_fields`)
- **Use detected configuration values** from workspace rules or user input
- **Sub-issue ID** is NOT the same as issue number — use the issue's global ID

## Examples

### Example 1: Create an Issue

```
User: "Create an issue to implement user authentication"

issue_write(
  method="create",
  owner="{OWNER}",
  repo="{REPO}",
  title="Implement user authentication endpoint",
  body="## Context
We need to secure our API endpoints with user authentication.

## Objective
Implement JWT-based authentication for API access.

## Technical Requirements
- [ ] Create authentication middleware
- [ ] Implement JWT token generation
- [ ] Add token validation
- [ ] Secure existing endpoints

## Acceptance Criteria
- [ ] Users can login with credentials
- [ ] JWT tokens are generated on successful login
- [ ] Protected endpoints validate tokens
- [ ] Invalid tokens return 401

## Technical Notes
Use bcrypt for password hashing, JWT for tokens, and implement refresh token logic.

## Estimate
5 story points",
  labels=["enhancement", "backend"],
  assignees=["developer-username"]
)
```

**Note:** Use actual values from detected configuration in place of placeholders.

### Example 2: Search and Update Issue

```
User: "Find my open bugs and update the first one"

1. search_issues(
     query="repo:{OWNER}/{REPO} is:issue is:open label:bug assignee:@me"
   )

2. issue_write(
     method="update",
     owner="{OWNER}",
     repo="{REPO}",
     issue_number=123,
     body="## Context\nUpdated context...",
     labels=["bug", "priority:high"]
   )
```

**Note:** Replace placeholders with detected configuration values.

### Example 3: Close an Issue as Completed

```
User: "Close issue #456, it's done"

issue_write(
  method="update",
  owner="{OWNER}",
  repo="{REPO}",
  issue_number=456,
  state="closed",
  state_reason="completed"
)
```

**Note:** Replace placeholders with detected configuration values.

### Example 4: Move Issue on Project Board (Kanban)

```
User: "Move issue #42 to 'In Progress' on the project board"

1. # First, find the project and its fields
   projects_list(method="list_projects", owner="{OWNER}")

2. # Get the Status field ID and option IDs
   projects_list(
     method="list_project_fields",
     owner="{OWNER}",
     project_number=1
   )

3. # Find the item ID for issue #42
   projects_list(
     method="list_project_items",
     owner="{OWNER}",
     project_number=1,
     fields=["STATUS_FIELD_ID"]
   )

4. # Update the status field to "In Progress"
   projects_write(
     method="update_project_item",
     owner="{OWNER}",
     project_number=1,
     item_id=ITEM_ID,
     updated_field={"id": STATUS_FIELD_ID, "value": "IN_PROGRESS_OPTION_ID"}
   )
```

**Note:** Replace placeholders with detected configuration values and discovered IDs.

### Example 5: Add Issue to Project Board

```
User: "Add issue #789 to the project board"

projects_write(
  method="add_project_item",
  owner="{OWNER}",
  project_number=1,
  item_type="issue",
  item_owner="{OWNER}",
  item_repo="{REPO}",
  issue_number=789
)
```

**Note:** Replace placeholders with detected configuration values.

### Example 6: Create Sub-Issue

```
User: "Create a sub-issue for #100"

1. # Create the child issue first
   issue_write(
     method="create",
     owner="{OWNER}",
     repo="{REPO}",
     title="Implement validation logic",
     body="## Context\nSub-task for implementing input validation..."
   )

2. # Then add it as a sub-issue (use the issue's global ID, not the number)
   sub_issue_write(
     method="add",
     owner="{OWNER}",
     repo="{REPO}",
     issue_number=100,
     sub_issue_id=NEW_ISSUE_ID
   )
```

**Note:** Replace placeholders with detected configuration values.

## Common Search Patterns

All queries use GitHub search syntax with `repo:{OWNER}/{REPO}`:

```
# My open issues
repo:{OWNER}/{REPO} is:issue is:open assignee:@me

# Recent issues (last 7 days)
repo:{OWNER}/{REPO} is:issue created:>2024-01-01

# High priority bugs
repo:{OWNER}/{REPO} is:issue is:open label:bug label:priority:high

# Unassigned open issues
repo:{OWNER}/{REPO} is:issue is:open no:assignee

# Issues in a milestone
repo:{OWNER}/{REPO} is:issue milestone:"v1.0"

# Issues updated this week
repo:{OWNER}/{REPO} is:issue updated:>2024-01-01

# Issues with no labels
repo:{OWNER}/{REPO} is:issue is:open no:label

# Closed issues not planned
repo:{OWNER}/{REPO} is:issue is:closed reason:"not planned"
```

**Note:** Replace `{OWNER}/{REPO}` with the actual values from detected configuration. Replace dates with actual dates relative to the current date.

## Important Notes

- **Owner/Repo are mandatory** — Always include them in all operations
- **Use detected configuration** — Read from `.cursor/rules/github-config.mdc`, `AGENTS.md`, or git remote
- **Use Markdown** in issue body — Not HTML or plain text
- **Follow the template** — Maintains consistency across issues
- **Search syntax is powerful** — Leverage GitHub's full search syntax
- **Project fields must be discovered** — Always call `list_project_fields` before updating project items
- **Avoid file paths** — They change and become outdated
- **Keep technical notes high-level** — Focus on approach, not implementation details
- **Story points are optional** — Include estimates when relevant
- **GitHub MCP toolsets** — Ensure `issues`, `projects`, `labels`, and `context` toolsets are enabled
