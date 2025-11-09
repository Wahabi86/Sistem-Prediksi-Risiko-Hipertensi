"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { dataPertanyaan } from "@/data/datas";

export default function Pertanyaan() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const logicQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">PERTANYAAN YANG SERING DIAJUKAN</h2>

      <div className="mx-auto max-w-5xl space-y-6">
        {dataPertanyaan.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Section Pertanyaan */}
            <button onClick={() => logicQuestion(index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200">
              <span className="text-lg font-medium">{item.question}</span>
              {openQuestion === index ? <ChevronUp className="w-6 h-6  flex-shrink-0 ml-4" /> : <ChevronDown className="w-6 h-6  flex-shrink-0 ml-4" />}
            </button>

            {/* Section Jawaban */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openQuestion === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-6 pb-6 pt-3 hover:bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed text-justify">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
