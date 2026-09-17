---
name: clean-architecture-reviewer
description: Systematic architectural evaluation skill for auditing modularity, domain-driven design (DDD), SOLID principles, dependency injection, and decoupling across frontend and backend applications.
---

# Clean Architecture Reviewer Skill

A universal evaluation skill that guides AI agents in conducting high-impact code reviews, identifying architectural debt, and generating step-by-step refactoring roadmaps.

## Evaluation Checklist

### 1. Domain Layer Isolation
- Ensure business logic does not directly depend on UI frameworks (React/Vue), ORMs, or third-party APIs.
- Domain entities must be pure data structures and pure functions.

### 2. Dependency Inversion Principle (DIP)
- High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces/contracts).
- Use adapters/repositories for external integrations (I/O, databases, HTTP clients).

### 3. Separation of Concerns & State Management
- Isolate view rendering from asynchronous state transitions.
- Eliminate God objects, monster components (>300 lines), and circular dependencies.

## Output Format for Agents

When requested to review a codebase or pull request, format the report as follows:

```markdown
## Architectural Audit Summary
- **Domain Purity Score**: [1-10]
- **Coupling & Cohesion**: [Low / Medium / High]
- **Key Vulnerabilities / Smells**: [Bullet points]

### Critical Architectural Bottlenecks
1. **[Component/Layer]**: [Description of coupling issue]
   - *Recommendation*: [Concrete refactoring strategy with interface design]

### Step-by-Step Refactoring Plan
- [ ] Phase 1: Define repository abstractions
- [ ] Phase 2: Invert external dependencies
- [ ] Phase 3: Modularize state and controllers
```
