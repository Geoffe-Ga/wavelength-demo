# Claude Code Project Context: wavelength-demo

**Version**: 2.0 (Modular)

---

## Quick Navigation

**Core Documentation** (in `.claude/docs/`):
- 📋 **[Critical Principles](.claude/docs/principles.md)** - Non-negotiable rules (READ FIRST)
- 🎯 **[Quality Standards](.claude/docs/quality-standards.md)** - Requirements and enforcement
- 🔄 **[Development Workflow](.claude/docs/workflow.md)** - Stay Green process & mindset
- 🧪 **[Testing Strategy](.claude/docs/testing.md)** - Test patterns and coverage
- 🛠️ **[Tool Usage](.claude/docs/tools.md)** - Scripts, patterns, and code standards
- 🚨 **[Troubleshooting](.claude/docs/troubleshooting.md)** - Common mistakes and fixes

**Additional Resources**:
- [Appendix A: AI Subagent Guidelines](#appendix-a-ai-subagent-guidelines)
- [Appendix B: Key Files](#appendix-b-key-files)
- [Appendix C: External References](#appendix-c-external-references)

---

## 📋 Critical Principles (Quick Reference)

**For detailed explanation, see [.claude/docs/principles.md](.claude/docs/principles.md)**

1. **Use project scripts, not direct tools** - Invoke `./scripts/*`, never raw tools
2. **Never duplicate content (DRY)** - Always reference the canonical source
3. **No shortcuts - fix root causes** - Never bypass quality checks
4. **Stay Green** - Never request review with failing checks (4-gate workflow)
5. **Quality First** - Meet MAXIMUM QUALITY standards (90% coverage, ≤10 complexity, ≥80% mutation)
6. **Operate from project root** - Use relative paths, never `cd`
7. **Verify before commit** - All checks must pass (`./scripts/check-all.sh` → exit 0)

**The 4 Gates**:
1. Gate 1: `./scripts/check-all.sh` passes (exit 0)
2. Gate 2: CI pipeline green (all jobs ✅)
3. Gate 3: Mutation score ≥80%
4. Gate 4: Code review LGTM

---

## 🎯 Quality Standards (Quick Reference)

**For complete standards, see [.claude/docs/quality-standards.md](.claude/docs/quality-standards.md)**

| Metric | Threshold | Tool |
|--------|-----------|------|
| **Code Coverage** | ≥90% | jest |
| **Branch Coverage** | ≥85% | jest |
| **Mutation Score** | ≥80% | stryker |
| **Cyclomatic Complexity** | ≤10 per function | eslint (complexity rule) |
| **Cognitive Complexity** | ≤15 | eslint-plugin-sonarjs |
| **Type Coverage** | 100% (strict mode) | TypeScript compiler |
| **Documentation Coverage** | ≥95% | eslint-plugin-jsdoc |

---

## 📖 Project Overview

**wavelength-demo** is a TypeScript project built with modern engineering practices and maximum quality standards.

**Purpose**: Demonstrate comprehensive quality engineering in a TypeScript codebase with full test coverage, mutation testing, security scanning, and architectural validation.

---

## 🏗️ Architecture

**Core Philosophy**:
- **Maximum Quality**: No shortcuts, comprehensive tooling, strict enforcement
- **Composable**: Modular components with clear interfaces
- **Testable**: Every component designed for easy testing
- **Maintainable**: Clear structure, excellent documentation
- **Reproducible**: Consistent behavior across environments
- **Type-Safe**: Strict TypeScript with no escape hatches

**Component Structure**:

```
wavelength-demo/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Continuous Integration
│   │   ├── security.yml              # Security scanning
│   │   └── dependency-review.yml     # Dependency audits
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── .husky/
│   ├── pre-commit                    # Quality checks before commit
│   ├── pre-push                      # Full validation before push
│   └── commit-msg                    # Conventional commit enforcement
├── scripts/
│   ├── check-all.sh                  # Run all quality gates
│   ├── test.sh                       # Execute test suite
│   ├── lint.sh                       # Linting and type checking
│   ├── format.sh                     # Code formatting
│   ├── security.sh                   # Security scanning
│   └── mutation.sh                   # Mutation testing
├── src/
│   ├── domain/                       # Domain logic (independent)
│   ├── application/                  # Application services
│   ├── infrastructure/               # External integrations
│   └── presentation/                 # User interfaces
├── tests/
│   ├── unit/                         # Unit tests
│   ├── integration/                  # Integration tests
│   ├── e2e/                          # End-to-end tests
│   ├── property/                     # Property-based tests
│   ├── snapshot/                     # Snapshot tests
│   └── performance/                  # Performance benchmarks
├── docs/
│   ├── architecture/
│   │   ├── ADR/                      # Architecture Decision Records
│   │   └── diagrams/
│   └── api/
├── .claude/
│   ├── docs/                         # Modular documentation
│   └── skills/                       # AI collaboration skills
├── eslint.config.mjs                 # ESLint configuration (flat config)
├── tsconfig.json                     # TypeScript configuration
├── jest.config.ts                    # Jest test configuration
├── stryker.config.json               # Mutation testing config
└── package.json                      # Dependencies and scripts
```

**For workflow and architecture detail, see [.claude/docs/workflow.md](.claude/docs/workflow.md)**

---

## 🔄 Development Workflow (Quick Start)

**For the complete workflow, see [.claude/docs/workflow.md](.claude/docs/workflow.md)**

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and write tests (TDD)
# Write failing test first
npm test -- --watch

# Write implementation
# Watch test pass

# 3. Run ALL quality checks
./scripts/check-all.sh

# 4. Fix any issues and run again
./scripts/check-all.sh

# 5. Commit (only when all checks pass)
git add .
git commit -m "feat(module): add my feature (#123)"

# 6. Push and create PR
git push origin feature/my-feature
gh pr create --fill

# 7. Wait for the 4 gates to pass, then merge
```

---

## 🛠️ Tool Usage (Quick Reference)

**For complete patterns, see [.claude/docs/tools.md](.claude/docs/tools.md)**

### Primary Commands

#### `./scripts/check-all.sh`
**Purpose**: Run all quality checks before committing
**Usage**:
```bash
./scripts/check-all.sh
```
**What it checks**:
- TypeScript compilation (strict mode)
- ESLint (all rules, max-warnings 0)
- Prettier formatting
- Unit tests with coverage (≥90%)
- Integration tests
- Property-based tests
- Snapshot tests
- Security vulnerabilities
- Unused dependencies
- Circular dependencies

**Exit code**: 0 if all checks pass, non-zero otherwise

#### `./scripts/test.sh`
**Purpose**: Run test suite with coverage
**Usage**:
```bash
./scripts/test.sh              # All tests with coverage
./scripts/test.sh unit         # Unit tests only
./scripts/test.sh integration  # Integration tests only
./scripts/test.sh --watch      # Watch mode
```
**Coverage thresholds**:
- Branches: 90%
- Functions: 90%
- Lines: 90%
- Statements: 90%

#### `./scripts/lint.sh`
**Purpose**: Run linting and type checking
**Usage**:
```bash
./scripts/lint.sh              # Lint and type check
./scripts/lint.sh --fix        # Auto-fix issues
```
**Checks**:
- ESLint with strict rules (unicorn, sonarjs, security, import, jsdoc)
- TypeScript strict mode compilation
- Import ordering and organization
- JSDoc completeness

#### `./scripts/format.sh`
**Purpose**: Format code with Prettier
**Usage**:
```bash
./scripts/format.sh            # Check formatting
./scripts/format.sh --write    # Auto-format
```
**Applies to**: `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yml`

#### `./scripts/security.sh`
**Purpose**: Security scanning and vulnerability detection
**Usage**:
```bash
./scripts/security.sh
```
**Scans**:
- npm audit (moderate and above)
- eslint-plugin-security rules
- eslint-plugin-no-secrets
- Dependency vulnerabilities
- Known CVEs

#### `./scripts/mutation.sh`
**Purpose**: Run mutation testing
**Usage**:
```bash
./scripts/mutation.sh          # Full mutation testing
./scripts/mutation.sh --check  # Check against threshold
```
**Threshold**: ≥80% mutation score
**Tool**: Stryker Mutator

---

## 🧪 Testing Strategy (Quick Reference)

**For complete testing patterns, see [.claude/docs/testing.md](.claude/docs/testing.md)**

### Test Categories (All MANDATORY)

| Category | Location | Purpose | Tool |
|----------|----------|---------|------|
| **Unit** | `tests/unit/` | Test individual functions/classes | jest |
| **Integration** | `tests/integration/` | Test component interactions | jest |
| **E2E** | `tests/e2e/` | Test complete workflows | playwright |
| **Property** | `tests/property/` | Test invariants with generated data | fast-check |
| **Mutation** | N/A | Verify test quality | stryker |
| **Snapshot** | `tests/snapshot/` | Detect unintended changes | jest |
| **Performance** | `tests/performance/` | Detect regressions | benchmark.js |

### Test Naming Convention

```typescript
// test_<unit>_<scenario>_<expected_outcome>

describe('Calculator', () => {
  describe('divide', () => {
    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow(DivisionByZeroError);
    });

    it('should return correct quotient for valid inputs', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should handle negative numbers correctly', () => {
      expect(calculator.divide(-10, 2)).toBe(-5);
    });
  });
});
```

### Property-Based Testing Example

```typescript
import fc from 'fast-check';

