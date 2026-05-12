# GitHub Assistant Skill

This skill provides expert GitHub Issues and Projects (V2) operations using GitHub MCP tools. It automatically detects workspace GitHub configuration from context or prompts for repository details.

## MCP Server Requirement

This skill requires the **GitHub MCP Server** to be configured in your IDE. The GitHub MCP Server provides all the tools needed to interact with GitHub's API.

### Required MCP Toolsets

Ensure the following toolsets are enabled in your GitHub MCP server configuration:

- **`issues`** — Create, read, update, close issues; manage comments and sub-issues
- **`projects`** — GitHub Projects V2 board management (kanban, table, roadmap)
- **`labels`** — Label CRUD operations
- **`context`** — Current authenticated user context (strongly recommended)

### MCP Server Setup

#### Option A: Remote GitHub MCP Server (Recommended)

Add to your IDE's MCP configuration (e.g., `.vscode/mcp.json`):

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

#### Option B: Local GitHub MCP Server (Docker)

```json
{
  "servers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "-e", "GITHUB_TOOLSETS",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github_token}",
        "GITHUB_TOOLSETS": "issues,projects,labels,context"
      }
    }
  }
}
```

> **Note:** Create a [GitHub Personal Access Token](https://github.com/settings/personal-access-tokens/new) with `repo`, `read:project`, and `project` scopes.

## Configuration Requirements

The skill requires the following configuration values to be available in your workspace context:

### Required Values

- **Owner** — The GitHub user or organization that owns the repository (e.g., `octocat`)
- **Repository** — The repository name (e.g., `my-project`)

### Optional Values

- **Project Number** — The GitHub Project V2 number (visible in the project URL, e.g., `1`)
- **Project URL** — Link to your GitHub Project board (optional, for convenience)

## Where to Configure

The skill detects configuration from multiple sources, making it compatible with different IDEs and setups:

### Option 1: Cursor Rules (`.cursor/rules/github-config.mdc`)

If you're using Cursor, create a rule file:

```yaml
---
alwaysApply: false
---

# GitHub Project Configuration

This workspace uses the following GitHub configuration:

- **Owner:** your-github-username-or-org
- **Repository:** your-repo-name
- **Project Number:** 1 (optional)
- **Project URL:** https://github.com/users/your-username/projects/1 (optional)
```

### Option 2: Claude Code (`.claude/skills/`)

If you're using Claude Code, place this skill in `.claude/skills/github-assistant/SKILL.md`.

Claude Code auto-discovers skills from `~/.claude/skills/` (user-level) and `.claude/skills/` (project-level).

**Configure the GitHub MCP server** in `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "-e", "GITHUB_TOOLSETS",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT",
        "GITHUB_TOOLSETS": "issues,projects,labels,context"
      }
    }
  }
}
```

Add repository configuration in `.claude/settings.json` or directly in the skill's frontmatter `description`.

For project-level GitHub config, you can also create `.claude/rules/github-config.md`:

```markdown
# GitHub Configuration

- **Owner:** your-github-username-or-org
- **Repository:** your-repo-name
- **Project Number:** 1 (optional)
- **Project URL:** https://github.com/users/your-username/projects/1 (optional)
```

> **Docs:** [Claude Code Skills](https://code.claude.com/docs/en/skills) | [Claude Code MCP](https://code.claude.com/docs/en/mcp)

### Option 3: Codex (`.agents/skills/`)

If you're using OpenAI Codex, place this skill in `.agents/skills/github-assistant/SKILL.md`.

Codex scans `.agents/skills/` from the current working directory up to the repo root, plus `~/.agents/skills/` (user-level).

**Configure the GitHub MCP server** in `codex.toml` (at `~/.codex/config.toml` or project root):

```toml
[[mcp]]
name = "github"
type = "stdio"
command = "docker"
args = [
  "run", "-i", "--rm",
  "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
  "-e", "GITHUB_TOOLSETS",
  "ghcr.io/github/github-mcp-server"
]

[mcp.env]
GITHUB_PERSONAL_ACCESS_TOKEN = "YOUR_GITHUB_PAT"
GITHUB_TOOLSETS = "issues,projects,labels,context"
```

Optionally, add an `agents/openai.yaml` alongside the `SKILL.md` for Codex-specific UI metadata and tool dependencies:

```yaml
interface:
  display_name: "GitHub Assistant"
  short_description: "Manage GitHub Issues & Projects via MCP"
  brand_color: "#24292f"

policy:
  allow_implicit_invocation: true

dependencies:
  tools:
    - type: "mcp"
      value: "github"
      description: "GitHub MCP Server for Issues & Projects"
```

Add repository configuration in `AGENTS.md` at the project root:

```markdown
# GitHub Configuration

- **Owner:** your-github-username-or-org
- **Repository:** your-repo-name
- **Project Number:** 1 (optional)
- **Project URL:** https://github.com/users/your-username/projects/1 (optional)
```

> **Docs:** [Codex Skills](https://developers.openai.com/codex/skills) | [Codex MCP](https://developers.openai.com/codex/mcp)

### Option 4: Antigravity (`.agents/skills/`)

If you're using Google Antigravity, place this skill in `.agents/skills/github-assistant/SKILL.md` (workspace-level) or `~/.gemini/antigravity/skills/github-assistant/SKILL.md` (global).

Antigravity auto-discovers skills from both locations using progressive disclosure (reads name + description first, loads full SKILL.md on activation).

**Configure the GitHub MCP server** in `~/.gemini/antigravity/mcp_config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "-e", "GITHUB_TOOLSETS",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT",
        "GITHUB_TOOLSETS": "issues,projects,labels,context"
      }
    }
  }
}
```

You can also manage MCP servers via the built-in **MCP Store** panel ("..." dropdown → "Manage MCP Servers" → "View raw config").

> **Docs:** [Antigravity Skills](https://antigravity.google/docs/skills)

### Option 5: AGENTS.md (Any IDE)

If you're using another IDE or prefer AGENTS.md, add the configuration there:

```markdown
# GitHub Configuration

- **Owner:** your-github-username-or-org
- **Repository:** your-repo-name
- **Project Number:** 1 (optional)
- **Project URL:** https://github.com/users/your-username/projects/1 (optional)
```

### Option 6: Git Remote (Automatic)

The skill can automatically detect `owner` and `repo` from the current workspace's git remote URL:

```bash
# Example: git remote get-url origin
# https://github.com/octocat/my-project.git → owner=octocat, repo=my-project
# git@github.com:octocat/my-project.git → owner=octocat, repo=my-project
```

### Option 7: Interactive Prompt

If no configuration is found, the skill will:

1. Use `get_me()` via MCP to identify the authenticated user
2. Prompt you to specify the repository: "Which repository should I use? (e.g., owner/repo)"
3. Optionally ask for the project number if project operations are needed
4. Store the selection for the current conversation

## Configuration Detection Flow

When the skill is activated, it follows this detection order:

1. **Check workspace context** — Looks for GitHub configuration in:

   - `.cursor/rules/github-config.mdc` (Cursor)
   - `.claude/rules/github-config.md` (Claude Code)
   - `AGENTS.md` (Codex, Antigravity, and any IDE)
   - Other workspace documentation files

2. **Detect from git remote** — Parses owner/repo from the remote URL

3. **If still unclear** — Prompts user to specify owner/repo

4. **Uses detected values** — Applies configuration for all operations

## Example Configuration

Here's a complete example configuration:

```markdown
# GitHub Project Configuration

- **Owner:** yvesengineer
- **Repository:** borderland
- **Project Number:** 1
- **Project URL:** https://github.com/users/yvesengineer/projects/1
```

## Usage

Once configured, the skill automatically uses your repository settings for:

- Searching issues with GitHub search syntax
- Creating issues (with template)
- Updating issues (title, body, labels, assignees, state)
- Closing/reopening issues with reason
- Adding comments to issues
- Managing labels (create, update, delete)
- Managing sub-issues (add, remove, reprioritize)
- Managing GitHub Projects V2 boards
  - Adding issues to project boards
  - Moving items across kanban columns (updating Status field)
  - Updating project item fields (priority, iteration, custom fields)
  - Listing project items with field values

All operations will use your configured owner and repository automatically.

## Troubleshooting

**Skill can't find configuration:**

- Ensure your configuration file is in the workspace root or `.cursor/rules/` directory
- Check that the file contains the required values (Owner, Repository)
- Verify the format matches the examples above
- Check that git remote is configured if relying on automatic detection

**Wrong repository being used:**

- Check your configuration file for the correct owner/repo
- The skill uses the first valid configuration it finds
- You can override by specifying the repository in your request

**GitHub MCP tools not available:**

- Ensure the GitHub MCP server is properly configured in your IDE
- Check that required toolsets are enabled (`issues`, `projects`, `labels`, `context`)
- Verify your Personal Access Token has the required scopes (`repo`, `read:project`, `project`)
- Test the MCP connection by running a simple command like `get_me()`

**Project operations failing:**

- Ensure the `projects` toolset is enabled
- Verify the project number is correct (check the project URL)
- Make sure the PAT has `read:project` and `project` scopes
- Use `projects_list(method="list_projects", owner="{OWNER}")` to discover available projects

**Can't update project item fields:**

- Always call `projects_list(method="list_project_fields", ...)` first to discover field IDs
- Use the field ID (not field name) when updating
- For single-select fields (like Status), use the option ID (not the option name)

## Compatibility

This skill works with:

- **Cursor IDE** (via `.cursor/rules/`)
- **VS Code** (via `.vscode/mcp.json`)
- **Claude Code** (via `.claude/skills/` + `.claude/mcp.json`)
- **OpenAI Codex** (via `.agents/skills/` + `codex.toml`)
- **Google Antigravity** (via `.agents/skills/` + `~/.gemini/antigravity/mcp_config.json`)
- Any IDE supporting `AGENTS.md`
- Any IDE with GitHub MCP server support
- Any workspace with accessible configuration files
- Interactive mode (prompts for configuration)
