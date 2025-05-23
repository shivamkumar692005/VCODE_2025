import { useState, ChangeEvent, FormEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import axios from "axios";

// Define types for form data
interface Participant {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  year: string;
  section: string;
}

export default function CodeHuntForm() {
  const [formData, setFormData] = useState<Participant[]>([
    { name: "", email: "", registrationNo: "", phoneNo: "", year: "", section: "" },
    { name: "", email: "", registrationNo: "", phoneNo: "", year: "", section: "" },
    { name: "", email: "", registrationNo: "", phoneNo: "", year: "", section: "" },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [name]: value };
      return updatedData;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const member of formData) {
      if (!member.name || !member.email || !member.registrationNo || !member.phoneNo || !member.year || !member.section) {
        toast.error("All fields are required for every member.");
        return;
      }
    }

    try {
      setLoading(true);
      await axios.post("https://vcode-m6ni.onrender.com/api/register", {
        eventName: "Code Hunt",
        participants: formData,
      });

      toast.success("Registration successful!");
      setFormData([
        { name: "", email: "", registrationNo: "", phoneNo: "", year: "", section: "" },
        { name: "", email: "", registrationNo: "", phoneNo: "", year: "", section: "" },
        { name: "", email: "", registrationNo: "", phoneNo: "", year: "", section: "" },
      ]);
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
    "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <Toaster />
      <h2 className="text-xl font-bold text-neutral-100 dark:text-neutral-200">
        Register All Three Team Members
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {formData.map((member, index) => (
          <div key={index} className="mb-8 p-4 rounded-md border border-blue-400 text-white">
            <h3 className="text-lg font-semibold mb-4">Member {index + 1}</h3>

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`name-${index}`}>Name</Label>
              <Input
                id={`name-${index}`}
                name="name"
                placeholder="Enter your name"
                value={member.name}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`email-${index}`}>Email Address</Label>
              <Input
                id={`email-${index}`}
                name="email"
                type="email"
                placeholder="Enter your email"
                value={member.email}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`registrationNo-${index}`}>Registration Number</Label>
              <Input
                id={`registrationNo-${index}`}
                name="registrationNo"
                placeholder="Enter your registration number"
                value={member.registrationNo}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`phoneNo-${index}`}>Phone Number</Label>
              <Input
                id={`phoneNo-${index}`}
                name="phoneNo"
                placeholder="Enter your phone number"
                value={member.phoneNo}
                onChange={(e) => handleChange(index, e)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor={`year-${index}`}>Year</Label>
              <select
                id={`year-${index}`}
                name="year"
                value={member.year}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 rounded-md border bg-neutral-900 text-white"
              >
                <option value="">Select Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
              </select>
            </LabelInputContainer>

            {member.year && sectionsForYear[member.year] && (
              <LabelInputContainer className="mb-4">
                <Label htmlFor={`section-${index}`}>Section</Label>
                <select
                  id={`section-${index}`}
                  name="section"
                  value={member.section}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 rounded-md border bg-neutral-900 text-white"
                >
                  <option value="">Select Section</option>
                  {sectionsForYear[member.year].map((sec) => (
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
          disabled={loading}
        >
          {loading ? <ClipLoader color="#ffffff" size={20} /> : "Submit Team Details →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

// Define props type for LabelInputContainer
interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer = ({ children, className }: LabelInputContainerProps) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
