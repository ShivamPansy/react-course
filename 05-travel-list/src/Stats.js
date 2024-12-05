export default function Stats({ items }) {
  const numItems = items.length;
  const numPackedItem = items.filter((item) => item.packed).length;
  console.log(numPackedItem, numItems);
  const percentage = Math.round((numPackedItem / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You are good to go✈️`
          : `💼 You have ${numItems} items in your list and you have already packed${" "}
          ${numItems === 0 ? 0 : percentage}% items`}
      </em>
    </footer>
  );
}
