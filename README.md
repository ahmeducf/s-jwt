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
  console.log(decodedPayload); // { foo: 'bar', iat: <timestamp> }
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
- [Supported Algorithms](#supported-algorithms)
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

Install with npm:

```bash

npm install @ahmeducf/s-jwt

```

Install with yarn:

```bash

yarn add @ahmeducf/s-jwt

```

## API

The library has a simple and easy-to-use API. It provides two functions for generating and verifying JWTs, accompanied by a set of types and interfaces.

### Types

The library provides the following types and interfaces:

#### `Algorithm`

The `Algorithm` type is an alias for the [supported algorithms](#supported-algorithms).

```typescript
type Algorithm =
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'PS256'
  | 'PS384'
  | 'PS512';
```

#### `HmacAlgorithm`

The `HmacAlgorithm` type is an alias for the supported HMAC algorithms.

```typescript
type HmacAlgorithm = 'HS256' | 'HS384' | 'HS512';
```

#### `RsaAlgorithm`

The `RsaAlgorithm` type is an alias for the supported RSA algorithms.

```typescript
type RsaAlgorithm = 'RS256' | 'RS384' | 'RS512';
```

#### `PssAlgorithm`

The `PssAlgorithm` type is an alias for the supported PSS algorithms.

```typescript
type PssAlgorithm = 'PS256' | 'PS384' | 'PS512';
```

#### `EcdsaAlgorithm`

The `EcdsaAlgorithm` type is an alias for the supported ECDSA algorithms.

```typescript
type EcdsaAlgorithm = 'ES256' | 'ES384' | 'ES512';
```

#### `AsymmetricKeyAlgorithm`

The `AsymmetricKeyAlgorithm` type is an alias for the supported asymmetric key algorithms.

```typescript
type AsymmetricKeyAlgorithm = RsaAlgorithm | PssAlgorithm | EcdsaAlgorithm;
```

#### `SecondsNumber`

The `SecondsNumber` type is an alias for a number representing a timespan in seconds.

```typescript
type SecondsNumber = number;
```

#### `Payload`

The `Payload` type is an interface representing the payload of a JWT.

```typescript
interface Payload {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp?: SecondsNumber; // Expiration Time
  iat?: SecondsNumber; // Issued At
  jti?: string; // JWT ID
  [key: string]: unknown; // Any additional properties
}
```

> [!WARNING]
>
> The standard for JWT defines `exp` and `iat` as **NumericDate**:
>
> A JSON numeric value representing the number of seconds from 1970-01-01T00:00:00Z UTC until the specified UTC date/time, ignoring leap seconds. This is equivalent to the IEEE Std 1003.1, 2013 Edition [POSIX.1] definition "Seconds Since the Epoch", in which each day is accounted for by exactly 86400 seconds, other than that non-integer values can be represented. See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular.

#### `BaseGenerateOptions`

The `BaseGenerateOptions` type is an interface representing the base options for generating a JWT.

```typescript
interface BaseGenerateOptions {
  algorithm?: Algorithm; // Algorithm
  expiresIn?: string | SecondsNumber; // Expiration Time
  audience?: string | string[]; // Audience
  issuer?: string; // Issuer
  jwtId?: string; // JWT ID
  subject?: string; // Subject
  noTimestamp?: boolean; // Do not include the `iat` claim
}
```

> [!NOTE]
>
> `expiresIn` is expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms).
>
> Eg: `1000`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

> [!NOTE]
>
> If any of the claims `expiresIn`, `audience`, `issuer`, `subject`, or `jwtId` are specified in both `GenerateOptions` and `Payload`, the value in `GenerateOptions` will be used.

#### `GenerateOptionsWithSecretKey`

The `GenerateOptionsWithSecretKey` type is an interface representing the options for generating a JWT with a secret key.

```typescript
interface GenerateOptionsWithSecretKey extends BaseGenerateOptions {
  secretKey?: string | Buffer | crypto.KeyObject; // Secret Key for HMAC algorithms
}
```

#### `GenerateOptionsWithPrivateKey`

The `GenerateOptionsWithPrivateKey` type is an interface representing the options for generating a JWT with a private key.

```typescript
interface GenerateOptionsWithPrivateKey extends BaseGenerateOptions {
  privateKey?: string | Buffer | crypto.KeyObject; // Private Key for asymmetric key algorithms
}
```

#### `GenerateOptions`

The `GenerateOptions` type is an interface representing the options for generating a JWT.

```typescript
type GenerateOptions =
  | GenerateOptionsWithSecretKey
  | GenerateOptionsWithPrivateKey;
```

> [!WARNING]
>
> Generated JWTs will include an `iat` (issued at) claim by default unless `GenerateOptions.noTimestamp` is specified. If `iat` is inserted in the payload, it will be used instead of the real timestamp for calculating other things like `exp` given a timespan in `GenerateOptions.expiresIn`.
> If both `GenerateOptions.noTimestamp` and `Payload.iat` are specified, an `SjwtTypeError` will be thrown.

#### `BaseVerifyOptions`

The `BaseVerifyOptions` type is an interface representing the base options for verifying a JWT.

```typescript
interface BaseVerifyOptions {
  algorithms?: Algorithm[]; // Algorithms to accept in `alg` claim
  audience?: string | RegExp | Array<string | RegExp>; // Audience(s) to accept in `aud` claim
  issuer?: string | string[]; // Issuer(s) to accept in `iss` claim
  jwtId?: string; // JWT ID to accept in `jti` claim
  subject?: string; // Subject to accept in `sub` claim
  ignoreExpiration?: boolean; // If true, do not validate the `exp` claim
  maxAge?: string | SecondsNumber; // The maximum allowed age for tokens to still be valid.
  clockTimestamp?: SecondsNumber; // The time in seconds that should be used as the current time for all necessary comparisons.
  clockTolerance?: SecondsNumber; // Number of seconds to tolerate when checking the `exp` claim, to deal with small clock differences among different servers.
}
```

> [!NOTE]
>
> `maxAge` is expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms).
>
> Eg: `1000`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

