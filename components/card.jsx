import { useState } from "react";
import style from "../components/card.module.css";
import initialPosts from "../components/posts";

const initialPostsData = {
  title: '',
  image: '',
  content: '',
  tags: '',
  published: true,
};

export default function Card() {
  const [posts, setPosts] = useState(initialPosts);
  const [formData, setFormData] = useState(initialPostsData);

  const publishedPosts = posts.filter((post) => post.published);

  function handleFormData(e) {
    const key = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const newFormData = {
      ...formData,
      [key]: value,
    };
    setFormData(newFormData);
  }

  function addPost(e) {
    e.preventDefault();

    const newTitle = formData.title.trim();
    const newTags = formData.tags.trim().toLocaleUpperCase().split("-");

    if (newTitle === '' || newTags.length === 0) return;

    const addedPost = {
      id: Date.now(),
      title: newTitle,
      image: formData.image || "https://picsum.photos/200/300?grayscale",
      content: formData.content || "Contenuto non disponibile.",
      tags: newTags,
      published: formData.published,
    };

    setPosts([...posts, addedPost]);
    setFormData(initialPostsData);
  }

  function deletePost(id) {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  }

  return (
    <main className={style.background}>
      {/* FORM */}
      <div className={style.formContainer}>
        <form onSubmit={addPost}>
          {/* TITOLO */}
          <div>
            <label htmlFor="title">Titolo</label>
            <input
              id="title"
              name="title"
              onChange={handleFormData}
              value={formData.title}
              type="text"
              placeholder="Titolo del post"
            />
          </div>
          {/* CONTENUTO */}
      
          <input type="submit" value="Aggiungi" className={style.submitButton} />
        </form>
      </div>

      {/* CARD */}
      <div className={style.container}>
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post) => (
            <div key={post.id} className={style.cardbody}>
              <img src={post.image || "/path-to-default-image.jpg"} alt={post.title || "Post"} />
              <h3>{post.title}</h3>
              <h5 style={{ color: post.tags.includes("HTML") ? "red" : "blue" }}>
                Tag: {post.tags.join(", ")}
              </h5>
              <p>Contenuto: {post.content}</p>
              <div>
                <button
                  className={style.submitButton}
                  onClick={() => deletePost(post.id)}
                >
                  Elimina Post
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun post pubblicato.</p>
        )}
      </div>
    </main>
  );
}
