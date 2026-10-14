let apiPromise;

export function linePlaybackStart(start, lead = 0.4) {
  return Math.max(0, Number((start - lead).toFixed(2)));
}

function loadYouTubeApi() {
  if (globalThis.YT?.Player) return Promise.resolve(globalThis.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('YouTube API timeout')), 12000);
    const previous = globalThis.onYouTubeIframeAPIReady;
    globalThis.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout);
      previous?.();
      resolve(globalThis.YT);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = () => reject(new Error('YouTube API unavailable'));
    document.head.append(script);
  });
  return apiPromise;
}

export async function createYouTubePlayer({ elementId, videoId, onTime, onUnavailable }) {
  const YT = await loadYouTubeApi();
  let timer = null;
  let replayTimer = null;
  const player = await new Promise((resolve, reject) => {
    let instance;
    instance = new YT.Player(elementId, {
      videoId,
      playerVars: { rel: 0, playsinline: 1, cc_lang_pref: 'it', cc_load_policy: 1, origin: location.origin },
      events: {
        onReady: () => resolve(instance),
        onStateChange: event => {
          clearInterval(timer);
          if (event.data === YT.PlayerState.PLAYING) {
            timer = setInterval(() => onTime(instance.getCurrentTime()), 80);
          }
        },
        onError: event => {
          onUnavailable(event.data);
          reject(new Error(`YouTube player error ${event.data}`));
        }
      }
    });
  });

  return {
    seekTo(seconds) {
      player.seekTo(seconds, true);
      player.playVideo();
    },
    replayRange(start, end) {
      clearTimeout(replayTimer);
      player.seekTo(start, true);
      player.playVideo();
      replayTimer = setTimeout(() => player.pauseVideo(), Math.max(0, end - start) * 1000);
    },
    destroy() {
      clearInterval(timer);
      clearTimeout(replayTimer);
      player.destroy();
    }
  };
}
