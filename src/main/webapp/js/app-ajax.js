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
$(document).ready(function () {
    /* styles */
    var styles = [
        new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#CC33FF'
                }),
                stroke: new ol.style.Stroke({
                    color: '#CC33FF',
                    width: 4
                }),
                radius: 5
            }),
            fill: new ol.style.Fill({
                color: 'rgba(204, 51, 255, 0.2)'
            }),
            stroke: stroke = new ol.style.Stroke({
                color: '#CC33FF',
                width: 4
            })
        })
    ];
    /* styles end*/

    // var raster = new ol.layer.Tile({
    //     source: new ol.source.OSM()
    // });
    //
    // var map = new ol.Map({
    //     target: 'map',
    //     layers: [raster],
    //     view: new ol.View({
    //         center : ol.proj.fromLonLat([39.195059, 51.667341]),
    //         zoom : 12
    //     })
    // });
    //

    /* drawable features */
    var features = new ol.Collection();
    var sourceVector = new ol.source.Vector({
        wrapX: false, features: features
    });
    var featureOverlay = new ol.layer.Vector({
        source: sourceVector,
        style: styles
    });
    /* drawable features end */

    /* layers */
    var layers = [];

    layers.push(new ol.layer.Tile({
        visible: false,
        preload: Infinity,
        source: new ol.source.BingMaps({
            key: 'AvpL7btXdtqSwDZVDbcOocn8Vu2W4xoOCc99h_ZDemIbvEHImYR-M3k2Pp3omdjM',
            imagerySet: 'AerialWithLabels',
            maxZoom: 19
        })
    }));
    layers.push(new ol.layer.Tile({
        visible: true,
        source: new ol.source.OSM()
    }));
    /* layers end */

    var map = new ol.Map({
        layers: layers,
        loadTilesWhileInteracting: true,
        target: 'map',
        view: new ol.View({
            center: ol.proj.fromLonLat([39.195059, 51.667341]),
            zoom: 12
        })
    });

    /* drawable features */
    featureOverlay.setMap(map);

    /* interactions */
    var modify = new ol.interaction.Modify({
        features: features,
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });

    modify.on('modifyend', function (event) {
        event.features.forEach(function (callback) {
            console.log(callback.getProperties().id);

            $.ajax({
                url: 'Test',
                data: {
                    idToUpdate: callback.getProperties().id,
                    coordsToUpdate: new ol.format.WKT().writeFeature(callback),
                    type: '3'
                },
                type: 'post'
            });
        })
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
    /* interaction end */

    var typeSelect = document.getElementById('draw-type');
    var mapSelect = document.getElementById('layer-type');

    /* draw interaction */
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

            // on drawend assert to feature ID and also save to DB via post
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

    mapSelect.onchange = function() {
        var style = mapSelect.value;

        switch (style) {
            case "Bing": {
                layers[0].setVisible(true);
                layers[1].setVisible(false);
                break;
            }
            case "OSM": {
                layers[0].setVisible(false);
                layers[1].setVisible(true);
                break;
            }
        }
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

    // load all features from DB
    $.ajax({
        url: 'Test',
        success: function (responseText) {
            var format = new ol.format.WKT();

            for (var jsonId in responseText) {
                var feature = format.readFeature(responseText[jsonId.toString()]);

                feature.setProperties({
                    'id': jsonId.toString()
                });

                sourceVector.addFeature(feature);
                featureID = parseInt(jsonId);
            }

        },
        type: 'get'
    });
});