describe('User validation', () => {
  it('should accept all valid email formats', () => {
    fc.assert(
      fc.property(fc.emailAddress(), (email) => {
        expect(validateEmail(email)).toBe(true);
      })
    );
  });

  it('should reject invalid characters in username', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => /[^a-zA-Z0-9_-]/.test(s)),
        (username) => {
          expect(() => validateUsername(username)).toThrow(ValidationError);
        }
      )
    );
  });
});
```

---

## 📚 Documentation Requirements

**For complete documentation standards, see [.claude/docs/tools.md](.claude/docs/tools.md)**

### Code Documentation (JSDoc - MANDATORY)

Every public function, class, interface, and type must have complete JSDoc:

```typescript
/**
 * Calculates comprehensive risk score for a user.
 *
 * This function analyzes user data against current market conditions
 * to produce a risk assessment. It considers credit history, income
 * stability, and market volatility.
 *
 * @param userData - Complete user profile including financial history
 * @param marketConditions - Current market state and volatility metrics
 * @param options - Configuration options
 * @param options.includeHistorical - Whether to include historical trend analysis (default: true)
 * @returns A RiskScore object containing score, confidence, and contributing factors
 * @throws {ValidationError} If userData is incomplete or malformed
 * @throws {MarketDataError} If market conditions cannot be fetched
 *
 * @example
 * ```typescript
 * const user = new UserData({ creditScore: 750, income: 100000 });
 * const market = new MarketConditions({ volatility: 0.15 });
 * const score = calculateRiskScore(user, market);
 * console.assert(score.value >= 0 && score.value <= 100);
 * ```
 *
 * @remarks
 * This function caches results for 15 minutes. Use `clearRiskCache()`
 * to force recalculation.
 *
 * @see {@link UserData} for user profile structure
 * @see {@link calculatePortfolioRisk} for portfolio-level analysis
 */
