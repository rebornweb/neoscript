   
 var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);
    // Changing auto-complete for Autofill in Edit Profile > Settings    
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
          inputmode: 'numeric',
          maxlength: '5',
          value: ''
          };
    
        setAttributes(newPin, attributes);
        setAttributes(reenterPin, attributes);
  
        $('#newSecretPIN,#reenterSecretPIN').parents('.Password')
        .removeClass('Password')
        .addClass('otp'); 
    }; 
      
      pinToText();

   var cloneandInsertUsername = function () {
      let cloneElem = $('#newSignInName').clone(true);

      // Firefox
       cloneElem.attr('id', 'usernamehidden');
      // Safari
       cloneElem.prop('autocomplete', 'username'); 
      $('#email').before(cloneElem);

      // Create new dummy input elements
      var dummyUsernameInput = $('<input>').attr({
        name: 'DummyUsername',
        type: 'text',
        style: 'display:none;'
    });


// Insert the new input elements before the input with ID 'newSecretPIN'
 $('#newSecretPIN').before(dummyUsernameInput);
console.log('Does this work');
    };

    cloneandInsertUsername();