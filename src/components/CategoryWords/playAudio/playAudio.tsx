import { baseURL } from "constants/baseURL";

export const playAudio = async (...args: string[]) => {
  let result = args.map(
    (audioURL: string) => new Audio(`${baseURL}${audioURL}`)
  );
  const playMusic = (audio: any) => {
    return new Promise((resolve) => {
      audio.play();
      audio.addEventListener("ended", resolve);
    });
  };
  for (let i = 0; i < result.length; i++) {
    await playMusic(result[i]);
  }
};
