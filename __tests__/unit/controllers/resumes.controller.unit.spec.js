import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { ResumesController } from '../../../src/controllers/resume.controller.js';
import { dummyResumes } from '../../dummies/resumes.dummy.js';

const mockresumesService= {
  createResume: jest.fn(),
  findAllResumes: jest.fn(),
  findResumeById: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const mockRequest = {
  user: jest.fn(),
  body: jest.fn(),
  query: jest.fn(),
  params: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

const resumesController = new ResumesController(mockresumesService);

describe('ResumesController Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야 합니다.
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test('createResume Method', async () => {
    // GIVEN
    const newResume = dummyResumes[0];
    const createdResume = dummyResumes[1];
    mockRequest.body = newResume;
    mockresumesService.createResume.mockResolvedValue(createdResume);

    // WHEN
    await resumesController.createResume(mockRequest, mockResponse, mockNext);

    // THEN
    expect(mockresumesService.createResume).toHaveBeenCalledWith(newResume);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(createdResume);
  });

  test('getResumes Method', async () => {
    // GIVEN
    const resumes = dummyResumes;
    mockresumesService.findAllResumes.mockResolvedValue(resumes);

    // WHEN
    await resumesController.getResumes(mockRequest, mockResponse, mockNext);

    // THEN
    expect(mockresumesService.findAllResumes).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({data:resumes});
  });

  test('getResumeById Method', async () => {
    // GIVEN
    const resume = dummyResumes[1];
    mockRequest.params = { id: resume.id };
    mockresumesService.findResumeById.mockResolvedValue(resume);

    // WHEN
    await resumesController.getResumeById(mockRequest, mockResponse, mockNext);

    // THEN
    expect(mockresumesService.findResumeById).toHaveBeenCalledWith(resume.id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(resume);
  });

  test('updateResume Method', async () => {
    // GIVEN
    const updatedResume = { ...dummyResumes[1], title: 'Updated Title' };
    mockRequest.params = { id: updatedResume.id };
    mockRequest.body = updatedResume;
    mockresumesService.updateResume.mockResolvedValue(updatedResume);
  
    // WHEN
    await resumesController.updateResume(mockRequest, mockResponse, mockNext);
  
    // THEN
    expect(mockresumesService.updateResume).toHaveBeenCalledWith(updatedResume.id, updatedResume);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: updatedResume });
  });
  

  test('deleteResume Method', async () => {
    // GIVEN
    const resumeId = dummyResumes[1].id;
    mockRequest.params = { id: String(resumeId) }; // ID를 문자열로 설정
    mockresumesService.deleteResume.mockResolvedValue(null);

    // WHEN
    await resumesController.deleteResume(mockRequest, mockResponse, mockNext);

 
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: null });
  });
});
