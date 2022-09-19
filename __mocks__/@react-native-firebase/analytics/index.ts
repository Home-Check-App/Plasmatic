const mockAnalytics: any = {};

mockAnalytics.logEvent = jest.fn();
mockAnalytics.setUserProperties = jest.fn();
mockAnalytics.setUserId = jest.fn();
mockAnalytics.setCurrentScreen = jest.fn();

export default () => mockAnalytics;
