import { useEffect, useState } from "react";
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function Comments() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  async function handleSubmit() {
    if (!name || !text) return;

    await addDoc(collection(db, "comments"), {
      name,
      text,
      date: new Date().toISOString(),
    });
    setName("");
    setText("");
  }

  return (
    <div className="flex flex-col gap-4 px-8">
      <h1 className="text-3xl text-center pb-1">Kommentarer</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-semibold">
          Namn<span className="text-red-400">*</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="Ditt namn..."
          maxLength={30}
          required
          className="border border-[#2a2a2a] rounded-lg px-2 py-1"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="comments" className="font-semibold">
          Kommentar<span className="text-red-400">*</span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="comments"
          placeholder="Skriv din kommentar här..."
          maxLength={280}
          required
          className="border border-[#2a2a2a] rounded-lg px-2 h-25"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="self-center py-2 w-1/2 border border-[#2a2a2a] rounded-lg bg-green-500"
      >
        Kommentera
      </button>
      {comments.map((comment, index) => (
        <div key={index} className="border-b border-gray-700 pb-4">
          <div className="flex justify-between items-center">
            <p className="font-bold">{comment.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(comment.date).toLocaleString("sv-SE")}
            </p>
          </div>
          <p className="text-gray-300">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
