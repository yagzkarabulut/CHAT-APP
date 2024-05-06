import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  // kullanıcının seçtiği oda
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  // kullanıcın yetkisi var mı?
  const [room, setRoom] = useState(null);
  // yetkisi yoksa giriş sayfası
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }
  // yetkisi varsa seçme sayfası
  return (
    <div className="container">
      {!room ? (
        // oda seçilmediyse > oda seçme sayfası
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      ) : (
        // oda seçildiyse > sohbet seçme sayfası
        <ChatPage room={room} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
