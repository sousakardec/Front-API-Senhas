function Titulo({ texto, cor }) {
  let nome = "allan";
  return (
    <div>
      <h1 style={{ color: cor }}>Sou {nome}</h1>
      <p>{texto}</p>
    </div>
  );
}

export default Titulo;
