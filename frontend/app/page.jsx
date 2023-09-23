import Image from "next/image";
import logo from "./pec-logo.png";
export default function Home() {
  return (
    <div className="bg-blue-500 h-screen flex flex-col justify-center items-center text-white">
      <div className="text-4xl font-bold mb-4">
        Panimalar Exam Registration Portal
      </div>
      <p className="text-lg mb-8">Your gateway to success in upcoming exams!</p>
      <Image
        src={logo}
        alt="Exam Registration"
        width={400}
        height={300}
        className="rounded-lg"
      />
    </div>
  );
}
