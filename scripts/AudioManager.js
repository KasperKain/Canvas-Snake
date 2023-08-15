import Settings from "./Settings.js";

export default class AudioManager {
  //List of audio files. Duh
  static audioList = [
    { name: "GBStart", src: "./../assets/audio/bg-startup.mp3" },
    { name: "removeSegment", src: "./../assets/audio/segmentFade.wav" },
    { name: "foodGet", src: "./../assets/audio/foodGet.wav" },
    { name: "changeDirection", src: "./../assets/audio/changeDirection.wav" },
    { name: "mainTheme", src: "./../assets/audio/mainTheme.wav" },
    { name: "mainThemeAlt", src: "./../assets/audio/mainThemeAlt.wav" },
    { name: "splashTheme", src: "./../assets/audio/splashTheme.wav" },
  ];
  static audioElement;

  static play(name) {
    if (!Settings.debugMode) {
      const audioObject = AudioManager.audioList.find(
        (audio) => audio.name === name
      );
      const audioElement = new Audio(audioObject.src);
      audioElement.volume = Settings.sfxVolume;
      audioElement.play();
    }
  }

  static playMusic(name, doNotLoop) {
    if (AudioManager.audioElement) {
      AudioManager.audioElement.pause();
    }

    const audioObject = AudioManager.audioList.find(
      (audio) => audio.name === name
    );
    AudioManager.audioElement = new Audio(audioObject.src);
    AudioManager.audioElement.volume = Settings.musicVolume;
    if (!doNotLoop) {
      AudioManager.audioElement.loop = true;
    }
    AudioManager.audioElement.play();
  }
}
