import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu(props) {
  const numPizza = pizzaData.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {numPizza > 0 ? (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>We are working on our menu, please come back later</p>
      )}

      {/* <ul>
                {pizzaData.map((pizza) => (
                <Pizza
                    name={pizza.name}
                    ingredients={pizza.ingredients}
                    photoName={pizza.photoName}
                    price={pizza.price}
                />
                ))}
            </ul> */}

      {/* <Pizza
                name="Pizza Margherita"
                ingredients="Tomato and mozarella"
                photoName="pizzas/margherita.jpg"
                price={10}
            />

            <Pizza
                name="Pizza Funghi"
                ingredients="Tomato and mushrooms"
                photoName="pizzas/funghi.jpg"
                price={12}
            /> */}
    </main>
  );
}

function Pizza(props) {
  return (
    <li className={`pizza ${props.pizzaObj.soldOut ? "sold-out" : " "}`}>
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
      </div>
      <span>{props.pizzaObj.soldOut ? "SOLD OUT" : props.pizzaObj.price}</span>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order />
      ) : (
        <Closed openHour={openHour} closeHour={closeHour} />
      )}
    </footer>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We are accepting orders.</p>
    </div>
  );
}

function Closed({ openHour, closeHour }) {
  return (
    <div>
      <p>
        We are currently not taking orders. Please visit us between {openHour}
        :00 and {closeHour}:00
      </p>
    </div>
  );
}

//React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
