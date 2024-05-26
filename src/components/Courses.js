import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaJs,
  FaPython,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaDatabase,
  FaBrain,
} from "react-icons/fa";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getcourses")
      .then((response) => setCourses(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-100 text-black p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to freeCodeCamp.org</h1>
      <p className="text-lg italic mb-8">
        "I have not failed, I've just found 10,000 ways that won't work" -
        Thomas A. Edison
      </p>
      <div className="w-full md:w-2/3 lg:w-1/2">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className="border border-black rounded p-4 bg-gray-200 mb-4 flex justify-between items-center"
          >
            <div className="flex items-center">
              {index === 0 && (
                <FaJs className="text-yellow-500 mr-2 text-2xl" />
              )}
              {index === 1 && (
                <FaPython className="text-blue-600 mr-2 text-2xl" />
              )}
              {index === 2 && (
                <FaReact className="text-blue-400 mr-2 text-2xl" />
              )}
              {index === 3 && (
                <FaAngular className="text-red-600 mr-2 text-2xl" />
              )}
              {index === 4 && (
                <FaDatabase className="text-gray-500 mr-2 text-2xl" />
              )}
              {index === 5 && (
                <FaNodeJs className="text-green-500 mr-2 text-2xl" />
              )}
              {index === 6 && (
                <FaBrain className="text-purple-600 mr-2 text-2xl" />
              )}
              <div className="font-bold">{course.title}</div>
            </div>
            <div>({course.duration})</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
