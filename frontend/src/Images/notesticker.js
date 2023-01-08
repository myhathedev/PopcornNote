import React from "react";
import gsap from "gsap";
import { useRef, useLayoutEffect} from "react";


function Icon() {
  const allref = useRef(null);
  const textref = useRef(null);
  


  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.timeScale(3);
      tl.from("#text1",{duration:2, scaleX:0})
      .from("#text2",{duration:2, scaleX:0})
      .from("#text3",{duration:2, scaleX:0})
      .from("#text4",{duration:2, scaleX:0})
      .from("#text5",{duration:2, scaleX:0});}
      ,allref);
      return () => ctx.revert();
    } ,[]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="300px"
      fill="none"
      viewBox="0 0 447 552"
    >
      <g id="NoteSticker">
        <g id="Group 1">
          <rect
            id="Rectangle 1"
            width="366"
            height="453"
            x="44"
            y="49"
            fill="#FFCE69"
            rx="41"
          ></rect>
          <g id="Mask group">
            <mask
              id="mask0_7_55"
              style={{ maskType: "alpha" }}
              width="366"
              height="453"
              x="44"
              y="49"
              maskUnits="userSpaceOnUse"
            >
              <rect
                id="Rectangle 5"
                width="351"
                height="438"
                x="51.5"
                y="56.5"
                fill="#F9F5F3"
                stroke="#000"
                strokeWidth="15"
                rx="33.5"
              ></rect>
            </mask>
            <g mask="url(#mask0_7_55)">
              <path
                id="Rectangle 6"
                fill="#F9F5F3"
                d="M44 145H410V500H44z"
              ></path>
            </g>
          </g>
          <path
            id="Subtract"
            fill="#BA7B56"
            fillOpacity="0.4"
            fillRule="evenodd"
            d="M352.223 492h16.285c22.644 0 41-18.356 41-41V100c0-22.644-18.356-41-41-41h-25.127c22.644 0 41 18.356 41 41v351.956c0 19.608-13.764 36.001-32.158 40.044z"
            clipRule="evenodd"
          ></path>
          <rect
            id="Rectangle 5_2"
            width="351"
            height="438"
            x="51.5"
            y="56.5"
            stroke="#000"
            strokeWidth="15"
            rx="33.5"
          ></rect>
        </g>
        <g ref={allref}>
          <g id="text1" ref={textref} strokeLinecap="round" strokeWidth="15">
            <path
              id="Line 7"
              stroke="#EBBFA9"
              strokeOpacity="0.68"
              d="M104.5 194.5L280.5 194.5"
            ></path>
            <path id="Line 2" stroke="#000" d="M97.5 188.5L273.5 188.5"></path>
          </g>
          <g id="text2" ref={textref} strokeLinecap="round" strokeWidth="15">
            <path
              id="Line 8" 
              stroke="#EBBFA9"
              strokeOpacity="0.68"
              d="M104.5 245.5L359.5 245.5"
            ></path>
            <path id="Line 3"stroke="#000" d="M97.5 238.5L353.5 238.5"></path>
          </g>

          <g id="text3" ref={textref} strokeLinecap="round" strokeWidth="15">
            <path
              id="Line 9"
              stroke="#EBBFA9"
              strokeOpacity="0.68"
              d="M104.5 297.5L359.5 297.5"
            ></path>
            <path id="Line 4" stroke="#000" d="M97.5 291.5L353.5 291.5"></path>
          </g>

          <g id="text4" ref={textref} strokeLinecap="round" strokeWidth="15">
            <path
              id="Line 10"
              stroke="#EBBFA9"
              strokeOpacity="0.68"
              d="M104.5 351.5L359.5 351.5"
            ></path>
            <path id="Line 5" stroke="#000" d="M97.5 344.5L353.5 344.5"></path>
          </g>
          <g id="text5" ref={textref} strokeLinecap="round" strokeWidth="15">
            <path
              id="Line 11"
              stroke="#EBBFA9"
              strokeOpacity="0.68"
              d="M208.5 401.5L359.5 401.5"
            ></path>
            <path id="Line 6" stroke="#000" d="M202.5 394.5L353.5 394.5"></path>
          </g>
          </g>
        <path
          id="Line 1"
          stroke="#000"
          strokeWidth="15"
          d="M52 137.5L403 137.5"
        ></path>
        <g id="Group 2" fill="#ABC4D6" stroke="#000" strokeWidth="15">
          <rect
            id="Rectangle 2"
            width="37"
            height="66"
            x="121.5"
            y="21.5"
            rx="18.5"
          ></rect>
          <rect
            id="Rectangle 3"
            width="37"
            height="66"
            x="208.5"
            y="21.5"
            rx="18.5"
          ></rect>
          <rect
            id="Rectangle 4"
            width="37"
            height="66"
            x="295.5"
            y="21.5"
            rx="18.5"
          ></rect>
        </g>
      </g>
    </svg>
  );
}

export default Icon;
