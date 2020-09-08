const { expect } = require('chai');
const { Assessment, Asset } = require('../../src/database/entities');
const {
  AssessmentFactory,
  AssetFactory,
} = require('../../src/database/factories');
const assetEnums = require('../../src/database/enums/asset');

describe('create assessment entity', () => {
  const shared = {};
  beforeEach(() => {
    shared.assessment = AssessmentFactory.generate({
      assets: [
        new Asset(
          AssetFactory.generate({
            role: assetEnums.roles.PRIMARY,
            type: assetEnums.types.PDF,
          })
        ),
      ],
    });
  });

  it('should return an error if there is no title parameter', () => {
    delete shared.assessment.title;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if there is no type parameter', () => {
    delete shared.assessment.type;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if type is not valid', () => {
    shared.assessment.type = 'type';

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if there is no startDate parameter', () => {
    delete shared.assessment.startDate;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if there is no endDate parameter', () => {
    delete shared.assessment.endDate;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if startDate is equal to endDate', () => {
    const date = Date.now();
    shared.assessment.startDate = date;
    shared.assessment.endDate = date;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if startDate is later than endDate', () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setHours(endDate.getHours() + 7);
    shared.assessment.startDate = startDate;
    shared.assessment.endDate = endDate;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if there is no assets parameter', () => {
    delete shared.assessment.assets;

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error if there is no primary role asset in assets array', () => {
    shared.assessment.assets = [
      new Asset(
        AssetFactory.generate({
          role: assetEnums.roles.SECONDARY,
        })
      ),
    ];

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should return an error the primary role asset is not a PDF file', () => {
    shared.assessment.assets = [
      new Asset(
        AssetFactory.generate({
          role: assetEnums.roles.PRIMARY,
          type: assetEnums.types.REPOSITORY,
        })
      ),
    ];

    expect(() => {
      new Assessment(shared.assessment);
    }).to.throw();
  });

  it('should successfully create a new assessment with all properties valid', () => {
    const assessment = new Assessment(shared.assessment);

    expect(assessment).to.have.property('id');
  });
});
