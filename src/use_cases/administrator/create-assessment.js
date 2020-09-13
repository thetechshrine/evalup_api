const { Assessment, Asset } = require('../../database/entities');
const assetEnums = require('../../database/enums/asset');

module.exports = function buildCreateAssessment({ databaseServices }) {
  const {
    assessmentRepository,
    groupRepository,
    teacherRepository,
    courseRepository,
  } = databaseServices;

  function parseAssetsArrayToInstantiatedAssetsArray(assets) {
    if (!Array.isArray(assets)) throw new Error('assets must be an array');

    return assets.map(
      (asset) =>
        new Asset({
          ...asset,
          targetResource: assetEnums.targetResources.ASSESSMENT,
        })
    );
  }

  async function execute({
    title,
    type,
    description,
    startDate,
    endDate,
    assets,
    groupId,
    courseId,
    teacherId,
  } = {}) {
    const group = await groupRepository.checkGroupId(groupId);
    const course = await courseRepository.checkCourseId(courseId);
    const teacher = await teacherRepository.checkTeacherId(teacherId);
    const assessment = new Assessment({
      title,
      type,
      description,
      startDate,
      endDate,
      assets: parseAssetsArrayToInstantiatedAssetsArray(assets),
      group,
      teacher,
      course,
    });
    const persistedAssessment = await assessmentRepository.create(assessment);

    return persistedAssessment.toJSON();
  }

  return {
    execute,
  };
};
