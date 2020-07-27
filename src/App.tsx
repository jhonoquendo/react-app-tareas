import React, { Fragment, useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITareas {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTarea, setNewTarea] = useState<string>("");
  const [tareas, setTareas] = useState<ITareas[]>([]);
  const tareaInput = useRef<HTMLInputElement>(null);

  const HandleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTarea(newTarea);
    tareaInput.current?.focus();
    setNewTarea("");
  };

  const addTarea = (name: string) => {
    const newTareas: ITareas[] = [...tareas, { name, done: false }];
    setTareas(newTareas);
  };

  const toggleDoneTarea =  (i:number) =>{
    const newTareas:ITareas[] = [...tareas]
    newTareas[i].done = !newTareas[i].done;
    setTareas(newTareas);
  }

  const removeTarea = (i:number): void => {
    console.log(i);
    const newTareas: ITareas[] = [...tareas];
    newTareas.splice(i,1);
    setTareas(newTareas);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={HandleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setNewTarea(e.target.value)}
                  value={newTarea}
                  autoFocus
                  ref = {tareaInput}
                />
                <button className="btn btn-success btn-block">Guardar</button>
              </form>
            </div>
          </div>
          {tareas.map((t: ITareas, i: number) => {
            return <div className="card card-body mt-2" key={i}>
              <h2 style={{textDecoration: t.done ? 'line-through' : ''}}>{t.name}</h2>
              <div>
                <button className="btn btn-secondary" onClick={() => toggleDoneTarea(i)}>
                  {t.done ? '✗' : '✓'}
                </button>
                <button className="btn btn-danger" onClick={() => removeTarea(i)}>
                  🗑️
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
