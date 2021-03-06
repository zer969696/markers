package su.vistar.servlets;

import org.json.simple.JSONObject;
import su.vistar.database.FeatureDAO;
import su.vistar.features.Feature;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by benzoback on 10.12.16.
 * markersapp
 */
@WebServlet("/MapServlet")
public class MapServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        switch (Integer.parseInt(req.getParameter("type"))) {
            //selectAll
            case 10: {
                FeatureDAO featureDAO = new FeatureDAO();
                List<Feature> features = featureDAO.select();

                JSONObject jsonString = new JSONObject();

                for (Feature feature : features) {
                    jsonString.put(feature.getFeatureId().toString(), feature.getFeatureCoords());
                }

                resp.setContentType("application/json");
                resp.getWriter().write(jsonString.toJSONString());
                break;
            }
            //selectLastId
            case 20: {
                FeatureDAO featureDAO = new FeatureDAO();
                Integer lastId = featureDAO.selectLastId();

                resp.setContentType("text/plain");
                resp.getWriter().write(lastId.toString());
                break;
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        switch (Integer.parseInt(req.getParameter("type"))) {
            //delete
            case 1: {
                String query = req.getParameter("idToDelete");
                FeatureDAO featureDAO = new FeatureDAO();

                featureDAO.delete(Integer.parseInt(query));
                break;
            }
            //insert
            case 2: {
                String query = req.getParameter("wktCoordinates");
                FeatureDAO featureDAO = new FeatureDAO();

                Feature feature = new Feature();
                feature.setFeatureCoords(query);

                featureDAO.insert(feature);
                break;
            }
            //update
            case 3: {
                Integer queryId = Integer.parseInt(req.getParameter("idToUpdate"));
                String queryCoords = req.getParameter("coordsToUpdate");
                FeatureDAO featureDAO = new FeatureDAO();

                Feature feature = new Feature();
                feature.setFeatureId(queryId);
                feature.setFeatureCoords(queryCoords);

                featureDAO.update(feature);
                break;
            }
        }
    }
}
