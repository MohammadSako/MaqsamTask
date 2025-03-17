"use client";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#c1c1c1",
          height: 1,
          width: "100%",
        }}
      />
      <footer className="flex sm:flex-row flex-col justify-between font-sans text-lg tracking-tight text-gray-600 my-4 px-6 gap-2">
        <div className="flex flex-col">
          <div>
            <p>
              By:{" "}
              <span className="font-bold text-gray-400">Mohammad Murad</span>
            </p>
          </div>
          <div>
            <p>
              Tel: <span className="text-gray-500">+962 777 277 673</span>
            </p>
          </div>
          <div>
            <p>
              Email:{" "}
              <span className="text-gray-500">
                mohammad.talal.murad@gmail.com
              </span>
            </p>
          </div>
        </div>
        <div>
          <FooterLink
            icon={<FaLinkedinIn size={25} />}
            href="linkedin.com/in/mohammad-murad-850b9970"
          />
        </div>
      </footer>
    </>
  );
}
export default Footer;

const FooterLink = ({ icon, href }) => {
  return (
    <Link href={href ?? "/"} target="_blank" rel="noopener noreferrer">
      <div className="text-gray-400 hover:text-gray-600">{icon}</div>
    </Link>
  );
};
