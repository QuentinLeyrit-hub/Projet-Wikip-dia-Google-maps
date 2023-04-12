function scrollToTextInDiv(divID, text) {
         var element = $('#' + divID + ' :contains("' + text + '")').filter(function () {
             return $(this).contents().filter(function () {
                return this.nodeType === 3 && this.textContent.includes(text);
             }).length;
         }).first();

         if (element.length) {
             $('#' + divID).scrollTop(element.offset().top - $('#' + divID).offset().top + $('#' + divID).scrollTop());
         }
     }