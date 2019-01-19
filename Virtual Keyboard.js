import $ from 'jquery';
import 'virtual-keyboard';
import router from '@/router';
import Timer from '@/modules/common/services/Timer';

const alphaKeyboard = {
  normal: [
    '{meta1} q w e r t y u i o p  ? ! {bksp} {a}',
    '{s} a s d f g h j k l \' , . @',
    '{t} _ - z x c v b n m {space} {enter}'
  ],
  meta1: [
    '{meta1} 1 2 3 {a}',
    '{t} 4 5 6 {bksp}',
    '7 8 9 0'
  ],
  shift: [
    '{meta1} Q W E R T Y U I O P  ? ! {bksp} {a}',
    '{s} A S D F G H J K L \' , . @',
    '{t} _ - Z X C V B N M {space} {enter}'
  ]
};

const defaultOptions = {
  display: {
    bksp: ' ',
    a: ' ',
    space: '\u2334',
    meta1: '123',
    normal: 'ABC'
  },
  layout: 'custom',
  restrictInput: true,
  tabNavigation: true,
  usePreview: false,
  autoAccept: true,
  acceptValid: true,
  openOn: 'click',
  customLayout: alphaKeyboard,
  events: {
    keyboardChange: (e, keyboard, element) => {
      // In case this event will be overwritten in directive options, it should
      // handle v-model update by itself
      const event = new Event('input', { bubbles: true });
      element.value = $(element).val();
      element.dispatchEvent(event);
      Timer.restart();
    }
  }
};

// Initialize the virtual-keyboard directive.
const KeesyKeyboard = {
  bind(el, binding) {
    const options = Object.assign({}, defaultOptions);
    Object.assign(options, binding.value);
    let KKeyboard = $(el);
    if (options.isContainer) {
      KKeyboard = $(el).find('input[type=search]');
    }
    setTimeout(() => {
      KKeyboard = KKeyboard.keyboard(options);
      Object.keys(options.events).forEach((item) => {
        KKeyboard.bind(item, options.events[item]);
      });
      if (typeof options.onInit === 'function') {
        options.onInit();
      }
      if (options.keesyKeyboardType === 'numberOnly') {
        KKeyboard.bind('visible', (event, keyboard) => {
          keyboard.showKeySet('meta1');
        });
      }
    }, 250);
    router.beforeEach((from, to, next) => {
      const keyboard = KKeyboard.getkeyboard();
      if (keyboard) {
        keyboard.close();
      }
      next();
    });
  }
};

export default KeesyKeyboard;
