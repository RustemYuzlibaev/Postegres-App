const Session = require('../account/session');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if (sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });

            setSessionCookie({ res, sessionString });

            resolve({ message: 'session restored' });
        } else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username),
            })
                .then(() => {
                    setSessionCookie({ sessionString, res });

                    resolve({ message: 'session created' });
                })
                .catch(err => reject(err));
        }
    });
};

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expires: new Date(Date.now() + 360000000),
        // httpOnly: true,
        // secure: true,
    });
};

const authenticatedAccount = ({ sessionString }) => {
    return new Promise((resolve, reject) => {
        if (!sessionString || !Session.verify(sessionString)) {
            const err = new Error('Invalid session');

            err.statusCode = 400;

            return reject(err);
        } else {
            const { username, id } = Session.parse(sessionString);

            AccountTable.getAccount({ usernameHash: hash(username) })
                .then(({ account }) => {
                    const authenticated = account.sessionId === id;
                    resolve({ account, authenticated, username });
                })
                .catch(err => reject(err));
        }
    });
};

module.exports = { setSession, authenticatedAccount };
