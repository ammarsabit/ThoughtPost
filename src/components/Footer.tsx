import { FaFacebookF } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center align-items-center ">
      <div className="d-flex flex-row justify-content-between px-2 py-4 w-100 rounded-4 bg-dark text-white  ">
        <h1 className="fs-4 ps-4">ThoughtPost</h1>
        <p className="align-self-center mb-0">
          © 2025 Blog. All rights are reserved.
        </p>
        <div className="align-self-center">
          <FaTelegramPlane size={20} className="mx-2" />
          <FaFacebookF size={20} className="mx-2" />
          <SiGmail size={20} className="mx-2 me-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
