import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clickViewResult,clickHistoryView, setPendingSheetId, clickApprovalRequestView } from '../store/reducers/LectureNavigationSlice'; // Import setPendingSheetId
import { MdEdit } from "react-icons/md";
import { dptClickApprovedResultView,dptClickViewResult,setPendingSecSheetId } from '../store/reducers/DptSecretaryNavigationSlice';
import {hodClickApprovedResultView, hodClickViewResult, setPendingHodSheetId } from '../store/reducers/HODNavigationSlice';
import { deanClickApprovedResultView,  deanClickViewResult,setPendingDeanSheetId } from '../store/reducers/DeanNavigationSlice';
import { useNavigate } from 'react-router-dom';


function ResultSheetList({ userType, resultSheets }) {
    const lectureNavigation = useSelector((store) => store.lectureNavigationSlice);
    const dptSecretaryNavigation = useSelector((store)=> store.dptSecretaryNavigationSlice);
    const hodNavigation = useSelector((store)=> store.hodNavigationSlice);
    const deanNavigation = useSelector((store) => store.deanNavigationSlice)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    //const [subject,setSubject] = useState("");
    
    //const queryParams = new URLSearchParams({ subject });
   
    //console.log(subject);

    const handleViewResult = (sheetId,subject) => {
        if (userType === 'lecture-1') {
            navigate(`/lecture/result-sheets/subject-lecture/${sheetId}?subject=${subject}`);
        } else if (userType === 'lecture-2') {
            navigate(`/lecture/result-sheets/second-marker/${sheetId}?subject=${subject}`);
        } else if( userType === 'lecture-approved'){
            navigate(`/lecture/approved-result-sheets/${sheetId}?subject=${subject}`)
        }
        else if (userType === 'dptSecretary') {
            dispatch(setPendingSecSheetId(sheetId));
            if (!dptSecretaryNavigation.isClickedViewResult) {
                dispatch(dptClickViewResult(true))
            }
            if(!dptSecretaryNavigation.isClickedApprovedResultView){
                dispatch(dptClickApprovedResultView(true))
            }
        } else if (userType === 'HOD') {
            dispatch(setPendingHodSheetId(sheetId));
            if (!hodNavigation.isClickedViewResult) {
                dispatch(hodClickViewResult(true))
            }
            if(!hodNavigation.isClickedApprovedResultView){
                dispatch(hodClickApprovedResultView(true))
            }
        }
        else if (userType === 'dean') {
            dispatch(setPendingDeanSheetId(sheetId));
            if (!deanNavigation.isClickedViewResult) {
                dispatch(deanClickViewResult(true))
            }
            if(!deanNavigation.isClickedApprovedResultView){
                dispatch(deanClickApprovedResultView(true))
            }
        }
    };

    return (
      <div>
        <div className="mt-8">
          <div className="pb-2 pl-[3%] pr-[1.5%] w-full grid grid-cols-12 gap-1 border-black border-b-[1px] text-[0.92rem] text-black">
            <div className="col-span-2 flex items-center justify-start">
              <p className="text-center">Subject Code and Subject Name</p>
            </div>
            <div className={`${userType==='lecture-1'?"col-span-2 justify-start":"col-span-3 justify-center"} flex items-start mx-5`}>
              <p className="">Degree Program</p>
            </div>
            <div className={`${userType==='lecture-1'?"col-span-2 justify-center":"col-span-3 justify-center"} flex items-start`}>
              <p className="">Batch and semester</p>
            </div>
            <div className={`${userType==='lecture-1'?"col-span-2":"col-span-3"} flex items-start justify-center`}>
              <p className="">Department</p>
            </div>
            {userType === "lecture-1" ? (
              <div className="col-span-2 flex items-start justify-center">
                <p className="text-center">Second Marker Approval Status</p>
              </div>
            ) : (
              <></>
            )}
            {userType === "lecture-1" ? (
              <div className="h-10 col-span-1 flex items-start justify-center">
                <p className="text-center">Approval Status</p>
              </div>
            ) : (
              <></>
            )}
            <div
              className={`h-10 col-span-1 flex items-start justify-start`}
            >
              <p className="text-black">Action</p>
            </div>
          </div>
        </div>
        <div className="mb-10 max-h-80 overflow-y-auto">
          <br />
          {resultSheets.map((sheet, index) => (
            <div
              key={index}
              className="py-2 pl-[4%] pr-[1.5%] w-full grid grid-cols-12 gap-1 border-b-[1px] text-[0.9rem]"
            >
              <div className="h-10 col-span-2 flex items-start justify-start">
                <p className="">
                  {sheet.subjectCode + " - " + sheet.subject}
                </p>
              </div>
              <div className={`${userType==='lecture-1'?"col-span-2 justify-start":"col-span-3 justify-center"} flex items-start mx-5 `}>
                <p className=" text-primary-txt">{sheet.degreeProgram}</p>
              </div>
              <div className={`${userType==='lecture-1'?"col-span-2":"col-span-3"} flex items-start justify-center`}>
                <p className="">
                  {sheet.batch + " - " + sheet.semester}
                </p>
              </div>
              <div className={`${userType==='lecture-1'?"col-span-2":"col-span-3"} flex items-start justify-center`}>
                <p className=" text-black">{sheet.department}</p>
              </div>
              {userType === "lecture-1" ? (
                <div className="h-10 col-span-2 flex items-center justify-center">
                  <p className={`${sheet.secondLectureApprovalStatus === "APPROVED" ? "text-green-500" : "text-yellow-500"}`}>{sheet.secondLectureApprovalStatus}</p>
                </div>
              ) : (
                <></>
              )}
               {userType === "lecture-1" ? (
                <div className={`h-10 col-span-1 flex items-center justify-center`}>
                  <p className={`${sheet.secondLectureApprovalStatus === "APPROVED" ? "text-yellow-500":"text-red-500" }`}>{sheet.lecturerApprovalStatus}</p>
                </div>
              ) : (
                <></>
              )}
              <div className={`h-10 col-span-1 flex items-center justify-center`}>
                {/* <MdEdit
                  size={20}
                  className="text-edit-icon-bg cursor-pointer"
                /> */}
                {/* <button
                                 onClick={() => handleViewResult(sheet.id)}
                                className='py-1 px-4 flex items-center justify-center bg-view-btn-bg text-black text-[14px] rounded-3xl'
                            >
                                View
                            </button> */}
                <button
                  //disabled={sheet.secondLectureApprovalStatus === "PENDING"}
                  onClick={() => {
                    //setSubject(sheet.subjectCode + " - " + sheet.subject)
                    handleViewResult(sheet.id,sheet.subjectCode + " - " + sheet.subject);
                  }}
                  disabled={sheet.secondLectureApprovalStatus === "PENDING" && userType==="lecture-1"}
                  className={`mx-auto py-1 px-4 flex items-center justify-center 
                                    ${
                                      sheet.secondLectureApprovalStatus === "PENDING" && userType==="lecture-1"
                                        ? "bg-red-400"
                                        : sheet.rejectStatus === "dptSecretary"
                                        ? "bg-yellow-200"
                                        : "bg-view-btn-bg"
                                    } 
                                    text-black text-[0.7rem] rounded-3xl`}
                >
                  View
                </button>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
}

export default ResultSheetList;
