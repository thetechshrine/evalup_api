module.exports = function immutable(OriginalClass) {
  return eval(`OriginalClass => class ${OriginalClass.name} extends OriginalClass {
    constructor(...args) {
      super(...args)
      if (new.target === ${OriginalClass.name}) {
        Object.freeze(this);
      }
    }
  }`)(OriginalClass);
};
