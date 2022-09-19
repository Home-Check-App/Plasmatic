const mockFirestore: any = {};

mockFirestore.collection = jest.fn();

export default () => mockFirestore;
