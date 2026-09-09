import React, { useId } from "react";
import "./forms.css";

type FieldState = "default" | "error" | "success";

function Shell({ label, hint, state, htmlFor, children }: {
  label?: string; hint?: string; state: FieldState; htmlFor: string; children: React.ReactNode;
}) {
  return (
    <div className={`fui-field fui-field--${state}`}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {hint && <p className={`fui-field__msg ${state}`}>{hint}</p>}
    </div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export function TextField({ label, hint, state = "default", multiline, ...rest }: {
  label?: string; hint?: string; state?: FieldState; multiline?: boolean;
} & FieldProps) {
  const id = useId();
  const props = rest as React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  return (
    <Shell label={label} hint={hint} state={state} htmlFor={id}>
      {multiline
        ? <textarea id={id} rows={4} {...props} />
        : <input id={id} {...props} />}
    </Shell>
  );
}

export function SelectField({ label, options, hint, state = "default", ...rest }: {
  label?: string; options: string[]; hint?: string; state?: FieldState;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Shell label={label} hint={hint} state={state} htmlFor={id}>
      <select id={id} {...rest}>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </Shell>
  );
}

export function Switch({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label?: string;
}) {
  const id = useId();
  return (
    <span className="fui-switch">
      <input type="checkbox" id={id} checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={id} className="track" aria-hidden />
      {label && <label htmlFor={id} className="cap">{label}</label>}
    </span>
  );
}

export function Checkbox({ checked, onChange, label }: {
  checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode;
}) {
  const id = useId();
  return (
    <span className="fui-check">
      <input type="checkbox" id={id} checked={checked}
        onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}

export function RadioGroup({ name, options, value, onChange }: {
  name: string; options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <span style={{ display: "inline-flex", gap: 22 }}>
      {options.map((o) => (
        <span className="fui-check" key={o.value}>
          <input type="radio" id={`${name}-${o.value}`} name={name}
            checked={value === o.value} onChange={() => onChange(o.value)} />
          <label htmlFor={`${name}-${o.value}`}>{o.label}</label>
        </span>
      ))}
    </span>
  );
}

export function RangeField({ label, value, min = 0, max = 100, suffix = "", onChange }: {
  label?: string; value: number; min?: number; max?: number;
  suffix?: string; onChange: (v: number) => void;
}) {
  return (
    <span className="fui-range">
      {label && <span className="lbl">{label}</span>}
      <input type="range" min={min} max={max} value={value}
        aria-label={label} onChange={(e) => onChange(+e.target.value)} />
      <output>{value}{suffix}</output>
    </span>
  );
}
