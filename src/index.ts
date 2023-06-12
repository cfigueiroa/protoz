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
    let firstCommonAncestor;

    const isSameObject = firstObject === secondObject;
    const isMissingSecondObject = secondObject === undefined;
    if (isSameObject || isMissingSecondObject) return getAncestor(firstObject);

    let firstObjectPrototype = getAncestor(firstObject);
    let secondObjectPrototype = getAncestor(secondObject);

    if (firstObjectPrototype === secondObject) return secondObject;
    if (secondObjectPrototype === firstObject) return firstObject;

    const noAncestor = firstObjectPrototype === null || secondObjectPrototype === null;
    if (noAncestor) return null;

    if (firstObjectPrototype === secondObjectPrototype) return firstObjectPrototype;

    const uniqueAncestors = new Set();
    const trackAncestor = (object: object) => uniqueAncestors.add(getAncestor(object));
    const isAncestorCommon = (object: object) => uniqueAncestors.has(getAncestor(object));

    function getAncestor(object: object) {
      return Object.getPrototypeOf(object);
    }

    function addAncestors(object: object) {
      let currentObject = object;
      while (currentObject) {
        trackAncestor(currentObject);
        currentObject = getAncestor(currentObject);
      }
    }

    function findFirstCommonAncestorInChain(object: object) {
      let currentObject = object;
      while (currentObject) {
        const isTheCommonAncestor = isAncestorCommon(currentObject);
        if (isTheCommonAncestor) {
          firstCommonAncestor = currentObject;
          return;
        }
        trackAncestor(currentObject);
        currentObject = getAncestor(currentObject);
      }
    }

    addAncestors(firstObjectPrototype);
    findFirstCommonAncestorInChain(secondObjectPrototype);

    return firstCommonAncestor ?? null;
  }
}

export default Protoz;
