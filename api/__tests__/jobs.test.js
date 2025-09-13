import { ObjectId } from "mongodb";
import { getJobs, getJob, addJob, updateJob, deleteJob } from "../controllers/jobsController.js";
import { getDB } from "../config/db.js";

// Simple mock for Express res object
function createMockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
}

describe("Jobs Controller (Integration with real DB)", () => {
  let db;

  beforeAll(async () => {
    db = getDB(); // use the real seeded DB (setup.js already ran connect + seed)
  });

  test("getJobs returns list of jobs", async () => {
    const req = { query: {} };
    const res = createMockResponse();

    await getJobs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json.mock.calls[0][0].length).toBeGreaterThan(0); // seeded jobs exist
  });

  test("getJob returns single job", async () => {
    const job = await db.collection("jobs").findOne({});
    const req = { params: { id: job._id.toHexString() } };
    const res = createMockResponse();

    await getJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: job._id }));
  });

  test("addJob inserts and returns ID", async () => {
    const req = {
      body: {
        title: "Full Stack Developer",
        type: "Full-Time",
        description: "Awesome job",
        location: "Remote",
        salary: "$100K",
        company: {
          name: "Tech Corp",
          description: "A tech company",
          contactEmail: "hr@techcorp.com",
          contactPhone: "1234567890"
        }
      }
    };
    const res = createMockResponse();

    await addJob(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: expect.any(ObjectId) })
    );
  });

  test("updateJob modifies existing job", async () => {
    const job = await db.collection("jobs").findOne({});
    const req = {
      params: { id: job._id.toHexString() },
      body: { ...job, title: "Updated Title" }
    };
    const res = createMockResponse();

    await updateJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "✅ Job updated successfully" });

    // Verify directly in DB
    const updated = await db.collection("jobs").findOne({ _id: job._id });
    expect(updated.title).toBe("Updated Title");
  });

  test("deleteJob removes a job", async () => {
    const { insertedId } = await db.collection("jobs").insertOne({
      title: "Temp Job",
      type: "Contract",
      description: "To be deleted",
      location: "NY",
      salary: "$50K",
      company: {
        name: "DeleteMe Inc",
        description: "Temp company",
        contactEmail: "delete@me.com",
        contactPhone: "0000000000"
      }
    });

    const req = { params: { id: insertedId.toHexString() } };
    const res = createMockResponse();

    await deleteJob(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "✅ Job deleted successfully" });

    // Verify deletion
    const deleted = await db.collection("jobs").findOne({ _id: insertedId });
    expect(deleted).toBeNull();
  });
});
