# \<mil-no-sleep>

mil-no-sleep mocks the Wake Lock API and extends it to all browsers.
This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i mil-no-sleep
```

## Usage

```html
<script type="module">
  import 'mil-no-sleep/mil-no-sleep.js';
</script>

<mil-no-sleep></mil-no-sleep>
```

## Methods

disableSleepMode(): Disable Sleep Mode.

enableSleepMode(): Re activate Sleep Mode.

## Events

sleepModeDisabled: fired when sleep mode is disabled.

sleepModeEnabled: fired when sleep mode is reactivated.

## Linting with ESLint, Prettier, and Types

To scan the project for linting errors, run

```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well

```bash
npm run lint:eslint
```

```bash
npm run lint:prettier
```

To automatically fix many linting errors, run

```bash
npm run format
```

You can format using ESLint and Prettier individually as well

```bash
npm run format:eslint
```

```bash
npm run format:prettier
```

## Local Demo with `es-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

```bash
npm start:compatibility
```

To run a local development server in compatibility mode for older browsers that serves the basic demo located in `demo/index.html`
