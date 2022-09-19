const mockAuth: any = {};

mockAuth.onAuthStateChanged = jest.fn();
mockAuth.signInWithCredential = jest.fn();

const mockAuthFunction = () => mockAuth;
mockAuthFunction.GoogleAuthProvider = { credential: jest.fn() };

export default mockAuthFunction;
