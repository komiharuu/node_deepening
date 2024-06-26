

export class ResumesController {
  constructor(resumesService) {
    // 생성자에서 전달받은 PostsService의 의존성을 주입합니다.
    this.resumesService = resumesService;
  }
  createResume = async (req, res, next) => {
    try {
      const { title, introduce } = req.body;
      const user = req.user;
 
      // Service 계층의 함수 호출
      const resume = await this.resumesService.createResume(  user, title, introduce);
  
      return res.status(201).json({ data: resume });
    } catch (err) {
      next(err);
    }
};




  getResumes = async (req, res, next) => {
    try {
      
      const resumes = await this.resumesService.findAllResumes();

      return res.status(200).json({ data: resumes });
    } catch (err) {
      next(err);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      // 서비스 계층에 구현된 findPostById 로직을 실행합니다.
      const resume = await this.resumesService.findResumeById(resumeId);

      return res.status(200).json({ data: resume });
    } catch (err) {
      next(err);
    }
  };



  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, introduce} = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const updatedResume = await this.resumesService.updateResume(
        resumeId,
        title,
        introduce,
      );

      return res.status(200).json({ data: updatedResume });
    } catch (err) {
      next(err);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;

      // 서비스 계층에 구현된 deletePost 로직을 실행합니다.
      const deletedResume = await this.resumesService.deleteResume(resumeId);

      return res.status(200).json({ data: deletedResume});
    } catch (err) {
      next(err);
    }
  };
}