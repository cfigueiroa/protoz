class Protoz {
  static getPrototypeChain(targetObject: object, maxIterations: number | undefined = undefined): object[] {
    let currentPrototype = targetObject;
    const prototypeChain: object[] = [currentPrototype];

    while (true) {
      const stopCondition = maxIterations !== undefined && prototypeChain.length >= maxIterations;

      if (stopCondition) {
        break;
      }

      const nextPrototype = Object.getPrototypeOf(currentPrototype);

      if (nextPrototype === null) {
        break;
      }

      prototypeChain.push(nextPrototype);
      currentPrototype = nextPrototype;
    }

    return prototypeChain;
  }

  static findClosestAncestorWithProperty(obj: object, property: string): object | null {
    let prototype = Object.getPrototypeOf(obj);

    while (prototype !== null) {
      if (property in prototype) {
        return prototype;
      }

      prototype = Object.getPrototypeOf(prototype);
    }

    return null;
  }

  static hasProperty(obj: object, property: string): boolean {
    let prototype = obj;

    while (prototype !== null) {
      if (property in prototype) {
        return true;
      }

      prototype = Object.getPrototypeOf(prototype);
    }

    return false; // Property not found
  }

  static getAllProperties(obj: object): string[] {
    const properties: string[] = [];

    let prototype = obj;

    while (prototype !== null) {
      properties.push(...Object.getOwnPropertyNames(prototype));
      prototype = Object.getPrototypeOf(prototype);
    }

    return properties;
  }

  static isPrototypeOf(obj: object, prototype: object): boolean {
    let currentPrototype = Object.getPrototypeOf(obj);

    while (currentPrototype !== null) {
      if (currentPrototype === prototype) {
        return true;
      }

      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    return false; // Prototype not found
  }

  static getPrototypeDepth(obj: object): number {
    let depth = 0;
    let prototype = obj;

    while (prototype !== null) {
      depth++;
      prototype = Object.getPrototypeOf(prototype);
    }

    return depth;
  }

  static getAncestorByDepth(obj: object, depth: number): object | null {
    let currentDepth = 0;
    let prototype = obj;

    while (currentDepth < depth && prototype !== null) {
      currentDepth++;
      prototype = Object.getPrototypeOf(prototype);
    }

    return prototype;
  }

  static findFirstCommonAncestor(firstObject: object, secondObject?: object): object | null {
    if (!secondObject) return firstObject;

    const uniqueAncestors = new Set();

    const getPrototype = (object: object) => Object.getPrototypeOf(object);

    function addAncestors(object: object) {
      for (let currentObject = object; currentObject; currentObject = getPrototype(currentObject)) {
        uniqueAncestors.add(currentObject);
      }
    }

    function findCommonAncestor(object: object) {
      for (let currentObject = object; currentObject; currentObject = getPrototype(currentObject)) {
        if (uniqueAncestors.has(currentObject)) {
          return currentObject;
        }
        uniqueAncestors.add(currentObject);
      }
      return null;
    }

    addAncestors(firstObject);
    return findCommonAncestor(secondObject);
  }
}

export default Protoz;
