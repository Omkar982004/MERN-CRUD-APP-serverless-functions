// __tests__/jobs.test.js
const { ObjectId } = require('mongodb');
const { getJobs, getJob, addJob, updateJob, deleteJob } = require('../controllers/jobsController');

// Simple mock for Express res object
function createMockResponse() {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
  return res;
}

describe('Jobs Controller', () => {
  let dbMock;

  beforeEach(() => {
    // Reset dbMock before each test
    dbMock = {
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      findOne: jest.fn(),
      insertOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn()
    };

    // Override getDB to return dbMock
    jest.resetModules(); // important to reset require cache
    jest.doMock('../config/db.js', () => ({
      getDB: () => dbMock
    }));
  });

  test('getJobs returns list of jobs', async () => {
    const jobs = [{ title: 'Frontend' }];
    dbMock.toArray.mockResolvedValue(jobs);

    const req = { query: {} };
    const res = createMockResponse();

    await getJobs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(jobs);
  });

  test('getJob returns single job', async () => {
    const job = { title: 'Backend' };
    dbMock.findOne.mockResolvedValue(job);

    const req = { params: { id: new ObjectId().toHexString() } }; // valid ObjectId
    const res = createMockResponse();

    await getJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(job);
  });

  test('addJob returns inserted job ID', async () => {
    const insertedId = new ObjectId();
    dbMock.insertOne.mockResolvedValue({ insertedId });

    const req = {
      body: {
        title: 'Full Stack Developer',
        type: 'Full-Time',
        description: 'Awesome job',
        location: 'Remote',
        salary: '$100K',
        company: {
          name: 'Tech Corp',
          description: 'A tech company',
          contactEmail: 'hr@techcorp.com',
          contactPhone: '1234567890'
        }
      }
    };
    const res = createMockResponse();

    await addJob(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: '✅ Job added successfully',
      jobId: insertedId
    });
  });

  test('updateJob returns success message', async () => {
    dbMock.updateOne.mockResolvedValue({ matchedCount: 1 });

    const req = {
      params: { id: new ObjectId().toHexString() },
      body: {
        title: 'Backend Developer',
        type: 'Full-Time',
        description: 'Update job',
        location: 'NY',
        salary: '$120K',
        company: {
          name: 'Tech Corp',
          description: 'A tech company',
          contactEmail: 'hr@techcorp.com',
          contactPhone: '1234567890'
        }
      }
    };
    const res = createMockResponse();

    await updateJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: '✅ Job updated successfully' });
  });

  test('deleteJob returns success message', async () => {
    dbMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const req = { params: { id: new ObjectId().toHexString() } };
    const res = createMockResponse();

    await deleteJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: '✅ Job deleted successfully' });
  });
});
