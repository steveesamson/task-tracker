import type { FC } from "react";
import { NavLink } from "react-router-dom";
import type { Task } from "../../types";
import Icons from "../../views/icons";
import Display from "../../views/display-when";
import { format } from 'date-fns';
import "./row.css"

type TaskRowProps = {
  task: Task;
  onRemove: () => void;
  onComplete: () => void;
}


const ProductRow: FC<TaskRowProps> = ({ task, onRemove, onComplete }) => {

  return (
    <tr>
      <td className="card">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="row">
          <p><strong>Status:</strong><span className={`status ${task.status}`}>{task.status}</span></p>
          <p><strong>Priority:</strong><span>{task.priority}</span></p>
        </div>
        <div className="row">
          <p><strong>Created:</strong><span>{format(task.created_at!, "h:mm aa, MMM. d, yyyy.")}</span></p>
          <p><strong>Completed:</strong><span>{task.completed_at ? format(task.completed_at!, "h:mm aa, MMM. d, yyyy.") : 'Not yet.'}</span></p>
        </div>

        <section className="buttons cell">
          <Display when={task.status === 'todo'}>
            <NavLink to={`/edittask/${task.id}`} className="button">
              <Icons type='pen' />

              <span>
                Edit
              </span>
            </NavLink>
          </Display>

          <button className="button delete" type='button' onClick={onRemove}>
            <Icons type='bin' />
            <span>
              Delete
            </span>
          </button>
          <Display when={task.status !== 'done'}>
            <button className="button complete" type='button' onClick={onComplete}>
              <Icons type='check' />
              <span>
                Complete
              </span>
            </button>
          </Display>

        </section>
      </td>
    </tr>
  );
};

export default ProductRow;
