import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  function handleShowAddFriend() {
    setShowAddFriendForm(!showAddFriendForm);
  }

  function handleSetSelectFriend(friend) {
    setSelectFriend(friend);
  }

  function handleSplitBill(balance) {
    console.log(balance);

    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + balance }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSetSelectFriend={handleSetSelectFriend}
        />

        {showAddFriendForm && <AddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriendForm ? `Close` : `Add Friend`}
        </Button>
      </div>

      {selectFriend && (
        <CalculateSplit friend={selectFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendList({ friends, onSetSelectFriend }) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <li>
            <img src={friend.image} alt={`${friend.name}`} />
            <h3 key={friend.id}>{friend.name}</h3>
            {friend.balance === 0 ? (
              <p>You and {friend.name} are even</p>
            ) : (
              <p className={friend.balance < 0 ? "red" : "green"}>
                {friend.balance < 0
                  ? `You owe ${friend.name} ₹${Math.abs(friend.balance)}`
                  : `${friend.name} owes you ₹${Math.abs(friend.balance)}`}
              </p>
            )}
            <Button onClick={() => onSetSelectFriend(friend)}>Select</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddFriend({ onAddFriend, showAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    console.log(e.target);
    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setImage("");
    setName("");
  }

  return (
    <div className="form">
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👯Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>📸Image URl</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function CalculateSplit({ friend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userShare, setUserShare] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const paidByFriend = bill ? bill - userShare : "";

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userShare) return;

    if (whoIsPaying === "friend") {
      onSplitBill(Number(userShare));
      console.log(userShare);
    }

    if (whoIsPaying === "user") {
      onSplitBill(Number(paidByFriend));
      console.log(paidByFriend);
    }

    setBill("");
    setUserShare("");
    setWhoIsPaying("User");
  }

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {friend.name}</h2>

      <label for="bill">💰 Bill value</label>
      <input
        type="text"
        id="bill"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label for="expense">🙋 Your Share</label>
      <input
        type="text"
        id="ownexpense"
        value={userShare}
        onChange={(e) =>
          setUserShare(e.target.value > bill ? userShare : e.target.value)
        }
      />

      <label for="expense">👯 {friend.name}'s expense</label>
      <input type="text" id="friendexpense" value={paidByFriend} disabled />

      <label> 😍 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  );
}
