import { useState } from "react";
import style from "../components/card.module.css";
import initialPosts from "../components/posts";

const initialPostsData = {
  title: "",
  image: "",
  content: "",
  // tags: "",
  published: false,
  categories: ""
};

export default function Card() {
  const [posts, setPosts] = useState(initialPosts);
  const [formData, setFormData] = useState(initialPostsData);

  const publishedPosts = posts.filter((post) => post.published);

  function handleFormData(e) {
    const key = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

      const newFormData = {
      ...formData,
      [key]: value,
    };

    console.log(newFormData)

    setFormData(newFormData);
  }

  function addPost(e) {
    e.preventDefault();

    const newTitle = formData.title.trim();
    // const newTags = formData.tags.trim();

    console.log("BEFORE TRIM")

    //if (newTitle === "" || newTags.length === 0) return;

    console.log("AFTER TRIM")

    const addedPost = {
      id: Date.now(),
      title: newTitle,
      image: formData.image || "https://picsum.photos/200/300?grayscale",
      content: formData.content || "Contenuto non disponibile.",
      // tags: newTags,
      published: formData.published,
      categories: formData.categories
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
        <form onSubmit={addPost} className={style.formContainer}>

          {/* TITOLO */}
          <div>
            <label htmlFor="title"></label>
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
          <div>
            <label htmlFor="contenuto"></label>
            <input
              id="content"
              name="content"
              onChange={handleFormData}
              value={formData.content}
              type="text"
              placeholder="Inserisci il contenuto"
            />
          </div>

          {/* IMMAGINE */}
          <div>
            <label htmlFor="img"></label>
              <input
              id="image"
              name="image"
              onChange={handleFormData}
              value={formData.image}
              type="text"
              placeholder="Inserisci il link"
            />
          </div>
          {/* CATEGORIA */}
          <div>
            <label htmlFor="categories"></label>
            <select  id="published"
              name="categories"
              onChange={handleFormData}
              value={formData.categories}
              type="select"
              placeholder="Inserisci il contenuto"> 
              <option value="" disabled>Seleziona una categoria</option>
              <option value='tech'>Tech</option>
              <option value='programmazione'>Programmazione</option>
              </select>
          </div>

          {/* PUBBLICARE */}
          <div>
            <label htmlFor="pubblicare">Spunta per Pubblicare</label>
            <input
              id="published"
              name="published"
              onChange={handleFormData}
              checked={formData.published}
              type="checkbox"
            />
          </div>

          <input
            type="submit"
            value="Aggiungi"
            className={style.submitButton}
          />
        </form>
      </div>

      {/* CARD */}
      <div className={style.container}>
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post) => (
            <div key={post.id} className={style.cardbody}>
              <img
                src={post.image || "/path-to-default-image.jpg"}
                alt={post.title || "Post"}
              />
              <h3>{post.title}</h3>
              {/* <h5
                style={{ color: post.tags.includes("HTML") ? "red" : "blue" }}
              >
                Tag: {post.tags.join(", ")}
              </h5> */}
              <p>Contenuto: {post.content}</p>
              <h5>Categoria: {post.categories}</h5>
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
