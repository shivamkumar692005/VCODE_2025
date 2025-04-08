import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";


export default function QuizForm() {
  const [formData, setFormData] = useState([
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
    {
      name: "",
      email: "",
      registrationNo: "",
      phoneNo: "",
      section: "",
      year: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
       await axios.post("https://vcode-m6ni.onrender.com/api/register", {
        eventName: "Technical Quiz",
        participants: formData,
      });
    

     
        toast.success("Registration successful!");
        setFormData([
          {
            name: "",
            email: "",
            registrationNo: "",
            phoneNo: "",
            section: "",
            year: "",
          },
          {
            name: "",
            email: "",
            registrationNo: "",
            phoneNo: "",
            section: "",
            year: "",
          },
          {
            name: "",
            email: "",
            registrationNo: "",
            phoneNo: "",
            section: "",
            year: "",
          },
          {
            name: "",
            email: "",
            registrationNo: "",
            phoneNo: "",
            section: "",
            year: "",
          },
        ]);
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Registration failed: " + error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sectionsForYear: Record<number, string[]> = {
    2: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    3: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in the Coding Challenge (Team of 3)
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {formData.map((member, index) => (
          <div key={index} className="border-b border-gray-600 pb-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Member {index + 1}
            </h3>

            {["name", "email", "registrationNo", "phoneNo"].map((field) => (
              <LabelInputContainer key={field} className="mb-4">
                <Label htmlFor={`${field}-${index}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={`${field}-${index}`}
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={member[field as keyof typeof member]}
                  onChange={(e) => handleChange(e, index)}
                />
              </LabelInputContainer>
            ))}

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`year-${index}`}>Year</Label>
              <select
                id={`year-${index}`}
                name="year"
                value={member.year}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
              >
                <option value="">Select Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </select>
            </LabelInputContainer>

            {member.year && sectionsForYear[+member.year] && (
              <LabelInputContainer className="mb-4">
                <Label htmlFor={`section-${index}`}>Section</Label>
                <select
                  id={`section-${index}`}
                  name="section"
                  value={member.section}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 rounded-md border bg-neutral-900 text-white"
                >
                  <option value="">Select Section</option>
                  {sectionsForYear[+member.year].map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </LabelInputContainer>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white"
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Register →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

// LabelInputContainer, Label, Input components should be defined or imported accordingly.

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
