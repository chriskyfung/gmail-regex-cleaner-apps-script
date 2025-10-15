const { checkOverdue, findMessages, dateFormatterFactory } = require('../src/code.js');

describe('Core Functions', () => {

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

describe('dateFormatterFactory', () => {
  global.Utilities = {
    formatDate: jest.fn((date, timeZone, format) => {
      if (format === 'yyyy') {
        return date.getFullYear().toString();
      }
      return '';
    }),
  };

  it('should return a function', () => {
    const pattern = /a/;
    const formatter = dateFormatterFactory(pattern);
    expect(typeof formatter).toBe('function');
  });

  it('should return null if pattern does not match', () => {
    const pattern = /a/;
    const formatter = dateFormatterFactory(pattern);
    const result = formatter('b', new Date());
    expect(result).toBeNull();
  });

  it('should format date correctly using last message year', () => {
    const pattern = /(?<month1>\w{3})\s(?<enddate>\d{1,2})/;
    const formatter = dateFormatterFactory(pattern);
    const lastMessageDate = new Date('2023-01-01');
    const result = formatter('Jan 15', lastMessageDate);
    expect(result).toBe('2023-Jan.15');
  });

  it('should format date correctly using year from pattern', () => {
    const pattern = /(?<year>\d{4})-(?<month1>\w{3})-(?<enddate>\d{1,2})/;
    const formatter = dateFormatterFactory(pattern, false);
    const result = formatter('2024-Feb-20', new Date());
    expect(result).toBe('2024-Feb.20');
  });

  it('should use month2 if available', () => {
    const pattern =
      /(?<month1>\w{3})\s\d{1,2}\s-\s(?<month2>\w{3})\s(?<enddate>\d{1,2})/;
    const formatter = dateFormatterFactory(pattern);
    const lastMessageDate = new Date('2023-01-01');
    const result = formatter('Jan 10 - Feb 20', lastMessageDate);
    expect(result).toBe('2023-Feb.20');
  });

  it('should return null if day or month is missing', () => {
    const pattern = /(?<month1>\w{3})/;
    const formatter = dateFormatterFactory(pattern);
    const lastMessageDate = new Date('2023-01-01');
    const result = formatter('Jan', lastMessageDate);
    expect(result).toBeNull();
  });
});