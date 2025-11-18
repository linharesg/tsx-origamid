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
  const produtos = useFetch<Produto[]>("https://data.origamid.dev/produtos/");

  return (
    <div>
      <Input label="Nome" id="name" type=""></Input>
    </div>
  );
}

export default App;
