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
const express_1 = require("express");
const user_1 = __importDefault(require("./../models/user"));
const lodash_1 = require("lodash");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield user_1.default.create({ username, email, password });
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(400).json({ message: "User alreday exists" });
    }
}));
//SIGN iN
authRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ message: "please SignUp to continue" });
        }
        else {
            //    const isValid = await localeCompare(req.body.password);
            if (req.body.password === user.password) {
                const others = (0, lodash_1.omit)(user.toObject(), 'password');
                // delete others.password;
                res.status(200).json(others);
            }
            else {
                res.status(400).json({ message: "Invalid Password" });
            }
        }
    }
    catch (error) {
        res.status(400).json({ message: "User alreday exists" });
    }
}));
exports.default = authRouter;
