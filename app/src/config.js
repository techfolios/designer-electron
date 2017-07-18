module.exports = {
  clientId: Buffer('MjAxNmVhYmY0YmRlZWQ1NTlmNzQ=', 'base64').toString(),
  clientSecret: Buffer('NTI2NjQ1MGZmMzk0ZWE1MDc2MWRkMDhjNmEwMDVjYzg0YTUwMTg2Mg==', 'base64').toString(),
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  useBasicAuthorizationHeader: false,
  redirectUri: 'https://github.com',
};
