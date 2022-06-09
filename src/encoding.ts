//#region Types

type Endianness = "BE" | "LE";

type BufferReadNumberMethod =
	"readUInt8" |
	"readUInt16LE" |
	"readUInt16BE" |
	"readUInt32LE" |
	"readUInt32BE" |
	"readInt8" |
	"readInt16LE" |
	"readInt16BE" |
	"readInt32LE" |
	"readInt32BE" |
	"readFloatLE" |
	"readFloatBE";

type BufferReadBigIntMethod =
	"readBigUInt64LE" |
	"readBigUInt64BE" |
	"readBigInt64LE" |
	"readBigInt64BE";

type BufferWriteNumberMethod =
	"writeUInt8" |
	"writeUInt16LE" |
	"writeUInt16BE" |
	"writeUInt32LE" |
	"writeUInt32BE" |
	"writeInt8" |
	"writeInt16LE" |
	"writeInt16BE" |
	"writeInt32LE" |
	"writeInt32BE" |
	"writeFloatLE" |
	"writeFloatBE";

type BufferWriteBigIntMethod =
	"writeBigUInt64LE" |
	"writeBigUInt64BE" |
	"writeBigInt64LE" |
	"writeBigInt64BE";

//#endregion Types

/**
 * A base class for classes that work with binary files.
 */
abstract class BinaryEncodingBase {
	protected readonly _buffer: Buffer;
	protected _offset: number;

	get buffer(): Buffer { return this._buffer; }

	constructor(
		buffer: Buffer,
		initialOffset: number = 0,
		protected _endianness: Endianness = "LE"
	) {
		this._buffer = buffer;
		this._offset = initialOffset;
	}

	/**
	 * Advances the offset by the given number of bytes.
	 * 
	 * @param offset The number of bytes to skip
	 * @returns The new offset after skipping bytes
	 */
	skip(offset: number | bigint): number {
		return this._offset += Number(offset);
	}

	/**
	 * Advances the offset by the given number of bytes, then calls a function
	 * and returns its result.
	 * 
	 * @param offset The number of bytes to skip 
	 * @param fn Function to call after skipping
	 */
	skipThen<T>(offset: number | bigint, fn: () => T): T {
		this.skip(offset);
		return fn();
	}

	/**
	 * Moves the offset to a specific byte.
	 * 
	 * @param offset The value to set the offset to
	 */
	seek(offset: number | bigint): void {
		this._offset = Number(offset);
	}

	/**
	 * Moves the offset to a specific byte, then calls a function and returns its
	 * result.
	 * 
	 * @param offset  The value to set the offset to
	 * @param fn Function to call after seeking
	 */
	seekThen<T>(offset: number | bigint, fn: () => T): T {
		this.seek(offset);
		return fn();
	}

	/**
	 * Gets the current offset.
	 * 
	 * @returns The current offset
	 */
	tell(): number {
		return this._offset;
	}

	/**
	 * Preserves the original offset after calling the given function.
	 * 
	 * @param fn Function to call
	 */
	savePos<T>(fn: () => T): T {
		const pos = this.tell();
		const result = fn();
		this.seek(pos);
		return result;
	}

	/**
	 * Returns whether or not the offset is at the last byte of the file.
	 * 
	 * @returns Whether or not offset is at EOF
	 */
	isEOF(): boolean {
		return this._offset === this._buffer.length;
	}

	/**
	 * Returns a new BinaryEncoder using this object's buffer.
	 */
	getEncoder(initialOffset = 0): BinaryEncoder {
		return new BinaryEncoder(this._buffer, initialOffset);
	}

	/**
	 * Returns a new BinaryDecoder using this object's buffer.
	 * 
	 * @param initialOffset
	 */
	getDecoder(initialOffset = 0): BinaryDecoder {
		return new BinaryDecoder(this._buffer, initialOffset);
	}
}

/**
 * A class for decoding binary files. The decoder keeps track of an offset,
 * which is incremented every time a value is read.
 */
