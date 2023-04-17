var Setting = function () {
    var init = function () {

        $('.menu-icon').on('click', function () {
            $('.header-item').show();
            $('.header-btns').show();
            $('.menu-icon').hide();
            $('.close-icon').removeClass('hide');
        });

        $('.close-icon').on('click', function () {
            $('.header-item').hide();
            $('.header-btns').hide();
            $('.menu-icon').show();
            $('.close-icon').addClass('hide');
        });
        navBarEvents();
        pinToText();
    },
        navBarEvents = function () {
            $('.header-item').click(function () {
                var elementId = $(this).attr('data-id');

                //check if currently on the home page
                var isHomeActive = $("[data-id=home]").hasClass("active");

                //need to detect unsaved changes here if not on home page
                if (unsaved && !isHomeActive) { 
                    showDiscardChanges(elementId);
                    return;
                }
                unsaved = false;

                $('.header-item').removeClass('active');
                $('.profile-section').addClass('hide');
                
                $(this).addClass('active');
                navigateToActivity(elementId);
            });
        };

    return {
        init: init,
        navBarEvents: navBarEvents
    }
}();

const pinToText = () => {
    const newPin = document.getElementById("newSecretPIN");
    const reenterPin = document.getElementById("reenterSecretPIN");
  
    const setAttributes = (element, attributes) => {
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    };
  
    const attributes = {
      type: 'text',
      onCopy: 'return false',
      onCut: 'return false',
      autocomplete: 'new-pin'
    };
  
    setAttributes(newPin, attributes);
    setAttributes(reenterPin, attributes);
  };

  module.exports = {
    pinToText: pinToText
  };