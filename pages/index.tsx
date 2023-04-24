import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [color, setColor] = useState("");

  async function fetchColorHandler(r, g, b) {
    const response = await fetch(`http://127.0.0.1:5000/color/${r}/${g}/${b}`);
    const data = await response.json();
    const retrievedColor = data.color_name;
    console.log("retrieved color: ", retrievedColor);
    setColor(retrievedColor);
  }

  const colorPickerHandler = () => {
    const resultElement = document.getElementById("result");

    const hexToRgb = (hex) => {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5), 16);
      fetchColorHandler(r, g, b);
    };

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then((result) => {
        resultElement.textContent = result.sRGBHex;
        resultElement.style.backgroundColor = result.sRGBHex;
        hexToRgb(result.sRGBHex);
        console.log(result.sRGBHex);
      })
      .catch((e) => {
        resultElement.textContent = e;
      });
  };

  return (
    <>
      <Head>
        <title>The Handiest Color Picker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt="a neboola"
        id="targetImage"
        src="/../public/assets/monkey-head-nebula.jpg"
        height={500}
        width={500}
      />
      <h1>{color}</h1>
      <button id="start-button" onClick={colorPickerHandler}>
        start
      </button>
      <span id="result"></span>
    </>
  );
}
