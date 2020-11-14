import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 35 35"
    className={className}
  >
    <g fillRule="evenodd" clipRule="evenodd">
      <path style={{ fill: "#00ff99" }} d="M0 3h4v29H0z"></path>
      <path style={{ fill: "#9933ff" }} d="M24 11h4v21h-4z"></path>
      <path style={{ fill: "#00ccff" }} d="M0 31h28v4H0z"></path>
      <path style={{ fill: "#fff35c" }} d="M0 0h16v4H0z"></path>
      <path style={{ fill: "#ff6666" }} d="M24 8V4h-4V0h-4v12h12V8"></path>
      <path
        style={{ fill: "#000", opacity: ".4" }}
        d="M24 16v-4h4M16 0v4h-4"
      ></path>
    </g>
  </svg>
);
