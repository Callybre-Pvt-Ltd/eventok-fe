# CLAUDE.md

Repo-specific rules for Claude Code in the Eventok web frontend (`eventok-fe`).

## 0. Context7 First (Always — No Exceptions)

Before writing **any** code or making **any** implementation decision involving a library, framework, SDK, API, or CLI tool, use **Context7 MCP** to fetch current documentation. Follow the latest documented version/API — never rely on training data alone. This applies to every task: setup, configuration, migrations, debugging, and all feature work. **Always consult Context7 before implementation.**

## 1. File Structure & Responsibilities

Every component folder must follow this exact structure:

- `index.tsx`: Purely the UI/JSX structure. **NO** logic, **NO** state, **NO** inline styles.
- `helper.ts`: All business logic, state management (hooks), and helper functions.
- `styled.ts`: All Styled Components and CSS logic.

## 2. Component Logic (index.tsx)

- No `useState`, `useEffect`, or functional logic allowed inside `index.tsx`.
- Import logic from `helper.ts` (e.g., `const { state, handlers } = useComponentLogic()`).
- Maximum file length: 400 lines. Break into smaller sub-components if exceeded.

## 3. Styling (styled.ts)

- **Zero Inline CSS:** No `style={{...}}` props allowed in JSX.
- **Theming:** No hex codes or literal color strings (e.g., "#FFF" or "white"). Use the project `palette`. If not available, add the color to the palette first.
- **Responsiveness:** Use the defined `breakpoints` utility for all media queries. No hardcoded `px` widths for screen sizes.
- **Text Size:** Use standard typography from `fontSizes`. No hardcoded sizes.
- **Clean Code:** Never add comments inside `styled.ts`.

## 4. Internationalization (i18n)

- **No Hardcoded Strings:** Every label, placeholder, or text node must use the `t()` translation function.
- **Sync:** When adding a new key, ensure it is added to all language files (e.g., `en/recipe.ts`, `it/recipe.ts`, `ge/recipe.ts`, etc.).

## 5. Cleanup & Quality

- **Dead Code:** Remove unused imports, variables, and stale code immediately after refactoring.
- **Verification:** After every edit, automatically run `npm run preparepush`.
- **Error Resolution:** Resolve all errors or warnings returned by `preparepush` immediately before considering the task finished.

## 6. Execution Guidelines (Crucial)

- **Do Not Over-Engineer:** Implement exactly what is asked using the minimal amount of code necessary. Do not add unsolicited features.
- **Scope Integrity & Regression Prevention:** Do not change unrelated logic. Any change must absolutely **NOT** break any existing functionality anywhere else in the application. Always check if the code, component, helper, or utility being modified is used by any other feature, file, or page, and ensure full backward compatibility or update dependencies safely.
- **Token Efficiency:** Keep responses highly concise and performant. Do not provide explanations unless explicitly requested.

## 7. Page & Folder Structure (Required)

Follow the same layout as `synchronization`, `stock-replenishment`, and `make-your-menu`. Do **not** nest `components/`, `utils/`, `hooks/`, or `styled/` folders inside a page directory.

### Page folder (`src/pages/<page-name>/`)

Only these files belong here:

- `index.tsx` — thin composer; imports UI from `@/components/<feature>/`; no business logic or inline components
- `helper.ts` — page orchestration hook(s); may re-export from `@/hooks/<feature>/`
- `styled.ts` — page-level layout styles only (wrapper, header, page content)

**Forbidden inside `src/pages/`:** `components/`, `utils/`, `hooks/`, nested `styled/`, monolithic multi-thousand-line files.

### Feature components (`src/components/<feature>/<component-name>/`)

Each component is its own folder with exactly:

- `index.tsx` — UI only (see rules 1–2)
- `helper.ts` — logic, state, handlers
- `styled.ts` — component styles

Example: `src/components/make-your-menu/list-view/index.tsx`

Import in the page as: `import ListView from '@/components/make-your-menu/list-view'`

### Shared code (global — never inside the page folder)

| Kind | Location | Example |
|------|----------|---------|
| Hooks | `src/hooks/<feature>/` | `src/hooks/make-your-menu/use-make-your-menu-page/helper.ts` |
| Utils | `src/utils/<feature>/` | `src/utils/make-your-menu/labels.ts` |
| Types | `src/types/<feature>.ts` | `src/types/make-your-menu.ts` |
| Constants | `src/constants/<feature>.ts` | `src/constants/make-your-menu.ts` |

### File size & refactor rules

- **Hard max: 500 lines** per file. Split into a new component folder or shared module before exceeding.
- When extracting code, move UI → `src/components/`, logic → `src/hooks/`, pure functions → `src/utils/`.
- After any structural change: update all imports, delete orphaned files, run `npm run preparepush`.

### Regression safety

- Shared modules (`src/hooks/`, `src/utils/`, `src/types/`, `src/constants/`) are used across pages. Changing them must not break unrelated features.
- Scope refactors to the target feature only; verify cross-page imports before merging.

## 8. Reuse Existing Components (Mandatory)

- **Never design new UI primitives.** Always reuse components already used elsewhere in the app.
- **Search bar:** Always use `CustomAntdSearchInput` from `src/components/global/custom-antd-search-input/`. Never use a raw Ant `Input` with a search prefix as a search field.
- **Buttons:** Always use Ant Design `Button` (from `antd`) with the same `size`, `type`, and icon patterns found in other pages. Never create custom button-like elements.
- **Inputs:** Always use Ant Design `Input` / `Input.TextArea` (from `antd`) with consistent sizing matching existing forms. No custom `<input>` elements unless wrapping in a styled component that delegates to an existing Ant input.
- **Pagination:** Always use the existing pagination component used by other pages (e.g. recipe, stock-replenishment). Never implement a bespoke pagination UI.
- Before adding any UI primitive, grep for its usage in the codebase and use the same component/import path.

## 9. Typography — Poppins Only

- **Every text node in the entire app must render in Poppins.** No exceptions.
- Global baseline: `* { font-family: 'Poppins', sans-serif !important; }` is set in `src/index.css` and `token.fontFamily` is set in the Ant Design `ConfigProvider`. Do not override or remove these.
- In `styled.ts`: never set `font-family` to anything other than `${fontFamily.body}` (which resolves to `'Poppins'`). Never hardcode font names.
- In Quill / rich-text editors: force Poppins on `.ql-container`, `.ql-editor`, and all their descendants via the editor's `styled.ts`.
- If a third-party component renders its own font, override it in `styled.ts` using `font-family: ${fontFamily.body} !important`.
