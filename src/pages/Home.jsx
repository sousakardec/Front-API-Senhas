import Menu from "../componentes/Menu";

function Home() {
  fetch("https://cdn.apicep.com/file/apicep/06233-030.json")
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <div>
      <h1>Home</h1>

      <Menu />
    </div>
  );
}

export default Home;
