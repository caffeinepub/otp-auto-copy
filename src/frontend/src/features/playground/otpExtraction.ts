/**
 * OTP extraction logic for 4-8 digit codes
 * This is a pure function with no side effects - safe for browser use
 */

const OTP_KEYWORDS = [
  'otp',
  'code',
  'verification',
  'verify',
  'pin',
  'password',
  'passcode',
  'authenticate',
  'security',
];

// Primary pattern: OTP with keywords
const PRIMARY_PATTERN = /(?:OTP|otp|code|verification|verify|pin|password|passcode)[\s:]*([0-9]{4,8})/i;

// Standalone pattern: just digits
const STANDALONE_PATTERN = /\b([0-9]{4,8})\b/g;

/**
 * Extract OTP from SMS message
 */
export function extractOtp(message: string): string | null {
  if (!message || message.trim().length === 0) {
    return null;
  }

  // Try primary pattern first (with keywords)
  const primaryMatch = message.match(PRIMARY_PATTERN);
  if (primaryMatch && primaryMatch[1]) {
    return primaryMatch[1];
  }

  // Try standalone pattern with validation
  const standaloneMatches = Array.from(message.matchAll(STANDALONE_PATTERN));
  const candidates = standaloneMatches.map((match) => match[1]);

  for (const candidate of candidates) {
    if (isValidOtpCandidate(candidate, message)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Validate if a number is likely an OTP using heuristics
 */
function isValidOtpCandidate(candidate: string, message: string): boolean {
  // Heuristic 1: Length check (4-8 digits)
  if (candidate.length < 4 || candidate.length > 8) {
    return false;
  }

  // Heuristic 2: Not all same digit (e.g., "1111", "0000")
  if (candidate.split('').every((digit) => digit === candidate[0])) {
    return false;
  }

  // Heuristic 3: Not sequential (e.g., "1234", "4321")
  if (isSequential(candidate)) {
    return false;
  }

  // Heuristic 4: Message contains OTP-related keywords
  const lowerMessage = message.toLowerCase();
  const hasKeyword = OTP_KEYWORDS.some((keyword) => lowerMessage.includes(keyword));

  if (!hasKeyword) {
    return false;
  }

  // Heuristic 5: Not a phone number pattern (10 digits with "call")
  if (candidate.length === 10 && lowerMessage.includes('call')) {
    return false;
  }

  // Heuristic 6: Not a date pattern (contains year-like number)
  if (candidate.length === 4 && parseInt(candidate) >= 1900 && parseInt(candidate) <= 2100) {
    if (lowerMessage.includes('date') || lowerMessage.includes('year')) {
      return false;
    }
  }

  return true;
}

/**
 * Check if digits are sequential (ascending or descending)
 */
function isSequential(s: string): boolean {
  const digits = s.split('').map((d) => parseInt(d));

  // Check ascending (e.g., "1234")
  const ascending = digits.slice(1).every((digit, index) => digit === digits[index] + 1);

  // Check descending (e.g., "4321")
  const descending = digits.slice(1).every((digit, index) => digit === digits[index] - 1);

  return ascending || descending;
}
