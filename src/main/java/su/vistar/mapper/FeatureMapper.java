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

    @Select("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE (TABLE_NAME = 'features')")
    Integer selectLastId();

    @Insert("INSERT INTO features(coords) VALUE(#{featureCoords})")
    void insertFeature(Feature feature);

    @Delete("DELETE FROM features WHERE id = #{featureId}")
    void deleteFeature(int featureId);

    @Update("UPDATE features SET coords = #{featureCoords} WHERE id = #{featureId}")
    void updateFeature(Feature feature);
}
