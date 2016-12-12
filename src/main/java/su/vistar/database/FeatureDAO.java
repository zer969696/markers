package su.vistar.database;

import org.apache.ibatis.session.SqlSession;
import su.vistar.features.Feature;
import su.vistar.mapper.FeatureMapper;

import java.util.List;

/**
 * Created by benzoback on 11.12.16.
 * markersapp
 */


public class FeatureDAO {

    public void insert(Feature feature) {
        SqlSession sqlSession = MySqlSessionFactory.getSqlSessionFactory().openSession();
        FeatureMapper mapper = sqlSession.getMapper(FeatureMapper.class);

        mapper.insertFeature(feature);
        sqlSession.commit();
        sqlSession.close();
    }

    public void delete(int featureId) {
        SqlSession sqlSession = MySqlSessionFactory.getSqlSessionFactory().openSession();
        FeatureMapper mapper = sqlSession.getMapper(FeatureMapper.class);

        mapper.deleteFeature(featureId);
        sqlSession.commit();
        sqlSession.close();
    }

    public void update(Feature feature) {
        SqlSession sqlSession = MySqlSessionFactory.getSqlSessionFactory().openSession();
        FeatureMapper mapper = sqlSession.getMapper(FeatureMapper.class);

        mapper.updateFeature(feature);
        sqlSession.commit();
        sqlSession.close();
    }

    public List<Feature> select() {
        SqlSession sqlSession = MySqlSessionFactory.getSqlSessionFactory().openSession();
        FeatureMapper mapper = sqlSession.getMapper(FeatureMapper.class);

        List<Feature> queryResult = mapper.selectFeatures();

        sqlSession.close();
        return queryResult;
    }

    public Integer selectLastId() {
        SqlSession sqlSession = MySqlSessionFactory.getSqlSessionFactory().openSession();
        FeatureMapper mapper = sqlSession.getMapper(FeatureMapper.class);

        Integer queryResult = mapper.selectLastId();

        sqlSession.close();
        return queryResult;
    }
}
