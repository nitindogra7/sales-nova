import signupImage from "../assets/signupImg.png";
import AuthContainer from "../components/authContainer";
import { useNavigate } from "react-router-dom";
import { signup } from "../apis/auth.apis.js";
import { useMutation } from "@tanstack/react-query";

export default function Signup() {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: async (input) => {
      const res = await signup(input);
      return res;
    },

    onSuccess: (data) => {
      localStorage.setItem("accessAccId", data.otpId);
      navigate("/verify-otp");
    },

    onError: (error) => {
      console.log(error.response?.data?.message || error.message);
    },
  });

  function onSubmitAction(input) {
    signupMutation.mutate(input);
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-black text-white flex items-center justify-center">
      <div className="h-full w-[80%] hidden md:flex items-center justify-center relative p-5">
        <img
          className="h-full w-full object-cover"
          src={signupImage}
          alt="Signup Illustration"
        />
      </div>

      <div className="h-full w-[45%] md:pr-30 flex items-center justify-center">
        <AuthContainer
          heading={"Signup"}
          defineText={"Welcome to "}
          highlightText={" Sales Nova"}
          buttonName={
            signupMutation.isPending
              ? "Signing Up..."
              : "Sign Up with Email"
          }
          anchorTagName={"Login"}
          fields={[
            {
              name: "username",
              label: "Username",
              type: "text",
              placeholder: "Choose your username",
            },
            {
              name: "companyName",
              label: "Company Name",
              type: "text",
              placeholder: "Enter your company name",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "name@example.com",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Create your password",
            },
          ]}
          onSubmitAction={onSubmitAction}
        />
      </div>
    </div>
  );
}