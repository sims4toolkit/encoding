import { expect } from "chai";
import { BinaryEncoder } from "../dst/encoding";

/**
 * The encoder and decoder were created in August 2021, and have been used in
 * multiple projects since then, and have been functioning exactly as expected.
 * Unit tests for these classes is more of a nice-to-have, when I have the time
 * to write them, but for now, they are not a priority.
 */

describe("BinaryEncoder", () => {
  //#region From BinaryEncodingBase

  describe("#buffer", () => {
    // TODO:
  });

  describe("#skip()", () => {
    // TODO:
  });

  describe("#seek()", () => {
    // TODO:
  });

  describe("#tell()", () => {
    // TODO:
  });

  describe("#savePos()", () => {
    // TODO:
  });

  describe("#isEOF()", () => {
    // TODO:
  });

  describe("#getEncoder()", () => {
    // TODO:
  });

  describe("#getDecoder()", () => {
    // TODO:
  });

  //#endregion From BinaryEncodingBase

  //#region BinaryEncoder

  describe("#alloc()", () => {
    it("should create a buffer with the given length", () => {
      const encoder = BinaryEncoder.alloc(12);
      expect(encoder.buffer.byteLength).to.equal(12);
    });
  });

  describe("#charsUtf8()", () => {
    // TODO:
  });

  describe("#charsBase64()", () => {
    // TODO:
  });

  describe("#boolean()", () => {
    // TODO:
  });

  describe("#byte()", () => {
    it("should write a single byte", () => {
      const encoder = BinaryEncoder.alloc(4);
      expect(encoder.tell()).to.equal(0);
      encoder.byte(8);
      expect(encoder.tell()).to.equal(1);
      expect(encoder.buffer.readUInt8(0)).to.equal(8);
    });
  });

  describe("#bytes()", () => {
    it("should write the given array as bytes", () => {
      const encoder = BinaryEncoder.alloc(4);
      expect(encoder.tell()).to.equal(0);
      encoder.bytes([2, 4, 8, 16]);
      expect(encoder.tell()).to.equal(4);
      expect(encoder.buffer.readUInt8(0)).to.equal(2);
      expect(encoder.buffer.readUInt8(1)).to.equal(4);
      expect(encoder.buffer.readUInt8(2)).to.equal(8);
      expect(encoder.buffer.readUInt8(3)).to.equal(16);
    });
  });

  describe("#uint8()", () => {
    it("should write a single uint8", () => {
      const encoder = BinaryEncoder.alloc(4);
      expect(encoder.tell()).to.equal(0);
      encoder.byte(8);
      expect(encoder.tell()).to.equal(1);
      expect(encoder.buffer.readUInt8(0)).to.equal(8);
    });
  });

  describe("#uint16()", () => {
    // TODO:
  });

  describe("#uint32()", () => {
    // TODO:
  });

  describe("#uint64()", () => {
    // TODO:
  });

  describe("#int8()", () => {
    // TODO:
  });

  describe("#int16()", () => {
    // TODO:
  });

  describe("#int32()", () => {
    // TODO:
  });

  describe("#int64()", () => {
    // TODO:
  });

  describe("#float()", () => {
    // TODO:
  });

  //#endregion BinaryEncoder
});
