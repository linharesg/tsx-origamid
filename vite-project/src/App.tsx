import React from "react";
import useFetch from "./Hooks/useFetch";
import Input from "./Input";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  internacional: boolean;
};

function App() {
  const [id, setId] = React.useState("P001");
  const produtos = useFetch<Produto[]>("https://data.origamid.dev/produtos/");
  const produto = useFetch<Produto>(`https://data.origamid.dev/produtos/${id}`);
  return (
    <>
      <section className="flex">
        {produtos.data &&
          produtos.data.map((produto) => (
            <button
              onClick={() => setId(produto.id)}
              style={{ fontSize: "1rem" }}
              key={produto.id}
            >
              {produto.id}
            </button>
          ))}
      </section>
      <div>
        {produto.data && (
          <ul>
            <li>id: {produto.data.id}</li>
            <li>nome: {produto.data.nome}</li>
            <li>quantidade: {produto.data.quantidade}</li>
          </ul>
        )}
      </div>
      <div>
        <Input label="Nome" id="name" type=""></Input>
      </div>
    </>
  );
}

export default App;
