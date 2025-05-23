import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

type FormDataType = {
  eventName: string;
  participants: Participant[];
};

type Participant = {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
};

export default function PosterForm() {
  const [formData, setFormData] = useState<FormDataType>({
    eventName: "Poster Presentation",
    participants: [
      {
        name: "",
        email: "",
        registrationNo: "",
        phoneNo: "",
        section: "",
        year: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      participants: [{ ...formData.participants[0], [name]: value }],
    });
  };

  const clearForm = () => {
    setFormData({
      eventName: "Poster Presentation",
      participants: [
        {
          name: "",
          email: "",
          registrationNo: "",
          phoneNo: "",
          section: "",
          year: "",
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://vcode-m6ni.onrender.com/api/register",
        formData
      );
      toast.success("Registration successful!");
      clearForm();
      console.log("Registration successful:", response.data);
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

  const sectionsForYear: Record<number, string[]> = {
    2: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
    ],
    3: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in this
      </h2>
      <Toaster position="top-center" />
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.participants[0].name}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.participants[0].email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="registrationNo">Registration Number</Label>
          <Input
            id="registrationNo"
            name="registrationNo"
            placeholder="Enter your registration number"
            value={formData.participants[0].registrationNo}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNo">Phone Number</Label>
          <Input
            id="phoneNo"
            name="phoneNo"
            placeholder="Enter your phone number"
            value={formData.participants[0].phoneNo}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="year">Year</Label>
          <select
            id="year"
            name="year"
            value={formData.participants[0].year}
            onChange={handleChange}
            className="w-full p-2 rounded-md border bg-neutral-900 text-white"
          >
            <option value="">Select Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
          </select>
        </LabelInputContainer>

        {formData.participants[0].year &&
          sectionsForYear[
            +formData.participants[0].year as keyof typeof sectionsForYear
          ] && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="section">Section</Label>
              <select
                id="section"
                name="section"
                value={formData.participants[0].section}
                onChange={handleChange}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
              >
                <option value="">Select Section</option>
                {sectionsForYear[
                  +formData.participants[0].year as keyof typeof sectionsForYear
                ].map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </LabelInputContainer>
          )}

        <button
          className="relative h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Register →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

// Bottom gradient effect for button
const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

// Wrapper for label and input
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
