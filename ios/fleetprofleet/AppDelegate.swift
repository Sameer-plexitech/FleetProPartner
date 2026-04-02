import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import AVFoundation

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "fleetprofleet",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

@objc(AudioRecorderModule)
class AudioRecorderModule: NSObject, RCTBridgeModule, AVAudioPlayerDelegate {
  private var audioRecorder: AVAudioRecorder?
  private var audioPlayer: AVAudioPlayer?
  private var outputPath: String?
  private var recordingStartedAt: Date?
  private var isPlaybackPaused = false
  private var playbackDurationMs: Double = 0
  private var playbackPath: String?

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(startRecording:rejecter:)
  func startRecording(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if audioRecorder != nil {
      reject("E_ALREADY_RECORDING", "A recording is already in progress.", nil)
      return
    }

    AVAudioSession.sharedInstance().requestRecordPermission { [weak self] granted in
      guard let self = self else { return }

      if !granted {
        reject("E_PERMISSION", "Microphone permission is required.", nil)
        return
      }

      do {
        self.releasePlayer()
        try self.configureSessionForRecording()

        let cachesPath = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
        let recordingsDir = cachesPath.appendingPathComponent("voice_notes", isDirectory: true)
        try FileManager.default.createDirectory(
          at: recordingsDir,
          withIntermediateDirectories: true
        )

        let fileName = "voice_note_\(Int(Date().timeIntervalSince1970 * 1000)).m4a"
        let fileURL = recordingsDir.appendingPathComponent(fileName)

        let settings: [String: Any] = [
          AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
          AVSampleRateKey: 44100,
          AVNumberOfChannelsKey: 2,
          AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue,
          AVEncoderBitRateKey: 128000,
        ]

        let recorder = try AVAudioRecorder(url: fileURL, settings: settings)
        recorder.prepareToRecord()
        if !recorder.record() {
          reject("E_START", "Unable to start audio recording.", nil)
          return
        }

        self.audioRecorder = recorder
        self.outputPath = fileURL.path
        self.recordingStartedAt = Date()

        resolve(fileURL.path)
      } catch {
        self.releaseRecorder()
        reject("E_START", "Unable to start audio recording.", error)
      }
    }
  }

  @objc(stopRecording:rejecter:)
  func stopRecording(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let recorder = audioRecorder else {
      reject("E_NOT_RECORDING", "No active recording found.", nil)
      return
    }

    recorder.stop()

    let durationMs = (recordingStartedAt != nil)
      ? Date().timeIntervalSince(recordingStartedAt!) * 1000
      : 0

    let result: [String: Any] = [
      "filePath": outputPath ?? "",
      "durationMs": max(durationMs, 0),
    ]

    releaseRecorder()
    resolve(result)
  }

  @objc(startPlayback:resolver:rejecter:)
  func startPlayback(
    _ filePath: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let trimmedPath = filePath.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmedPath.isEmpty {
      reject("E_INVALID_PATH", "Recording file path is required.", nil)
      return
    }

    if !FileManager.default.fileExists(atPath: trimmedPath) {
      reject("E_FILE_NOT_FOUND", "Recording file not found.", nil)
      return
    }

    do {
      releasePlayer()
      try configureSessionForPlayback()

      let player = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: trimmedPath))
      player.delegate = self
      player.prepareToPlay()
      playbackDurationMs = player.duration * 1000

      if !player.play() {
        reject("E_PLAYBACK_START", "Unable to start playback.", nil)
        return
      }

      audioPlayer = player
      isPlaybackPaused = false
      playbackPath = trimmedPath

      resolve(createPlaybackProgressMap())
    } catch {
      releasePlayer()
      reject("E_PLAYBACK_START", "Unable to start playback.", error)
    }
  }

  @objc(pausePlayback:rejecter:)
  func pausePlayback(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let player = audioPlayer else {
      reject("E_NO_PLAYER", "No audio is loaded for playback.", nil)
      return
    }

    if player.isPlaying {
      player.pause()
      isPlaybackPaused = true
    }

    resolve(createPlaybackProgressMap())
  }

  @objc(resumePlayback:rejecter:)
  func resumePlayback(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let player = audioPlayer else {
      reject("E_NO_PLAYER", "No audio is loaded for playback.", nil)
      return
    }

    if !player.isPlaying {
      player.play()
      isPlaybackPaused = false
    }

    resolve(createPlaybackProgressMap())
  }

  @objc(stopPlayback:rejecter:)
  func stopPlayback(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    releasePlayer()
    resolve(true)
  }

  @objc(getPlaybackProgress:rejecter:)
  func getPlaybackProgress(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(createPlaybackProgressMap())
  }

  @objc(deleteRecording:resolver:rejecter:)
  func deleteRecording(
    _ filePath: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let trimmedPath = filePath.trimmingCharacters(in: .whitespacesAndNewlines)
    if trimmedPath.isEmpty {
      reject("E_INVALID_PATH", "Recording file path is required.", nil)
      return
    }

    if audioRecorder != nil && outputPath == trimmedPath {
      reject("E_RECORDING_ACTIVE", "Stop recording before deleting this file.", nil)
      return
    }

    if playbackPath == trimmedPath {
      releasePlayer()
    }

    if !FileManager.default.fileExists(atPath: trimmedPath) {
      resolve(true)
      return
    }

    do {
      try FileManager.default.removeItem(atPath: trimmedPath)
      if outputPath == trimmedPath {
        outputPath = nil
      }
      resolve(true)
    } catch {
      reject("E_DELETE", "Unable to delete recording file.", error)
    }
  }

  func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
    isPlaybackPaused = false
    player.currentTime = 0
  }

  private func configureSessionForRecording() throws {
    let session = AVAudioSession.sharedInstance()
    try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker])
    try session.setActive(true)
  }

  private func configureSessionForPlayback() throws {
    let session = AVAudioSession.sharedInstance()
    try session.setCategory(.playback, mode: .default, options: [])
    try session.setActive(true)
  }

  private func releaseRecorder() {
    audioRecorder?.stop()
    audioRecorder = nil
    outputPath = nil
    recordingStartedAt = nil
  }

  private func releasePlayer() {
    audioPlayer?.stop()
    audioPlayer = nil
    isPlaybackPaused = false
    playbackDurationMs = 0
    playbackPath = nil
  }

  private func createPlaybackProgressMap() -> [String: Any] {
    guard let player = audioPlayer else {
      return [
        "isPlaying": false,
        "isPaused": false,
        "currentPositionMs": 0,
        "durationMs": playbackDurationMs,
      ]
    }

    let durationMs = max(player.duration * 1000, playbackDurationMs)
    playbackDurationMs = durationMs

    return [
      "isPlaying": player.isPlaying,
      "isPaused": !player.isPlaying && isPlaybackPaused,
      "currentPositionMs": max(player.currentTime * 1000, 0),
      "durationMs": durationMs,
    ]
  }
}
