const GoogleSignin: any = {};

GoogleSignin.signIn = jest.fn(() => Promise.resolve({ idToken: 'GOOGLE_AUTH_TOKEN' }));
GoogleSignin.configure = jest.fn();
GoogleSignin.revokeAccess = jest.fn();
GoogleSignin.signOut = jest.fn();

export { GoogleSignin };
