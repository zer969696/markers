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
    <title>Title</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v3.19.1/css/ol.css" type="text/css">
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://openlayers.org/en/v3.19.1/build/ol.js" type="text/javascript"></script>
    <script src="js/app-ajax.js"></script>
</head>
<body>
    <h1>KEK</h1>
    <form class="form-draw">
        <label>Type of draw</label>
        <select id="draw-type" title="draw-type-title">
            <option selected="selected" value="Point">Point</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="None">None</option>
        </select>
    </form>
    <%--<form>--%>
        <%--Enter your name: <input type="text" id="userName"  title="userNameTitle">--%>
    <%--</form>--%>
    <%--<br><br>--%>

    <%--<strong>AjaxResponse</strong>--%>
    <%--<div id="ajaxResponseText"></div>--%>

    <div id="map" class="map" style="height: 600px; width: 100%"></div>
</body>
</html>
