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

export const playButtonSound = () => {
  const soundPath = clickSounds[currentClickSound];
  if (!soundPath) return;

  if (!buttonSound) {
    buttonSound = new Audio(soundPath);
  }
  
  buttonSound.currentTime = 0;
  buttonSound.volume = 0.3;
  buttonSound.play().catch(err => {
    console.log('Button sound play failed:', err);
  });
};
