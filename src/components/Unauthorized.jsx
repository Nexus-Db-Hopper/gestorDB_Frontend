import unauthorizedImg from "../assets/401 Error Unauthorized.svg";

export default function Unauthorized() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <img
        src={unauthorizedImg}
        alt="Unauthorized"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
