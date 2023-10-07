export interface Base64Url {
  encode: (plainInput: string) => string;
  decode: (base64UrlInput: string) => string;
  fromBase64: (base64Input: string) => string;
  toBase64: (base64UrlInput: string) => string;
}
