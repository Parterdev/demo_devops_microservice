"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../src/index"));
describe('POST /DevOps', () => {
    it('should return message for valid request', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ user: 'testUser' }, process.env.SECRET_KEY || 'your_secret_key', { expiresIn: '1h' });
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/DevOps')
            .set('X-Parse-REST-API-Key', '2f5ae96c-b558-4c7b-a590-a501ae1c3f6c')
            .set('X-JWT-KWY', token)
            .send({
            message: 'This is a test',
            to: 'Juan Perez',
            from: 'Rita Asturia',
            timeToLifeSec: 45
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: 'Hello Juan Perez your message will be send'
        });
    }));
    it('should return error for invalid API Key', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/DevOps')
            .set('X-Parse-REST-API-Key', 'invalid-api-key')
            .send({
            message: 'This is a test',
            to: 'Juan Perez',
            from: 'Rita Asturia',
            timeToLifeSec: 45
        });
        expect(response.statusCode).toBe(403);
        expect(response.text).toBe('ERROR: Invalid API Key');
    }));
});
