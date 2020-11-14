import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { memes } from "../src/test.json";

describe("renders learn react link", () => {
  it("Muestra varios memes, en el mismo orden que el de las variables que se reciben", async () => {
    render(<App />);

    for (let i = 0; i < memes.length; i++) {
      let meme = await screen.findByRole("img", { name: memes[i].title });
      expect(meme).toHaveAttribute("alt", memes[i].title);
      expect(meme).toHaveAttribute("src", memes[i].url);
    }
  });
});
