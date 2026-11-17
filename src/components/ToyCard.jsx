import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  // Handle clicking the like button
  function handleLikeClick() {
    onUpdateToy({ ...toy, likes: likes + 1 });
  }

  // Handle clicking the donate button
  function handleDeleteClick() {
    onDeleteToy(id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;