"use client";
import React from "react";

import FormComponent from "@/components/ResumeForm";

const Home = () => {
    return (
        <div className="flex justify-center bg-[url('/images/background.jpg')] min-h-screen w-full bg-cover bg-center bg-fixed p-4 bg-opacity-10">
            <FormComponent />
        </div>
    );
};

export default Home;