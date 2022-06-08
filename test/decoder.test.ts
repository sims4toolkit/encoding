import { expect } from "chai";
import { BinaryDecoder } from "../dst/encoding";

/**
 * The encoder and decoder were created in August 2021, and have been used in
 * multiple projects since then, and have been functioning exactly as expected.
 * Unit tests for these classes is more of a nice-to-have, when I have the time
 * to write them, but for now, they are not a priority.
 */

describe("BinaryDecoder", () => {
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

  //#region BinaryDecoder

  describe("#charsUtf8()", () => {
    // TODO:
  });

  describe("#charsBase64()", () => {
    // TODO:
  });

  describe("#string()", () => {
    // TODO:
  });

  describe("#boolean()", () => {
    it("should read a true value", () => {
      const decoder = new BinaryDecoder(Buffer.from([1]));
      expect(decoder.boolean()).to.be.true;
    });

    it("should read a false value", () => {
      const decoder = new BinaryDecoder(Buffer.from([0]));
      expect(decoder.boolean()).to.be.false;
    });
  });

  describe("#byte()", () => {
    it("should read a single byte", () => {
      const decoder = new BinaryDecoder(Buffer.from([2, 4, 8, 16]));
      expect(decoder.byte()).to.equal(2);
    });
  });

  describe("#bytes()", () => {
    it("should read the bytes in order", () => {
      const decoder = new BinaryDecoder(Buffer.from([2, 4, 8, 16]));
      const [first, second, third, fourth] = decoder.bytes(4);
      expect(first).to.equal(2);
      expect(second).to.equal(4);
      expect(third).to.equal(8);
      expect(fourth).to.equal(16);
    });
  });

  describe("#slice()", () => {
    // TODO:
  });

  describe("#uint8()", () => {
    // TODO:
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
    it("should read positive numbers", () => {
      // TODO:
    });

    it("should read negative numbers", () => {
      // TODO:
    });
  });

  describe("#int16()", () => {
    it("should read positive numbers", () => {
      // TODO:
    });

    it("should read negative numbers", () => {
      // TODO:
    });
  });

  describe("#int32()", () => {
    it("should read positive numbers", () => {
      // TODO:
    });

    it("should read negative numbers", () => {
      // TODO:
    });
  });

  describe("#int64()", () => {
    it("should read positive numbers", () => {
      // TODO:
    });

    it("should read negative numbers", () => {
      // TODO:
    });
  });

  describe("#float()", () => {
    it("should read positive numbers", () => {
      const buffer = Buffer.alloc(4);
      buffer.writeFloatLE(32.5);
      const decoder = new BinaryDecoder(buffer);
      expect(decoder.float()).to.be.approximately(32.5, 0.001);
    });

    it("should read negative numbers", () => {
      const buffer = Buffer.alloc(4);
      buffer.writeFloatLE(-32.5);
      const decoder = new BinaryDecoder(buffer);
      expect(decoder.float()).to.be.approximately(-32.5, 0.001);
    });
  });

  //#endregion BinaryDecoder
});
