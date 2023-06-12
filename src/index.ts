class Protoz {
  static getPrototypeChain(
    targetObject: object,
    maxIterations: number | undefined = undefined
  ): object[] {
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

  static findClosestAncestorWithProperty(
    obj: object,
    property: string
  ): object | null {
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

  static findFirstCommonAncestor(object1: object, object2: object): object | null {
    if (object1 === object2) {
      return Object.getPrototypeOf(object1); // Same object, return its prototype
    }

    const prototypes1: object[] = [];
    const prototypes2: object[] = [];

    function collectPrototypes(obj: object, prototypes: object[]): void {
      let currentPrototype = obj;

      while (currentPrototype !== null) {
        prototypes.push(currentPrototype);
        currentPrototype = Object.getPrototypeOf(currentPrototype);
      }
    }

    collectPrototypes(object1, prototypes1);
    collectPrototypes(object2, prototypes2);

    for (const prototype1 of prototypes1) {
      for (const prototype2 of prototypes2) {
        if (prototype1 === prototype2) {
          return prototype1; // First common ancestor found
        }
      }
    }

    return null; // No common ancestor found
  }
}

export default Protoz;