export function calculateRiskScore(
  userData: UserData,
  marketConditions: MarketConditions,
  options: RiskOptions = { includeHistorical: true }
): RiskScore {
  // Implementation
}
```

### Architecture Decision Records (ADRs)

Store in `docs/architecture/ADR/`. Template:

```markdown
# ADR-XXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[What is the issue we're addressing?]

## Decision
[What is the change we're proposing/making?]

## Consequences

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Cost 1]
- [Cost 2]

### Neutral
- [Side effect 1]

## Alternatives Considered
1. **[Alternative 1]**: [Why rejected]
2. **[Alternative 2]**: [Why rejected]

## References
- [Link 1]
- [Link 2]
```

---

## 🚨 Common Mistakes (Quick Reference)

**For detailed examples, see [.claude/docs/troubleshooting.md](.claude/docs/troubleshooting.md)**

1. **Skipping local quality checks** (35%) - Always run `./scripts/check-all.sh` before committing
2. **Lowering quality thresholds** (25%) - Write more tests, don't lower standards
3. **Using direct tool invocation** (20%) - Use `./scripts/*` wrappers, not `npx` directly
4. **Disabling ESLint rules inline** (15%) - Fix the code or document why in ADR
5. **Using `any` type** (10%) - Use `unknown` or proper types
6. **Skipping JSDoc** (10%) - Every public API must be documented
7. **Commenting out failing tests** (5%) - Fix tests or mark with `.skip` and link issue
8. **Force pushing to main** (5%) - Never bypass branch protection
9. **Ignoring TypeScript errors with `@ts-ignore`** (5%) - Fix the type error
10. **Not running mutation tests** (5%) - Gate 3 requires ≥80% mutation score

---

## 🎓 Skills Reference

**For detailed skill documentation, see `.claude/skills/`**

### Available Skills

#### `address-feedback`
Systematic approach to addressing code review feedback with full validation.

#### `architectural-decisions`
Document significant architectural decisions using ADR format.

#### `backlog-grooming`
Prioritize and refine backlog items with clear acceptance criteria.

#### `bug-squashing-methodology`
Systematic debugging: reproduce, isolate, fix, test, prevent recurrence.

#### `ci-debugging`
Debug CI pipeline failures efficiently with log analysis and local reproduction.

#### `comprehensive-pr-review`
Thorough pull request review covering code