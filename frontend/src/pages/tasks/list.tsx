import { useCallback, useEffect, useState, type FC, type ReactNode } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import TaskRow from "./row";
import useSession from "../../hooks/useSession";
import { useToast } from "../../context/notification";
import Prompt from "../../views/prompt";
import { deleteTask, saveTask } from "./loader";
import type { Task } from "../../types";
import Filter from "./filter";
import Display from "../../views/display-when";
import "./list.css"

const Tasks: FC = (): ReactNode => {
  const navigate = useNavigate();
  const { inSession } = useSession();
  const { data } = useLoaderData();
  const [tasks, setTasks] = useState<Task[]>([]);

  const { notify } = useToast();

  // Track completion
  const [toComplete, setToComplete] = useState<Task>();
  // Track deletion
  const [toDelete, setToDelete] = useState<Task>();

  const onAdd = useCallback(() => {
    navigate("/addtask");
  }, [navigate]);

  // Handle delete
  const onDelete = useCallback(async () => {
    const { id } = toDelete!;
    const { error } = await deleteTask(id!);
    if (!error) {
      setTasks((prev: Task[]) => prev.filter((p: Task) => p.id !== id));
      setToDelete(undefined);
      notify("Task deleted successully.");
    }

  }, [toDelete, notify]);

  // Handle delete
  const onComplete = useCallback(async () => {

    const { error, data } = await saveTask({ ...toComplete, status: 'done', completed_at: new Date().toISOString() });

    if (!error && data) {
      setTasks((prev: Task[]) => prev.map((p: Task) => {
        if (p.id == data.id) {
          return data;
        }
        return p;
      }));
      setToComplete(undefined);
      notify("Task completed successully.");
    }
  }, [toComplete, notify]);

  useEffect(() => {
    if (!inSession) {
      navigate("/login");
      return;
    }
  }, [inSession, navigate]);

  useEffect(() => {
    setTasks(data);
  }, [data]);


  return (
    <fieldset>
      <table>
        <thead>
          <tr>
            <th className="row header">
              <span className="title">Tasks</span>
              <button type="button" className="primary" onClick={onAdd}>
                Add Task
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <Filter />
          <Display when={tasks.length > 0}>
            {tasks.map((p) => (
              <TaskRow
                key={p.id}
                task={p}
                onRemove={() => setToDelete(p)}
                onComplete={() => setToComplete(p)}
              />
            ))}
          </Display>
          <Display when={tasks.length === 0}>
            <tr>
              <td>
                There are no tasks to display
              </td>
            </tr>
          </Display>
        </tbody>
      </table>
      <Prompt
        title="Confirm Delete"
        text="Are you sure you want to delete this task?"
        open={!!toDelete}
        onYes={onDelete}
        onNo={() => setToDelete(undefined)}
      />
      <Prompt
        title="Confirm Complete"
        text="Are you sure you want to complete this task?"
        open={!!toComplete}
        onYes={onComplete}
        onNo={() => setToComplete(undefined)}
      />
    </fieldset>
  );
};

export default Tasks;
