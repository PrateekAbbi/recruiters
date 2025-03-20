"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface FormProps {
  setRefreshTrigger: (arg0: boolean) => void;
  refreshTrigger: boolean;
}

const Form: React.FC<FormProps> = ({ setRefreshTrigger, refreshTrigger }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSend = async () => {
    const sendEmail = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });

    const sendEmailData = await sendEmail.json();

    if (sendEmailData.success) {
      const newRecruiter = {
        name,
        email,
        sentAt: new Date().toISOString(),
      };

      const addedRecruiter = await fetch("/api/storeEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecruiter),
      });

      const data = await addedRecruiter.json();

      // Update cache instead of calling API
      const cachedData = localStorage.getItem("recruiters");
      const updatedRecruiters = cachedData ? JSON.parse(cachedData) : [];
      updatedRecruiters.unshift(data);
      localStorage.setItem("recruiters", JSON.stringify(updatedRecruiters));
      setRefreshTrigger(!refreshTrigger);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-700 z-50">
      <h2 className="text-white text-xl font-semibold mb-4 text-center">
        Send Email to Recruiter
      </h2>

      <div className="flex items-end gap-4">
        <div className="flex flex-1 gap-4">
          <div className="flex flex-col flex-1 gap-1">
            <Label className="text-gray-300 text-sm font-semibold">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="Enter recruiter’s name"
              className="p-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <Label className="text-gray-300 text-sm font-semibold">Email</Label>
            <Input
              type="email"
              value={email}
              placeholder="Enter recruiter’s email"
              className="p-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <Button
          className="w-1/3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Form;
