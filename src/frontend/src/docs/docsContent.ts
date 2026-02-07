export interface DocSectionType {
  id: string;
  title: string;
  description?: string;
  content: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'ordered-list' | 'code' | 'alert' | 'table';
    text?: string;
    items?: string[];
    code?: string;
    language?: string;
    variant?: 'info' | 'warning' | 'success';
    headers?: string[];
    rows?: string[][];
  }>;
}

export const docsContent: DocSectionType[] = [
  {
    id: 'overview',
    title: 'OTP Auto Copy - Professional Android Application',
    description: 'A secure, privacy-focused Android app for automatic OTP detection and clipboard management',
    content: [
      {
        type: 'paragraph',
        text: 'OTP Auto Copy is a professional Android application designed to securely detect OTP messages and automatically copy them to the clipboard. Built with security and privacy as core principles, this app follows Google Play Store policies and Android best practices.',
      },
      {
        type: 'heading',
        text: 'Key Features',
      },
      {
        type: 'list',
        items: [
          'Secure OTP detection using SMS User Consent API or SMS Retriever API',
          'Automatic extraction of 4-8 digit OTP codes',
          'Instant clipboard copy with user feedback',
          'Configurable auto-clear clipboard timer',
          'Completely offline operation',
          'No data storage or transmission',
          'Material Design 3 UI with Jetpack Compose',
        ],
      },
      {
        type: 'heading',
        text: 'Technical Specifications',
      },
      {
        type: 'list',
        items: [
          'Platform: Android 8+ (API Level 26+)',
          'Language: Kotlin',
          'Architecture: MVVM + Clean Architecture',
          'UI Framework: Jetpack Compose',
          'Async: Kotlin Coroutines',
          'Dependency Injection: Hilt',
        ],
      },
    ],
  },
  {
    id: 'platform-limitations',
    title: 'Platform & Limitations',
    description: 'Understanding what can and cannot be implemented in different environments',
    content: [
      {
        type: 'alert',
        variant: 'warning',
        text: 'IMPORTANT: This documentation describes a native Android application. The automatic SMS detection features require Android OS APIs that are NOT available in web browsers or React applications.',
      },
      {
        type: 'heading',
        text: 'Native Android Capabilities',
      },
      {
        type: 'paragraph',
        text: 'The following features require a native Android app (APK/AAB) and cannot be implemented in a web application:',
      },
      {
        type: 'list',
        items: [
          'SMS User Consent API - requires Android OS integration',
          'SMS Retriever API - requires Google Play Services',
          'Automatic SMS interception and detection',
          'Background SMS monitoring',
          'System-level clipboard management with auto-clear',
        ],
      },
      {
        type: 'heading',
        text: 'Web Application Limitations',
      },
      {
        type: 'paragraph',
        text: 'This React-based documentation hub can demonstrate OTP extraction logic and provide an interactive playground, but it cannot:',
      },
      {
        type: 'list',
        items: [
          'Access SMS messages from your device',
          'Automatically detect incoming messages',
          'Run in the background',
          'Integrate with Android system services',
        ],
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'The OTP Playground section below demonstrates the extraction logic in a browser-safe environment. To build the full native Android app, use the Kotlin code samples provided in this documentation with Android Studio.',
      },
    ],
  },
  {
    id: 'architecture',
    title: '1. App Architecture',
    description: 'MVVM + Clean Architecture implementation',
    content: [
      {
        type: 'paragraph',
        text: 'The application follows Clean Architecture principles with MVVM pattern, ensuring separation of concerns, testability, and maintainability.',
      },
      {
        type: 'heading',
        text: 'Architecture Layers',
      },
      {
        type: 'ordered-list',
        items: [
          'Presentation Layer (UI): Jetpack Compose screens, ViewModels, UI state management',
          'Domain Layer: Use cases, business logic, domain models',
          'Data Layer: Repositories, data sources, SMS API integration',
        ],
      },
      {
        type: 'heading',
        text: 'Project Structure',
      },
      {
        type: 'code',
        language: 'text',
        code: `com.example.otpautocopy/
├── data/
│   ├── repository/
│   │   └── OtpRepositoryImpl.kt
│   └── source/
│       ├── SmsConsentDataSource.kt
│       └── ClipboardDataSource.kt
├── domain/
│   ├── model/
│   │   └── OtpMessage.kt
│   ├── repository/
│   │   └── OtpRepository.kt
│   └── usecase/
│       ├── ExtractOtpUseCase.kt
│       ├── CopyToClipboardUseCase.kt
│       └── ClearClipboardUseCase.kt
├── presentation/
│   ├── home/
│   │   ├── HomeScreen.kt
│   │   └── HomeViewModel.kt
│   ├── settings/
│   │   ├── SettingsScreen.kt
│   │   └── SettingsViewModel.kt
│   └── permissions/
│       └── PermissionsScreen.kt
└── di/
    ├── AppModule.kt
    └── DataModule.kt`,
      },
      {
        type: 'heading',
        text: 'Key Architectural Decisions',
      },
      {
        type: 'list',
        items: [
          'Single Activity architecture with Compose Navigation',
          'Unidirectional data flow (UDF) pattern',
          'Repository pattern for data abstraction',
          'Use cases for business logic encapsulation',
          'Hilt for dependency injection',
          'StateFlow for reactive state management',
          'Coroutines for asynchronous operations',
        ],
      },
    ],
  },
  {
    id: 'permissions',
    title: '2. Required Permissions',
    description: 'Minimal permissions following Google Play policies',
    content: [
      {
        type: 'paragraph',
        text: 'The app uses minimal permissions to comply with Google Play Store policies and protect user privacy.',
      },
      {
        type: 'heading',
        text: 'AndroidManifest.xml',
      },
      {
        type: 'code',
        language: 'xml',
        code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- NO READ_SMS permission - we use SMS User Consent API instead -->
    <!-- NO RECEIVE_SMS permission - not needed with Consent API -->
    
    <application
        android:name=".OtpAutoApplication"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.OtpAutoCopy">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.OtpAutoCopy">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
    </application>
    
</manifest>`,
      },
      {
        type: 'alert',
        variant: 'success',
        text: 'No dangerous permissions required! SMS User Consent API and SMS Retriever API do not require READ_SMS permission.',
      },
      {
        type: 'heading',
        text: 'Permission Strategy',
      },
      {
        type: 'table',
        headers: ['API', 'Permission Required', 'User Action', 'Compliance'],
        rows: [
          ['SMS User Consent API', 'None', 'One-time consent per SMS', '✓ Play Store approved'],
          ['SMS Retriever API', 'None', 'Automatic (app-specific)', '✓ Play Store approved'],
          ['READ_SMS', 'Dangerous', 'Runtime permission', '✗ Restricted by Play Store'],
        ],
      },
    ],
  },
  {
    id: 'otp-detection',
    title: '3. OTP Detection Strategy',
    description: 'Using SMS User Consent API and SMS Retriever API',
    content: [
      {
        type: 'paragraph',
        text: 'We use two Google-approved APIs for SMS detection, avoiding the restricted READ_SMS permission.',
      },
      {
        type: 'heading',
        text: 'Option 1: SMS User Consent API (Recommended)',
      },
      {
        type: 'paragraph',
        text: 'The SMS User Consent API shows a system dialog when an SMS arrives, allowing users to grant one-time access to that specific message.',
      },
      {
        type: 'list',
        items: [
          'No permissions required',
          'User grants consent per message',
          'Works with any SMS sender',
          'Available on Android 5.0+ with Google Play Services',
          'Recommended for most use cases',
        ],
      },
      {
        type: 'heading',
        text: 'Option 2: SMS Retriever API',
      },
      {
        type: 'paragraph',
        text: 'The SMS Retriever API automatically retrieves SMS messages that contain a specific hash code identifying your app.',
      },
      {
        type: 'list',
        items: [
          'No permissions required',
          'No user interaction needed',
          'Requires sender to include app hash in SMS',
          'Only works with cooperating SMS senders',
          'Best for apps with control over SMS sender',
        ],
      },
      {
        type: 'heading',
        text: 'Why Not READ_SMS?',
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Google Play Store restricts READ_SMS permission to specific use cases (SMS apps, backup apps). Using READ_SMS for OTP detection will likely result in app rejection.',
      },
      {
        type: 'paragraph',
        text: 'Google Play Policy violations:',
      },
      {
        type: 'list',
        items: [
          'READ_SMS is a dangerous permission requiring runtime approval',
          'Only permitted for core app functionality (SMS apps, backup)',
          'OTP detection does not qualify as core SMS functionality',
          'Alternative APIs (Consent, Retriever) are available and preferred',
        ],
      },
    ],
  },
  {
    id: 'regex-logic',
    title: '4. OTP Extraction & Regex Logic',
    description: 'Pattern matching and heuristics for OTP detection',
    content: [
      {
        type: 'paragraph',
        text: 'The app uses multiple regex patterns and heuristics to accurately extract OTP codes while ignoring non-OTP messages.',
      },
      {
        type: 'heading',
        text: 'Primary Regex Patterns',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `object OtpPatterns {
    // Match 4-8 digit OTPs with common keywords
    val PRIMARY_PATTERN = Regex(
        """(?:OTP|otp|code|verification|verify|pin|password|passcode)[:\\s]*([0-9]{4,8})""",
        RegexOption.IGNORE_CASE
    )
    
    // Match standalone 4-8 digit numbers
    val STANDALONE_PATTERN = Regex(
        """\\b([0-9]{4,8})\\b"""
    )
    
    // Match with common separators
    val SEPARATOR_PATTERN = Regex(
        """([0-9]{2,4})[\\s-]([0-9]{2,4})"""
    )
}`,
      },
      {
        type: 'heading',
        text: 'Extraction Logic with Heuristics',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `fun extractOtp(message: String): String? {
    // 1. Try primary pattern (with keywords)
    OtpPatterns.PRIMARY_PATTERN.find(message)?.let {
        return it.groupValues[1]
    }
    
    // 2. Try standalone pattern with validation
    val candidates = OtpPatterns.STANDALONE_PATTERN
        .findAll(message)
        .map { it.groupValues[1] }
        .toList()
    
    // Filter candidates using heuristics
    val validOtp = candidates.firstOrNull { candidate ->
        isValidOtpCandidate(candidate, message)
    }
    
    if (validOtp != null) return validOtp
    
    // 3. Try separator pattern (e.g., "12-34" or "1234 5678")
    OtpPatterns.SEPARATOR_PATTERN.find(message)?.let {
        val combined = it.groupValues[1] + it.groupValues[2]
        if (combined.length in 4..8) return combined
    }
    
    return null
}

fun isValidOtpCandidate(candidate: String, message: String): Boolean {
    // Heuristic 1: Length check
    if (candidate.length !in 4..8) return false
    
    // Heuristic 2: Not all same digit (e.g., "1111")
    if (candidate.all { it == candidate[0] }) return false
    
    // Heuristic 3: Not sequential (e.g., "1234", "4321")
    if (isSequential(candidate)) return false
    
    // Heuristic 4: Message contains OTP-related keywords
    val otpKeywords = listOf(
        "otp", "code", "verification", "verify", 
        "pin", "password", "passcode", "authenticate"
    )
    val hasKeyword = otpKeywords.any { 
        message.contains(it, ignoreCase = true) 
    }
    
    // Heuristic 5: Not a phone number pattern
    if (candidate.length == 10 && message.contains("call", ignoreCase = true)) {
        return false
    }
    
    return hasKeyword
}

fun isSequential(s: String): Boolean {
    val digits = s.map { it.digitToInt() }
    val ascending = digits.zipWithNext().all { (a, b) -> b == a + 1 }
    val descending = digits.zipWithNext().all { (a, b) -> b == a - 1 }
    return ascending || descending
}`,
      },
      {
        type: 'heading',
        text: 'Non-OTP Message Filtering',
      },
      {
        type: 'paragraph',
        text: 'The app ignores messages that are clearly not OTPs:',
      },
      {
        type: 'list',
        items: [
          'Marketing messages with product codes',
          'Transaction confirmations with amounts',
          'Phone numbers in contact messages',
          'Dates and times (e.g., "2024-01-15")',
          'Messages without OTP keywords',
        ],
      },
    ],
  },
  {
    id: 'kotlin-code',
    title: '5. Sample Kotlin Code',
    description: 'Production-ready implementation examples',
    content: [
      {
        type: 'heading',
        text: 'SMS User Consent API Implementation',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `class SmsConsentDataSource @Inject constructor(
    private val context: Context
) {
    private val smsRetrieverClient = SmsRetriever.getClient(context)
    
    suspend fun requestSmsConsent(): Result<String> = suspendCancellableCoroutine { continuation ->
        val task = smsRetrieverClient.startSmsUserConsent(null)
        
        task.addOnSuccessListener {
            // Wait for SMS to arrive
            continuation.resume(Result.success("Listening for SMS"))
        }
        
        task.addOnFailureListener { exception ->
            continuation.resume(Result.failure(exception))
        }
    }
    
    fun handleConsentResult(data: Intent?): String? {
        if (data == null) return null
        return data.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE)
    }
}`,
      },
      {
        type: 'heading',
        text: 'OTP Extraction Use Case',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `class ExtractOtpUseCase @Inject constructor() {
    
    operator fun invoke(message: String): String? {
        return extractOtp(message)
    }
    
    private fun extractOtp(message: String): String? {
        // Primary pattern with keywords
        val primaryPattern = Regex(
            """(?:OTP|otp|code|verification|verify|pin)[:\\s]*([0-9]{4,8})""",
            RegexOption.IGNORE_CASE
        )
        
        primaryPattern.find(message)?.let {
            return it.groupValues[1]
        }
        
        // Standalone pattern with validation
        val standalonePattern = Regex("""\\b([0-9]{4,8})\\b""")
        val candidates = standalonePattern.findAll(message)
            .map { it.groupValues[1] }
            .toList()
        
        return candidates.firstOrNull { candidate ->
            isValidOtpCandidate(candidate, message)
        }
    }
    
    private fun isValidOtpCandidate(candidate: String, message: String): Boolean {
        if (candidate.length !in 4..8) return false
        if (candidate.all { it == candidate[0] }) return false
        
        val otpKeywords = listOf("otp", "code", "verification", "verify", "pin")
        return otpKeywords.any { message.contains(it, ignoreCase = true) }
    }
}`,
      },
      {
        type: 'heading',
        text: 'Clipboard Management',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `class ClipboardDataSource @Inject constructor(
    private val context: Context
) {
    private val clipboardManager = context.getSystemService(Context.CLIPBOARD_SERVICE) 
        as ClipboardManager
    
    fun copyToClipboard(text: String, label: String = "OTP") {
        val clip = ClipData.newPlainText(label, text)
        clipboardManager.setPrimaryClip(clip)
    }
    
    fun clearClipboard() {
        val clip = ClipData.newPlainText("", "")
        clipboardManager.setPrimaryClip(clip)
    }
}

class CopyToClipboardUseCase @Inject constructor(
    private val clipboardDataSource: ClipboardDataSource
) {
    operator fun invoke(otp: String) {
        clipboardDataSource.copyToClipboard(otp, "OTP Code")
    }
}

class ClearClipboardUseCase @Inject constructor(
    private val clipboardDataSource: ClipboardDataSource
) {
    operator fun invoke() {
        clipboardDataSource.clearClipboard()
    }
}`,
      },
      {
        type: 'heading',
        text: 'Auto-Clear Timer Implementation',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `class HomeViewModel @Inject constructor(
    private val extractOtpUseCase: ExtractOtpUseCase,
    private val copyToClipboardUseCase: CopyToClipboardUseCase,
    private val clearClipboardUseCase: ClearClipboardUseCase,
    private val settingsRepository: SettingsRepository
) : ViewModel() {
    
    private var clearClipboardJob: Job? = null
    
    fun handleOtpMessage(message: String) {
        val otp = extractOtpUseCase(message) ?: return
        
        // Copy to clipboard
        copyToClipboardUseCase(otp)
        
        // Show notification
        showNotification("OTP copied: $otp")
        
        // Schedule auto-clear
        scheduleClipboardClear()
    }
    
    private fun scheduleClipboardClear() {
        clearClipboardJob?.cancel()
        
        val clearDelaySeconds = settingsRepository.getClipboardClearDelay()
        if (clearDelaySeconds <= 0) return // Never clear
        
        clearClipboardJob = viewModelScope.launch {
            delay(clearDelaySeconds * 1000L)
            clearClipboardUseCase()
        }
    }
    
    override fun onCleared() {
        super.onCleared()
        clearClipboardJob?.cancel()
    }
}`,
      },
      {
        type: 'heading',
        text: 'Activity Integration',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    
    private val viewModel: HomeViewModel by viewModels()
    private val smsConsentLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val message = result.data?.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE)
            message?.let { viewModel.handleOtpMessage(it) }
        }
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            OtpAutoCopyTheme {
                AppNavigation(
                    onRequestSmsConsent = { requestSmsConsent() }
                )
            }
        }
    }
    
    private fun requestSmsConsent() {
        val task = SmsRetriever.getClient(this).startSmsUserConsent(null)
        
        task.addOnSuccessListener {
            // Wait for SMS broadcast
        }
    }
    
    // Register broadcast receiver for SMS arrival
    private val smsReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (SmsRetriever.SMS_RETRIEVED_ACTION == intent?.action) {
                val extras = intent.extras
                val status = extras?.get(SmsRetriever.EXTRA_STATUS) as? Status
                
                when (status?.statusCode) {
                    CommonStatusCodes.SUCCESS -> {
                        val consentIntent = extras.getParcelable<Intent>(
                            SmsRetriever.EXTRA_CONSENT_INTENT
                        )
                        smsConsentLauncher.launch(consentIntent)
                    }
                }
            }
        }
    }
}`,
      },
    ],
  },
  {
    id: 'ui-screens',
    title: '6. UI Screens',
    description: 'Jetpack Compose screen specifications',
    content: [
      {
        type: 'paragraph',
        text: 'The app features a clean, Material Design 3 interface built with Jetpack Compose.',
      },
      {
        type: 'heading',
        text: 'Home Screen',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `@Composable
fun HomeScreen(
    onNavigateToSettings: () -> Unit,
    onRequestSmsConsent: () -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("OTP Auto Copy") },
                actions = {
                    IconButton(onClick = onNavigateToSettings) {
                        Icon(Icons.Default.Settings, "Settings")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = Icons.Default.Message,
                contentDescription = null,
                modifier = Modifier.size(120.dp),
                tint = MaterialTheme.colorScheme.primary
            )
            
            Spacer(modifier = Modifier.height(24.dp))
            
            Text(
                text = "Ready to detect OTPs",
                style = MaterialTheme.typography.headlineMedium
            )
            
            Text(
                text = "OTPs will be automatically copied to clipboard",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
            
            Spacer(modifier = Modifier.height(32.dp))
            
            Button(
                onClick = onRequestSmsConsent,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Enable OTP Detection")
            }
        }
    }
}`,
      },
      {
        type: 'heading',
        text: 'Settings Screen',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `@Composable
fun SettingsScreen(
    onNavigateBack: () -> Unit
) {
    val viewModel: SettingsViewModel = hiltViewModel()
    val settings by viewModel.settings.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Settings") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Auto-clear clipboard setting
            SettingItem(
                title = "Auto-clear clipboard",
                subtitle = "Clear OTP from clipboard after copying"
            ) {
                Switch(
                    checked = settings.autoClearEnabled,
                    onCheckedChange = { viewModel.setAutoClearEnabled(it) }
                )
            }
            
            if (settings.autoClearEnabled) {
                SettingItem(
                    title = "Clear delay",
                    subtitle = "Time before clipboard is cleared"
                ) {
                    DropdownMenu(
                        options = listOf("15 seconds", "30 seconds", "60 seconds"),
                        selected = settings.clearDelay,
                        onSelect = { viewModel.setClearDelay(it) }
                    )
                }
            }
            
            Divider()
            
            // Show notification setting
            SettingItem(
                title = "Show notifications",
                subtitle = "Display notification when OTP is copied"
            ) {
                Switch(
                    checked = settings.showNotifications,
                    onCheckedChange = { viewModel.setShowNotifications(it) }
                )
            }
        }
    }
}`,
      },
      {
        type: 'heading',
        text: 'Permissions Screen',
      },
      {
        type: 'code',
        language: 'kotlin',
        code: `@Composable
fun PermissionsScreen(
    onContinue: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Icon(
            imageVector = Icons.Default.Security,
            contentDescription = null,
            modifier = Modifier.size(100.dp),
            tint = MaterialTheme.colorScheme.primary
        )
        
        Spacer(modifier = Modifier.height(24.dp))
        
        Text(
            text = "Privacy First",
            style = MaterialTheme.typography.headlineLarge
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "OTP Auto Copy uses SMS User Consent API",
            style = MaterialTheme.typography.bodyLarge,
            textAlign = TextAlign.Center
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        PrivacyFeatureItem(
            icon = Icons.Default.Lock,
            title = "No SMS Permission",
            description = "We don't request READ_SMS permission"
        )
        
        PrivacyFeatureItem(
            icon = Icons.Default.CloudOff,
            title = "Completely Offline",
            description = "No data is sent to any server"
        )
        
        PrivacyFeatureItem(
            icon = Icons.Default.DeleteForever,
            title = "No Storage",
            description = "OTPs are never saved or logged"
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = onContinue,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Continue")
        }
    }
}`,
      },
    ],
  },
  {
    id: 'compliance',
    title: '7. Play Store Compliance Checklist',
    description: 'Ensuring Google Play Store approval',
    content: [
      {
        type: 'paragraph',
        text: 'Follow this checklist to ensure your app complies with Google Play Store policies for SMS and privacy.',
      },
      {
        type: 'heading',
        text: 'SMS & Call Log Permissions Policy',
      },
      {
        type: 'list',
        items: [
          '✓ Do NOT request READ_SMS, WRITE_SMS, or RECEIVE_SMS permissions',
          '✓ Use SMS User Consent API or SMS Retriever API instead',
          '✓ Clearly explain SMS access in app description',
          '✓ Provide in-app explanation before requesting consent',
          '✓ Document API usage in Play Console declaration',
        ],
      },
      {
        type: 'heading',
        text: 'User Data & Privacy Policy',
      },
      {
        type: 'list',
        items: [
          '✓ Publish a privacy policy (required for all apps)',
          '✓ Link privacy policy in Play Console and app',
          '✓ Clearly state: "We do not collect, store, or transmit any data"',
          '✓ Explain OTP detection mechanism',
          '✓ Describe clipboard usage and auto-clear feature',
          '✓ State that app works completely offline',
        ],
      },
      {
        type: 'heading',
        text: 'Data Safety Section',
      },
      {
        type: 'paragraph',
        text: 'In Play Console Data Safety section, declare:',
      },
      {
        type: 'list',
        items: [
          'Data collection: NO',
          'Data sharing: NO',
          'Data security: Encryption in transit - N/A (no network)',
          'Data deletion: N/A (no data stored)',
        ],
      },
      {
        type: 'heading',
        text: 'App Content Declaration',
      },
      {
        type: 'list',
        items: [
          '✓ Target audience: Everyone',
          '✓ Content rating: Complete questionnaire',
          '✓ Ads: Declare if using ads (not recommended for this app)',
          '✓ In-app purchases: Declare if applicable',
        ],
      },
      {
        type: 'heading',
        text: 'Technical Requirements',
      },
      {
        type: 'list',
        items: [
          '✓ Target Android API 34+ (current requirement)',
          '✓ Minimum API 26 (Android 8.0)',
          '✓ 64-bit native libraries if using NDK',
          '✓ App bundle (AAB) format required',
          '✓ ProGuard/R8 enabled for release builds',
        ],
      },
      {
        type: 'heading',
        text: 'Testing Checklist',
      },
      {
        type: 'list',
        items: [
          '✓ Test on multiple Android versions (8.0 to latest)',
          '✓ Test with various OTP message formats',
          '✓ Verify clipboard auto-clear functionality',
          '✓ Test with Google Play Services enabled/disabled',
          '✓ Verify no crashes or ANRs',
          '✓ Test app size and performance',
        ],
      },
      {
        type: 'alert',
        variant: 'warning',
        text: 'Important: Google Play policies change frequently. Always check the latest policies at https://play.google.com/about/developer-content-policy/ before submission.',
      },
    ],
  },
  {
    id: 'privacy-policy',
    title: '8. Privacy Policy Outline',
    description: 'Template for your app\'s privacy policy',
    content: [
      {
        type: 'paragraph',
        text: 'Below is a privacy policy outline for OTP Auto Copy. Customize it for your specific implementation and consult legal counsel before publishing.',
      },
      {
        type: 'heading',
        text: 'Privacy Policy for OTP Auto Copy',
      },
      {
        type: 'paragraph',
        text: 'Last updated: [Date]',
      },
      {
        type: 'heading',
        text: '1. Introduction',
      },
      {
        type: 'paragraph',
        text: 'OTP Auto Copy ("we", "our", or "the app") is committed to protecting your privacy. This privacy policy explains how our app handles information.',
      },
      {
        type: 'heading',
        text: '2. Information We Do NOT Collect',
      },
      {
        type: 'paragraph',
        text: 'OTP Auto Copy does NOT collect, store, or transmit any personal information or data, including:',
      },
      {
        type: 'list',
        items: [
          'SMS message content',
          'OTP codes',
          'Phone numbers',
          'Contact information',
          'Device identifiers',
          'Usage analytics',
          'Location data',
          'Any other personal information',
        ],
      },
      {
        type: 'heading',
        text: '3. How the App Works',
      },
      {
        type: 'paragraph',
        text: 'OTP Auto Copy uses the Android SMS User Consent API to detect incoming SMS messages that may contain OTP codes. When an SMS arrives:',
      },
      {
        type: 'ordered-list',
        items: [
          'Android system shows a consent dialog',
          'You choose whether to share that specific message with the app',
          'If you consent, the app extracts the OTP code',
          'The OTP is copied to your clipboard',
          'The OTP is automatically cleared from clipboard after your configured time',
          'No data is stored, logged, or transmitted',
        ],
      },
      {
        type: 'heading',
        text: '4. Permissions',
      },
      {
        type: 'paragraph',
        text: 'The app does NOT request READ_SMS or any dangerous permissions. It uses the SMS User Consent API, which requires your explicit consent for each message.',
      },
      {
        type: 'heading',
        text: '5. Data Storage',
      },
      {
        type: 'paragraph',
        text: 'The app stores only non-sensitive preferences locally on your device:',
      },
      {
        type: 'list',
        items: [
          'Auto-clear clipboard setting (enabled/disabled)',
          'Clipboard clear delay (15/30/60 seconds)',
          'Notification preferences',
        ],
      },
      {
        type: 'paragraph',
        text: 'OTP codes are NEVER stored.',
      },
      {
        type: 'heading',
        text: '6. Network Access',
      },
      {
        type: 'paragraph',
        text: 'The app works completely offline and does NOT:',
      },
      {
        type: 'list',
        items: [
          'Connect to the internet',
          'Send data to any server',
          'Use analytics services',
          'Display advertisements',
          'Communicate with third parties',
        ],
      },
      {
        type: 'heading',
        text: '7. Third-Party Services',
      },
      {
        type: 'paragraph',
        text: 'The app uses Google Play Services for the SMS User Consent API. Google\'s privacy policy applies to their services: https://policies.google.com/privacy',
      },
      {
        type: 'heading',
        text: '8. Children\'s Privacy',
      },
      {
        type: 'paragraph',
        text: 'The app does not collect any information from anyone, including children under 13.',
      },
      {
        type: 'heading',
        text: '9. Changes to This Policy',
      },
      {
        type: 'paragraph',
        text: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app and updating the "Last updated" date.',
      },
      {
        type: 'heading',
        text: '10. Contact Us',
      },
      {
        type: 'paragraph',
        text: 'If you have questions about this privacy policy, contact us at: [Your Email]',
      },
      {
        type: 'alert',
        variant: 'info',
        text: 'This is a template. Customize it for your specific implementation and have it reviewed by legal counsel before publishing.',
      },
    ],
  },
];
