import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function CodingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationNo: "",
    phoneNo: "",
    section: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.registrationNo ||
      !formData.phoneNo ||
      !formData.section ||
      !formData.year
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
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
      toast.error("Registration failed! Please try again." + error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const sectionsForYear = {
    2: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    3: ["A", "B", "C", "D", "E", "F"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Participate in this
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="registrationNo">Registration Number</Label>
          <Input id="registrationNo" name="registrationNo" placeholder="Enter your registration number" value={formData.registrationNo} onChange={handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNo">Phone Number</Label>
          <Input id="phoneNo" name="phoneNo" placeholder="Enter your phone number" value={formData.phoneNo} onChange={handleChange} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="year">Year</Label>
          <select id="year" name="year" value={formData.year} onChange={handleChange} className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700">
            <option value="">Select Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
          </select>
        </LabelInputContainer>

        {formData.year && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="section">Section</Label>
            <select id="section" name="section" value={formData.section} onChange={handleChange} className="w-full p-2 rounded-md border bg-neutral-900 text-white dark:border-neutral-700">
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
