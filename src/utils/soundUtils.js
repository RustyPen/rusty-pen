let buttonSound = null;
let currentClickSound = 'click1';

const clickSounds = {
  click1: '/sounds/button/click_1.mp3',
  click2: '/sounds/button/click_2.mp3',
  click3: '/sounds/button/click_3.mp3',
  click4: '/sounds/button/click_4.mp3',
  none: null
};

export const setClickSound = (soundId) => {
  currentClickSound = soundId;
  buttonSound = null;
};

export const getClickSound = () => {
  return currentClickSound;
};

export const getClickSounds = () => {
  return Object.keys(clickSounds).map(id => ({
    id,
    name: id === 'none' ? '无声音' : `声音 ${id.replace('click', '')}`,
    path: clickSounds[id]
  }));
};

export const playButtonSound = (soundId = null) => {
  const soundToPlay = soundId || currentClickSound;
  const soundPath = clickSounds[soundToPlay];
  if (!soundPath) return;

  const audio = new Audio(soundPath);
  audio.currentTime = 0;
  audio.volume = 0.3;
  audio.play().catch(err => {
    console.log('Button sound play failed:', err);
  });
};
