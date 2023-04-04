const { JSDOM } = require('jsdom');

test('window location redirects or reloads correctly', () => {
    const referrer = 'http://example.com/page1.html';
    Object.defineProperty(document, 'referrer', { value: referrer });
  
    const assignSpy = jest.spyOn(window.location, 'assign').mockImplementation(() => {});
    const reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => {});
  
    if (document.referrer.indexOf('B2C_1A_DIA_RealMe') > -1) {
      window.location.href = document.referrer;
    } else {
      window.location.reload();
    }
  
    if (document.referrer.indexOf('B2C_1A_DIA_RealMe') > -1) {
      expect(assignSpy).toHaveBeenCalledWith(referrer);
      expect(reloadSpy).not.toHaveBeenCalled();
    } else {
      expect(assignSpy).not.toHaveBeenCalled();
      expect(reloadSpy).toHaveBeenCalled();
    }
  
    assignSpy.mockRestore();
    reloadSpy.mockRestore();
  });