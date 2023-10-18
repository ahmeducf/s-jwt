<h1 align="center" style="border-bottom: none;">s-jwt</h1>
<h2 align="center" style="font-size:1.17em"><em>Generate and verify JWTs with ease in TypeScript</em></h2>

<p align="center">
  <a href="https://www.conventionalcommits.org/en/v1.0.0/">
    <img alt="Commit message template" src="https://img.shields.io/badge/commit_template-Conventional_Commits-%23FE5196?style=flat&logo=conventional-commits">
  </a>
  <a href="https://github.com/conventional-changelog/commitlint">
    <img alt="Commit message linter" src="https://img.shields.io/badge/commit_message_linter-Commitlint-%23E8E8E8?style=flat&logo=commitlint&logoColor=%23E8E8E8&labelColor=3C444C">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-Angular-e10079?logo=semantic-release">
  </a>
</p>

<p align="center">
  <a href="https://github.com/airbnb/javascript">
    <img alt="Followed style guide" src="https://img.shields.io/badge/style_guide-Airbnb-FF5A5F?logo=airbnb&style=flat">
  </a>
  <a href="http://eslint.org/">
    <img alt="Lint tool" src="https://img.shields.io/badge/linter-ESLint-4B32C3?style=flat&logo=eslint&logoColor=4B32C3&labelColor=f5f5f5">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="Code formatter" src="https://img.shields.io/badge/formatter-Prettier-F7B93E?style=flat&logo=prettier&logoColor=F7B93E">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ahmeducf/s-jwt">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@ahmeducf/s-jwt/latest.svg?logo=npm">
  </a>
  <a href="https://www.npmjs.com/package/@ahmeducf/s-jwt">
    <img alt="npm beta version" src="https://img.shields.io/npm/v/@ahmeducf/s-jwt/beta.svg?logo=npm">
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/@ahmeducf/s-jwt">
    <img alt="npm" src="https://img.shields.io/npm/dt/%40ahmeducf%2Fs-jwt?logo=npm">
  </a>
  <a href="https://github.com/ahmeducf/s-jwt/actions?query=workflow%3ATest%20and%20Release+branch%3Amain">  
    <img alt="GitHub Workflow Status (with event)" src="https://img.shields.io/github/actions/workflow/status/ahmeducf/s-jwt/test_and_release.yml?logo=github&labelColor=3C444C">
  </a>
</p>

```typescript
import jwt from '@ahmeducf/s-jwt';

// Generate a JWT token
const jwtToken = jwt.generateSync({ foo: 'bar' }, { secretKey: 'secret' });

// Verify a JWT token
try {
  const decodedPayload = jwt.verifySync(jwtToken, { secretKey: 'secret' });
  console.log(decodedPayload);
  // { foo: 'bar', iat: <timespan>, exp: <timespan> }
} catch (error) {
  // Handle error
}
```

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**S**-JWT,&emsp;_**S** for **S**imple, **S**ecure, and **S**alah **(my name)**_,&emsp;is a TypeScript library that implements the JSON Web Token (JWT), JSON Web Signature (JWS), and JSON Web Algorithms (JWA) standards defined in [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519), [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515), and [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518) respectively. It provides a simple and easy-to-use API for generating and verifying JWTs, with support for various algorithms and options.

## Features

- **Simple**: The API is simple and easy to use.
- **Secure**: The library is written in TypeScript and uses the latest ES standards. It is also fully tested and linted.
- **Flexible**: The library supports various algorithms _(symmetric & asymmetric)_ and options.
- **Highly Configurable**: The library is highly configurable and allows you to customize the generated JWTs and the verification process.
- **Dual Package Support**: The library supports both CommonJS and ES Modules.
- **Well Documented**: The library is well documented and has a detailed API reference.

## Installation

```bash

# Install with npm
npm install @ahmeducf/s-jwt

# Install with yarn
yarn add @ahmeducf/s-jwt

```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## License

[MIT](./LICENSE)
