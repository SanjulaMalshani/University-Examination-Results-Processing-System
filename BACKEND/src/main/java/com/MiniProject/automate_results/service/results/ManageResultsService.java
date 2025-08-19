package com.MiniProject.automate_results.service.results;

import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.dto.resluts.DepSecretarySubjectResultSheetDto;
import com.MiniProject.automate_results.dto.resluts.LectureSubjectResultSheetDto;
import com.MiniProject.automate_results.dto.resluts.RejectedDetailsDTO;
import com.MiniProject.automate_results.dto.resluts.UserShortDetails;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.service.exception.DuplicateRecordException;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.user.Role;
import com.MiniProject.automate_results.user.User;

import java.util.List;
import java.util.Optional;

public interface ManageResultsService {
    public SubjectResultSheet createAndUpdateResults(String id,String lecId, LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException, DuplicateRecordException;
    public SubjectResultSheet UpdateStudentsResultsByDepSecretary(String sheetId, DepSecretarySubjectResultSheetDto depSecretarySubjectResultSheetDto) throws RecordNotFoundException;

    List<SubjectResultSheet> getPendingSheet(String id) throws RecordNotFoundException;

    Optional<SubjectResultSheet> getSheets(String id) throws RecordNotFoundException ;

    List<UserShortDetails> getUsersByRole(Role role);

    List<SubjectResultSheet> getPendingSubjectResultSheetsByLecture1Id(String lectureId,String lecturerApprovalStatus,String secondLectureApprovalStatus);

    List<SubjectResultSheet> getPendingSubjectResultSheetsByLecture1ById(String lectureId,String lecturerApprovalStatus);

    List<SubjectResultSheet> getPendingSubjectResultSheetsByLecture2Id(String lectureId, String secondLectureApprovalStatus);

    List<SubjectResultSheet> getApprovedSheet(Roles person,String id) throws RecordNotFoundException;

    SubjectResultSheet addApproval(String personId, String sheetId, Roles person,LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException;

    SubjectResultSheet saveResultSheetAndCollection(SubjectResultSheet subjectResultSheet, String personId) throws RecordNotFoundException;

    List<SubjectResultSheet> getAllApprovedSheets(Roles role, String id) throws RecordNotFoundException;

    SubjectResultSheet UpdateRejectedResults(String id, String lecId,LectureSubjectResultSheetDto lectureSubjectResultSheetDto,Role role) throws RecordNotFoundException;

    SubjectResultSheet UpdateResultsBySec(String id, String lecId, LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException;
}
