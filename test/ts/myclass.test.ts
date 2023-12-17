import { expect } from "chai";
import { MyClass } from "../../src/ts/myclass";

describe ('MyClass', () => {
    it ('should create an instance', () => {
        expect(new MyClass()).not.to.be.null;
    })
});