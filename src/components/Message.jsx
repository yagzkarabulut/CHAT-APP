import { auth } from "../firebase/config";

const Message = ({ data }) => {
  // oturumu açık olan kullanıcının id'si
  // mesajı atan kullanıcıcın idsine eşitse
  //   sadece mesaj içeriğini bas
  if (auth.currentUser?.uid === data.author?.id) {
    return <p className="msg-user">{data.text}</p>;
  }

  //   eşit değilse
  // kullanıcı bilgisi + mesaj içeriği
  return (
    <div className="msg-other">
      <div className="user-info">
        <img src={data.author.photo} alt="" />
        <span>{data.author.name}</span>
      </div>
      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
