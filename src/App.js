import { useState } from "react";
import styles from "./app.module.css";

export const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const validate = (val) => val.length >= 3;

  const onInputButtonClick = () => {
    const promptValue = prompt("Введите значение");
    if (promptValue !== null) {
      if (validate(promptValue)) {
        setError("");
        setValue(promptValue);
      } else {
        setError("Введенное значение должно содержать минимум 3 символа");
      }
    }
  };

  const onAddButtonClick = () => {
    if (validate(value)) {
      const updatedList = [...list, { id: Date.now(), value }];
      setList(updatedList);
      setValue("");
      setError("");
    }
  };

  const isValueVaild = validate(value);
  return (
    <div className={styles.app}>
      <h1 className={styles.pageHeading}>Ввод значения</h1>
      <p className={styles.noMarginText}>
        Текущее значение <code>value</code>: "
        <output className={styles.currentValue}>{value}</output>"
      </p>
      {error !== "" && <div className={styles.error}>{error}</div>}
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={onInputButtonClick}>
          Ввести новое
        </button>

        <button
          className={styles.button}
          disabled={!isValueVaild}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles.listContainer}>
        <h2 className={styles.listHeading}>Список:</h2>
        {list.length > 0 ? (
          <ul className={styles.list}>
            {list.map((item) => (
              <li className={styles.listItem} key={item.id}>
                {item.value}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noMarginText}>Нет добавленных элементов</p>
        )}
      </div>
    </div>
  );
};
