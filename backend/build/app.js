"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conn_1 = __importDefault(require("./connections/conn"));
const auth_1 = __importDefault(require("./routes/auth"));
const list_1 = __importDefault(require("./routes/list"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3330;
(0, conn_1.default)().then(() => {
    console.log('checking for connecton : truobleshoot');
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}`);
    });
}).catch((error) => {
    console.log('Database connection failed!');
});
app.use('/api/v1', auth_1.default);
app.use('/api/v2', list_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
exports.default = app;
