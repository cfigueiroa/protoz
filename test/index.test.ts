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
      const ancestor = Protoz.findClosestAncestorWithProperty(obj, "nonExistentProperty");

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

  describe("findFirstCommonAncestor", () => {
    const object1 = {};
    const object2 = {};
    const ancestor = { commonProp: "value" };
    Object.setPrototypeOf(object1, ancestor);
    Object.setPrototypeOf(object2, ancestor);

    it("should return the first common ancestor", () => {
      const result = Protoz.findFirstCommonAncestor(object1, object2);
      expect(result).toBe(ancestor);
    });

    it('should return null if no common ancestor is found', () => {
    const objectPrototype = Object.create(Object.prototype);
    const nullPrototype = Object.create(null);

    const result = Protoz.findFirstCommonAncestor(objectPrototype, nullPrototype);
    expect(result).toBeNull();
  });

    it("should return the Object.prototype if both objects are literal objects", () => {
      const result = Protoz.findFirstCommonAncestor(object1, {});
      expect(result).toBe(Object.prototype);
    });

    it("should return the most ancient object if one object is the ancestor of the other", () => {
      const result1 = Protoz.findFirstCommonAncestor(object1, ancestor);
      expect(result1).toBe(ancestor);

      const result2 = Protoz.findFirstCommonAncestor(ancestor, object2);
      expect(result2).toBe(ancestor);
    });

    it("should return the first common ancestor for objects with deep prototype chains", () => {
      const deepAncestor = { deepProp: true };
      const deepAncestor2 = { deepProp2: true };
      const object3 = {};
      const object4 = {};
      Object.setPrototypeOf(deepAncestor, Object.prototype);
      Object.setPrototypeOf(deepAncestor2, deepAncestor);
      Object.setPrototypeOf(object3, deepAncestor);
      Object.setPrototypeOf(object4, deepAncestor2);

      const result = Protoz.findFirstCommonAncestor(object3, object4);
      expect(result).toBe(deepAncestor);
    });

    it("should return the first common ancestor at any level of the prototype chain", () => {
      const ancestor1 = {};
      const ancestor2 = {};
      const object5 = {};
      const object6 = {};
      Object.setPrototypeOf(ancestor1, Object.prototype);
      Object.setPrototypeOf(ancestor2, ancestor1);
      Object.setPrototypeOf(object5, ancestor2);
      Object.setPrototypeOf(object6, ancestor2);

      const result = Protoz.findFirstCommonAncestor(object5, object6);
      expect(result).toBe(ancestor2);
    });
  });
});
