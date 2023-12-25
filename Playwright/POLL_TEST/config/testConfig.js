import commentsDict from '../modules/commentsDict';

const WEB_USER = process.env.webUser;
const WEB_PASSWORD = process.env.webPassword;
const WEB_ADDRESS = process.env.WebAddress;
const TOLLERATED_EVENTS = ["Нет ответа"];
const maxIndicationDelay = 60000

const TestConfig = {
    WEB_ADDRESS,
    WEB_USER,
    WEB_PASSWORD,
    BASE_URL: `http://${WEB_USER}:${WEB_PASSWORD}@${WEB_ADDRESS}/?auth=sql/`,
    ELEMENT_NAMES: Object.keys(commentsDict),
    CORRECT_STATUS_COLOR: '#48BC4C',
    CORRECT_POLL_COLOR: '#4CAF50',
    TOLLERATED_EVENTS,
    maxIndicationDelay 
}

export default TestConfig;
