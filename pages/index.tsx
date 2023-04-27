import Head from "next/head";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ColorizeIcon from "@mui/icons-material/Colorize";
import classes from "../styles/wrappers.module.css";

export default function Home() {
  const [color, setColor] = useState("");
  const [rgb, setRgb] = useState([]);
  const [userImage, setUserImage] = useState(
    "/../public/monkey-head-nebula.jpg"
  );

  async function fetchColorHandler(r, g, b) {
    const response = await fetch(`http://127.0.0.1:5000/color/${r}/${g}/${b}`);
    const data = await response.json();
    const retrievedColor = data.color_name;
    setColor(retrievedColor);
    setRgb([r, g, b]);
  }

  const colorPickerHandler = () => {
    const colorResult = document.getElementById("colorResult");
    const hexResult = document.getElementById("hexResult");
    const rgbResult = document.getElementById("rgbResult");

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5), 16);
      fetchColorHandler(r, g, b);
    };

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then((result) => {
        hexResult.textContent = `HEX: ${result.sRGBHex}`;
        rgbResult.textContent = `RGB (${rgb})`;
        colorResult.style.backgroundColor = result.sRGBHex;
        hexToRgb(result.sRGBHex);
      })
      .catch((e) => {
        colorResult.textContent = e;
      });
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setUserImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <Head>
        <title>The Handiest Color Picker</title>
        <meta
          name="description"
          content="Tool for getting color values from images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="centered">
        <div className="tower padded roundedTile">
          <nav className={classes.imageControlWrapper}>
            <label
              className={`${classes.imageInput} ${classes.blue}`}
              htmlFor="imageInput"
            >
              <AddPhotoAlternateIcon />

              <input
                hidden
                id="imageInput"
                onChange={onImageChange}
                type="file"
              />
            </label>
            <div className={`${classes.buttonWrapper} ${classes.green}`}>
              <ColorizeIcon id="colorPicker" onClick={colorPickerHandler} />
            </div>
          </nav>
          <div className={classes.imageWrapper}>
            <img
              alt="An image for color picking"
              className={classes.targetImage}
              id="targetImage"
              src={userImage}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="tower padded roundedTile">
          <h1 className={classes.title}>
            {color
              ? `The color you chose is called ${color}`
              : "Use the color picker to find the name of your color!"}
          </h1>
          <h3 id="hexResult" className={classes.textResult} />
          <h3 id="rgbResult" className={classes.textResult} />
          <span id="colorResult" className={classes.colorResult} />
        </div>
      </div>
    </>
  );
}
