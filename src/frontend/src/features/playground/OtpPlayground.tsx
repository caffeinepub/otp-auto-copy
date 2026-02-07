import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { extractOtp } from './otpExtraction';
import { copyToClipboard, scheduleClipboardClear, cancelClipboardClear } from './clipboard';
import { useClipboardSettings } from './useClipboardSettings';

export function OtpPlayground() {
  const [message, setMessage] = useState('');
  const [extractedOtp, setExtractedOtp] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const { clearDelay, setClearDelay } = useClipboardSettings();

  const handleExtract = () => {
    const otp = extractOtp(message);
    setExtractedOtp(otp);
    setCopyFeedback(null);
    cancelClipboardClear();
  };

  const handleCopy = async () => {
    if (!extractedOtp) return;

    const success = await copyToClipboard(extractedOtp);
    if (success) {
      setCopyFeedback('OTP copied');

      // Schedule auto-clear if enabled
      if (clearDelay > 0) {
        scheduleClipboardClear(clearDelay, () => {
          setCopyFeedback('Clipboard cleared');
        });
      }

      // Clear feedback after 3 seconds
      setTimeout(() => setCopyFeedback(null), 3000);
    } else {
      setCopyFeedback('Failed to copy');
    }
  };

  const handleClearDelayChange = (value: string) => {
    const delay = parseInt(value);
    setClearDelay(delay);
    cancelClipboardClear();
  };

  const sampleMessages = [
    'Your OTP is 123456. Do not share this code with anyone.',
    'Use verification code 8742 to login to your account.',
    'Your PIN: 5931. Valid for 10 minutes.',
    'Hello! Your order #12345 has been shipped. Track it here: example.com',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">OTP Extraction Playground</CardTitle>
        <CardDescription className="text-base">
          Test the OTP extraction logic in your browser. Paste an SMS message to extract and copy the OTP code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This playground demonstrates the extraction logic only. It cannot access your device's SMS messages. For
            full functionality, build the native Android app using the Kotlin code provided above.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="message">SMS Message</Label>
          <Textarea
            id="message"
            placeholder="Paste an SMS message containing an OTP code..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="font-mono text-sm"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs text-muted-foreground">Try samples:</span>
            {sampleMessages.map((sample, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setMessage(sample)}
                className="text-xs h-7"
              >
                Sample {index + 1}
              </Button>
            ))}
          </div>
        </div>

        <Button onClick={handleExtract} disabled={!message.trim()} className="w-full">
          Extract OTP
        </Button>

        {extractedOtp !== null && (
          <div className="space-y-4">
            {extractedOtp ? (
              <>
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <Label className="text-sm text-muted-foreground">Extracted OTP</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-mono font-bold tracking-wider">{extractedOtp}</span>
                    <Button onClick={handleCopy} size="sm" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>

                {copyFeedback && (
                  <Alert variant={copyFeedback.includes('copied') ? 'default' : 'destructive'}>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{copyFeedback}</AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No OTP detected. The message may not contain a valid 4-8 digit OTP code or OTP-related keywords.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="space-y-2 pt-4 border-t border-border">
          <Label htmlFor="clear-delay">Auto-clear Clipboard</Label>
          <Select value={clearDelay.toString()} onValueChange={handleClearDelayChange}>
            <SelectTrigger id="clear-delay">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Never</SelectItem>
              <SelectItem value="15">15 seconds</SelectItem>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">60 seconds</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {clearDelay > 0
              ? `Clipboard will be cleared ${clearDelay} seconds after copying`
              : 'Clipboard will not be automatically cleared'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