export class BinaryDecoder extends BinaryEncodingBase {
	/**
	 * Creates a new BinaryDecoder that can read the given buffer.
	 * 
	 * @param buffer Buffer to decode
	 * @param initialOffset Initial offset to use. 0 by default.
	 * @param endianness Endianness to use. Little endian by default.
	 */
	constructor(
		buffer: Buffer,
		initialOffset: number = 0,
		endianness: Endianness = "LE"
	) {
		super(buffer, initialOffset, endianness);
	}

	//#region Text / Encoded Bytes

	/**
	 * Reads the given number of bytes as characters in the given encoding.
	 * 
	 * @private
	 * @param num Number of bytes to read
	 * @param encoding Encoding to read bytes as
	 * @returns The characters read as a string
	 */
	private _chars(num: number, encoding: string): string {
		const end = this._offset + num;
		//@ts-ignore: Importing Encoding is a pain, and is not necessary at all
		const result = this._buffer.toString(encoding, this._offset, end);
		this.seek(end);
		return result;
	}

	/**
	 * Reads the given number of bytes as a string of UTF-8 characters.
	 * 
	 * @param num Number of bytes to read
	 * @returns The characters read
	 */
	charsUtf8(num: number): string {
		return this._chars(num, "utf-8");
	}

	/**
	 * Reads the given number of bytes as a string of Base64 characters.
	 * 
	 * @param num Number of bytes to read
	 * @returns The characters read
	 */
	charsBase64(num: number): string {
		return this._chars(num, "base64");
	}

	/**
	 * Reads bytes until a null byte is found, parses them as a UTF-8 string.
	 * 
	 * @returns The string read
	 */
	string(): string {
		const start = this.tell();
		let nextByte = this.byte();
		if (!nextByte) return "";
		while (nextByte) nextByte = this.byte();
		return this._buffer.toString("utf8", start, this._offset - 1);
	}

	//#endregion Text / Encoded Bytes

	//#region Raw Bytes / Buffers

	/**
	 * Reads the next byte as a boolean (first, reads it as a UInt8, then checks if it's != 0).
	 * 
	 * @returns The boolean value of the next byte
	 */
	boolean(): boolean {
		return this.uint8() !== 0;
	}

	/**
	 * Reads a single byte. This is an alias for `uint8()`.
	 * 
	 * @returns A single byte value
	 */
	byte(): number {
		return this.uint8();
	}

	/**
	 * Reads the given number of raw bytes.
	 * 
	 * @param num The number of bytes to read
	 * @returns An array of bytes
	 */
	bytes(num: number): number[] {
		const bytes = [];
		for (let i = 0; i < num; i++) bytes.push(this.uint8());
		return bytes;
	}

	/**
	 * Slices a sub-buffer of the given size starting at the current offset.
	 * 
	 * @param size Size of the sub-buffer to slice
	 * @returns The sliced buffer
	 */
	slice(size: number): Buffer {
		const end = this._offset + size;
		const slice = this._buffer.slice(this._offset, end);
		this.seek(end);
		return slice;
	}

	//#endregion Raw Bytes / Buffers

	//#region Numbers

	/**
	 * Reads a number using the given Buffer method.
	 * 
	 * @private
	 * @param methodName The method to call on the buffer
	 * @param numBytes The number of bytes to advance the offset by
	 * @returns The read number
	 */
	private _number(methodName: BufferReadNumberMethod, numBytes: number): number {
		const result = this._buffer[methodName](this._offset);
		this.skip(numBytes);
		return result;
	}

	/**
	 * Reads a bigint using the given Buffer method.
	 * 
	 * @private
	 * @param methodName The method to call on the buffer
	 * @returns The read bigint
	 */
	private _bigint(methodName: BufferReadBigIntMethod): bigint {
		const result = this._buffer[methodName](this._offset);
		this.skip(8);
		return result;
	}

	/**
	 * Reads an 8-bit unsigned integer.
	 * 
	 * @returns The read uint8
	 */
	uint8(): number {
		return this._number("readUInt8", 1);
	}

