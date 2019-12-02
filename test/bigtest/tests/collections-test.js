// import { beforeEach, describe, it } from '@bigtest/mocha';
// import { expect } from 'chai';

// import setupApplication from '../helpers/setup-application';
// import CollectionInteractor from '../interactors/collection';
// import SourceInteractor from '../interactors/source';

// const COLLECTION_COUNT = 25;

// describe('Metadata Collection', () => {
//   setupApplication();

//   const collectionInteractor = new CollectionInteractor();

//   beforeEach(async function () {
//     this.server.createList('finc-select-metadata-collection', COLLECTION_COUNT);
//     this.visit('/finc-select/metadata-collections?filters=freeContent.yes');
//     await collectionInteractor.whenLoaded();

//     // click checkbox not working always
//     // await collectionInteractor.clickMetadataAvailableCOLLECTIONsCheckbox();
//   });

//   it('shows the list of collection items', () => {
//     expect(collectionInteractor.isVisible).to.equal(true);
//   });

//   it('renders each collection-instance', () => {
//     expect(collectionInteractor.instances().length).to.be.equal(COLLECTION_COUNT);
//   });

//   describe('clicking on the first collection', function () {
//     beforeEach(async function () {
//       await collectionInteractor.instances(0).click();
//     });

//     it('loads the collection-instance details', function () {
//       expect(collectionInteractor.instance.isVisible).to.equal(true);
//     });
//   });

//   describe('Navigation with active collection tab', () => {
//     it('should be present', () => {
//       expect(collectionInteractor.navigation.isPresent).to.be.true;
//     });

//     it('should make collection tab primary', () => {
//       expect(collectionInteractor.navigation.collectionNavBtn.isPrimary).to.be.true;
//       expect(collectionInteractor.navigation.sourceNavBtn.isPrimary).to.be.false;
//     });

//     describe('click on Source Tab', () => {
//       const sourceInteractor = new SourceInteractor();

//       beforeEach(async function () {
//         await collectionInteractor.navigation.sourceNavBtn.click();
//         await sourceInteractor.whenLoaded();
//       });

//       it('should open the sources list', () => {
//         expect(sourceInteractor.isPresent).to.be.true;
//       });
//     });
//   });
// });
