"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(errors) {
        super('Validation Error!');
        this.data = [];
        this.name = this.constructor.name;
        errors.forEach((e) => {
            if (e.constraints === undefined && e.children) {
                e.children.forEach((ec) => {
                    this.data.push({ field: `${e.property}.${ec.property}`, constraints: ec.constraints });
                });
            }
            else {
                this.data.push({ field: e.property, constraints: e.constraints });
            }
        });
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ValidationError = ValidationError;
class PremiumError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.PremiumError = PremiumError;
//# sourceMappingURL=errors.js.map