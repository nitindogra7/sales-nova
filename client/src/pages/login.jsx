import AuthContainer from "../components/authContainer";
import GlowBackground from "../components/glowBackground";
import InteractiveGridBackground from "../components/lightswind/interactive-grid-background.tsx";

export default function Login() {
  return (
    <div className="h-dvh w-full overflow-hidden bg-black text-white flex items-center justify-center">
      <AuthContainer
        heading={"Login"}
        defineText={"Login to your "}
        highlightText={"Aceternity UI Pro account"}
        buttonName={"Sign In with Email"}
        anchorTagName={"Signup"}
        fields={[
          { name: "email", label: "Email", type: "email", placeholder: "name@example.com" },
          { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
        ]}
      />
    </div>
  );
}