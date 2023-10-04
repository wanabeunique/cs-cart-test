import "./App.sass";
import Form from "./Pages/Form/Form";

export interface IItem {
  id: number;
  name: string;
  price: number;
}

const items: Array<IItem> = [
  {
    id: 1,
    name: '6.7" Смартфон Apple iPhone 15 Pro Max 1024 ГБ серый',
    price: 1000,
  },
  {
    id: 2,
    name: "Водонагреватель электрический Oasis KP-P",
    price: 100,
  },
  {
    id: 3,
    name: "Клавиатура проводная Dark Project KD87A",
    price: 500,
  },
];

function App() {
  return (
    <>
      <Form items={items} />
    </>
  );
}

export default App;
