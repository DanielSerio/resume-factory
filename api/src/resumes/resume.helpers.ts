import { Resume } from "./entities/resume.entity";

export class ResumeHelpers {
  static getUniqueResumeName(resume: Resume) {
    const targetChunks = [
      resume.targetCompany,
      resume.targetPosition
    ].filter((value) => !!value);

    const chunks = [
      resume.createdAt,
      resume.id
    ];

    const hasTargetValues = targetChunks.length > 0;

    const name = `${hasTargetValues ? `${targetChunks.join('-')}_` : ''}${chunks.join('-')}`;

    return encodeURIComponent(name);
  }
}