#### `VerifyOptionsWithSecretKey`

The `VerifyOptionsWithSecretKey` type is an interface representing the options for verifying a JWT with a secret key.

```typescript
interface VerifyOptionsWithSecretKey extends BaseVerifyOptions {
  secretKey?: string | Buffer | crypto.KeyObject; // Secret Key for HMAC algorithms
}
```

#### `VerifyOptionsWithPublicKey`

The `VerifyOptionsWithPublicKey` type is an interface representing the options for verifying a JWT with a public key.

```typescript
interface VerifyOptionsWithPublicKey extends BaseVerifyOptions {
  publicKey?: string | Buffer | crypto.KeyObject; // Public Key for asymmetric key algorithms
}
```

#### `VerifyOptions`

The `VerifyOptions` type is an interface representing the options for verifying a JWT.

```typescript
type VerifyOptions = VerifyOptionsWithSecretKey | VerifyOptionsWithPublicKey;
```

#### `SjwtError`

The `SjwtError` type is an interface representing a generic error thrown by the library.

```typescript
interface SjwtError extends Error {
  name: string;
  message: string;
}
```

#### `SjwtTypeError`

The `SjwtTypeError` type is an interface representing a type error thrown by the library.
Property `name` is always `SjwtTypeError`.

```typescript
type SjwtTypeError = SjwtError;
```

#### `SjwtValidationError`

The `SjwtValidationError` type is an interface representing a validation error thrown by the library.
Property `name` is always `SjwtValidationError`.

```typescript
type SjwtValidationError = SjwtError;
```

#### `SjwtVerificationError`

The `SjwtVerificationError` type is an interface representing a verification error thrown by the library.
Property `name` is always `SjwtVerificationError`.

```typescript
type SjwtVerificationError = SjwtError;
```

#### `SjwtExpiredTokenError`

The `SjwtExpiredTokenError` type is an interface representing an expired token error thrown by the library during verification. It extends `SjwtVerificationError`.

Property `name` is always `SjwtExpiredTokenError`. It also has a `expiredAt` property which is the date at which the token expired.

```typescript
interface SjwtExpiredTokenError extends SjwtVerificationError {
  expiredAt: Date;
}
```

### Functions

The library provides the following functions:

#### `generateSync(payload: Payload, options: GenerateOptions): string` <br> `generate(payload: Payload, options: GenerateOptions): Promise<string>`

The `generateSync` function is a synchronous function that generates a JWT.
It takes a payload and options as arguments and returns a JWT string.

The `generate` function is promise-based asynchronous version of `generateSync`.

