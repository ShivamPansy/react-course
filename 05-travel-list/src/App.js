import "./index.css";
import { useState } from "react";
import PackagingList from "./PackagingList";
import Form from "./Form";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((items) => [newItem, ...items]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => id !== item.id));
  }

  function handlePackedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleResetItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all apps?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <h1>🏝️Far Away✈️</h1>
      <Form onHandleAddItems={handleAddItems} />
      <PackagingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedItem={handlePackedItem}
        onResetItems={handleResetItems}
      />
      <Stats items={items} />
    </div>
  );
}
