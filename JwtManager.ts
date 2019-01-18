import * as CryptoJS from 'crypto-js';

/**
 * jwTManager object
 */
export default class JwtManager {

    /** Header Part */
    private header : Object = {};

    /** Data Part */
    private data: Object = {};

    /** Secret */
    private secret: String = "";

    /** Encoded Jwt */
    private encodedJwt: String = "";

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Add property to Header Part of the JWT.
     *
     * @param property String
     * @param value String
     */
    addHeaderProperty = (property: any, value: String) => {
        this.header[property] = value;
    };

    /**
     * Add property to Data Part of the JWT.
     *
     * @param property String
     * @param value String
     */
    addDataProperty = (property: any, value: String) => {
        this.data[property] = value;
    };

    /**
     * Generates an encoded Jwt based on JwtManager's properties value.
     */
    generateEncodedJwt = () => {

        if(this.header !== {} || this.data !== {} || this.secret !== ""){
            console.log("Attention :", "Assurez-vous d'avoir ajouté des informations dans le header, data et d'avoir renseigné une 'secret phrase'.");
        }

        let jwt = "";

        // Header Encoding
        let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(this.header));
        let encodedHeader = this.base64url(stringifiedHeader);
        jwt += encodedHeader;

        jwt += ".";

        // Body Claims encoding
        let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(this.data));
        let encodedData = this.base64url(stringifiedData);
        jwt += encodedData;

        jwt += ".";

        // Signature Encoding
        let signature = encodedHeader + "." + encodedData;
        signature = CryptoJS.HmacSHA256(signature, this.secret);
        signature = this.base64url(signature);
        jwt += signature;

        this.encodedJwt = jwt;
    };

    /**
     * Encodes something with base64 algo.
     */
    base64url = (source) => {
        // Encode in classical base64
        let encodedSource = CryptoJS.enc.Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        return encodedSource;
    };

    /**
     * get Plain Header of the JwtManager Instance.
     * @return Object
     */
    getHeader = () : Object => {
        return this.header;
    };

    /**
     * Set Secret of the JWT.
     * @param phrase String
     */
    setSecret = (phrase: String) => {
        this.secret = phrase;
    };

    /**
     * Set Secret of the JWT.
     * @return Object
     */
    getBody = () : Object => {
        return this.data;
    };

    /**
     * Returns last generated encoded JWT.
     * @return String
     */
    getEncodedJwt = () : String => {
        return this.encodedJwt;
    }
}
