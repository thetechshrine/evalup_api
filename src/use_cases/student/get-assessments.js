module.exports = function buildGetAssessments({ databaseServices, dateUtils }) {
  const { assessmentRepository, groupRepository } = databaseServices;

  function isAssessmentViewable(assessment) {
    const startDate = new Date(assessment.startDate);
    const endDate = new Date(assessment.endDate);
    const todayDate = new Date();

    if (dateUtils.isTheSameDay(startDate, todayDate)) {
      if (dateUtils.isBeforeInTimeThan(todayDate, startDate)) return false;
      if (dateUtils.isLaterInTimeThan(todayDate, endDate)) return false;
    } else if (dateUtils.isBeforeInTimeThan(todayDate, startDate)) return false;

    return true;
  }

  function filterNonViewableAssessments(assessments = []) {
    return assessments.filter((assessment) => isAssessmentViewable(assessment)).map((assessment) => assessment.toJSON());
  }

  async function execute({ groupId } = {}) {
    await groupRepository.checkById(groupId);

    const foundAssessments = await assessmentRepository.findAllByGroupId(groupId);

    filterNonViewableAssessments(foundAssessments);

    return filterNonViewableAssessments(foundAssessments);
  }

  return {
    execute,
  };
};
