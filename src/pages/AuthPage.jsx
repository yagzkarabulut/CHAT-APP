import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

signInWithPopup;

const AuthPage = ({ setIsAuth }) => {
  // giriş butonu tıklanırsa
  const handleClick = () => {
    signInWithPopup(auth, provider)
      // başarrılı giriş yaparsa
      .then((data) => {
        console.log(data.user);

        //   kullanıcının yetkisin true çek
        setIsAuth(true);
        // kullanıcı biligisini local'de saklar
        localStorage.setItem("token", data.user.refreshToken);
      });
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="/g-logo.png" />
          <span>Google ile Gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
