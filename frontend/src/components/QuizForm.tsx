import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

export default function QuizForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNo: '',
    phoneNo: '',
    section: '',
    year: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName: 'Coding Challenge', participants: [formData] }),
      });

      if (response.ok) {
        toast.success('Registration successful!');
        setFormData({
          name: '',
          email: '',
          registrationNo: '',
          phoneNo: '',
          section: '',
          year: '',
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to register');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sectionsForYear = {
    2: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    3: ['A', 'B', 'C', 'D', 'E', 'F'],
  };

  return (
    <div className='shadow-input mx-auto w-full max-w-lvh rounded-none p-4 md:rounded-2xl md:p-8 dark:bg-black'>
      <Toaster position='top-right' />
      <h2 className='text-xl font-bold text-neutral-100 dark:text-neutral-200'>Participate in the Coding Challenge</h2>

      <form className='my-8' onSubmit={handleSubmit}>
        {['name', 'email', 'registrationNo', 'phoneNo'].map((field) => (
          <LabelInputContainer key={field} className='mb-4'>
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              name={field}
              placeholder={`Enter your ${field}`}
              value={formData[field]}
              onChange={handleChange}
            />
          </LabelInputContainer>
        ))}

        <LabelInputContainer className='mb-4'>
          <Label htmlFor='year'>Year</Label>
          <select
            id='year'
            name='year'
            value={formData.year}
            onChange={handleChange}
            className='w-full p-2 rounded-md border bg-neutral-900 text-white'
          >
            <option value=''>Select Year</option>
            <option value='2'>2nd Year</option>
            <option value='3'>3rd Year</option>
          </select>
        </LabelInputContainer>

        {formData.year && (
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='section'>Section</Label>
            <select
              id='section'
              name='section'
              value={formData.section}
              onChange={handleChange}
              className='w-full p-2 rounded-md border bg-neutral-900 text-white'
            >
              <option value=''>Select Section</option>
              {sectionsForYear[formData.year]?.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </LabelInputContainer>
        )}

        <button type='submit' className='relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-white'>
          {loading ? <ClipLoader color='#fff' size={20} /> : 'Register →'}
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
