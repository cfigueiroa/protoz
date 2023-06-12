import Protoz from "../src/index";

describe("Protoz", () => {
  describe("getPrototypeChain", () => {
    it("should return the prototype chain of an object", () => {
      const obj = {};
      const prototypeChain = Protoz.getPrototypeChain(obj);

      expect(prototypeChain).toEqual([obj, Object.getPrototypeOf(obj)]);
    });

    it("should return the prototype chain with specified number of times", () => {
      const obj = {};
      const prototypeChain = Protoz.getPrototypeChain(obj, 2);

      expect(prototypeChain).toEqual([obj, Object.getPrototypeOf(obj)]);
    });
  });

  describe("findClosestAncestorWithProperty", () => {
    it("should find the closest ancestor with a specific property", () => {
      const obj = {};
      const ancestor = Protoz.findClosestAncestorWithProperty(obj, "toString");

      expect(ancestor).toBe(Object.prototype);
    });

    it("should return null if no ancestor has the property", () => {
      const obj = {};
      const ancestor = Protoz.findClosestAncestorWithProperty(
        obj,
        "nonExistentProperty"
      );

      expect(ancestor).toBeNull();
    });
  });

  describe("hasProperty", () => {
    it("should return true if the object or its ancestors have the property", () => {
      const obj = {};
      const result = Protoz.hasProperty(obj, "toString");

      expect(result).toBe(true);
    });

    it("should return false if the object and its ancestors do not have the property", () => {
      const obj = {};
      const result = Protoz.hasProperty(obj, "nonExistentProperty");

      expect(result).toBe(false);
    });
  });

  describe("getAllProperties", () => {
    it("should return an array of all properties of an object and its ancestors", () => {
      const obj = {};
      const properties = Protoz.getAllProperties(obj);

      expect(properties).toContain("toString");
    });
  });

  describe("isPrototypeOf", () => {
    it("should return true if the given prototype is in the object's prototype chain", () => {
      const obj = {};
      const result = Protoz.isPrototypeOf(obj, Object.prototype);

      expect(result).toBe(true);
    });

    it("should return false if the given prototype is not in the object's prototype chain", () => {
      const obj = {};
      const result = Protoz.isPrototypeOf(obj, Array.prototype);

      expect(result).toBe(false);
    });
  });

  describe("getPrototypeDepth", () => {
    it("should return the depth of the object's prototype chain", () => {
      const obj = {};
      const depth = Protoz.getPrototypeDepth(obj);

      expect(depth).toBe(2);
    });
  });

  describe("getAncestorByDepth", () => {
    it("should return the ancestor at the specified depth", () => {
      const obj = {};
      const ancestor = Protoz.getAncestorByDepth(obj, 1);

      expect(ancestor).toBe(Object.prototype);
    });

    it("should return null if the depth is greater than the prototype chain length", () => {
      const obj = {};
      const ancestor = Protoz.getAncestorByDepth(obj, 10);

      expect(ancestor).toBeNull();
    });
  });

  describe('findFirstCommonAncestor', () => {
    const object1 = {};
    const object2 = {};
    const ancestor = { commonProp: 'value' };
    Object.setPrototypeOf(object1, ancestor);
    Object.setPrototypeOf(object2, ancestor);

    it('should return the first common ancestor', () => {
      const result = Protoz.findFirstCommonAncestor(object1, object2);
      expect(result).toBe(ancestor);
    });

    it('should return null if no common ancestor is found', () => {
      const result = Protoz.findFirstCommonAncestor(object1, {});
      expect(result).toBeNull();
    });
  });
});
