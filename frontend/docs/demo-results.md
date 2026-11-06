# Pre-computed demo results

The static demo cannot run MATLAB. The files in `public/demo-results/` hold results saved
from real runs of the modelling code. The site shows them as **pre-computed** results.

Only final outputs go here: the final-model PDB and the summary numbers. The MATLAB code
itself is not included.

## Files

- `public/demo-results/manifest.json`: one entry per saved run (format below)
- `public/demo-results/<id>.pdb`: the final modelled structure for that run

## manifest.json format

```json
{
  "examples": [
    {
      "id": "1adg-A-290-301",
      "pdb_code": "1ADG",
      "chain": "A",
      "segment_start": 290,
      "segment_end": 301,
      "model_file": "1adg-A-290-301.pdb",
      "status": "completed",
      "created_at": "2025-08-14T10:12:00Z",
      "completed_at": "2025-08-14T10:12:26Z",
      "processing_time": 25.91,
      "parameters": {
        "n_iterations": 10000,
        "target_phi": [{ "residue": 291, "angle": -90 }],
        "target_psi": [{ "residue": 291, "angle": 122 }],
        "constrained_phi": [295, 296],
        "constrained_psi": [294, 295]
      },
      "results": {
        "n_models": 131,
        "final_distance": 0.0123,
        "n_iterations_used": 2215,
        "degrees_of_freedom": 18,
        "rmsd_initial": 1.234,
        "optimization_time": 25.91
      }
    }
  ]
}
```

The values above only show the format. Use the real numbers from each saved run.

- `id` must be unique. It is used as the job ID in the demo.
- `pdb_code`, `chain`, `segment_start` and `segment_end` decide which selection a run
  matches in the modelling page.
- `status` is optional. It defaults to `completed`. A run saved as `failed` can include
  `error_message` instead of `results` and `model_file`.
