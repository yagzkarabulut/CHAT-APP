import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "./../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [message, setMessage] = useState([]);
  // form gönderme fonksiyonu
  const sendMessage = async (e) => {
    e.preventDefault();

    // kolleksiyonrefaransını alma
    const messagesCol = collection(db, "message");
    // kolleksiyona yeni döküman ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    // formu sıfırla
    e.target.reset();
  };
  // mevcut odada gönderilen mesajları anlık olarak alır
  useEffect(() => {
    // kolleksiyonun refaransını al
    const messagesCol = collection(db, "message");

    // sorgu ayalarını oluştur
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // mesajları kolleksiyonundaki verileri al
    // anlık olarak bir kollesiyondaki verileri izle
    // kolleksiyon her değiştiğinde verdiğimiz fonksiyon ile
    // kolleksiyondaki bütün dökümanlara erişiriz
    onSnapshot(q, (snapsshot) => {
      // verileri geçici olarak tutalacağı boş dizi
      const tempMsg = [];

      // dökümanları döneliö-m verilerine erişelim
      snapsshot.docs.map((doc) => {
        tempMsg.push(doc.data());
      });

      // mesajalrı state aktar
      setMessage(tempMsg);
    });
  }, []);
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button
          onClick={() => {
            setRoom(null);
          }}
        >
          Farklı Oda
        </button>
      </header>
      <main>
        {message.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>
      <form onSubmit={sendMessage}>
        <input type="text" required placeholder="mesajınızı yazınız" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
