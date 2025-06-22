/// <reference types="chai" />

declare global {
  namespace Chai {
    interface Assertion {
      soft: Assertion;
    }
  }
}

export declare function addSoftMethod(softMethod: string | string[]): void;
export declare function getSoftMethods(): string[];
export declare function addSoftChainableMethod(softChainableMethod: string | string[]): void;
export declare function getSoftChainableMethods(): string[];
export declare function createSoftAssertion(newSoftMethods?: string[], newSoftChainableMethods?: string[]): Chai.ChaiPlugin;
export declare const softAssertion: Chai.ChaiPlugin;
