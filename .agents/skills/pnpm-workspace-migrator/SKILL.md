---
name: pnpm-workspace-migrator
description: Universal skill for migrating JavaScript/TypeScript monorepos and single packages from npm/yarn/lerna to PNPM workspaces with strict dependency isolation, symlink resolution, and build pipeline optimization.
---

# PNPM Workspace Migrator Skill

This universal skill guides AI agents and engineers through converting complex multi-package repositories or legacy npm/yarn/lerna projects to high-performance, disk-efficient **PNPM Workspaces**.

## Workflow Steps

### 1. Pre-Migration Audit
- Inspect existing `package.json`, lockfiles (`package-lock.json`, `yarn.lock`, `lerna.json`).
- Catalog root dependencies vs sub-package dependencies.
- Detect hoisted dependencies and phantom dependencies (packages imported without being in `package.json`).

### 2. Workspace Scaffolding
Create `pnpm-workspace.yaml` in the root directory:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'services/*'
```

### 3. Dependency Standardization
- Replace `"package-name": "*"` or `"file:../package"` with `"workspace:*"` protocol:
  ```json
  {
    "dependencies": {
      "@company/shared-ui": "workspace:*"
    }
  }
  ```
- Remove legacy lockfiles (`rm -f package-lock.json yarn.lock`).
- Create `.npmrc` with optimal pnpm configuration:
  ```ini
  auto-install-peers=true
  shamefully-hoist=false
  strict-peer-dependencies=false
  ```

### 4. Installation & Resolution
Run:
```bash
pnpm install
```

### 5. Script Execution & Turborepo / Nx Integration
- Update CI/CD pipelines to cache `~/.local/share/pnpm/store`.
- Use `pnpm --filter <package-name> <script>` for targeted execution.
- Use `pnpm -r run build` for recursive topologically-sorted builds.

## Troubleshooting Checklist for Agents

| Issue | Resolution |
| :--- | :--- |
| **Phantom dependency error** | Explicitly add missing package to subpackage's `dependencies`. |
| **Peer dependency mismatch** | Set `auto-install-peers=true` in `.npmrc` or use `pnpm.peerDependencyRules`. |
| **Duplicate binary in path** | Use `pnpm exec <cmd>` or root scripts. |
