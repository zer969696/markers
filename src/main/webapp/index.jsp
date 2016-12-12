<%--
  Created by IntelliJ IDEA.
  User: benzoback
  Date: 10.12.16
  Time: 0:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Markers App</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v3.19.1/css/ol.css" type="text/css">
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://openlayers.org/en/v3.19.1/build/ol.js" type="text/javascript"></script>

    <script src="js/app-ajax.js"></script>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body class="body-background">
    <h1>Markers Application</h1>
    <h2>Two modes:</h2>
    <ul>
        <li>DRAW: select type from Point, LineString and Polygon to draw features</li>
        <li>EDIT: select type None and edit features, press ALT to DELETE features</li>
    </ul>
    <form class="form-draw">
        <label>Type: </label>
        <select id="draw-type" title="draw-type-title" style="font-size: 15px;">
            <option selected="selected" value="Point">Point</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="None">None</option>
        </select>

        <label style="padding-left:5em">Maps: </label>
        <select id="layer-type" title="layer-type-title" style="font-size: 15px;">
            <option selected="selected" value="OSM">Open Street Maps</option>
            <option value="Bing">Bing Maps</option>
        </select>
    </form>
    <div id="map" class="map" style="height: 600px; width: 100%"></div>
</body>
</html>