	/**
	 * Reads a 16-bit unsigned integer, using little endian.
	 * 
	 * @returns The read uint16
	 */
	uint16(): number {
		return this._number(
			this._endianness === "LE"
				? "readUInt16LE"
				: "readUInt16BE",
			2
		);
	}

	/**
	 * Reads a 32-bit unsigned integer, using little endian.
	 * 
	 * @returns The read uint32
	 */
	uint32(): number {
		return this._number(
			this._endianness === "LE"
				? "readUInt32LE"
				: "readUInt32BE",
			4
		);
	}

	/**
	 * Reads a 64-bit unsigned integer, using little endian.
	 * 
	 * @returns The read uint64
	 */
	uint64(): bigint {
		return this._bigint(
			this._endianness === "LE"
				? "readBigUInt64LE"
				: "readBigUInt64BE"
		);
	}

	/**
	 * Reads an 8-bit signed integer.
	 * 
	 * @returns The read int8
	 */
	int8(): number {
		return this._number("readInt8", 1);
	}

	/**
	 * Reads a 16-bit signed integer, using little endian.
	 * 
	 * @returns The read int16
	 */
	int16(): number {
		return this._number(
			this._endianness === "LE"
				? "readInt16LE"
				: "readInt16BE",
			2
		);
	}

	/**
	 * Reads a 32-bit signed integer, using little endian.
	 * 
	 * @returns The read int32
	 */
	int32(): number {
		return this._number(
			this._endianness === "LE"
				? "readInt32LE"
				: "readInt32BE",
			4
		);
	}

	/**
	 * Reads a 64-bit signed integer, using little endian.
	 * 
	 * @returns The read int64
	 */
	int64(): bigint {
		return this._bigint(
			this._endianness === "LE"
				? "readBigInt64LE"
				: "readBigInt64BE"
		);
	}

	/**
	 * Reads a float, using little endian.
	 * 
	 * @returns The read float
	 */
	float(): number {
		return this._number(
			this._endianness === "LE"
				? "readFloatLE"
				: "readFloatBE",
			4
		);
	}

	//#endregion Numbers
}

/**
 * A class for encoding binary files. The encoder keeps track of an offset,
 * which is incremented every time a value is written.
 */
export class BinaryEncoder extends BinaryEncodingBase {
	/**
	 * Creates a new BinaryEncoder that can write to the given buffer.
	 * 
	 * @param buffer Buffer to encode
	 * @param initialOffset Initial offset to use. 0 by default.
	 * @param endianness Endianness to use. Little endian by default.
	 */
	constructor(
		buffer: Buffer,
		initialOffset: number = 0,
		endianness: Endianness = "LE"
	) {
		super(buffer, initialOffset, endianness);
	}

	/**
	 * Creates a new buffer and returns and encoder for it.
	 * 
	 * @param size Size of buffer to encode
	 */
	static alloc(size: number): BinaryEncoder {
		return new BinaryEncoder(Buffer.alloc(size));
	}

	//#region Text / Encoded Bytes

	/**
	 * Writes a string to the buffer using the given encoding.
	 * 
	 * @private
	 * @param value The characters to write
	 * @param encoding The encoding to write the string as
	 */
	private _chars(value: string, encoding: string) {
		// intentionally += because write() returns # bytes written
		//@ts-ignore: Importing Encoding is a pain, and is not necessary at all
		this._offset += this._buffer.write(value, this._offset, Buffer.byteLength(value, encoding), encoding);
	}

	/**
	 * Writes a string to the buffer using UTF-8 encoding.
	 * 
	 * @param value The characters to write
	 */
	charsUtf8(value: string) {
		this._chars(value, "utf-8");
	}

	/**
	 * Writes a string to the buffer using Base64 encoding.
	 * 
	 * @param value The characters to write
	 */
	charsBase64(value: string) {
		this._chars(value, "base64");
	}

	//#endregion Text / Encoded Bytes

	//#region Raw Bytes / Buffers

