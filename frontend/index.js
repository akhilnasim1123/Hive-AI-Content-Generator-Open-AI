const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require("path");

require('dotenv').config();

const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
// const adminLogoutRoute = require('./routes/auth/adminLogout');
// const adminLogRoute = require('./routes/auth/adminLog');
const meRouter = require('./routes/auth/me')
// const adminRouter = require('./routes/auth/getAdmin')
const verifyRoute = require('./routes/auth/verify');
// const adminVerifyRoute = require('./routes/auth/adminVerify');
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(registerRoute);
app.use(loginRoute);
// app.use(adminLogRoute);
app.use(logoutRoute);
app.use(meRouter);
app.use(verifyRoute);
// app.use(adminRouter);
// app.use(adminVerifyRoute);
// app.use(adminLogoutRoute);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server listening on port ${PORT}`);
});
