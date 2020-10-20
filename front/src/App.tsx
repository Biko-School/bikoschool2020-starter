import React from "react";
import { RecentMemesData, getRecentMemes } from "./services/meme-service";

function App() {
  const [recentMemes, setRecentMemes] = React.useState<RecentMemesData>();

  React.useEffect(() => {
    getRecentMemes().then(setRecentMemes, (err) => {
      console.log("error al obtener el listado de memes" + err);
    });
  }, []);

  if (!recentMemes) {
    return null;
  }
  const listMemes = recentMemes?.memes.map((meme) => {
    return (
      <li>
        <img key={meme.id} alt={meme.title} src={meme.url} />
      </li>
    );
  });
  return <ul>{listMemes}</ul>;
}

export default App;
