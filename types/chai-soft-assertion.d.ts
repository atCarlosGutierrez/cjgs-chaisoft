/// <reference types="chai" />

declare global {
  namespace Chai {
    interface Assertion {
      soft: Assertion;
    }
  }
}

interface SoftError {
  matcher: string;
  message: string;
  actual?: unknown;
  expected?: unknown;
}
declare class SoftAssertionCollector {
  errors: SoftError[];
  add(error: SoftError): void;
  assertAll(): void;
  clear(): void;
}
export declare const softAssertionsCollector: SoftAssertionCollector;
export declare function addSoftMethod(softMethod: string | string[]): void;
export declare function getSoftMethods(): string[];
export declare function addSoftChainableMethod(
  softChainableMethod: string | string[]
): void;
export declare function getSoftChainableMethods(): string[];
export declare function createSoftAssertion(
  newSoftMethods?: string[],
  newSoftChainableMethods?: string[]
): Chai.ChaiPlugin;
export declare const softAssertion: Chai.ChaiPlugin;
