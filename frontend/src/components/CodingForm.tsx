import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";

// Define the expected form data structure
type FormDataType = {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
};

export default function CodingForm() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    registrationNo: "",
    phoneNo: "",
    section: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field)) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://vcode-m6ni.onrender.com/api/register", {
        eventName: "Coding Challenge",
        participants: [formData],
      });

      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        registrationNo: "",
        phoneNo: "",
        section: "",
        year: "",
      });

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Registration failed: " + error.response.data.error);
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sectionsForYear: Record<string, string[]> = {
    2: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    3: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in this
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {(Object.keys(formData) as (keyof FormDataType)[]).map((key) => (
          key !== "section" && (
            <LabelInputContainer key={key} className="mb-4">
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              {key === "year" ? (
                <select
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
                >
                  <option value="">Select Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                </select>
              ) : (
                <Input
                  id={key}
                  name={key}
                  type={key === "email" ? "email" : "text"}
                  placeholder={`Enter your ${key}`}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </LabelInputContainer>
          )
        ))}

        {formData.year && sectionsForYear[formData.year] && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="section">Section</Label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700"
            >
              <option value="">Select Section</option>
              {sectionsForYear[formData.year].map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </LabelInputContainer>
        )}

        <button type="submit" className="block w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white">
          {loading ? <ClipLoader size={20} color="#fff" /> : "Register →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer = ({ children, className }: LabelInputContainerProps) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
  );
};
