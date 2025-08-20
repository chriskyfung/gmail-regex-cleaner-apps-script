const {
  subtractYears,
  checkOverdue,
  findMessages,
} = require('./code.js');

describe('Core Functions', () => {
  describe('subtractYears', () => {
    it('should subtract 1 year from the given date', () => {
      const date = new Date('2025-01-01');
      const newDate = subtractYears(date, 1);
      expect(newDate.getFullYear()).toBe(2024);
    });

    it('should return a new date object and not mutate the original', () => {
      const originalDate = new Date('2025-01-01');
      const originalTime = originalDate.getTime();
      subtractYears(originalDate, 1);
      expect(originalDate.getTime()).toBe(originalTime);
    });
  });

  describe('checkOverdue', () => {
    const mockNow = new Date('2025-08-19T00:00:00.000Z').getTime();
    const treshold = 60;

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => mockNow);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should correctly assign the previous year to a year-less date that appears in the future', () => {
      const dateString = 'December 1'; // No year
      const lastMessageDate = new Date('2025-02-10'); // Context date
      const result = checkOverdue(dateString, lastMessageDate, treshold);

      // It should determine the date is 2024-12-01, which is overdue.
      expect(result.expiryDate.getFullYear()).toBe(2024);
      expect(result.isOverdue).toBe(true);
    });

    it('should correctly assign the current year to a year-less date that appears in the past', () => {
      const dateString = 'January 15'; // No year
      const lastMessageDate = new Date('2025-02-10'); // Context date
      const result = checkOverdue(dateString, lastMessageDate, treshold);

      // It should determine the date is 2025-01-15, which is overdue relative to Aug 19.
      expect(result.expiryDate.getFullYear()).toBe(2025);
      expect(result.isOverdue).toBe(true);
    });

    it('should not alter a date that explicitly contains a year', () => {
      const dateString = '2026-01-01'; // Explicit future year
      const lastMessageDate = new Date('2025-02-10');
      const result = checkOverdue(dateString, lastMessageDate, treshold);
      expect(result.expiryDate.getFullYear()).toBe(2026);
      expect(result.isOverdue).toBe(false);
    });
  });
});

describe('findMessages', () => {
  const mockGetPlainBody = jest.fn();
  const mockGetBody = jest.fn();
  const mockGetFirstMessageSubject = jest.fn();
  const mockGetLastMessageDate = jest.fn();
  const mockMoveToTrash = jest.fn();

  const mockMessage = {
    getPlainBody: mockGetPlainBody,
    getBody: mockGetBody,
  };

  const mockThread = {
    getMessages: () => [mockMessage, mockMessage], // getMessages returns an array of messages
    getFirstMessageSubject: mockGetFirstMessageSubject,
    getLastMessageDate: mockGetLastMessageDate,
    moveToTrash: mockMoveToTrash,
  };

  global.GmailApp = {
    search: jest.fn(() => [mockThread]),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should use getPlainBody when mode is "plain"', () => {
    findMessages('some query', 'plain');
    expect(mockGetPlainBody).toHaveBeenCalled();
    expect(mockGetBody).not.toHaveBeenCalled();
  });

  it('should use getPlainBody when mode is not provided', () => {
    findMessages('some query'); // mode is undefined
    expect(mockGetPlainBody).toHaveBeenCalled();
    expect(mockGetBody).not.toHaveBeenCalled();
  });

  it('should use getBody and parse it when mode is "html"', () => {
    const htmlBody =
      '<html><head>header</head><body><p>Hello</p></body></html>';
    mockGetBody.mockReturnValue(htmlBody);
    const result = findMessages('some query', 'html');
    expect(mockGetBody).toHaveBeenCalled();
    expect(mockGetPlainBody).not.toHaveBeenCalled();
    expect(result[0].plainBody).toBe('Hello');
  });
});