- `payload`: The [payload](#payload) of the JWT.
- `options`: The [options](#generateoptions) for generating the JWT.

  - `secretKey`: The secret key to use for generating the JWT. Used only for HMAC algorithms.
  - `privateKey`: The private key to use for generating the JWT. Used only for asymmetric key algorithms.

    > [!WARNING]
    >
    > If both `GenerateOptions.secretKey` and `GenerateOptions.privateKey` are specified, an `SjwtValidationError` will be thrown. You also have to use the appropriate algorithm for the key type.
    > See [Supported Algorithms](#supported-algorithms) to know which algorithms are supported for each key type.

  - `algorithm`: The algorithm to use for generating the JWT. Defaults to `HS256`.
  - `expiresIn`: The expiration time of the JWT. If defined it overrides the `exp` claim in the payload.

    > [!IMPORTANT]
    >
    > `expiresIn` is expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms).
    >
    > Eg: `1000`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

  - `audience`: The audience(s) that the JWT is intended for. If defined it overrides the `aud` claim in the payload.
  - `issuer`: The issuer of the JWT. If defined it overrides the `iss` claim in the payload.
  - `jwtId`: The ID of the JWT. If defined it overrides the `jti` claim in the payload.
  - `subject`: The subject of the JWT. If defined it overrides the `sub` claim in the payload.
  - `noTimestamp`: If `true`, the generated JWT will not include an `iat` claim.

    > [!WARNING]
    >
    > Generated JWTs will include an `iat` (issued at) claim by default unless `GenerateOptions.noTimestamp` is specified. If `iat` is inserted in the payload, it will be used instead of the real timestamp for calculating other things like `exp` given a timespan in `GenerateOptions.expiresIn`.
    > If both `GenerateOptions.noTimestamp` and `Payload.iat` are specified, an `SjwtValidationError` will be thrown.

- **Returns**: In case of successful generation, the generated JWT is returned. Otherwise, an error is thrown.

#### `verifySync(token: string, options: VerifyOptions): Payload` <br> `verify(token: string, options: VerifyOptions): Promise<Payload>`

The `verifySync` function is a synchronous function that verifies a JWT.
It takes a JWT string and options as arguments and returns the decoded payload.

The `verify` function is promise-based asynchronous version of `verifySync`.

- `token`: The JWT string to verify.
- `options`: The [options](#verifyoptions) for the verification process.

  - `secretKey`: The secret key to use for verifying the JWT. Used only for HMAC algorithms.
  - `publicKey`: The public key to use for verifying the JWT. Used only for asymmetric key algorithms.

    > [!WARNING]
    >
    > If both `VerifyOptions.secretKey` and `VerifyOptions.publicKey` are specified, an `SjwtValidationError` will be thrown. You also have to use the appropriate algorithm for the key type.
    > See [Supported Algorithms](#supported-algorithms) to know which algorithms are supported for each key type.

  - `algorithms`: List of algorithms to accept in the `alg` claim. Example: `['HS256', 'HS384']`.

    > [!NOTE]
    >
    > If not specified a defaults will be used based on the type of key provided.
    >
    > - Secret key: `['HS256', 'HS384', 'HS512']`
    > - RSA public key: `['RS256', 'RS384', 'RS512']`
    > - RSA-PSS public key: `['PS256', 'PS384', 'PS512']`
    > - ECDSA public key: `['ES256', 'ES384', 'ES512']`

  - `audience`: The audience(s) to accept in the `aud` claim. if you want to check audience `(aud)` claim, provide a value here.
  - `issuer`: string or array of strings of valid values for the iss field. if you want to check issuer `(iss)` claim, provide a value here.
  - `jwtId`: The JWT ID to accept in the `jti` claim. If you want to check the JWT ID, provide a value here.
  - `subject`: The subject to accept in the `sub` claim. If you want to check the subject, provide a value here.
  - `ignoreExpiration`: If `true`, the `exp` claim will not be validated.
  - `maxAge`: The maximum allowed age for tokens to still be valid.

    > [!NOTE]
    >
    > `maxAge` is expressed in seconds or a string describing a time span [vercel/ms](https://github.com/vercel/ms).
    >
    > Eg: `1000`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

  - `clockTimestamp`: The time in seconds that should be used as the current time for all necessary comparisons.
  - `clockTolerance`: Number of seconds to tolerate when checking the `exp` claim, to deal with small clock differences among different servers.

- **Returns**: In case of successful verification, the decoded payload is returned. Otherwise, an error is thrown.

## Errors

## Supported Algorithms

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## License

[MIT](./LICENSE)
