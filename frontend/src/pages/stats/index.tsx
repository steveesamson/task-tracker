import { useLoaderData } from "react-router-dom";
import "./stats.css";
import Display from "../../views/display-when";
import type { StatData } from "../../types";
import { useMemo } from "react";
import PieChart from "../../views/pie-chart";
import BarChart from "../../views/bar-chart";

const Stats = () => {
  // const navigate = useNavigate();
  const { data, error } = useLoaderData<{ data?: StatData; error?: string; }>();

  const pieData = useMemo(() => {
    if (data) {
      console.log({ data })
      const labels = ['todo', 'in-progress', 'done'];
      const dta = [data.todo_tasks, data.progress_tasks, data.completed_tasks];
      return { labels, data: dta, title: 'Task by Status' };
    }
    return null;
  }, [data])
  const barData = useMemo(() => {
    if (data) {

      const labels = ['low', 'medium', 'high'];
      const dta = [data.low_tasks, data.medium_tasks, data.high_tasks];
      return { labels, data: dta, title: 'Task by Priority' };
    }
    return null;
  }, [data])

  return (
    <section>
      <Display when={!!error}>
        <small className="error">{error}</small>
      </Display>
      {data && (<><article className="grid">
        <div className="card">
          <h3>Todo</h3>
          <p>{data.todo_tasks} tasks</p>
        </div>
        <div className="card">
          <h3>In Progress</h3>
          <p>{data.progress_tasks} tasks</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p>{data.completed_tasks} tasks</p>
        </div>

        <div className="card priority">
          <h3>Low Priority</h3>
          <p>{data.low_tasks} tasks</p>
        </div>
        <div className="card priority">
          <h3>Medium Priority</h3>
          <p>{data.medium_tasks} tasks</p>
        </div>
        <div className="card priority">
          <h3>High Priority</h3>
          <p>{data.high_tasks} tasks</p>
        </div>

        <div className="card alt">
          <h3>Active</h3>
          <p>{data.pending_tasks} tasks</p>
        </div>
        <div className="card alt">
          <h3>Average Completion Time</h3>
          <p>{(parseFloat(data.average_time_seconds + '') / 60).toFixed(2)} minutes</p>
        </div>
        <div className="card alt">
          <h3>Total</h3>
          <p>{data?.total_tasks} tasks</p>
        </div>
      </article>
        <article className="grid charts">
          <PieChart chartData={pieData!} />
          <BarChart chartData={barData!} />
        </article>
      </>
      )}


    </section>
  );
};

export default Stats;
