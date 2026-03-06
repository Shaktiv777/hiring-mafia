
import React from "react";

export function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 transition-all ${className}`}
    >
      {children}
    </button>
  );
}
