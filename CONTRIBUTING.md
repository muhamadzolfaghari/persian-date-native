# Contributing to persian-date-native

Thank you for your interest in contributing to `persian-date-native`! 🎉

We welcome contributions of all kinds: bug fixes, performance optimizations, documentation improvements, new localized utilities, and ecosystem plugins.

---

## 🛠️ Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/muhamadzolfaghari/persian-date-native.git
cd persian-date-native
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Tests
Ensure all 140+ unit tests pass with 100% code coverage:
```bash
npm test
```

### 4. Build the Project
Compile ESM, CJS, and TypeScript definitions:
```bash
npm run build
```

---

## 📐 Development Guidelines

1. **Zero Runtime Dependencies**: The core engine must remain 100% dependency-free.
2. **Sub-Microsecond Performance**: Algorithm modifications must not degrade pure integer conversion speed (89M+ ops/sec).
3. **Strict TypeScript & 100% Test Coverage**: Any new feature or bugfix must include comprehensive unit tests verifying branch, statement, and function coverage.
4. **Clean Code Style**: Follow existing TypeScript formatting and semantic variable names.

---

## 🔀 Submitting a Pull Request

1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feat/my-amazing-feature
   ```
2. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat: add Jalali season helper`, `fix: handle edge case in leap year validator`).
3. Make sure tests and builds pass:
   ```bash
   npm test
   npm run build
   ```
4. Push to your fork and submit a Pull Request to `main`.

---

## 🐛 Reporting Issues

- Use the [Bug Report Template](https://github.com/muhamadzolfaghari/persian-date-native/issues/new?template=bug_report.yml) when reporting unexpected behavior.
- Use the [Feature Request Template](https://github.com/muhamadzolfaghari/persian-date-native/issues/new?template=feature_request.yml) for API suggestions or feature additions.
- Include code examples and target year/month/day dates for leap year or conversion issues.
