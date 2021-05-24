class Constants {
    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            this.mediaUrl = 'http://localhost';
            this.wsURL = 'ws://localhost/ws/';
        } else {
            this.mediaUrl = 'https://www.rodaschat.com';
            this.wsURL = 'wss://www.rodaschat.com/wss/';
        }
    }
}

const constants = new Constants();

export default constants;