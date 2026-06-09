export const fetchCode = `fetch("https://yourdomain.com/api/leads", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "your_api_key_here"
  },
  body: JSON.stringify({
    name: "Nitin Dogra",
    email: "nitin@example.com",
    phone: "9876543210",
    message: "I am interested in your service",
    source: "website"
  })
});`;

export const axiosCode = `import axios from "axios";

axios.post(
  "https://yourdomain.com/api/leads",
  {
    name: "Nitin Dogra",
    email: "nitin@example.com",
    phone: "9876543210",
    message: "I want to know more",
    source: "landing-page"
  },
  {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "your_api_key_here"
    }
  }
);`;

export const requestBodyCode = `{
  "name": "Nitin Dogra",
  "email": "nitin@example.com",
  "phone": "9876543210",
  "message": "I am interested in your product",
  "source": "website"
}`;