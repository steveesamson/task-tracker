import { useState, useCallback, type ChangeEvent, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useToast } from "../../context/notification";
import Display from "../../views/display-when";
import Loader from "../../views/loader";
import { saveTask } from "./loader";
import { isEmpty } from "../../utils";
import type { Params, Task } from "../../types";
import { priorities, statuses } from "../../constants";

const TaskForm = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const { data, error = "" } = useLoaderData();
  const [formError, setError] = useState<string>(error);
  const [errors, setErrors] = useState<Params>({});
  const [params, setParams] = useState<Partial<Task>>({});
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    setParams(data);
  }, [data]);

  const onCancel = useCallback(
    () => {
      navigate(-1);
    },
    [navigate]
  );

  const onParams = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
      const { value } = e.target;
      setParams((oldVal: Partial<Task>) => ({ ...oldVal, [name]: value }));
    },
    []
  );

  const onSubmit = useCallback(async () => {
    let hasError = false;
    setErrors({});
    if (isEmpty(params.title)) {
      hasError = true;
      setErrors((prev: Params) => ({ ...prev, title: "Task title is required" }));
    }
    if (isEmpty(params.description)) {
      hasError = true;
      setErrors((prev: Params) => ({ ...prev, description: "Task description is required" }));
    }

    if (isEmpty(params.status)) {
      hasError = true;
      setErrors((prev: Params) => ({ ...prev, status: "Task status is required" }));
    }
    if (isEmpty(params.priority)) {
      hasError = true;
      setErrors((prev: Params) => ({ ...prev, priority: "Task priority is required" }));
    }

    if (!hasError) {
      setSaving(true);
      params.created_at = new Date().toISOString();
      const { error: saveError } = await saveTask(params);
      setSaving(false);
      if (saveError) {
        setError(saveError);
        return;
      }
      const message = `Task ${params.id ? "updated" : "added"} successfully.`;
      notify(message);
      navigate(-1);
    }
  },
    [navigate, params, notify]
  );

  return (
    <form className="content">
      <fieldset>
        <Display when={!!params?.id}>
          <legend>Edit Task</legend>
        </Display>
        <Display when={!params?.id}>
          <legend>New Task</legend>
        </Display>
        <Display when={!!formError}>
          <small className="error">{formError}</small>
        </Display>

        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={params?.title}
            onChange={(e) => onParams(e, "title")}
            className="input"
            placeholder="Enter task title"
          />
          <Display when={!!errors.title}>
            <small className="error">{errors.title}</small>
          </Display>
        </div>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={params?.description}
            onChange={(e) => onParams(e, "description")}
            className="input"
            placeholder="Enter task description"
          />
          <Display when={!!errors.description}>
            <small className="error">{errors.description}</small>
          </Display>
        </div>

        <section className="columns">
          <div className="form-field">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              className="input"
              value={params.status}
              onChange={(e) => onParams(e, "status")}
            >
              <option value="" disabled>
                Select status
              </option>
              {statuses.map((sta: string) => (
                <option key={sta} value={sta}>
                  {sta}
                </option>
              ))}
            </select>

            <Display when={!!errors.status}>
              <small className="error">{errors.status}</small>
            </Display>
          </div>
          <div className="form-field">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              className="input"
              value={params.priority}
              onChange={(e) => onParams(e, "priority")}
            >
              <option value="" disabled>
                Select priority
              </option>
              {priorities.map((pr: string) => (
                <option key={pr} value={pr}>
                  {pr}
                </option>
              ))}
            </select>
            <Display when={!!errors.priority}>
              <small className="error">{errors.priority}</small>
            </Display>
          </div>
        </section>

      </fieldset>
      <section className="card submit">
        <button type="button" className="primary" onClick={onSubmit}>
          Save
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          Cancel
        </button>
      </section>
      <Loader text="Saving task" open={saving} />
    </form>
  );
};

export default TaskForm;
