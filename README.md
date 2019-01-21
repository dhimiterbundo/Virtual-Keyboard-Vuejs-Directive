# Virtual-Keyboard-Vuejs-Directive

This is a Directive for virtual Keyboard.
I had to build this one for a street machine like ATM where there was no physic keyboard.
This directive has 3 types of keyboard but you can modify depending on your needs.

``` javascript
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
```
This is main event :

``` javascript
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
  ```
