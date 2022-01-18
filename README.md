# Sims 4 Toolkit - Encoding (@s4tk/encoding)

## Overview

This package contains utility classes to aid with the reading and writing of binary data in buffers.

**PLEASE NOTE**: Proper documentation for this package will be provided when the Sims 4 Toolkit website has been completed. For now, please reference this README's Documentation section, where the TS declaration file stubs are provided.

## Installation

Install the package as a dependency from npm with the following command:

```sh
npm i @s4tk/encoding
```

## Disclaimers

Sims 4 Toolkit (S4TK) is a collection of creator-made modding tools for [The Sims 4](https://www.ea.com/games/the-sims). "The Sims" is a registered trademark of [Electronic Arts, Inc](https://www.ea.com/). (EA). Sims 4 Toolkit is not affiliated with or endorsed by EA.

All S4TK software is currently considered to be in its pre-release stage. Use at your own risk, knowing that breaking changes are likely to happen.

## Documentation

### Index

[class BinaryDecoder](#class-binarydecoder)
[class BinaryEncoder](#class-binaryencoder)

### class BinaryDecoder

A class for decoding binary files. The decoder keeps track of an offset, which is incremented every time a value is read.

#### Importing 

```ts
import { BinaryDecoder } from "@s4tk/encoding"; // ESM
const { BinaryDecoder } = require("@s4tk/encoding"); // CJS
```

#### Constructor

```ts
/**
 * Creates a new BinaryDecoder that can read the given buffer.
 *
 * @param buffer Buffer to decode
 */
constructor(buffer: Buffer);
```

#### Methods

```ts
/**
 * Reads the next byte as a boolean (first, reads it as a UInt8, then checks if it's != 0).
 *
 * @returns {boolean} The boolean value of the next byte
 */
boolean(): boolean;
```

```ts
/**
 * Reads the given number of raw bytes.
 *
 * @param {number} num The number of bytes to read
 * @returns {number[]} An array of bytes
 */
bytes(num: number): number[];
```

```ts
/**
 * Reads the given number of bytes as a string of Base64 characters.
 *
 * @param {number} num Number of bytes to read
 * @returns {string} The characters read
 */
charsBase64(num: number): string;
```

```ts
/**
 * Reads the given number of bytes as a string of UTF-8 characters.
 *
 * @param {number} num Number of bytes to read
 * @returns {string} The characters read
 */
charsUtf8(num: number): string;
```

```ts
/**
 * Reads a float, using little endian.
 *
 * @returns {number} The read float
 */
float(): number;
```

```ts
/**
 * Returns a new BinaryDecoder using this object's buffer.
 */
getDecoder(): BinaryDecoder;
```

```ts
/**
 * Returns a new BinaryEncoder using this object's buffer.
 */
getEncoder(): BinaryEncoder;
```

```ts
/**
 * Reads an 8-bit signed integer.
 *
 * @returns {number} The read int8
 */
int8(): number;
```

```ts
/**
 * Reads a 16-bit signed integer, using little endian.
 *
 * @returns {number} The read int16
 */
int16(): number;
```

```ts
/**
 * Reads a 32-bit signed integer, using little endian.
 *
 * @returns {number} The read int32
 */
int32(): number;
```

```ts
/**
 * Reads a 64-bit signed integer, using little endian.
 *
 * @returns {bigint} The read int64
 */
int64(): bigint;
```

```ts
/**
 * Returns whether or not the offset is at the last byte of the file.
 *
 * @returns {boolean} Whether or not offset is at EOF
 */
isEOF(): boolean;
```

```ts
/**
 * Preserves the original offset after calling the given function.
 *
 * @param fn Function to call
 */
savePos<T>(fn: () => T): T;
```

```ts
/**
 * Moves the offset to a specific byte.
 *
 * @param {number | bigint} offset The value to set the offset to
 * @returns {void}
 */
seek(offset: number | bigint): void;
```

```ts
/**
 * Advances the offset by the given number of bytes.
 *
 * @param {number | bigint} offset The number of bytes to skip
 * @returns {number} The new offset after skipping bytes
 */
skip(offset: number | bigint): number;
```

```ts
/**
 * Slices a sub-buffer of the given size starting at the current offset.
 *
 * @param {number} size Size of the sub-buffer to slice
 * @returns {Buffer} The sliced buffer
 */
slice(size: number): Buffer;
```

```ts
/**
 * Reads bytes until a null byte is found, parses them as a UTF-8 string.
 *
 * @returns {string} The string read
 */
string(): string;
```

```ts
/**
 * Gets the current offset.
 *
 * @returns {number} The current offset
 */
tell(): number;
```

```ts
/**
 * Reads an 8-bit unsigned integer.
 *
 * @returns {number} The read uint8
 */
uint8(): number;
```

```ts
/**
 * Reads a 16-bit unsigned integer, using little endian.
 *
 * @returns {number} The read uint16
 */
uint16(): number;
```

```ts
/**
 * Reads a 32-bit unsigned integer, using little endian.
 *
 * @returns {number} The read uint32
 */
uint32(): number;
```

```ts
/**
 * Reads a 64-bit unsigned integer, using little endian.
 *
 * @returns {bigint} The read uint64
 */
uint64(): bigint;
```



### class BinaryEncoder

A class for encoding binary files. The encoder keeps track of an offset, which is incremented every time a value is written.

#### Importing 

```ts
import { BinaryEncoder } from "@s4tk/encoding"; // ESM
const { BinaryEncoder } = require("@s4tk/encoding"); // CJS
```

#### Constructor

```ts
/**
 * Creates a new BinaryEncoder that can write to the given buffer.
 *
 * @param buffer Buffer to encode
 */
constructor(buffer: Buffer);
```

#### Methods

```ts
/**
 * Writes a UInt8 value of 1 if the given boolean is true, or 0 if it is false.
 *
 * @param value Boolean value to write as a UInt8
 */
boolean(value: boolean): void;
```

```ts
/**
 * Writes a string to the buffer using Base64 encoding.
 *
 * @param {string} value The characters to write
 */
charsBase64(value: string): void;
```

```ts
/**
 * Writes a string to the buffer using UTF-8 encoding.
 *
 * @param {string} value The characters to write
 */
charsUtf8(value: string): void;
```

```ts
/**
 * Writes a float to the buffer, using little endian.
 *
 * @param {number} value The float to write
 */
float(value: number): void;
```

```ts
/**
 * Returns a new BinaryDecoder using this object's buffer.
 */
getDecoder(): BinaryDecoder;
```

```ts
/**
 * Returns a new BinaryEncoder using this object's buffer.
 */
getEncoder(): BinaryEncoder;
```

```ts
/**
 * Returns whether or not the offset is at the last byte of the file.
 *
 * @returns {boolean} Whether or not offset is at EOF
 */
isEOF(): boolean;
```

```ts
/**
 * Writes an 8-bit signed integer to the buffer.
 *
 * @param {number} value The int8 to write
 */
int8(value: number): void;
```

```ts
/**
 * Writes a 16-bit signed integer to the buffer, using little endian.
 *
 * @param {number} value The int16 to write
 */
int16(value: number): void;
```

```ts
/**
 * Writes a 32-bit signed integer to the buffer, using little endian.
 *
 * @param {number} value The int32 to write
 */
int32(value: number): void;
```

```ts
/**
 * Writes a 64-bit signed integer to the buffer, using little endian.
 *
 * @param {number | bigint} value The int64 to write
 */
int64(value: number | bigint): void;
```

```ts
/**
 * Preserves the original offset after calling the given function.
 *
 * @param fn Function to call
 */
savePos<T>(fn: () => T): T;
```

```ts
/**
 * Moves the offset to a specific byte.
 *
 * @param {number | bigint} offset The value to set the offset to
 * @returns {void}
 */
seek(offset: number | bigint): void;
```

```ts
/**
 * Advances the offset by the given number of bytes.
 *
 * @param {number | bigint} offset The number of bytes to skip
 * @returns {number} The new offset after skipping bytes
 */
skip(offset: number | bigint): number;
```

```ts
/**
 * Gets the current offset.
 *
 * @returns {number} The current offset
 */
tell(): number;
```

```ts
/**
 * Writes an 8-bit unsigned integer to the buffer.
 *
 * @param {number} value The uint8 to write
 */
uint8(value: number): void;
```

```ts
/**
 * Writes a 16-bit unsigned integer to the buffer, using little endian.
 *
 * @param {number} value The uint16 to write
 */
uint16(value: number): void;
```

```ts
/**
 * Writes a 32-bit unsigned integer to the buffer, using little endian.
 *
 * @param {number} value The uint32 to write
 */
uint32(value: number): void;
```

```ts
/**
 * Writes a 64-bit unsigned integer to the buffer, using little endian.
 *
 * @param {number | bigint} value The uint64 to write
 */
uint64(value: number | bigint): void;
```
