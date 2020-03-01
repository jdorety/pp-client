import * as React from "react";

function SvgArrowLeftShort(props) {
  return (
    <svg
      className="arrow-left-short_svg__bi arrow-left-short_svg__bi-arrow-left-short"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M9.854 6.646a.5.5 0 010 .708L7.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M6.5 10a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H7a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default SvgArrowLeftShort;
