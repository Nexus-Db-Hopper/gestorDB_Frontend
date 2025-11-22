import unauthorizedImg from "../../public/401 Error Unauthorized.svg";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Acceso no autorizado</h1>
      <img 
        src={unauthorizedImg} 
        alt="Acceso no autorizado" 
        style={{ width: "300px", marginTop: "20px" }}
      />
    </div>
  );
}
