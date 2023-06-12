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
    console.log('Starting findFirstCommonAncestor function with inputs:', object1, object2);

    // Create a Set to keep track of visited prototypes
    const visitedPrototypes = new Set();
    console.log('Created visitedPrototypes Set:', visitedPrototypes);

    // Initialize currentPrototype1 and currentPrototype2 to object1 and object2
    let currentPrototype1 = object1;
    let currentPrototype2 = object2;
    console.log('Initialized currentPrototype1 and currentPrototype2:', currentPrototype1, currentPrototype2);

    // Helper function to update a prototype
    const updatePrototype = (currentPrototype: object | null, otherObject: object) => {
      console.log('Updating prototype:', currentPrototype);
      if (currentPrototype === null) {
        console.log('Current prototype is null, returning otherObject:', otherObject);
        return otherObject;
      } else {
        visitedPrototypes.add(currentPrototype);
        console.log('Added current prototype to visitedPrototypes Set:', visitedPrototypes);
        const newPrototype = Object.getPrototypeOf(currentPrototype);
        console.log('Returning new prototype:', newPrototype);
        return newPrototype;
      }
    };

    // Loop until currentPrototype1 and currentPrototype2 are equal
    while (currentPrototype1 !== currentPrototype2) {
      console.log('Starting new iteration of loop with current prototypes:', currentPrototype1, currentPrototype2);

      // Check if either currentPrototype1 or currentPrototype2 has already been visited
      if (visitedPrototypes.has(currentPrototype1) || visitedPrototypes.has(currentPrototype2)) {
        console.log('Either currentPrototype1 or currentPrototype2 has already been visited. No common ancestor found.');
        return null; // No common ancestor found
      }

      // Update currentPrototype1 and currentPrototype2
      console.log('Updating current prototypes...');
      currentPrototype1 = updatePrototype(currentPrototype1, object2);
      currentPrototype2 = updatePrototype(currentPrototype2, object1);
      console.log('Updated current prototypes:', currentPrototype1, currentPrototype2);
    }

    console.log('First common ancestor found:', currentPrototype1);
    return currentPrototype1; // First common ancestor found
  }
}

export default Protoz;
