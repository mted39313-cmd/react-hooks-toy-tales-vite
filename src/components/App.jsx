import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys on initial component mount (GET request)
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  // Toggle the visibility of the new toy form
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Create a new toy on form submission (POST request)
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0, // Initialize new toy likes to 0
      }),
    })
      .then((res) => res.json())
      .then((savedToy) => {
        setToys([...toys, savedToy]);
      })
      .catch((error) => console.error("Error adding toy:", error));
  }

  // Remove a toy from the database and state (DELETE request)
  function handleDeleteToy(idToDelete) {
    fetch(`http://localhost:3001/toys/${idToDelete}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys(toys.filter((toy) => toy.id !== idToDelete));
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  // Increase a toy's likes count (PATCH request)
  function handleUpdateToy(updatedToy) {
    fetch(`http://localhost:3001/toys/${updatedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: updatedToy.likes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToys(toys.map((toy) => (toy.id === data.id ? data : toy)));
      })
      .catch((error) => console.error("Error updating likes:", error));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="button-container">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;