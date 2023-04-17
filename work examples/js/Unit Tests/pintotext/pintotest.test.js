
//import pinToText from './pintotext.js';
const myModule = require('./pintotext.js');

describe('pinToText', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <input type="password" id="newSecretPIN" autocomplete="new-pin" />
        <input type="password" id="reenterSecretPIN" autocomplete="new-pin" />
      `;
    });
  
    test('should set attributes of newSecretPIN and reenterSecretPIN to type text, onCopy return false, onCut return false, and autocomplete new-pin', () => {
      const newPin = document.getElementById('newSecretPIN');
      const reenterPin = document.getElementById('reenterSecretPIN');
  
      expect(newPin.getAttribute('type')).toBe('password');
      expect(newPin.getAttribute('onCopy')).toBeFalsy();
      expect(newPin.getAttribute('onCut')).toBeFalsy();
      expect(newPin.getAttribute('autocomplete')).toBe('new-pin');
  
      expect(reenterPin.getAttribute('type')).toBe('password');
      expect(reenterPin.getAttribute('onCopy')).toBeFalsy();
      expect(reenterPin.getAttribute('onCut')).toBeFalsy();
      expect(reenterPin.getAttribute('autocomplete')).toBe('new-pin');
  
      myModule.pinToText();
  
      expect(newPin.getAttribute('type')).toBe('text');
      expect(newPin.getAttribute('onCopy')).toBe('return false');
      expect(newPin.getAttribute('onCut')).toBe('return false');
      expect(newPin.getAttribute('autocomplete')).toBe('new-pin');
  
      expect(reenterPin.getAttribute('type')).toBe('text');
      expect(reenterPin.getAttribute('onCopy')).toBe('return false');
      expect(reenterPin.getAttribute('onCut')).toBe('return false');
      expect(reenterPin.getAttribute('autocomplete')).toBe('new-pin');
    });
  });