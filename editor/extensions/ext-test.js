/**
 * ext-helloworld.js
 *
 * @license MIT
 *
 * @copyright 2010 Alexis Deveria
 *
 */

/**
* This is a very basic SVG-Edit extension. It adds a "Hello World" button in
*  the left ("mode") panel. Clicking on the button, and then the canvas
*  will show the user the point on the canvas that was clicked on.
*/
svgEditor.addExtension("test", function(S) {'use strict';


    return {
      name: "test",
      // For more notes on how to make an icon file, see the source of
      // the helloworld-icon.xml
      svgicons: svgEditor.curConfig.extPath + 'helloworld-icon.xml',

      // Multiple buttons can be added in this array
      buttons: [{
        // Must match the icon ID in helloworld-icon.xml
        id: 'hello_world',

        // Fallback, e.g., for `file://` acces
        // This indicates that the button will be added to the "mode"
        // button panel on the left side
        type: 'mode',

        // Tooltip text
        title: 'test issue',

        // Events
        events: {
          click: function () {
            // The action taken when the button is clicked on.
            // For "mode" buttons, any other button will
            // automatically be de-pressed.
            svgCanvas.setMode('test_issue');
          }
        }
      }],
      // This is triggered when the main mouse button is pressed down
      // on the editor canvas (not the tool panels)
      mouseDown: function () {
        // Check the mode on mousedown
        if (svgCanvas.getMode() === 'test_issue') {
          // The returned object must include "started" with
          // a value of true in order for mouseUp to be triggered
          return {started: true};
        }
      },

      // This is triggered from anywhere, but "started" must have been set
      // to true (see above). Note that "opts" is an object with event info
      mouseUp: function(opts) {
        // Check the mode on mouseup
        if (svgCanvas.getMode() === 'test_issue') {
          var zoom = svgCanvas.getZoom();

          // Get the actual coordinate by dividing by the zoom value
          var x = opts.mouse_x / zoom;
          var y = opts.mouse_y / zoom;

          var rgb = svgCanvas.getColor('fill');
          // var ccRgbEl = rgb.substring(1, rgb.length);
          var sRgb = svgCanvas.getColor('stroke');
          // ccSRgbEl = sRgb.substring(1, rgb.length);
          var sWidth = svgCanvas.getStrokeWidth();
          console.log(svgCanvas)
          console.log(S)


          var group = S.addSvgElementFromJson({
            element: 'g',
            attr: {
              id: 'test-group'
            }
          });
          var rect = S.addSvgElementFromJson({
            element: 'rect',
            attr: {
              x: x,
              y: y,
              id: 'test-rect',
              width: 100,
              height: 100,
              fill: rgb,
              strokecolor: sRgb,
              strokeWidth: sWidth
            }
          });
          var svgElem = S.addSvgElementFromJson({
            element: 'svg',
            attr: {
              x: x,
              y: y,
              id: 'test-svg',
              width: 10,
              height: 10,
              viewbox: '0 0 10 10',
              xmlns: 'http://www.w3.org/2000/svg',
              'xmlns:xlink': 'http://www.w3.org/1999/xlink',
              fill: 'green',
              strokecolor: sRgb,
              strokeWidth: sWidth
            }
          });
          var svgRect = S.addSvgElementFromJson({
            element: 'rect',
            attr: {
              x: 0,
              y: 0,
              id: 'test-svg-rect',
              width: 8,
              height: 8,
              fill: 'green',
              strokecolor: sRgb,
              strokeWidth: sWidth
            }
          });
          svgElem.appendChild(svgRect);

          group.appendChild(rect);
          group.appendChild(svgElem);
        }
      }
    };
});
