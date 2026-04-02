package com.wtipartner.audio

import android.media.MediaPlayer
import android.media.MediaRecorder
import android.os.Build
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class AudioRecorderModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {

  private var recorder: MediaRecorder? = null
  private var outputPath: String? = null
  private var recordingStartTimeMs: Long = 0
  private var player: MediaPlayer? = null
  private var isPlaybackPaused: Boolean = false
  private var playbackDurationMs: Int = 0
  private var playbackPath: String? = null

  override fun getName(): String = "AudioRecorderModule"

  @ReactMethod
  fun startRecording(promise: Promise) {
    if (recorder != null) {
      promise.reject("E_ALREADY_RECORDING", "A recording is already in progress.")
      return
    }

    try {
      releasePlayer()

      val recordingsDir = File(reactApplicationContext.cacheDir, "voice_notes")
      if (!recordingsDir.exists()) {
        recordingsDir.mkdirs()
      }

      val outputFile = File(recordingsDir, "voice_note_${System.currentTimeMillis()}.m4a")
      val mediaRecorder = createMediaRecorder()

      mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC)
      mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
      mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
      mediaRecorder.setAudioEncodingBitRate(128000)
      mediaRecorder.setAudioSamplingRate(44100)
      mediaRecorder.setOutputFile(outputFile.absolutePath)
      mediaRecorder.prepare()
      mediaRecorder.start()

      recorder = mediaRecorder
      outputPath = outputFile.absolutePath
      recordingStartTimeMs = System.currentTimeMillis()

      promise.resolve(outputFile.absolutePath)
    } catch (error: SecurityException) {
      releaseRecorder()
      promise.reject("E_PERMISSION", "Microphone permission is required.", error)
    } catch (error: Exception) {
      releaseRecorder()
      promise.reject("E_START", "Unable to start audio recording.", error)
    }
  }

  @ReactMethod
  fun stopRecording(promise: Promise) {
    val mediaRecorder = recorder
    if (mediaRecorder == null) {
      promise.reject("E_NOT_RECORDING", "No active recording found.")
      return
    }

    try {
      mediaRecorder.stop()

      val durationMs = if (recordingStartTimeMs > 0) {
        System.currentTimeMillis() - recordingStartTimeMs
      } else {
        0L
      }

      val result = Arguments.createMap().apply {
        putString("filePath", outputPath ?: "")
        putDouble("durationMs", durationMs.toDouble())
      }
      promise.resolve(result)
    } catch (error: RuntimeException) {
      outputPath?.let { File(it).delete() }
      promise.reject("E_STOP", "Unable to stop audio recording.", error)
    } finally {
      releaseRecorder()
    }
  }

  @ReactMethod
  fun startPlayback(filePath: String, promise: Promise) {
    val targetPath = filePath.trim()
    if (targetPath.isEmpty()) {
      promise.reject("E_INVALID_PATH", "Recording file path is required.")
      return
    }

    val inputFile = File(targetPath)
    if (!inputFile.exists()) {
      promise.reject("E_FILE_NOT_FOUND", "Recording file not found.")
      return
    }

    try {
      releasePlayer()

      val mediaPlayer = MediaPlayer()
      mediaPlayer.setDataSource(targetPath)
      mediaPlayer.prepare()
      mediaPlayer.setOnCompletionListener { completedPlayer ->
        isPlaybackPaused = false
        completedPlayer.seekTo(0)
      }
      mediaPlayer.start()

      player = mediaPlayer
      isPlaybackPaused = false
      playbackDurationMs = mediaPlayer.duration
      playbackPath = targetPath

      promise.resolve(createProgressMap(mediaPlayer))
    } catch (error: Exception) {
      releasePlayer()
      promise.reject("E_PLAYBACK_START", "Unable to start playback.", error)
    }
  }

  @ReactMethod
  fun pausePlayback(promise: Promise) {
    val mediaPlayer = player
    if (mediaPlayer == null) {
      promise.reject("E_NO_PLAYER", "No audio is loaded for playback.")
      return
    }

    if (mediaPlayer.isPlaying) {
      mediaPlayer.pause()
      isPlaybackPaused = true
    }

    promise.resolve(createProgressMap(mediaPlayer))
  }

  @ReactMethod
  fun resumePlayback(promise: Promise) {
    val mediaPlayer = player
    if (mediaPlayer == null) {
      promise.reject("E_NO_PLAYER", "No audio is loaded for playback.")
      return
    }

    if (!mediaPlayer.isPlaying) {
      mediaPlayer.start()
      isPlaybackPaused = false
    }

    promise.resolve(createProgressMap(mediaPlayer))
  }

  @ReactMethod
  fun stopPlayback(promise: Promise) {
    releasePlayer()
    promise.resolve(true)
  }

  @ReactMethod
  fun getPlaybackProgress(promise: Promise) {
    promise.resolve(createProgressMap(player))
  }

  @ReactMethod
  fun deleteRecording(filePath: String, promise: Promise) {
    val targetPath = filePath.trim()
    if (targetPath.isEmpty()) {
      promise.reject("E_INVALID_PATH", "Recording file path is required.")
      return
    }

    if (recorder != null && outputPath == targetPath) {
      promise.reject("E_RECORDING_ACTIVE", "Stop recording before deleting this file.")
      return
    }

    if (playbackPath == targetPath) {
      releasePlayer()
    }

    val targetFile = File(targetPath)
    if (!targetFile.exists()) {
      promise.resolve(true)
      return
    }

    val isDeleted = targetFile.delete()
    if (!isDeleted) {
      promise.reject("E_DELETE", "Unable to delete recording file.")
      return
    }

    if (outputPath == targetPath) {
      outputPath = null
    }

    promise.resolve(true)
  }

  override fun invalidate() {
    releasePlayer()
    releaseRecorder()
    super.invalidate()
  }

  @Suppress("DEPRECATION")
  private fun createMediaRecorder(): MediaRecorder {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      MediaRecorder(reactApplicationContext)
    } else {
      MediaRecorder()
    }
  }

  private fun releaseRecorder() {
    try {
      recorder?.reset()
    } catch (_: Exception) {
    }
    try {
      recorder?.release()
    } catch (_: Exception) {
    }

    recorder = null
    outputPath = null
    recordingStartTimeMs = 0
  }

  private fun releasePlayer() {
    try {
      player?.setOnCompletionListener(null)
    } catch (_: Exception) {
    }
    try {
      if (player?.isPlaying == true) {
        player?.stop()
      }
    } catch (_: Exception) {
    }
    try {
      player?.reset()
    } catch (_: Exception) {
    }
    try {
      player?.release()
    } catch (_: Exception) {
    }

    player = null
    isPlaybackPaused = false
    playbackDurationMs = 0
    playbackPath = null
  }

  private fun createProgressMap(mediaPlayer: MediaPlayer?): com.facebook.react.bridge.WritableMap {
    val map = Arguments.createMap()
    if (mediaPlayer == null) {
      map.putBoolean("isPlaying", false)
      map.putBoolean("isPaused", false)
      map.putDouble("currentPositionMs", 0.0)
      map.putDouble("durationMs", playbackDurationMs.toDouble())
      return map
    }

    val isPlaying = try {
      mediaPlayer.isPlaying
    } catch (_: Exception) {
      false
    }

    val currentPosition = try {
      mediaPlayer.currentPosition
    } catch (_: Exception) {
      0
    }

    val duration = try {
      mediaPlayer.duration
    } catch (_: Exception) {
      playbackDurationMs
    }

    playbackDurationMs = if (duration > 0) duration else playbackDurationMs

    map.putBoolean("isPlaying", isPlaying)
    map.putBoolean("isPaused", !isPlaying && isPlaybackPaused)
    map.putDouble("currentPositionMs", currentPosition.toDouble())
    map.putDouble("durationMs", playbackDurationMs.toDouble())
    return map
  }
}
