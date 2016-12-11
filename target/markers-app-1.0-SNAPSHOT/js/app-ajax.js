// $(document).ready(function () {
//     $('userName').blur(function (event) {
//         var name = $('userName').val();
//         $.get('MapServlet', {
//             userName : name
//         }, function (responseText) {
//             $('#ajaxResponseText').text(responseText);
//         });
//     });
// });

// $(document).ready(function () {
//     $('#userName').blur(function () {
//         $.ajax({
//             url : 'MapServlet',
//             data : {
//                 userName : $('#userName').val()
//             },
//             success : function (responseText) {
//                 $('#ajaxResponseText').text(responseText)
//             }
//         });
//     });
// });
$(document).ready(function () {
    /* styles */
    var fill = new ol.style.Fill({
        color: 'rgba(255, 144, 9, 0.4)'
    });

    var fillCircle = new ol.style.Fill({
        color: '#2B2B2B'
    });

    var stroke = new ol.style.Stroke({
        color: '#2B2B2B',
        width: 3
    });

    var styles = [
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: fillCircle,
                stroke: stroke,
                radius: 6
            }),
            fill: fill,
            stroke: stroke
        })
    ];
    /* styles end*/

    var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    var map = new ol.Map({
        target: 'map',
        layers: [raster],
        view: new ol.View({
            center : ol.proj.fromLonLat([39.195059, 51.667341]),
            zoom : 12
        })
    });

    var features = new ol.Collection();
    var sourceVector = new ol.source.Vector({wrapX: false, features: features});
    var featureOverlay = new ol.layer.Vector({
        source: sourceVector,
        style: styles
    });

    featureOverlay.setMap(map);

    var modify = new ol.interaction.Modify({
        features: features,
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });

    var select = new ol.interaction.Select({
        condition: function(mapBrowserEvent) {
            return ol.events.condition.click(mapBrowserEvent) &&
                ol.events.condition.altKeyOnly(mapBrowserEvent);
        }
    });

    select.on('select', function (event) {
        if (event.selected.length > 0) {
            var properties = event.selected[0].getProperties();

            $.ajax({
                url: 'Test',
                data: {
                    idToDelete: properties.id,
                    type: '1'
                },
                type: 'post'
            });

            var features = sourceVector.getFeatures();
            for (x in features) {
               var featureProperties = features[x].getProperties();
               var featureId = featureProperties.id;

               if (featureId == properties.id) {
                   sourceVector.removeFeature(features[x]);
               }
            }

            select.getFeatures().clear();
        }
    });

    var typeSelect = document.getElementById('draw-type');

    var draw; // global so we can remove it later
    var featureID;
    function addInteraction() {
        var value = typeSelect.value;

        if (value !== 'None') {
            draw = new ol.interaction.Draw({
                features: features,
                type: (typeSelect.value),
                freehand: false
            });

            draw.on('drawend', function (event) {
                var feature = event.feature;
                featureID = featureID + 1;

                feature.setProperties({
                    'id': featureID
                });
                featureID = featureID + 1;

                $.ajax({
                    url: 'Test',
                    data: {
                        wktCoordinates: new ol.format.WKT().writeFeature(feature),
                        type: '2'
                    },
                    type: 'post'
                });
            });

            map.addInteraction(draw);
        } else {
            map.removeInteraction(draw);
            map.addInteraction(modify);
        }
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function() {
        map.removeInteraction(draw);
        addInteraction();
    };

    addInteraction();

    $(document).keydown(function (e) {
       if (e.keyCode == 18 && typeSelect.value == "None") {
           map.removeInteraction(modify);
           map.addInteraction(select);
       }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 18 && typeSelect.value == "None") {
            map.addInteraction(modify);
            map.removeInteraction(select);
        }
    });

    $.ajax({
        url: 'Test',
        success: function (responseText) {
            var format = new ol.format.WKT();

            for (var k in responseText) {
                var feature = format.readFeature(responseText[k.toString()]);
                feature.setProperties({
                    'id': k.toString()
                });
                sourceVector.addFeature(feature);
                featureID = parseInt(k);
            }

        },
        type: 'get'
    });
});


