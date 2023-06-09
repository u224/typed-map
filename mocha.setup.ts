import chai from 'chai';
import chaiSubset from 'chai-subset';

process.env['NODE_ENV'] = 'test';

chai.use(chaiSubset);
