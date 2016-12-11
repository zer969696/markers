package su.vistar.mapper;

import org.apache.ibatis.annotations.*;
import su.vistar.features.Feature;

import java.util.List;

/**
 * Created by benzoback on 11.12.16.
 * markersapp
 */


public interface FeatureMapper {

    @Results({
            @Result(property = "featureId", column = "id"),
            @Result(property = "featureCoords", column = "coords")
    })

    @Select("SELECT * FROM features")
    List<Feature> selectFeatures();

    @Insert("INSERT INTO features(coords) VALUE(#{featureCoords})")
    void insertFeature(Feature feature);

    @Delete("DELETE FROM features WHERE id = #{featureId}")
    void deleteFeature(int featureId);
}
