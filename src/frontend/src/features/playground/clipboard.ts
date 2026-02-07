/**
 * Browser-based clipboard operations
 * Note: Auto-clear is best-effort in browser environment
 */

let clearTimeoutId: number | null = null;

/**
 * Copy text to clipboard using modern Clipboard API
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      return fallbackCopyToClipboard(text);
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Fallback clipboard copy for older browsers
 */
function fallbackCopyToClipboard(text: string): boolean {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    document.body.removeChild(textArea);
    return false;
  }
}

/**
 * Schedule clipboard clearing after delay
 * Note: This is best-effort - browser may not allow clearing clipboard
 */
export function scheduleClipboardClear(delaySeconds: number, onClear?: () => void): void {
  cancelClipboardClear();

  clearTimeoutId = window.setTimeout(async () => {
    try {
      // Attempt to clear clipboard by writing empty string
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('');
        onClear?.();
      }
    } catch (error) {
      // Clipboard clearing may fail due to browser security policies
      // This is expected behavior in some browsers
    }
  }, delaySeconds * 1000);
}

/**
 * Cancel scheduled clipboard clear
 */
export function cancelClipboardClear(): void {
  if (clearTimeoutId !== null) {
    window.clearTimeout(clearTimeoutId);
    clearTimeoutId = null;
  }
}