	/**
	 * Writes a UInt8 value of 1 if the given boolean is true, or 0 if it is false.
	 * 
	 * @param value Boolean value to write as a UInt8
	 */
	boolean(value: boolean) {
		this.uint8(value ? 1 : 0);
	}

	/**
	 * Writes a single numerical value as a byte. This is an alias for `uint8()`.
	 * 
	 * @param value Single byte value to write
	 */
	byte(value: number) {
		this.uint8(value);
	}

	/**
	 * Writes an array of bytes to the buffer.
	 * 
	 * @param values Array of bytes to write
	 */
	bytes(values: number[] | Uint8Array) {
		values.forEach((value: number) => this.byte(value));
	}

	//#endregion Raw Bytes / Buffers

	//#region Numbers

	/**
	 * Writes a number to the buffer using the given method.
	 * 
	 * @private
	 * @param value The number to write
	 * @param methodName The method to write the number with
	 */
	private _number(value: number, methodName: BufferWriteNumberMethod) {
		// intentionally = because all number methods return current offset + # bytes written
		this._offset = this._buffer[methodName](value, this._offset);
	}

	/**
	 * Writes a bigint to the buffer using the given method. This is separate from
	 * _number because this module was originally written in TypeScript.
	 * 
	 * @private
	 * @param value The bigint to write
	 * @param methodName The method to write the bigint with
	 */
	private _bigint(value: bigint, methodName: BufferWriteBigIntMethod) {
		// intentionally = because all number methods return current offset + # bytes written
		this._offset = this._buffer[methodName](value, this._offset);
	}

	/**
	 * Writes an 8-bit unsigned integer to the buffer.
	 * 
	 * @param value The uint8 to write
	 */
	uint8(value: number) {
		this._number(value, "writeUInt8");
	}

	/**
	 * Writes a 16-bit unsigned integer to the buffer, using little endian.
	 * 
	 * @param value The uint16 to write
	 */
	uint16(value: number) {
		this._number(
			value,
			this._endianness === "LE"
				? "writeUInt16LE"
				: "writeUInt16BE"
		);
	}

	/**
	 * Writes a 32-bit unsigned integer to the buffer, using little endian.
	 * 
	 * @param value The uint32 to write
	 */
	uint32(value: number) {
		this._number(
			value,
			this._endianness === "LE"
				? "writeUInt32LE"
				: "writeUInt32BE"
		);
	}

	/**
	 * Writes a 64-bit unsigned integer to the buffer, using little endian.
	 * 
	 * @param value The uint64 to write
	 */
	uint64(value: number | bigint) {
		this._bigint(
			BigInt(value),
			this._endianness === "LE"
				? "writeBigUInt64LE"
				: "writeBigUInt64BE"
		);
	}

	/**
	 * Writes an 8-bit signed integer to the buffer.
	 * 
	 * @param value The int8 to write
	 */
	int8(value: number) {
		this._number(value, "writeInt8");
	}

	/**
	 * Writes a 16-bit signed integer to the buffer, using little endian.
	 * 
	 * @param value The int16 to write
	 */
	int16(value: number) {
		this._number(
			value,
			this._endianness === "LE"
				? "writeInt16LE"
				: "writeInt16BE"
		);
	}

	/**
	 * Writes a 32-bit signed integer to the buffer, using little endian.
	 * 
	 * @param value The int32 to write
	 */
	int32(value: number) {
		this._number(
			value,
			this._endianness === "LE"
				? "writeInt32LE"
				: "writeInt32BE"
		);
	}

	/**
	 * Writes a 64-bit signed integer to the buffer, using little endian.
	 * 
	 * @param value The int64 to write
	 */
	int64(value: number | bigint) {
		this._bigint(
			BigInt(value),
			this._endianness === "LE"
				? "writeBigInt64LE"
				: "writeBigInt64BE"
		);
	}

	/**
	 * Writes a float to the buffer, using little endian.
	 * 
	 * @param value The float to write
	 */
	float(value: number) {
		this._number(
			value,
			this._endianness === "LE"
				? "writeFloatLE"
				: "writeFloatBE"
		);
	}

	//#endregion Numbers
}
