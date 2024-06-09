const something = "Something";

// This is valid JS I swear.
// TS support for this is still very new. Added in https://github.com/microsoft/TypeScript/pull/58640
export { something as "arbitrary string" };

export { something as normalIdentifier };
