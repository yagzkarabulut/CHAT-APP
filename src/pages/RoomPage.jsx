const RoomPage = ({ setIsAuth, setRoom }) => {
  // form gönderilince tetiklenecek fonk

  const handleSubmit = (e) => {
    e.preventDefault();
    // inpuutaki değeri al
    const room = e.target[0].value;
    // kullanıcının seçtiği odayı state aktar

    setRoom(room.toLowerCase());
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Giriceksiniz?</p>
      <input type="text" placeholder="ör:haftaiçi" required />
      <button type="submit">Odaya Gir</button>
      <button
        onClick={() => {
          // yetki state'ini false'a .ekere odal ogine yönlendirir
          setIsAuth(false);
          // localldeki kaydı kaldır
          localStorage.removeItem("token");
        }}
        type="button"
      >
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
