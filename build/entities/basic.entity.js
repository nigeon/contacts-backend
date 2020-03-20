"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const errors_1 = require("../lib/errors");
class Basic {
    //
    // METHODS
    //
    async validateEntity() {
        const errors = await class_validator_1.validate(this, { skipMissingProperties: true });
        if (errors.length > 0) {
            console.log(JSON.stringify(errors));
            throw new errors_1.ValidationError(errors);
        }
    }
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Basic.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Basic.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Basic.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Basic.prototype, "validateEntity", null);
exports.Basic = Basic;
//# sourceMappingURL=basic.entity.js.map