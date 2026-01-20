// ---------------- Backend Integrated Logic With Celery Queue ----------------

const API_BASE = "http://localhost:8000";

const [isRunning, setIsRunning] = useState(false);
const [taskId, setTaskId] = useState<string | null>(null);
const [progress, setProgress] = useState<number>(0);
const [runResult, setRunResult] = useState<any | null>(null);
const [showResult, setShowResult] = useState(false);

// POLLING INTERVAL
const POLL_INTERVAL = 1500;

// ---------------- Start Benchmark + Receive Celery Task ID ----------------
async function handleRunBenchmark() {
  setIsRunning(true);
  setProgress(0);
  setRunResult(null);
  setTaskId(null);

  try {
    const res = await fetch(`${API_BASE}/benchmark/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataset_id: datasetId }),
    });

    const data = await res.json();
    setTaskId(data.task_id);

    pollTaskStatus(data.task_id);
  } catch (err) {
    alert("Failed to start benchmark.");
    setIsRunning(false);
  }
}

// ---------------- POLL CELERY TASK STATUS ----------------
async function pollTaskStatus(taskId: string) {
  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${API_BASE}/benchmark/status/${taskId}`);
      const data = await res.json();

      setProgress(data.progress ?? 0);

      // DONE
      if (data.state === "SUCCESS") {
        clearInterval(interval);
        setRunResult(data.result);
        setShowResult(true);
        setIsRunning(false);
      }

      // ERROR
      if (data.state === "FAILURE") {
        clearInterval(interval);
        alert("Benchmark failed.");
        setIsRunning(false);
      }
    } catch (err) {
      clearInterval(interval);
      setIsRunning(false);
    }
  }, POLL_INTERVAL);
}
