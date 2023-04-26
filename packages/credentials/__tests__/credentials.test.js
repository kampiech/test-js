const credentials = require('..');

describe('credentials', () => {
  it('returns object', () => {
    expect(typeof credentials).toBe('object');
  });

  it('contains `jwt` key', () => {
    expect(credentials.jwt).toBeDefined();
  });

  it('contains `transformJWT` key', () => {
    expect(credentials.transformJWT).toBeDefined();
  });

  describe('jwt', () => {
    it('is function', () => {
      expect(typeof credentials.jwt).toBe('function');
    });

    it('accepts one parameter', () => {
      expect(credentials.jwt.length).toBe(1);
    });

    it('called returns jwt instance', () => {
      expect(typeof credentials.jwt({ algorithms: ['HS256'] })).toBe(
        'function'
      );
    });
  });

  describe('transformJWT', () => {
    it('is function', () => {
      expect(typeof credentials.transformJWT).toBe('function');
    });

    it('accepts three parameter', () => {
      expect(credentials.transformJWT.length).toBe(3);
    });

    let request;
    let response;
    let next;
    let nextCalled = false;
    beforeEach(() => {
      request = {};
      response = {};
      next = function () {
        nextCalled = true;
      };
    });

    it('returns nothing without user key in request', () => {
      expect(credentials.transformJWT(request, response, next)).toBeUndefined();
    });

    it('calls next without user key in request', () => {
      credentials.transformJWT(request, response, next);
      expect(nextCalled).toBeTruthy();
    });

    // @todo core of tests.
  });
});
