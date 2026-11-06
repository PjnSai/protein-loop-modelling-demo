/* Jobs come from the saved MATLAB runs in public/demo-results/ plus any
   pre-computed results opened while signed in during this visit. Deleting a
   job only hides it for the current session. */

import { demoStore } from "../demo/demoStore";
import { JOBS_PER_PAGE } from "../demo/sampleData";
import { loadManifest, loadModelledStructure } from "../demo/precomputed";
import { downloadPdb } from "../demo/pdb";

const notSignedIn = { success: false, unauthorised: true };

const toJob = (example, overrides = {}) => {
  const status = example.status || "completed";
  return {
    job_id: example.id,
    pdb_code: example.pdb_code,
    chain: example.chain,
    segment_start: example.segment_start,
    segment_end: example.segment_end,
    status,
    created_at: example.created_at,
    completed_at: example.completed_at || null,
    processing_time: example.processing_time ?? null,
    error_message: example.error_message || null,
    parameters: example.parameters || {},
    results: example.results || null,
    has_results: status === "completed" && Boolean(example.model_file),
    precomputed: true,
    example,
    ...overrides,
  };
};

const allJobs = async () => {
  const state = demoStore.get();
  const examples = await loadManifest();
  const byId = Object.fromEntries(examples.map((e) => [e.id, e]));

  // Runs opened this session are listed first, with the time they were opened
  const sessionJobs = state.sessionJobs
    .filter((s) => byId[s.example_id])
    .map((s) =>
      toJob(byId[s.example_id], {
        job_id: s.job_id,
        created_at: s.created_at,
        completed_at: s.created_at,
      }),
    );

  const savedJobs = examples.map((e) => toJob(e));

  return [...sessionJobs, ...savedJobs]
    .filter((job) => !state.deletedJobIds.includes(job.job_id))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const fetchJobs = async (page) => {
  if (!demoStore.get().signedIn) return notSignedIn;

  const jobs = await allJobs();
  const pages = Math.max(1, Math.ceil(jobs.length / JOBS_PER_PAGE));
  const start = (page - 1) * JOBS_PER_PAGE;

  return {
    success: true,
    // eslint-disable-next-line no-unused-vars
    jobs: jobs.slice(start, start + JOBS_PER_PAGE).map(({ example, ...job }) => job),
    pages,
  };
};

export const fetchStatistics = async () => {
  if (!demoStore.get().signedIn) return notSignedIn;

  const jobs = await allJobs();
  const statusCounts = jobs.reduce((counts, job) => {
    counts[job.status] = (counts[job.status] || 0) + 1;
    return counts;
  }, {});
  const finished = (statusCounts.completed || 0) + (statusCounts.failed || 0);

  return {
    success: true,
    statistics: {
      total_jobs: jobs.length,
      status_counts: statusCounts,
      success_rate: finished
        ? Math.round(((statusCounts.completed || 0) / finished) * 100)
        : 0,
    },
  };
};

export const fetchJobDetails = async (jobId) => {
  if (!demoStore.get().signedIn) return notSignedIn;

  const job = (await allJobs()).find((j) => j.job_id === jobId);
  if (!job) return { success: false, error: "Job not found" };

  const { example, ...details } = job;
  const [originalStructure, modelledStructure] = await Promise.all([
    downloadPdb(job.pdb_code),
    loadModelledStructure(example),
  ]);

  return {
    success: true,
    job: {
      ...details,
      original_structure: originalStructure,
      modelled_structure: modelledStructure,
      has_modelled_structure: Boolean(modelledStructure),
    },
  };
};

export const downloadJobResults = async (jobId) => {
  const job = (await allJobs()).find((j) => j.job_id === jobId);
  if (!job?.has_results) {
    return { success: false, error: "No results available for this job" };
  }

  const content = await loadModelledStructure(job.example);
  saveTextFile(content, `${job.pdb_code}_${job.chain}_${job.segment_start}-${job.segment_end}_model.pdb`);
  return { success: true };
};

export const deleteJob = async (jobId) => {
  const state = demoStore.get();
  demoStore.set({ deletedJobIds: [...state.deletedJobIds, jobId] });
  return { success: true };
};

export const recordSessionJob = (example) => {
  const state = demoStore.get();
  const job = {
    job_id: `${example.id}-session-${state.sessionJobs.length + 1}`,
    example_id: example.id,
    created_at: new Date().toISOString(),
  };
  demoStore.set({ sessionJobs: [job, ...state.sessionJobs] });
  return job.job_id;
};

export const saveTextFile = (content, filename) => {
  const blob = new Blob([content], { type: "chemical/x-pdb" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
