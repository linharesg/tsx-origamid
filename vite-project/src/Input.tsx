import React from "react";

type Input = React.ComponentProps<"input"> & {
  label: string;
  id: string;
};

const Input = ({ label, id, ...props }: Input) => {
  const [value, setValue] = React.useState("");

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={id}>{label}</label>
      <input
        name={id}
        id={id}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        {...props}
        type="text"
      />
    </div>
  );
};

export default Input;
