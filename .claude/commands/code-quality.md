# Code Quality Command

Run all linters, formatters, and tests. Auto-fix when possible.

## Process

1. **Run Formatters**
````bash
   pnpm prettier --write .
   pnpm eslint --fix .
````

2. **Run Type Check**
````bash
   pnpm turbo run type-check
````

3. **Run Tests**
````bash
   # Unit/integration tests
   pnpm turbo run test
   
   # E2E tests (if requested)
   # pnpm turbo run test:e2e
````

4. **Check Dependencies**
````bash
   pnpm audit --audit-level=moderate
````

5. **Analyze Results**
   - If linting errors remain after --fix, report them
   - If tests fail, provide failure details
   - If security issues found, escalate

6. **Report Status**

## Allowed Tools
- bash (run all commands)
- view (read error outputs)
- edit (fix auto-fixable issues)

## Output Format
````
# Code Quality Report

## ✅ Passed
- Prettier: All files formatted
- ESLint: No errors (12 warnings auto-fixed)
- TypeScript: No type errors
- Tests: 156/156 passed
- Security: No vulnerabilities

## ⚠️  Warnings
- ESLint: 3 warnings remain (manual review needed)
  - src/utils/api.ts:45 - Unused variable 'response'
  - src/components/Form.tsx:12 - Missing dependency in useEffect

## ❌ Failed
[None or list failures]

## 📦 Dependencies
- 2 dev dependencies can be updated
- No security vulnerabilities

---

All quality checks passed! ✨
````

## Auto-Fix Strategy

The command should automatically fix:
- Code formatting (Prettier)
- Fixable linting issues (ESLint --fix)
- Import sorting

Should NOT auto-fix:
- Type errors (requires human decision)
- Test failures
- Logic issues

## Usage
````bash
# In Claude Code CLI
/code-quality

# Or with specific target
/code-quality apps/web
````