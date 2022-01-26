import React, {
  createRef,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import useResizeAware from "react-resize-aware";

const ImageDropper = ({ imagePreview }) => {
  const initialMousePosition = { x: 0, y: 0 };
  const initialSvgHeight = { height: 0, width: 0 };
  const width = 300;
  const height = 300;

  const divRef = createRef();

  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const [outerHeight, setOuterHeight] = useState(initialSvgHeight);
  const componentRef = useRef(initialSvgHeight);
  const svgRef = useRef();
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { devicePixelRatio } = window;
  const publicImageUrl = "https://picsum.photos/id/1005/640/640";
  const [first, setfirst] = useState(null);

  const [resizeListener, sizes] = useResizeAware();

  const SVG = ({ imageSrc, ...props }) => (
    <svg
      focusable={false}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      imageRendering="optimizeQuality"
      {...props}
    >
      <image x="0" y="0" width="100%" height="100%" xlinkHref={imageSrc} />
    </svg>
  );

  useEffect(() => {
    const { width, height } = sizes;

    setOuterHeight({
      height,
      width,
    });
  }, [sizes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    console.log(outerHeight);

    const { width, height } = outerHeight;

    canvas.width = width;
    canvas.height = height;
    // canvas.style.width = `${width}px`;
    // canvas.style.height = `${height}px`;

    const fetchImage = async () => {
      const res = await fetch(imagePreview);
      const blob = await res.blob();

      const blobSrc = await blob2base64(blob);

      console.log(blob);

      await loadImage(blobSrc);

      const svg = <SVG imageSrc={blobSrc} width={width} height={height} />;
      const staticMarkup = renderToStaticMarkup(svg);
      const encodedSvgMarkup = encodeURIComponent(staticMarkup);
      const imageSrc = `data:image/svg+xml,${encodedSvgMarkup}`;
      const img = new Image();

      await loadImage(imageSrc, img);

      setImageUrl(imageSrc);

      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    fetchImage();
  }, [outerHeight.width]);

  const loadImage = (src, img = new Image()) =>
    new Promise((resolve) => {
      img.addEventListener("load", resolve, false);

      img.src = src;
    });

  const blob2base64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.readAsDataURL(blob);
    });

  const handleMouseMove = ({
    pageX,
    pageY,
    target: { offsetLeft, offsetTop },
  }) => {
    const context = canvasRef.current.getContext("2d");
    const x = (pageX - offsetLeft) * devicePixelRatio;
    const y = (pageY - offsetTop) * devicePixelRatio;
    const { data } = context.getImageData(x, y, 1, 1);
    const color = `rgba(${data.join(",")})`;

    document.body.style.backgroundColor = color;
  };

  return (
    <Fragment>
      <canvas
        ref={canvasRef}
        style={{ cursor: "crosshair" }}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
      />
      <div className="outer_image_dropper" ref={divRef}>
        {resizeListener}
        <img src={imagePreview} ref={divRef} />
      </div>
    </Fragment>
  );
  // <div
  //   className="image_preview"
  //   ref={componentRef}
  //   onMouseMove={handleMouseMove}
  // >
  //   <svg
  //     height={svgHeight.clientHeight}
  //     width={svgHeight.clientWidth}
  //     ref={svgRef}
  //   >
  //     <circle cx={mousePosition.x} cy={mousePosition.y} r={30} />
  //   </svg>
  //   <img src={imagePreview} />
  //   <canvas
  //     ref={svgRef}
  //     style={{ cursor: "crosshair" }}
  //     height={svgHeight.clientHeight}
  //     width={svgHeight.clientWidth}
  //   />
  // </div>
};

export default ImageDropper;

// const handleMouseMove = useCallback(
//     (event) => {
//       const { clientX, clientY, height, clientWidth } = event;

//       var bounds = event.currentTarget.getBoundingClientRect();

//       const context = svgRef.current.getContext("2d");

//       const x = clientX - bounds.left;
//       const y = clientY - bounds.top;

//       const { data } = context.getImageData(x, y, 1, 1);
//       console.log(data);
//       const color = `rgba(${data.join(",")})`;

//       console.log(color);

//       setMousePosition({ x: clientX - bounds.left, y: clientY - bounds.top });
//       setSvgHeight({
//         clientHeight: componentRef.current.offsetHeight,
//         clientWidth: componentRef.current.offsetWidth,
//       });
//     },
//     [setMousePosition]
//   );
