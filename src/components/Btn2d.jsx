import React from "react";
export function Btn2d({ content1, content2 }) {
  return (
    <button className="btn-2d">
      <span className="btn-2d__visible">{content1}</span>
      <span className="btn-2d__invisible">{content2}</span>
    </button>
  );
}
