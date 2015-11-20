// Author: Stefan Bauer
// Web Site: http://www.n8d.at/
// Original Blog Post:
// Version: 1.0
// Description: 
// 		JQuery Plugin to add a navigational table of content to SharePoint
// Usage:
// 		$("#ms-rtestate-file").tocMenu(options);
//		This will try to fine all headline tags in the rich text editor state field
// Options:
//		orderedList : true will add <ol> tags to table of contents
//					: false will add <ul> tage to table of contents
//		customStyle : add an additonal stylesheet class to the table of content
//		prepend     : defines the element where the table of content should be prepended
//					: this can be used with class (.ewiki-slink) and id (#yourselector) selector
//		headlineText: allows you to lable the table of contents individually e.g with 'Table of Content' ;)
"use strict";

(function($) {
    $.fn.tocMenu = function(options) {
        // Helper Methodes
        String.prototype.repeat = function(num) {
            return new Array(num + 1).join(this);
        };

        // Default settings
        var defaults = {
            orderedlist: true,
            customStyle: "no-bullets",
            attachTo: ".ewiki-slink",
            prepend: true,
            headlineText: "Table of Content",
            maxLevel: 6
        };

        // check if settings exist
        var settings = $.extend({}, defaults, options);

        var tocElements = "";
        this.filter(
            function() {

                var listTag = "ol";
                if ($("#MSOLayout_InDesignMode") !== null && $("#MSOLayout_InDesignMode").val()) {
                    return;
                }
                if (!settings.orderedlist) {

                    listTag = "ul";

                }
                // Search for filter
                var headers = $(":header", $(this));

                // Just in case no headers have been found
                if (headers.length === 0) {
                    return;
                }

                // define previous tag name used for loop and indention
                var prevTagName = null;

                // check if header should be set
                if (settings.headlineText !== null) {
                    tocElements += "<b>" + settings.headlineText + "</b>";
                }

                // initalize element of toc
                if (settings.customStyle !== null) {
                    tocElements += "<" + listTag + " class='tocMain " + settings.customStyle + "'>";
                } else {
                    tocElements += "<" + listTag + " class='tocMain'>";
                }

                // Defiend level of indention to create perfect unorder list
                var lvlCounter = 0;

                // Loop through headline
                for (var i = 0; i < headers.length; i++) {

                    var nameLink = "<a name='chapter" + i + "' />";
                    var tmpHeader = $(headers[i]).prepend(nameLink);

                    if (prevTagName !== null && tmpHeader.prop('tagName') < prevTagName) {
                        tocElements += ("</" + listTag + ">").repeat(lvlCounter);
                        lvlCounter -= 1;
                    } else if (prevTagName !== null && tmpHeader.prop('tagName') > prevTagName) {
                        tocElements += "<" + listTag + ">";
                        lvlCounter += 1;
                    }

                    tocElements += "<li><a href='#chapter" + i + "'>" + tmpHeader.text() + "</a></li>\n";

                    prevTagName = tmpHeader.prop('tagName');
                }
            }
        );
        if (settings.prepend) {
            $(settings.attachTo).prepend(tocElements);
        } else {
            $(settings.attachTo).append(tocElements);
        }
    };
})(jQuery);
