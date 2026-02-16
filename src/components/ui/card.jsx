
import React from "react";

export function Card({ className = "", children }) {
  return <div className={`rounded-2xl ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
