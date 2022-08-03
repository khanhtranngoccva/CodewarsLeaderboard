import chai from "chai";

export function assertDeepStrictEquals(actual, expected) {
    try {
        chai.assert.deepStrictEqual(actual, expected);
        return true;
    } catch(e) {
        return false;
    }
}