import React, { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setStudentResultsSheets } from "../store/reducers/LectureNavigationSlice";
import { setStudentResultsSheetsDs } from "../store/reducers/DptSecretaryNavigationSlice";
import { useSearchParams } from "react-router-dom";

function ResultTable({ students, setStudents, user, status }) {
  const [enableEditIndex, setEnableEditIndex] = React.useState(null); // Track which row is being edited
  const [editedIndex, setEditedIndex] = React.useState("");
  const [editedResult, setEditedResult] = React.useState(0);
  const dispatch = useDispatch();
  
  //console.log(subject);

  const handleEditClick = (index) => {
    // Set the row index to be edited
    setEnableEditIndex(index);
    setEditedIndex(students[index].index);
    setEditedResult(students[index].markLec1);
  };

  useEffect(() => {
    dispatch(setStudentResultsSheets(students));
  }, [students]);

  const handleSave = (index) => {
    const updatedStudents = students.map((student, idx) =>
      idx === index
        ? {
            ...student,
            index: editedIndex,
            markLec1: parseFloat(editedResult),
            gradeLec1: setGrade(parseFloat(editedResult)),
            mark: (parseFloat(student.markLec2) + (parseFloat(editedResult) || 0)) / 2,
            grade: setGrade(
              (parseFloat(student.markLec2) + (parseFloat(editedResult) || 0)) /
                2
            ),
          }
        : student
    );
    //console.log("updatedStudents", updatedStudents);
    setStudents(updatedStudents); // Update students in the parent
    // dispatch(setStudentResultsSheets(updatedStudents));
    // dispatch(setStudentResultsSheetsDs(updatedStudents));
    setEnableEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, idx) => idx !== index);
    setStudents(updatedStudents);
    dispatch(setStudentResultsSheets(updatedStudents)); // Ensure Redux store is updated
    dispatch(setStudentResultsSheetsDs(updatedStudents));
  };

  const setGrade = (mark)=>{
    if(mark >= 90){
      return "A+"; 
    }
    if(mark >= 80){
      return "A";
    }
    if(mark >= 75){
      return "A-";
    }
    if(mark >= 70){
      return "B+";
    }
    if(mark >= 65){
      return "B";
    }
    if(mark >= 60){
      return "B-";
    }
    if(mark >= 55){
      return "C+";
    }
    if(mark >= 50){
      return "C";
    }
    if(mark >= 45){
      return "C-";
    }
    if(mark >= 40){
      return "D+";
    }
    if(mark >= 35){
      return "D";
    }
    if(mark >= 30){
      return "D-";
    }
    if(mark >= 25){
      return "E";
    }
    if(mark >= 0){
      return "F";
    }
    return "null";
  }
  
  //console.log("students", students);
  return (
    <div className={`${user !== "hod" && user !== "dean" ? "ml-0" : "ml-48"}`}>
      <div className="flex flex-col items-center">
        <div
          className={`mt-3 ${
            user !== "hod" && user !== "dean" ? "w-11/12" : "w-10/12"
          }`}
        >
          <div
            className={`grid ${
              user === "lecturer-1" ? "grid-cols-12 text-[0.85rem] leading-[0.9rem]" : "grid-cols-8 text-[1.1rem] leading-[1.4rem]"
            } gap-[1px]`}
          >
            <div
              className={`p-2 ${
                user === "lecturer-1" ? "col-span-1" : "col-span-2"
              } flex items-center justify-center bg-primary`}
            >
              <h3 className=" text-white">No</h3>
            </div>
            <div
              className={`${
                user === "lecturer-1" ? "col-span-2" : "col-span-2"
              } flex items-center justify-center bg-primary`}
            >
              <h3 className=" text-white">Student Index</h3>
            </div>
            {user === "lecturer-1" ? (
              <div className="col-span-6 grid grid-cols-6 gap-[1px]">
                <div className="py-1.5 col-span-1 flex items-center justify-center bg-primary">
                  <h3 className=" text-center text-white">
                    Second Marker Marks
                  </h3>
                </div>
                <div className="py-1.5 col-span-1 flex items-center justify-center bg-primary">
                  <h3 className=" text-center text-white">
                    Second Marker Grade
                  </h3>
                </div>
                <div className="py-1.5 col-span-1 flex items-center justify-center bg-primary">
                  <h3 className="text-center text-white">
                    Subject Lecturer Marks
                  </h3>
                </div>
                <div className="py-1.5 col-span-1 flex items-center justify-center bg-primary">
                  <h3 className="text-center text-white">
                    Subject Lecturer Grade
                  </h3>
                </div>
                <div className="col-span-2 flex items-center justify-center bg-primary">
                  <h3 className="text-center text-white">Average Marks</h3>
                </div>
              </div>
            ) : (
              <></>
            )}
            {user !== "lecturer-2" ? (
              <div className="col-span-2 flex items-center justify-center bg-primary">
                <h3 className="text-white">Result</h3>
              </div>
            ) : (
              <div className="col-span-3 grid grid-cols-3 gap-[1px]">
                <div className="col-span-2 flex items-center justify-center bg-primary">
                  <h3 className="text-lg text-white">Marks</h3>
                </div>
                <div className="col-span-1 flex items-center justify-center bg-primary">
                  <h3 className="text-lg text-white">Grade</h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            user !== "hod" && user !== "dean" ? "w-11/12" : "w-10/12"
          } max-h-72 overflow-y-scroll scrollbar-hide`}
        >
          {students.map((student, index) => (
            <div className="w-full mb-1" key={index}>
              <div
                className={`grid ${
                  user === "lecturer-1" ? "grid-cols-12 text-[0.95rem] leading-[1rem]" : "grid-cols-8 text-[1.1rem] leading-[1.4rem]"
                } gap-[1px]`}
              >
                <div
                  className={`p-3 ${
                    user === "lecturer-1" ? "col-span-1" : "col-span-2"
                  } flex items-center justify-center bg-table-bg`}
                >
                  <p className=" text-table-txt">{index + 1}</p>
                </div>

                {user === "lecturer-2" ? (
                  <div
                    className={`p-0 col-span-2 flex items-center justify-center bg-table-bg`}
                  >
                    <input
                      disabled={enableEditIndex !== index}
                      type="text"
                      value={
                        enableEditIndex === index ? editedIndex : student.index
                      }
                      onChange={(e) => setEditedIndex(e.target.value)}
                      className="p-3 w-full h-full text-center bg-transparent border-transparent focus:border-secondary focus:border-2 focus:outline-none placeholder-table-txt placeholder-opacity-100"
                    />
                  </div>
                ) : (
                  <div
                    className={`p-0 col-span-2 flex items-center justify-center bg-table-bg`}
                  >
                    <p className=" text-table-txt">{student.index}</p>
                  </div>
                )}

                {user === "lecturer-1" ? (
                  <div className="col-span-6 grid grid-cols-6 gap-[1px]">
                    <div className="p-0 col-span-1 flex items-center justify-center bg-table-bg border-none">
                      <p>{student.markLec2}</p>
                    </div>
                    <div className="p-0 col-span-1 flex items-center justify-center bg-table-bg border-none">
                      <p>{student.gradeLec2}</p>
                    </div>
                    <div className="p-0 col-span-1 flex items-center justify-center bg-table-bg border-none">
                      <input
                        disabled={enableEditIndex !== index}
                        type="text"
                        value={
                          enableEditIndex === index
                            ? editedResult
                            : student.markLec1
                        }
                        onChange={(e) => setEditedResult(e.target.value)}
                        className="p-3 w-full h-full text-center bg-transparent border border-transparent focus:border-secondary focus:border-2 focus:outline-none placeholder-table-txt placeholder-opacity-100"
                      />
                    </div>
                    <div className="p-0 col-span-1 flex items-center justify-center bg-table-bg border-none">
                      <p>{student.markLec1 !== null ? setGrade(student.markLec1) : ""}</p>
                    </div>
                    <div className="p-0 col-span-2 flex items-center justify-center bg-table-bg border-none">
                      <p>
                        {(parseFloat(student.markLec2) +
                          (parseFloat(student.markLec1) || 0)) /
                          (student.markLec1 ? 2 : 1) || 0}
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {user !== "lecturer-2" ? (
                  <div className="p-0 col-span-2 flex items-center justify-center bg-table-bg border-none">
                    {/* {setGrade(
                      (parseFloat(student.markLec2) +
                      (parseFloat(student.markLec1) || 0)) /
                      (student.markLec1 ? 2 : 1) || 0
                    )} */
                      student.grade
                    }
                  </div>
                ) : (
                  <div className="col-span-3 grid grid-cols-3 gap-[1px]">
                    <div className="p-0 col-span-2 flex items-center justify-center bg-table-bg border-none">
                      {student.markLec2}
                    </div>
                    <div className="p-0 col-span-1 flex items-center justify-center bg-table-bg border-none">
                      {setGrade(
                        (parseFloat(student.markLec2))
                      )}
                    </div>
                  </div>
                )}

                {user !== "hod" &&
                status !== "null" &&
                !(
                  user === "lecturer" &&
                  (student.grade === "Medical" || student.grade === "Absent")
                ) &&
                !(
                  user === "dptSecretary" &&
                  [
                    "A+",
                    "A",
                    "A-",
                    "B+",
                    "B",
                    "B-",
                    "C+",
                    "C",
                    "C-",
                    "D+",
                    "D",
                    "D-",
                    "E",
                    "F",
                  ].includes(student.grade)
                ) ? (
                  <div className="p-3 col-span-1 flex items-center justify-center gap-1 bg-table-bg">
                    {enableEditIndex === index ? (
                      <button
                        onClick={() => handleSave(index)}
                        className="text-save-icon-bg cursor-pointer"
                      >
                        Save
                      </button>
                    ) : (
                      <MdEdit
                        size={20}
                        onClick={() => handleEditClick(index)}
                        className="text-edit-icon-bg cursor-pointer"
                      />
                    )}
                    <RiDeleteBin6Line
                      size={20}
                      onClick={() => handleDelete(index)}
                      className="text-dlt-icon-bg cursor-pointer"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultTable;
